const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

async function connectDatabase() {
    return open({
        filename: "./jobboard.db",
        driver: sqlite3.Database
    });
}

module.exports = connectDatabase;