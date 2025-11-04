// server.js (o index.js)

const express = require('express');
const fetch = require('node-fetch'); // Usaremos 'node-fetch' para hacer peticiones en Node.js
const cors = require('cors'); // Para permitir peticiones desde tu frontend de React

const app = express();
const port = 3001; // El puerto de tu servidor de backend

// --- ⚠️ ¡Configuración Segura de Credenciales! ⚠️ ---
// La forma más segura es usar variables de entorno (process.env.CLIENT_ID)
// ¡NUNCA las dejes codificadas directamente en el código de producción!

// Reemplaza con tus credenciales REALES
const CLIENT_ID = '25f7acc21f9e482c9da48165ff485e70';
const CLIENT_SECRET = '556721c7ad6643449166dd930b96512c';
const TOKEN_URL = 'https://accounts.spotify.com/api/token';
// ----------------------------------------------------

// Configura CORS para permitir solicitudes desde tu app React (por ejemplo, http://localhost:3000)
// **IMPORTANTE:** En producción, DEBES restringir esto solo a tu dominio.
app.use(cors({
    origin: 'http://localhost:3000' // O el puerto donde se ejecute tu app de React
}));

// Endpoint para obtener el token
app.get('/spotify-token', async (req, res) => {
    // 1. Prepara los parámetros para la solicitud a Spotify
    const bodyParams = new URLSearchParams();
    bodyParams.append('grant_type', 'client_credentials');

    // La autenticación básica es otra forma común de enviar las credenciales
    const authString = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

    try {
        // 2. Hace la solicitud POST segura a Spotify
        const response = await fetch(TOKEN_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${authString}`, // Otra forma de enviar el id/secret
            },
            body: bodyParams.toString(),
        });

        const data = await response.json();

        if (!response.ok) {
            // Maneja errores de Spotify (ej: credenciales inválidas)
            console.error('Error de Spotify:', data);
            return res.status(response.status).json({
                error: 'Fallo al obtener el token de Spotify',
                details: data
            });
        }

        // 3. Devuelve el token obtenido a la aplicación de React
        // ¡NUNCA devuelvas el client_secret! Solo el token de acceso.
        res.json(data);

    } catch (error) {
        console.error('Error en el servidor al intentar obtener el token:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Inicia el servidor
app.listen(port, () => {
    console.log(`Servidor backend corriendo en http://localhost:${port}`);
});