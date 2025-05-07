import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { ZodError } from "zod-validation-error";
import {
  insertUserSchema,
  insertRepositorySchema,
  insertActivitySchema,
  users,
} from "@shared/schema";
import bcrypt from "bcrypt";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import * as WebSocket from "ws";
import { db } from "@db";
import { join } from "path";
import { promises as fs } from "fs";
import crypto from "crypto";

// Define WebSocket messages
type WSMessage = {
  type: string;
  payload: any;
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Configure session
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "gitmesh_secret_key",
      resave: false,
      saveUninitialized: false,
      cookie: { secure: process.env.NODE_ENV === "production" },
    })
  );

  // Initialize passport
  app.use(passport.initialize());
  app.use(passport.session());

  // Configure passport local strategy
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await storage.getUserByUsername(username);
        if (!user) {
          return done(null, false, { message: "Incorrect username." });
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
          return done(null, false, { message: "Incorrect password." });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUserById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  // Helper middleware to check if user is authenticated
  const isAuthenticated = (req: Request, res: Response, next: any) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ message: "Unauthorized" });
  };

  // Generate signature for data verification
  const signData = (data: any, privateKey: string): string => {
    const sign = crypto.createSign("SHA256");
    sign.update(JSON.stringify(data));
    return sign.sign(privateKey, "base64");
  };

  // Verify signature
  const verifySignature = (data: any, signature: string, publicKey: string): boolean => {
    const verify = crypto.createVerify("SHA256");
    verify.update(JSON.stringify(data));
    return verify.verify(publicKey, signature, "base64");
  };

  // API routes
  const apiPrefix = "/api";

  // Authentication routes
  app.post(`${apiPrefix}/auth/register`, async (req, res) => {
    try {
      console.log("Registration request body:", req.body);
      
      // Generate key pair for cryptographic operations
      const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: { type: 'spki', format: 'pem' },
        privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
      });
      
      // Add publicKey and privateKey to the request body
      const fullUserData = {
        ...req.body,
        publicKey,
        privateKey
      };
      
      // Validate with schema
      const userData = insertUserSchema.parse(fullUserData);
      
      // Hash password
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      
      const newUser = await storage.createUser({
        ...userData,
        password: hashedPassword,
      });

      // Remove sensitive data
      const { password, privateKey: pk, ...safeUser } = newUser;
      
      res.status(201).json(safeUser);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      console.error("Error registering user:", error);
      res.status(500).json({ message: "Internal server error during registration" });
    }
  });

  app.post(`${apiPrefix}/auth/login`, passport.authenticate("local"), (req, res) => {
    const user = req.user as any;
    // Remove sensitive data
    const { password, privateKey, ...safeUser } = user;
    res.json(safeUser);
  });

  app.post(`${apiPrefix}/auth/logout`, (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: "Error logging out" });
      }
      res.json({ message: "Logged out successfully" });
    });
  });

  app.get(`${apiPrefix}/auth/session`, (req, res) => {
    if (req.isAuthenticated()) {
      const user = req.user as any;
      // Remove sensitive data
      const { password, privateKey, ...safeUser } = user;
      return res.json(safeUser);
    }
    res.status(401).json({ message: "Not authenticated" });
  });

  // User routes
  app.get(`${apiPrefix}/users/current`, isAuthenticated, (req, res) => {
    const user = req.user as any;
    // Remove sensitive data
    const { password, privateKey, ...safeUser } = user;
    res.json(safeUser);
  });

  app.get(`${apiPrefix}/users/:id`, async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const user = await storage.getUserById(userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Remove sensitive data
      const { password, privateKey, ...safeUser } = user;
      
      res.json(safeUser);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Repository routes
  app.get(`${apiPrefix}/repositories`, async (req, res) => {
    try {
      const userId = req.user ? (req.user as any).id : null;
      const query = req.query.search as string | undefined;
      
      let repositories;
      if (query) {
        repositories = await storage.searchRepositories(query, !!userId, userId);
      } else if (userId) {
        repositories = await storage.getRepositoriesByUserId(userId);
      } else {
        repositories = await storage.getPublicRepositories();
      }
      
      res.json(repositories);
    } catch (error) {
      console.error("Error fetching repositories:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get(`${apiPrefix}/repositories/user/:userId`, async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const repositories = await storage.getRepositoriesByUserId(userId);
      res.json(repositories);
    } catch (error) {
      console.error("Error fetching user repositories:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get(`${apiPrefix}/repositories/:id`, async (req, res) => {
    try {
      const repoId = parseInt(req.params.id);
      const repository = await storage.getRepositoryById(repoId);
      
      if (!repository) {
        return res.status(404).json({ message: "Repository not found" });
      }
      
      if (!repository.isPublic && (!req.user || (req.user as any).id !== repository.ownerId)) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      res.json(repository);
    } catch (error) {
      console.error("Error fetching repository:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post(`${apiPrefix}/repositories`, isAuthenticated, async (req, res) => {
    try {
      const repoData = insertRepositorySchema.parse(req.body);
      const userId = (req.user as any).id;
      
      const newRepo = await storage.createRepository({
        ...repoData,
        ownerId: userId,
        localPath: `/repos/${userId}_${Date.now()}`,
      });
      
      // Create the repository directory
      await fs.mkdir(join(process.cwd(), "data", "repos", `${userId}_${Date.now()}`), { recursive: true });
      
      res.status(201).json(newRepo);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.errors });
      }
      console.error("Error creating repository:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.put(`${apiPrefix}/repositories/:id`, isAuthenticated, async (req, res) => {
    try {
      const repoId = parseInt(req.params.id);
      const userId = (req.user as any).id;
      
      const repository = await storage.getRepositoryById(repoId);
      
      if (!repository) {
        return res.status(404).json({ message: "Repository not found" });
      }
      
      if (repository.ownerId !== userId) {
        return res.status(403).json({ message: "You don't have permission to update this repository" });
      }
      
      const updatedRepo = await storage.updateRepository(repoId, req.body);
      res.json(updatedRepo);
    } catch (error) {
      console.error("Error updating repository:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete(`${apiPrefix}/repositories/:id`, isAuthenticated, async (req, res) => {
    try {
      const repoId = parseInt(req.params.id);
      const userId = (req.user as any).id;
      
      const repository = await storage.getRepositoryById(repoId);
      
      if (!repository) {
        return res.status(404).json({ message: "Repository not found" });
      }
      
      if (repository.ownerId !== userId) {
        return res.status(403).json({ message: "You don't have permission to delete this repository" });
      }
      
      await storage.deleteRepository(repoId);
      
      // Delete the repository directory
      await fs.rmdir(join(process.cwd(), "data", repository.localPath), { recursive: true });
      
      res.json({ message: "Repository deleted successfully" });
    } catch (error) {
      console.error("Error deleting repository:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Collaborator routes
  app.get(`${apiPrefix}/repositories/:id/collaborators`, async (req, res) => {
    try {
      const repoId = parseInt(req.params.id);
      const collaborators = await storage.getCollaboratorsByRepoId(repoId);
      res.json(collaborators);
    } catch (error) {
      console.error("Error fetching collaborators:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post(`${apiPrefix}/repositories/:id/collaborators`, isAuthenticated, async (req, res) => {
    try {
      const repoId = parseInt(req.params.id);
      const userId = (req.user as any).id;
      
      const repository = await storage.getRepositoryById(repoId);
      
      if (!repository) {
        return res.status(404).json({ message: "Repository not found" });
      }
      
      if (repository.ownerId !== userId) {
        return res.status(403).json({ message: "You don't have permission to add collaborators" });
      }
      
      const { userId: collaboratorId, permission } = req.body;
      
      if (!collaboratorId || !permission) {
        return res.status(400).json({ message: "userId and permission are required" });
      }
      
      const newCollaborator = await storage.addCollaborator({
        repositoryId: repoId,
        userId: collaboratorId,
        permission,
      });
      
      res.status(201).json(newCollaborator);
    } catch (error) {
      console.error("Error adding collaborator:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete(`${apiPrefix}/repositories/:id/collaborators/:userId`, isAuthenticated, async (req, res) => {
    try {
      const repoId = parseInt(req.params.id);
      const collaboratorId = parseInt(req.params.userId);
      const userId = (req.user as any).id;
      
      const repository = await storage.getRepositoryById(repoId);
      
      if (!repository) {
        return res.status(404).json({ message: "Repository not found" });
      }
      
      if (repository.ownerId !== userId) {
        return res.status(403).json({ message: "You don't have permission to remove collaborators" });
      }
      
      await storage.removeCollaborator(repoId, collaboratorId);
      
      res.json({ message: "Collaborator removed successfully" });
    } catch (error) {
      console.error("Error removing collaborator:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Tag routes
  app.get(`${apiPrefix}/tags`, async (req, res) => {
    try {
      const tags = await storage.getAllTags();
      res.json(tags);
    } catch (error) {
      console.error("Error fetching tags:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get(`${apiPrefix}/repositories/:id/tags`, async (req, res) => {
    try {
      const repoId = parseInt(req.params.id);
      const tags = await storage.getTagsByRepoId(repoId);
      res.json(tags);
    } catch (error) {
      console.error("Error fetching repository tags:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post(`${apiPrefix}/repositories/:id/tags`, isAuthenticated, async (req, res) => {
    try {
      const repoId = parseInt(req.params.id);
      const userId = (req.user as any).id;
      
      const repository = await storage.getRepositoryById(repoId);
      
      if (!repository) {
        return res.status(404).json({ message: "Repository not found" });
      }
      
      if (repository.ownerId !== userId) {
        return res.status(403).json({ message: "You don't have permission to add tags" });
      }
      
      const { tagName } = req.body;
      
      if (!tagName) {
        return res.status(400).json({ message: "tagName is required" });
      }
      
      const tag = await storage.createTag(tagName);
      const repoTag = await storage.addTagToRepository(repoId, tag.id);
      
      res.status(201).json({ tag, repoTag });
    } catch (error) {
      console.error("Error adding tag:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete(`${apiPrefix}/repositories/:id/tags/:tagId`, isAuthenticated, async (req, res) => {
    try {
      const repoId = parseInt(req.params.id);
      const tagId = parseInt(req.params.tagId);
      const userId = (req.user as any).id;
      
      const repository = await storage.getRepositoryById(repoId);
      
      if (!repository) {
        return res.status(404).json({ message: "Repository not found" });
      }
      
      if (repository.ownerId !== userId) {
        return res.status(403).json({ message: "You don't have permission to remove tags" });
      }
      
      await storage.removeTagFromRepository(repoId, tagId);
      
      res.json({ message: "Tag removed successfully" });
    } catch (error) {
      console.error("Error removing tag:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // P2P network routes
  app.get(`${apiPrefix}/peers`, async (req, res) => {
    try {
      const peers = await storage.getActivePeers();
      res.json(peers);
    } catch (error) {
      console.error("Error fetching peers:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Network stats
  app.get(`${apiPrefix}/network/stats`, async (req, res) => {
    try {
      const stats = await storage.getNetworkStats();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching network stats:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Activity routes
  app.get(`${apiPrefix}/activities/user/:userId`, async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const activities = await storage.getActivitiesByUser(userId, limit);
      res.json(activities);
    } catch (error) {
      console.error("Error fetching user activities:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get(`${apiPrefix}/activities/repository/:id`, async (req, res) => {
    try {
      const repoId = parseInt(req.params.id);
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const activities = await storage.getActivitiesByRepository(repoId, limit);
      res.json(activities);
    } catch (error) {
      console.error("Error fetching repository activities:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post(`${apiPrefix}/activities`, isAuthenticated, async (req, res) => {
    try {
      const userId = (req.user as any).id;
      const activityData = insertActivitySchema.parse({
        ...req.body,
        userId,
      });
      
      const newActivity = await storage.createActivity(activityData);
      res.status(201).json(newActivity);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.errors });
      }
      console.error("Error creating activity:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);

  // Set up WebSocket server for real-time P2P communications
  const { WebSocketServer } = WebSocket;
  // Add a specific path to avoid conflicts with Vite's WebSocket server
  const wss = new WebSocketServer({ 
    server: httpServer,
    path: '/api/ws'
  });

  const clients = new Map<string, any>();

  wss.on("connection", (ws: any) => {
    let clientId: string | null = null;

    ws.on("message", async (message: any) => {
      try {
        const data: WSMessage = JSON.parse(message.toString());
        
        switch (data.type) {
          case "REGISTER_PEER":
            clientId = data.payload.peerId;
            if (clientId) {
              clients.set(clientId, ws);
              
              // Store peer in database
              await storage.getOrCreatePeer(clientId, data.payload.metadata);
            }
            
            // Broadcast to all peers about new peer
            clients.forEach((client, id) => {
              if (id !== clientId && client.readyState === 1) { // WebSocket.OPEN
                client.send(JSON.stringify({
                  type: "NEW_PEER",
                  payload: {
                    peerId: clientId,
                    metadata: data.payload.metadata,
                  },
                }));
              }
            });
            
            // Send list of active peers to new peer
            const activePeers = await storage.getActivePeers();
            ws.send(JSON.stringify({
              type: "PEER_LIST",
              payload: activePeers,
            }));
            break;
            
          case "SHARE_REPOSITORY":
            if (!clientId) break;
            
            const { repositoryId, targetPeerId } = data.payload;
            
            await storage.shareRepositoryWithPeer(repositoryId, targetPeerId);
            
            // Notify target peer
            const targetPeer = clients.get(targetPeerId);
            if (targetPeer && targetPeer.readyState === 1) { // WebSocket.OPEN
              targetPeer.send(JSON.stringify({
                type: "REPOSITORY_SHARED",
                payload: {
                  repositoryId,
                  sourcePeerId: clientId,
                },
              }));
            }
            break;
            
          case "VERIFY_DATA":
            if (!clientId) break;
            
            const { dataId, data: dataToVerify, signature, publicKey } = data.payload;
            
            // Verify the signature
            const isValid = verifySignature(dataToVerify, signature, publicKey);
            
            ws.send(JSON.stringify({
              type: "VERIFICATION_RESULT",
              payload: {
                dataId,
                isValid,
              },
            }));
            break;
            
          default:
            console.log(`Unknown message type: ${data.type}`);
        }
      } catch (error) {
        console.error("Error processing WebSocket message:", error);
      }
    });

    ws.on("close", async () => {
      if (clientId) {
        clients.delete(clientId);
        
        // Broadcast to all peers about peer disconnection
        clients.forEach((client) => {
          if (client.readyState === 1) { // WebSocket.OPEN
            client.send(JSON.stringify({
              type: "PEER_DISCONNECTED",
              payload: {
                peerId: clientId,
              },
            }));
          }
        });
      }
    });
  });

  return httpServer;
}
