import { db } from "@db";
import {
  users,
  repositories,
  collaborators,
  tags,
  repositoryTags,
  peers,
  sharedRepositories,
  activities,
  User,
  Repository,
  Collaborator,
  Tag,
  RepositoryTag,
  Peer,
  SharedRepository,
  Activity,
  InsertUser,
  InsertRepository,
  InsertCollaborator,
  InsertActivity,
} from "@shared/schema";
import { eq, and, desc, sql, like, or } from "drizzle-orm";
import * as crypto from "crypto";

// User operations
export const storage = {
  // User operations
  async getUserById(id: number): Promise<User | undefined> {
    return db.query.users.findFirst({
      where: eq(users.id, id),
    });
  },

  async getUserByUsername(username: string): Promise<User | undefined> {
    return db.query.users.findFirst({
      where: eq(users.username, username),
    });
  },

  async createUser(userData: InsertUser): Promise<User> {
    // Generate a key pair for the user
    const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: "spki",
        format: "pem",
      },
      privateKeyEncoding: {
        type: "pkcs8",
        format: "pem",
      },
    });

    const userWithKeys = {
      ...userData,
      publicKey,
      privateKey,
    };

    const [newUser] = await db.insert(users).values(userWithKeys).returning();
    return newUser;
  },

  async updateUser(id: number, userData: Partial<User>): Promise<User | undefined> {
    const [updatedUser] = await db
      .update(users)
      .set({ ...userData, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return updatedUser;
  },

  // Repository operations
  async getRepositoryById(id: number): Promise<Repository | undefined> {
    return db.query.repositories.findFirst({
      where: eq(repositories.id, id),
      with: {
        owner: true,
      },
    });
  },

  async getRepositoriesByUserId(userId: number): Promise<Repository[]> {
    return db.query.repositories.findMany({
      where: eq(repositories.ownerId, userId),
      orderBy: desc(repositories.updatedAt),
    });
  },

  async getPublicRepositories(): Promise<Repository[]> {
    return db.query.repositories.findMany({
      where: eq(repositories.isPublic, true),
      orderBy: desc(repositories.updatedAt),
      with: {
        owner: true,
      },
    });
  },

  async searchRepositories(query: string, includePrivate: boolean = false, userId?: number): Promise<Repository[]> {
    let filters = [like(repositories.name, `%${query}%`), like(repositories.description, `%${query}%`)];
    
    if (!includePrivate) {
      filters.push(eq(repositories.isPublic, true));
    } else if (userId) {
      // If including private repos, only include those owned by userId
      filters.push(
        or(
          eq(repositories.isPublic, true),
          and(
            eq(repositories.isPublic, false),
            eq(repositories.ownerId, userId)
          )
        )
      );
    }
    
    return db.query.repositories.findMany({
      where: or(...filters),
      orderBy: desc(repositories.updatedAt),
      with: {
        owner: true,
      },
    });
  },

  async createRepository(repoData: InsertRepository): Promise<Repository> {
    const [newRepo] = await db.insert(repositories).values(repoData).returning();
    return newRepo;
  },

  async updateRepository(id: number, repoData: Partial<Repository>): Promise<Repository | undefined> {
    const [updatedRepo] = await db
      .update(repositories)
      .set({ ...repoData, updatedAt: new Date() })
      .where(eq(repositories.id, id))
      .returning();
    return updatedRepo;
  },

  async deleteRepository(id: number): Promise<boolean> {
    const result = await db.delete(repositories).where(eq(repositories.id, id));
    return !!result;
  },

  // Collaborator operations
  async getCollaboratorsByRepoId(repoId: number): Promise<Collaborator[]> {
    return db.query.collaborators.findMany({
      where: eq(collaborators.repositoryId, repoId),
      with: {
        user: true,
      },
    });
  },

  async addCollaborator(collaboratorData: InsertCollaborator): Promise<Collaborator> {
    const [newCollaborator] = await db.insert(collaborators).values(collaboratorData).returning();
    return newCollaborator;
  },

  async removeCollaborator(repoId: number, userId: number): Promise<boolean> {
    const result = await db
      .delete(collaborators)
      .where(
        and(
          eq(collaborators.repositoryId, repoId),
          eq(collaborators.userId, userId)
        )
      );
    return !!result;
  },

  // Tag operations
  async getAllTags(): Promise<Tag[]> {
    return db.query.tags.findMany();
  },

  async getTagsByRepoId(repoId: number): Promise<Tag[]> {
    const result = await db.query.repositoryTags.findMany({
      where: eq(repositoryTags.repositoryId, repoId),
      with: {
        tag: true,
      },
    });
    
    return result.map(rt => rt.tag);
  },

  async createTag(name: string): Promise<Tag> {
    // Check if tag already exists
    let tag = await db.query.tags.findFirst({
      where: eq(tags.name, name),
    });

    // If not, create it
    if (!tag) {
      const [newTag] = await db.insert(tags).values({ name }).returning();
      tag = newTag;
    }

    return tag;
  },

  async addTagToRepository(repoId: number, tagId: number): Promise<RepositoryTag> {
    // Check if association already exists
    const existingTag = await db.query.repositoryTags.findFirst({
      where: and(
        eq(repositoryTags.repositoryId, repoId),
        eq(repositoryTags.tagId, tagId)
      ),
    });

    if (existingTag) {
      return existingTag;
    }

    const [newRepoTag] = await db
      .insert(repositoryTags)
      .values({
        repositoryId: repoId,
        tagId: tagId,
      })
      .returning();
    
    return newRepoTag;
  },

  async removeTagFromRepository(repoId: number, tagId: number): Promise<boolean> {
    const result = await db
      .delete(repositoryTags)
      .where(
        and(
          eq(repositoryTags.repositoryId, repoId),
          eq(repositoryTags.tagId, tagId)
        )
      );
    
    return !!result;
  },

  // P2P network operations
  async getPeers(): Promise<Peer[]> {
    return db.query.peers.findMany({
      orderBy: desc(peers.lastSeen),
    });
  },

  async getActivePeers(): Promise<Peer[]> {
    // Get peers that were seen in the last 10 minutes
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
    
    return db.query.peers.findMany({
      where: sql`${peers.lastSeen} > ${tenMinutesAgo}`,
      orderBy: desc(peers.lastSeen),
    });
  },

  async getOrCreatePeer(peerId: string, metadata?: any): Promise<Peer> {
    let peer = await db.query.peers.findFirst({
      where: eq(peers.peerId, peerId),
    });

    if (!peer) {
      const [newPeer] = await db
        .insert(peers)
        .values({
          peerId,
          metadata: metadata || {},
        })
        .returning();
      
      peer = newPeer;
    } else {
      // Update last seen
      const [updatedPeer] = await db
        .update(peers)
        .set({
          lastSeen: new Date(),
          metadata: metadata || peer.metadata,
        })
        .where(eq(peers.peerId, peerId))
        .returning();
      
      peer = updatedPeer;
    }

    return peer;
  },

  // Shared repository operations
  async getSharedRepositoriesByRepo(repoId: number): Promise<SharedRepository[]> {
    return db.query.sharedRepositories.findMany({
      where: eq(sharedRepositories.repositoryId, repoId),
      with: {
        peer: true,
      },
    });
  },

  async shareRepositoryWithPeer(repoId: number, peerId: string): Promise<SharedRepository> {
    // Check if already shared
    let shared = await db.query.sharedRepositories.findFirst({
      where: and(
        eq(sharedRepositories.repositoryId, repoId),
        eq(sharedRepositories.peerId, peerId)
      ),
    });

    if (!shared) {
      const [newShared] = await db
        .insert(sharedRepositories)
        .values({
          repositoryId: repoId,
          peerId,
        })
        .returning();
      
      shared = newShared;
    }

    return shared;
  },

  async unshareRepositoryWithPeer(repoId: number, peerId: string): Promise<boolean> {
    const result = await db
      .delete(sharedRepositories)
      .where(
        and(
          eq(sharedRepositories.repositoryId, repoId),
          eq(sharedRepositories.peerId, peerId)
        )
      );
    
    return !!result;
  },

  // Activity operations
  async getActivitiesByUser(userId: number, limit: number = 10): Promise<Activity[]> {
    return db.query.activities.findMany({
      where: eq(activities.userId, userId),
      orderBy: desc(activities.createdAt),
      limit,
      with: {
        user: true,
        repository: true,
      },
    });
  },

  async getActivitiesByRepository(repoId: number, limit: number = 10): Promise<Activity[]> {
    return db.query.activities.findMany({
      where: eq(activities.repositoryId, repoId),
      orderBy: desc(activities.createdAt),
      limit,
      with: {
        user: true,
        repository: true,
      },
    });
  },

  async createActivity(activityData: InsertActivity): Promise<Activity> {
    const [newActivity] = await db.insert(activities).values(activityData).returning();
    return newActivity;
  },

  // Network statistics
  async getNetworkStats(): Promise<{
    totalUsers: number;
    totalRepositories: number;
    activePeers: number;
    totalStorage: number;
  }> {
    const userCount = await db
      .select({ count: sql<number>`count(*)` })
      .from(users);
    
    const repoCount = await db
      .select({ count: sql<number>`count(*)` })
      .from(repositories);
    
    const activePeersCount = await db
      .select({ count: sql<number>`count(*)` })
      .from(peers)
      .where(sql`${peers.lastSeen} > ${new Date(Date.now() - 10 * 60 * 1000)}`);
    
    const storageResult = await db
      .select({ total: sql<number>`sum(${users.storageUsed})` })
      .from(users);
    
    return {
      totalUsers: userCount[0].count,
      totalRepositories: repoCount[0].count,
      activePeers: activePeersCount[0].count,
      totalStorage: storageResult[0].total || 0,
    };
  },
};
