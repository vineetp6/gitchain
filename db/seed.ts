import { db } from "./index";
import * as schema from "@shared/schema";
import bcrypt from "bcrypt";
import crypto from "crypto";

async function seed() {
  try {
    console.log("Starting database seed...");
    
    // Check if users already exist
    const existingUsers = await db.query.users.findMany({
      limit: 1
    });
    
    if (existingUsers.length > 0) {
      console.log("Database already has users, skipping seed");
      return;
    }
    
    // Create users
    console.log("Creating users...");
    
    // Hash password
    const password = await bcrypt.hash("password123", 10);
    
    // Generate key pair for Alex
    const alexKeys = crypto.generateKeyPairSync("rsa", {
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
    
    // Create Alex user
    const [alex] = await db.insert(schema.users).values({
      username: "alex",
      password: password,
      displayName: "Alex Johnson",
      publicKey: alexKeys.publicKey,
      privateKey: alexKeys.privateKey,
      avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
      storageUsed: 1200000000, // 1.2 GB
      storageLimit: 2000000000, // 2 GB
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
      updatedAt: new Date(),
    }).returning();
    
    // Generate key pair for Ethan
    const ethanKeys = crypto.generateKeyPairSync("rsa", {
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
    
    // Create Ethan user
    const [ethan] = await db.insert(schema.users).values({
      username: "ethan",
      password: password,
      displayName: "Ethan Wright",
      publicKey: ethanKeys.publicKey,
      privateKey: ethanKeys.privateKey,
      avatarUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
      storageUsed: 800000000, // 800 MB
      storageLimit: 2000000000, // 2 GB
      createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000), // 20 days ago
      updatedAt: new Date(),
    }).returning();
    
    // Generate key pair for Lisa
    const lisaKeys = crypto.generateKeyPairSync("rsa", {
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
    
    // Create Lisa user
    const [lisa] = await db.insert(schema.users).values({
      username: "lisa",
      password: password,
      displayName: "Lisa Chen",
      publicKey: lisaKeys.publicKey,
      privateKey: lisaKeys.privateKey,
      avatarUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
      storageUsed: 500000000, // 500 MB
      storageLimit: 2000000000, // 2 GB
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
      updatedAt: new Date(),
    }).returning();
    
    // Generate key pair for Sarah
    const sarahKeys = crypto.generateKeyPairSync("rsa", {
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
    
    // Create Sarah user
    const [sarah] = await db.insert(schema.users).values({
      username: "sarah",
      password: password,
      displayName: "Sarah Reynolds",
      publicKey: sarahKeys.publicKey,
      privateKey: sarahKeys.privateKey,
      avatarUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
      storageUsed: 1500000000, // 1.5 GB
      storageLimit: 2000000000, // 2 GB
      createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000), // 25 days ago
      updatedAt: new Date(),
    }).returning();
    
    console.log("Users created");
    
    // Create repositories
    console.log("Creating repositories...");
    
    // Alex's repositories
    const [repo1] = await db.insert(schema.repositories).values({
      name: "decentralized-storage-client",
      description: "Client library for connecting to decentralized storage networks",
      isPublic: true,
      isVerified: true,
      ownerId: alex.id,
      language: "TypeScript",
      stars: 24,
      forks: 8,
      branches: 3,
      commits: 128,
      localPath: `/repos/${alex.id}_1`,
      createdAt: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000), // 28 days ago
      updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    }).returning();
    
    const [repo2] = await db.insert(schema.repositories).values({
      name: "p2p-blockchain-explorer",
      description: "Decentralized blockchain explorer with peer-to-peer architecture",
      isPublic: true,
      isVerified: true,
      ownerId: alex.id,
      language: "JavaScript",
      stars: 42,
      forks: 15,
      branches: 5,
      commits: 216,
      localPath: `/repos/${alex.id}_2`,
      createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000), // 25 days ago
      updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    }).returning();
    
    const [repo3] = await db.insert(schema.repositories).values({
      name: "crypto-identity-manager",
      description: "Secure identity management using cryptographic signatures",
      isPublic: false,
      isVerified: false,
      ownerId: alex.id,
      language: "Rust",
      stars: 0,
      forks: 0,
      branches: 2,
      commits: 96,
      localPath: `/repos/${alex.id}_3`,
      createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000), // 20 days ago
      updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    }).returning();
    
    // Ethan's repositories
    const [repo4] = await db.insert(schema.repositories).values({
      name: "decentralized-git-protocol",
      description: "Implementation of Git protocol over libp2p with cryptographic verification",
      isPublic: true,
      isVerified: true,
      ownerId: ethan.id,
      language: "Rust",
      stars: 126,
      forks: 32,
      branches: 4,
      commits: 345,
      localPath: `/repos/${ethan.id}_1`,
      createdAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000), // 18 days ago
      updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    }).returning();
    
    // Sarah's repositories
    const [repo5] = await db.insert(schema.repositories).values({
      name: "p2p-issue-tracker",
      description: "Decentralized issue tracking system with offline-first capabilities",
      isPublic: true,
      isVerified: true,
      ownerId: sarah.id,
      language: "JavaScript",
      stars: 89,
      forks: 15,
      branches: 3,
      commits: 178,
      localPath: `/repos/${sarah.id}_1`,
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
      updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
    }).returning();
    
    console.log("Repositories created");
    
    // Create tags
    console.log("Creating tags...");
    
    const [tag1] = await db.insert(schema.tags).values({ name: "p2p" }).returning();
    const [tag2] = await db.insert(schema.tags).values({ name: "blockchain" }).returning();
    const [tag3] = await db.insert(schema.tags).values({ name: "javascript" }).returning();
    const [tag4] = await db.insert(schema.tags).values({ name: "typescript" }).returning();
    const [tag5] = await db.insert(schema.tags).values({ name: "decentralized" }).returning();
    const [tag6] = await db.insert(schema.tags).values({ name: "git" }).returning();
    const [tag7] = await db.insert(schema.tags).values({ name: "rust" }).returning();
    const [tag8] = await db.insert(schema.tags).values({ name: "web3" }).returning();
    const [tag9] = await db.insert(schema.tags).values({ name: "defi" }).returning();
    const [tag10] = await db.insert(schema.tags).values({ name: "issues" }).returning();
    const [tag11] = await db.insert(schema.tags).values({ name: "offline-first" }).returning();
    
    console.log("Tags created");
    
    // Associate tags with repositories
    console.log("Associating tags with repositories...");
    
    // Tags for repo1
    await db.insert(schema.repositoryTags).values([
      { repositoryId: repo1.id, tagId: tag1.id },
      { repositoryId: repo1.id, tagId: tag4.id },
      { repositoryId: repo1.id, tagId: tag5.id }
    ]);
    
    // Tags for repo2
    await db.insert(schema.repositoryTags).values([
      { repositoryId: repo2.id, tagId: tag1.id },
      { repositoryId: repo2.id, tagId: tag2.id },
      { repositoryId: repo2.id, tagId: tag3.id },
      { repositoryId: repo2.id, tagId: tag8.id }
    ]);
    
    // Tags for repo3
    await db.insert(schema.repositoryTags).values([
      { repositoryId: repo3.id, tagId: tag5.id },
      { repositoryId: repo3.id, tagId: tag7.id }
    ]);
    
    // Tags for repo4
    await db.insert(schema.repositoryTags).values([
      { repositoryId: repo4.id, tagId: tag1.id },
      { repositoryId: repo4.id, tagId: tag6.id },
      { repositoryId: repo4.id, tagId: tag7.id }
    ]);
    
    // Tags for repo5
    await db.insert(schema.repositoryTags).values([
      { repositoryId: repo5.id, tagId: tag1.id },
      { repositoryId: repo5.id, tagId: tag3.id },
      { repositoryId: repo5.id, tagId: tag10.id },
      { repositoryId: repo5.id, tagId: tag11.id }
    ]);
    
    console.log("Tags associated with repositories");
    
    // Create collaborators
    console.log("Creating collaborators...");
    
    // Collaborators for repo1
    await db.insert(schema.collaborators).values([
      { repositoryId: repo1.id, userId: ethan.id, permission: "write" },
      { repositoryId: repo1.id, userId: lisa.id, permission: "read" }
    ]);
    
    // Collaborators for repo3
    await db.insert(schema.collaborators).values([
      { repositoryId: repo3.id, userId: lisa.id, permission: "write" }
    ]);
    
    // Collaborators for repo4
    await db.insert(schema.collaborators).values([
      { repositoryId: repo4.id, userId: alex.id, permission: "read" }
    ]);
    
    console.log("Collaborators created");
    
    // Create peers
    console.log("Creating peers...");
    
    const [peer1] = await db.insert(schema.peers).values({
      peerId: "QmPeerid1",
      lastSeen: new Date(),
      metadata: { name: "Peer 1", location: "US" }
    }).returning();
    
    const [peer2] = await db.insert(schema.peers).values({
      peerId: "QmPeerid2",
      lastSeen: new Date(),
      metadata: { name: "Peer 2", location: "EU" }
    }).returning();
    
    const [peer3] = await db.insert(schema.peers).values({
      peerId: "QmPeerid3",
      lastSeen: new Date(),
      metadata: { name: "Peer 3", location: "AS" }
    }).returning();
    
    console.log("Peers created");
    
    // Create shared repositories
    console.log("Creating shared repositories...");
    
    await db.insert(schema.sharedRepositories).values([
      { repositoryId: repo1.id, peerId: peer1.peerId },
      { repositoryId: repo1.id, peerId: peer2.peerId },
      { repositoryId: repo2.id, peerId: peer1.peerId },
      { repositoryId: repo2.id, peerId: peer3.peerId },
      { repositoryId: repo4.id, peerId: peer2.peerId },
      { repositoryId: repo5.id, peerId: peer3.peerId }
    ]);
    
    console.log("Shared repositories created");
    
    // Create activities
    console.log("Creating activities...");
    
    // Alex's activities
    await db.insert(schema.activities).values([
      {
        userId: alex.id,
        repositoryId: repo2.id,
        type: "commit",
        payload: {
          commitHash: "8fb21a9e7d2c3de4a5b6c7d8e9f0a1b2c3d4e5f6",
          message: "Fix peer discovery in NAT environments"
        },
        createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000) // 3 hours ago
      },
      {
        userId: alex.id,
        repositoryId: repo1.id,
        type: "commit",
        payload: {
          commitHash: "1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0",
          message: "Add support for IPFS integration"
        },
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
      }
    ]);
    
    // Ethan's activities
    await db.insert(schema.activities).values([
      {
        userId: ethan.id,
        repositoryId: repo1.id,
        type: "issue",
        payload: {
          action: "opened",
          title: "Add support for encrypted content addressing"
        },
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
      }
    ]);
    
    // Lisa's activities
    await db.insert(schema.activities).values([
      {
        userId: lisa.id,
        repositoryId: repo3.id,
        type: "pull_request",
        payload: {
          action: "opened",
          title: "Implement multi-device key synchronization"
        },
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
      }
    ]);
    
    console.log("Activities created");
    
    console.log("Database seed completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

seed();
