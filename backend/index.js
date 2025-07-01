require('dotenv').config();
const express = require('express');
const redis = require('redis');

const productoController = require('./controllers/productoController');
const productoModel = require('./models/producto');
const { conectarConRetry } = require('./config/database');

async function iniciarServidor() {
    try {
        const sequelize = await conectarConRetry();

        const models = {
            Producto: productoModel(sequelize),
        };

        await sequelize.sync();

        const app = express();
        app.use(express.json());

        // Middleware para pasar modelos y Redis client
        app.use(async (req, res, next) => {
            req.context = { models, redisClient };
            next();
        });

        // Conectar Redis
        const redisClient = redis.createClient({
            url: `redis://${process.env.REDIS_HOST || 'localhost'}:6379`,
        });

        redisClient.on('error', (err) => {
            console.error('❌ Error en Redis:', err);
        });

        await redisClient.connect();
        console.log('✅ Conectado a Redis');

        // Pasar redisClient a middleware después que conecte
        app.use((req, res, next) => {
            req.context.redisClient = redisClient;
            next();
        });

        // Rutas productos usando controlador
        app.get('/productos', productoController.getProductos);
        app.get('/productos/:id', productoController.getProductoById);
        app.post('/productos', productoController.createProducto);
        app.put('/productos/:id', productoController.updateProducto);
        app.delete('/productos/:id', productoController.deleteProducto);

        app.listen(3000, () => {
            console.log('🚀 Servidor corriendo en http://localhost:3000');
        });

    } catch (error) {
        console.error('No se pudo iniciar el servidor:', error);
    }
}

iniciarServidor();
