import React, { useState } from 'react';

export default function GetSpotifyToken() {
    const [tokenInfo, setTokenInfo] = useState<any | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // La URL de tu endpoint de servidor backend.
    // Asegúrate de que tu servidor Node.js esté corriendo en este puerto.
    const backendUrl = 'http://localhost:3001/spotify-token';

    const getSpotifyToken = async () => {
        setLoading(true);
        setError(null);
        setTokenInfo(null);

        try {
            // 1. La app de React hace una petición a TU servidor backend, no a Spotify.
            const response = await fetch(backendUrl);

            if (!response.ok) {
                // Intenta parsear la respuesta de error del backend si no fue un 2xx
                let errorDetails = `Error HTTP: ${response.status} ${response.statusText}`;
                try {
                    const data = await response.json();
                    errorDetails = data.error || data.details || errorDetails;
                } catch (e) {
                    // No se pudo parsear como JSON, usa el error HTTP
                }

                throw new Error(errorDetails);
            }

            // 2. Si la respuesta es exitosa (200 OK), contiene el token de Spotify
            const data = await response.json();

            // Verificamos que contenga la clave esperada (access_token)
            if (data.access_token) {
                setTokenInfo(data);
                console.log('Token obtenido de forma segura (a través del backend):', data);
            } else {
                throw new Error('El backend no devolvió el access_token.');
            }

        } catch (err) {
            console.error('Falló la solicitud al backend:', err);
            const message = err instanceof Error ? err.message : String(err);
            setError(
                `Error al obtener el token. Mensaje: ${message}. ` +
                '(Revisa si tu servidor backend está corriendo en el puerto 3001).'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white p-8 font-sans">
            <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-xl">
                <h1 className="text-3xl font-bold text-center text-green-500 mb-6">
                    Spotify Auth
                </h1>
                <p className="text-center text-green-300 bg-green-900 p-3 rounded-md mb-6 border border-green-500">
                    <strong>¡Seguro!</strong> La clave secreta ahora está oculta en tu servidor backend.
                    El frontend solo llama al endpoint <code>{backendUrl}</code>.
                </p>

                <button
                    onClick={getSpotifyToken}
                    disabled={loading}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out disabled:bg-gray-500"
                >
                    {loading ? 'Llamando al Backend...' : 'Obtener Token de Spotify (Seguro)'}
                </button>

                {error && (
                    <div className="mt-6 p-4 bg-red-900 text-red-300 border border-red-700 rounded-lg">
                        <h3 className="font-bold mb-2">Error de Conexión:</h3>
                        <p className="text-sm">{error}</p>
                    </div>
                )}

                {tokenInfo && (
                    <div className="mt-6 p-4 bg-blue-900 text-blue-200 border border-blue-700 rounded-lg">
                        <h3 className="font-bold mb-2">¡Token Recibido!</h3>
                        <p className="text-sm mb-2">
                            Ya puedes usar <code>{tokenInfo.access_token.substring(0, 20)}...</code> para hacer llamadas al API de Spotify.
                        </p>
                        <pre className="text-xs overflow-x-auto bg-gray-900 p-2 rounded">
                            {JSON.stringify(tokenInfo, null, 2)}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
}