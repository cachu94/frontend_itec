import { useOutletContext } from "react-router-dom";


export function TeamDrivers() {
    const equipo = useOutletContext();

    return (
        <div>
            <h3>Alineación Oficial</h3>
            {equipo.pilotos.length === 0 ? (
                <p>No hay información disponible</p>
            ) : (
                <div>
                    {equipo.pilotos.map((piloto) => (
                        <div>
                            {piloto.fotoUrl ? (
                                <img
                                src={piloto.fotoUrl}
                                alt={piloto.nombreCompleto}
                                />
                            ) : (
                                <div>
                                    🏎️
                                </div>
                            )}

                            <div>
                                <span>
                                    DORSAL #{piloto.numero}
                                </span>
                                <h4>
                                    {piloto.nombreCompleto}
                                </h4>
                                <p>
                                    Nacionalidad: <span>{piloto.pais || 'N/A'}</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
