// backend/src/config/db.js
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import dotenv from 'dotenv';

dotenv.config();

let dbInstance = null;

export async function getDatabase() {
    if (dbInstance) return dbInstance;

    dbInstance = await open({
        filename: process.env.DATABASE_FILE || './database.sqlite',
        driver: sqlite3.Database
    });

    // Foreign keys constraint enforcement
    await dbInstance.get("PRAGMA foreign_keys = ON");

    // Initialize Schema Tables
    await dbInstance.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role TEXT DEFAULT 'user' CHECK(role IN ('user', 'admin'))
        );

        CREATE TABLE IF NOT EXISTS jobs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            company TEXT NOT NULL,
            location TEXT NOT NULL,
            description TEXT NOT NULL,
            salary INTEGER,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS applications (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            jobId INTEGER NOT NULL,
            userId INTEGER NOT NULL,
            resumeUrl TEXT,
            appliedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(jobId) REFERENCES jobs(id) ON DELETE CASCADE,
            FOREIGN KEY(userId) REFERENCES users(id) ON DELETE CASCADE
        );
    `);

    return dbInstance;
}
