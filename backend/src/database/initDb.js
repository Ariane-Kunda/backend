const fs = require("fs");
const connectDatabase = require("./db");

async function initializeDatabase() {

    const db = await connectDatabase();

    const schema = fs.readFileSync(
        "./src/database/schema.sql",
        "utf8"
    );

    await db.exec(schema);

    console.log("Database initialized successfully");

    await db.close();
}

initializeDatabase();