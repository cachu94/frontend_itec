import { useOutletContext } from "react-router-dom";


export function TeamOverview() {
    const equipo = useOutletContext();

    return (
        <div>
            <h3>
                Especificaciones de Escudería
            </h3>

            <div>
                <div>
                    <p>Nombre Oficial</p>
                    <p>{equipo.nombre}</p>
                </div>

                <div>
                    <p>Color Institucional</p>
                    <div>
                        <span style={{ background: equipo.colorHex }}/>
                        <span>{equipo.colorHex}</span>
                    </div>
                </div>

                <div>
                    <p>Total de Pilotos</p>
                    <p>{equipo.pilotos.length} Activos</p>
                </div>
            </div>
        </div>
    );
}