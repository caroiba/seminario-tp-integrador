const { Sequelize } = require('sequelize');
require('dotenv').config();

const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 2000;

let retries = 0;

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT || 'mysql',
        logging: false,
    }
);

async function conectarConRetry() {
    while (retries < MAX_RETRIES) {
        try {
            await sequelize.authenticate();
            console.log('✅ Conectado a la base de datos MySQL.');
            return sequelize;
        } catch (error) {
            retries++;
            console.error(`❌ Error conectando a MySQL (intento ${retries}):`, error.message);
            console.log(`⏳ Reintentando en ${RETRY_DELAY_MS / 1000} segundos...`);
            await new Promise(r => setTimeout(r, RETRY_DELAY_MS));
        }
    }
    throw new Error('No se pudo conectar a MySQL después de varios intentos.');
}

module.exports = { sequelize, conectarConRetry };
