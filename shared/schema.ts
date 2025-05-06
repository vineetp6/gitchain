import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  displayName: text("display_name").notNull(),
  publicKey: text("public_key").notNull(),
  privateKey: text("private_key").notNull(),
  avatarUrl: text("avatar_url"),
  storageUsed: integer("storage_used").default(0).notNull(),
  storageLimit: integer("storage_limit").default(2000000000).notNull(), // 2GB default
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Repositories table
export const repositories = pgTable("repositories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  isPublic: boolean("is_public").default(true).notNull(),
  isVerified: boolean("is_verified").default(false).notNull(),
  ownerId: integer("owner_id").references(() => users.id).notNull(),
  language: text("language"),
  stars: integer("stars").default(0).notNull(),
  forks: integer("forks").default(0).notNull(),
  branches: integer("branches").default(1).notNull(),
  commits: integer("commits").default(0).notNull(),
  localPath: text("local_path").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Collaborators table
export const collaborators = pgTable("collaborators", {
  id: serial("id").primaryKey(),
  repositoryId: integer("repository_id").references(() => repositories.id).notNull(),
  userId: integer("user_id").references(() => users.id).notNull(),
  permission: text("permission").notNull().default("read"), // read, write, admin
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Tags/Topics for repositories
export const tags = pgTable("tags", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Repository tags relationship
export const repositoryTags = pgTable("repository_tags", {
  id: serial("id").primaryKey(),
  repositoryId: integer("repository_id").references(() => repositories.id).notNull(),
  tagId: integer("tag_id").references(() => tags.id).notNull(),
});

// P2P network peers
export const peers = pgTable("peers", {
  id: serial("id").primaryKey(),
  peerId: text("peer_id").notNull().unique(),
  lastSeen: timestamp("last_seen").defaultNow().notNull(),
  metadata: jsonb("metadata"),
});

// Shared repositories (P2P sharing data)
export const sharedRepositories = pgTable("shared_repositories", {
  id: serial("id").primaryKey(),
  repositoryId: integer("repository_id").references(() => repositories.id).notNull(),
  peerId: text("peer_id").references(() => peers.peerId).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Activities/events
export const activities = pgTable("activities", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  repositoryId: integer("repository_id").references(() => repositories.id),
  type: text("type").notNull(), // commit, issue, pull_request, etc.
  payload: jsonb("payload").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Define relations
export const usersRelations = relations(users, ({ many }) => ({
  repositories: many(repositories),
  collaborations: many(collaborators),
  activities: many(activities),
}));

export const repositoriesRelations = relations(repositories, ({ one, many }) => ({
  owner: one(users, { fields: [repositories.ownerId], references: [users.id] }),
  collaborators: many(collaborators),
  repositoryTags: many(repositoryTags),
  activities: many(activities),
  sharedRepositories: many(sharedRepositories),
}));

export const collaboratorsRelations = relations(collaborators, ({ one }) => ({
  repository: one(repositories, { fields: [collaborators.repositoryId], references: [repositories.id] }),
  user: one(users, { fields: [collaborators.userId], references: [users.id] }),
}));

export const tagsRelations = relations(tags, ({ many }) => ({
  repositoryTags: many(repositoryTags),
}));

export const repositoryTagsRelations = relations(repositoryTags, ({ one }) => ({
  repository: one(repositories, { fields: [repositoryTags.repositoryId], references: [repositories.id] }),
  tag: one(tags, { fields: [repositoryTags.tagId], references: [tags.id] }),
}));

export const peersRelations = relations(peers, ({ many }) => ({
  sharedRepositories: many(sharedRepositories),
}));

export const sharedRepositoriesRelations = relations(sharedRepositories, ({ one }) => ({
  repository: one(repositories, { fields: [sharedRepositories.repositoryId], references: [repositories.id] }),
  peer: one(peers, { fields: [sharedRepositories.peerId], references: [peers.peerId] }),
}));

export const activitiesRelations = relations(activities, ({ one }) => ({
  user: one(users, { fields: [activities.userId], references: [users.id] }),
  repository: one(repositories, { fields: [activities.repositoryId], references: [repositories.id] }),
}));

// Validation schemas
export const insertUserSchema = createInsertSchema(users, {
  username: (schema) => schema.min(3, "Username must be at least 3 characters"),
  password: (schema) => schema.min(8, "Password must be at least 8 characters"),
  displayName: (schema) => schema.min(2, "Display name must be at least 2 characters"),
});

export const insertRepositorySchema = createInsertSchema(repositories, {
  name: (schema) => schema.min(1, "Repository name must not be empty"),
  description: (schema) => schema.optional(),
});

export const insertCollaboratorSchema = createInsertSchema(collaborators);
export const insertTagSchema = createInsertSchema(tags);
export const insertRepositoryTagSchema = createInsertSchema(repositoryTags);
export const insertPeerSchema = createInsertSchema(peers);
export const insertSharedRepositorySchema = createInsertSchema(sharedRepositories);
export const insertActivitySchema = createInsertSchema(activities);

// Type exports
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Repository = typeof repositories.$inferSelect;
export type InsertRepository = z.infer<typeof insertRepositorySchema>;

export type Collaborator = typeof collaborators.$inferSelect;
export type InsertCollaborator = z.infer<typeof insertCollaboratorSchema>;

export type Tag = typeof tags.$inferSelect;
export type InsertTag = z.infer<typeof insertTagSchema>;

export type RepositoryTag = typeof repositoryTags.$inferSelect;
export type InsertRepositoryTag = z.infer<typeof insertRepositoryTagSchema>;

export type Peer = typeof peers.$inferSelect;
export type InsertPeer = z.infer<typeof insertPeerSchema>;

export type SharedRepository = typeof sharedRepositories.$inferSelect;
export type InsertSharedRepository = z.infer<typeof insertSharedRepositorySchema>;

export type Activity = typeof activities.$inferSelect;
export type InsertActivity = z.infer<typeof insertActivitySchema>;
