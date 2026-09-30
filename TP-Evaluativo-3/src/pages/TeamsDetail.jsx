import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import { useFavoritos } from "../context/FavoritosContext";
import { obtenerPilotosyEquipos } from "../services/f1Apis";


export function TeamDetail() {
    const { id } = useParams();
    const [equipo, setEquipo] = useState(null);
    const [cargando, setCargando] = useState(true);
    const { esFavorito, alternarFavorito } = useFavoritos()

    useEffect(() => {
        const cargarDetalle = async () => {
            try {
                setCargando(true);
                const equipos = await obtenerPilotosyEquipos();
                const encontrado = equipos.find(e => e.id == id);
                setEquipo(encontrado || null);
            } catch (err) {
                console.error(err);
            } finally {
                setCargando(false);
            }
        };
        cargarDetalle();
    }, [id])

    if (cargando) {
        return (
            <div>
                <span>🏎️</span>
                <p>Cargando ficha de la escudería...</p>
            </div>
        );
    }

    if (!equipo) {
        return (
            <div>
                <h3>Escudería no encontrada</h3>
                <p>
                    El identificador "{id}" no corresponde a ninguna escudería registrada.
                </p>
                <Link to="/equipos">
                    Volver a Escuderías
                </Link>
            </div>
        );
    }

    const favorito = esFavorito(equipo.id);

    const tabStyle = ({ isActive }) => 
        `px-4 py-2 rounded-lg text-sm font-bold transition-all ${
            isActive
            ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
            : 'text-slate-400 hover:bg-slate-800 hover:text-white'
        }`;

    return (
        <div>
            <Link to="/equipos">
                ← Volver al Catálogo de Escuderías
            </Link>

            <div>
                <div>
                    <div>
                        <span>
                            Detalle Oficial F1 2026
                        </span>
                        <h2>
                            {equipo.nombre}
                        </h2>
                    </div>

                    <button>
                        {favorito ? '⭐ Favorito Guardado' : '☆ Agregar a Favoritos'}
                    </button>
                </div>

                <div>
                    <NavLink to={`/equipos/${id}`}>
                        📊 Ficha General
                    </NavLink>
                    <NavLink to={`/equipos/${id}/pilotos`}>
                        🏎️ Pilotos ({equipo.pilotos.length})
                    </NavLink>
                </div>
            </div>

            <Outlet context={equipo} />
        </div>
    );
}