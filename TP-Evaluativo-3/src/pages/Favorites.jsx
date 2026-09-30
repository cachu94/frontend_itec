import { TeamCard } from "../components/TeamCard";
import { useFavoritos } from "../context/FavoritosContext";



export function Favorites() {
    const { favoritos } = useFavoritos();

    return (
        <div>
            <header>
                <div>
                    Persistencia Local Storage
                </div>
                <h2>
                    Mis Escuderias Favoritas ⭐
                </h2>
                <p>
                    Equipos guardados en el estado global para seguimiento rápido.
                </p>
            </header>

            {favoritos.length === 0 ? (
                <div>
                    <p>Aún no has guardado ninguna escudería en favoritos.</p>
                    <p>Explora el catálogo y presiona la estrella (⭐) en cualquier tarjeta.</p>
                </div>
            ) : (
                <div>
                    {favoritos.map((equipo) => (
                        <TeamCard key={equipo.id} equipo={equipo}/>
                    ))}
                </div>
            )}
        </div>
    );
}