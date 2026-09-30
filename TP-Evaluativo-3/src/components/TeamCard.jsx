import { Link } from "react-router-dom";
import { useFavoritos } from "../context/FavoritosContext";


export function TeamCard({ equipo }) {
    const { esFavorito, alternarFavorito } = useFavoritos();
    const favorito = esFavorito(equipo.id);

    return (
        <article>
            <div>
                <div>
                    <div>
                        <span>
                            Escudería F1 2026
                        </span>
                        <h3>
                            {equipo.nombre}
                        </h3>
                    </div>

                    <button>
                        {favorito ? '⭐' : '☆'}
                    </button>
                </div>

                <div>
                    <p>
                        Alineación de Pilotos
                    </p>
                    <div>
                        {equipo.pilotos.length > 0 ? (
                            equipo.pilotos.map((p) => (
                                <div>
                                    <span>
                                        {p.nombreCompleto}
                                    </span>
                                    <span>
                                        #{p.numero}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <p>Pilotos por confirmar</p>
                        )}
                    </div>
                </div>
            </div>

            <div>
                <Link
                to={`/equipos/${equipo.id}`}>
                    🔍 Ver Detalle de Escudería
                </Link>
            </div>
        </article>
    );
}