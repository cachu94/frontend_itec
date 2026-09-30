import { useEffect, useState } from "react";
import { obtenerPilotosyEquipos } from "../services/f1Apis";
import { TeamCard } from "../components/TeamCard"


export function TeamList() {
    const [equipos, setEquipos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cargarEquipos = async () => {
            try {
                setCargando(true);
                setError(null);
                const data = await obtenerPilotosyEquipos();
                setEquipos(data);
            } catch (err) {
                console.error(err);
                setError('No se pudo cargar la parrilla de escuderías.')
            } finally {
                setCargando(false);
            }
        };
        cargarEquipos();
    }, []);

    if (cargando) {
        return (
            <div>
                <span>🏎️</span>
                <p>Cargando escuderías de la Temporada 2026...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <p>⚠️ Error de conexión</p>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div>
            <header>
                <div>
                    Parilla Oficial
                </div>
                <h2>
                    Escuderías F1 2026
                </h2>
                <p>
                    Explora los equipos del mundial, consulta sus pilotos y guarda tus preferidos.
                </p>
            </header>

            {equipos.length === 0 ? (
                <div>
                    No se encontraron escuderías registradas.
                </div>
            ) : (
                <div>
                    {equipos.map((equipo) => (
                        <TeamCard key={equipo.id} equipo={equipo} />
                    ))}
                </div>
            )}
        </div>
    );
}