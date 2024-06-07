const { Client } = require("pg");
const dotenv = require("dotenv");
const path = require("path");
const { createRecord, readAllRecords } = require("./Query");

const envPath = path.resolve(__dirname, "../../../.env");

// Charger les variables d'environnement à partir du fichier .env
const result = dotenv.config({ path: envPath });
if (result.error) {
  console.error("Erreur de configuration dotenv:", result.error);
  process.exit(1);
}

/**
 * Create the client
 * @class
 */
const client = new Client({
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  port: process.env.POSTGRES_PORT,
});

/**
 * Connect to the database
 */
async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connecté à la base de données");
    // Vous pouvez effectuer des requêtes ici
  } catch (err) {
    console.error("Erreur de connexion:", err.stack);
    process.exit(1);
  }
}

connectToDatabase();

module.exports = client;
