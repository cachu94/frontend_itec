import { useEffect, useState } from "react";
import { obtenerCarreras2026 } from "../services/f1Apis";


export function Home(){
    const [carreras, setCarreras] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const cargarCalendario = async () => {

            try {
                setCargando(true);
                setError(null);
                const data = await obtenerCarreras2026();
                setCarreras(data);
            } catch (err) {
                console.error(err);
                setError('No se pudo obtener el calendario de la API OpenF1.')
            } finally {
                setCargando(false);
            }
        };
        cargarCalendario();
    }, []);

    if (cargando) {
        return (
            <div>
                <span>🏎️💨</span>
                <p>Sincronizando el Calendario F1 2026...</p>
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
                    Campeonato Mundial
                </div>
                <h2>Calendario de Grandes Premios 2026 🏁</h2>
                <p>Cronograma oficial de fechas y circuitos obtenido en tiempo real desde OpenF1.</p>
            </header>

            {carreras.length === 0 ? (
                <div>
                    No hay carreras disponibles para mostar en este momento
                </div>
            ) : (
                <div>
                    {carreras.map((carrera) => {
                        const fecha = carrera.date_start
                        ? new Date(carrera.date_start).toLocaleDateString('es-AR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                        })
                        : 'Fecha a Confirmar';

                        return (
                            <article>
                                <div>
                                    <div>
                                        <span>
                                            📍 {carrera.country_name || 'Sede'}
                                        </span>
                                        <span>
                                            Fecha #{carrera.meeting_key || '1'}
                                        </span>
                                    </div>

                                    <h3>
                                        {carrera.meeting_name}
                                    </h3>
                                    <p>
                                        {carrera.circuit_short_name || carrera.location}
                                    </p>
                                </div>

                                <div>
                                    <span>📅 {fecha}</span>
                                    <span>2026</span>
                                </div>
                            </article>
                        );
                    })}
                </div>
            )}
        </div>
    );
}