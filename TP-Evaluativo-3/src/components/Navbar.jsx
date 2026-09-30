import { NavLink } from "react-router-dom";
import { useFavoritos } from "../context/FavoritosContext";


export function Navbar(){
    const { favoritos } = useFavoritos();

    const linkStyles = ({ isActive }) =>
        `flex item-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 ${isActive
            ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
            : 'text-slate-300 hover:bg-slate-800 hover:text-white'
        }`;

        return (
            <header>
                <div>

                    <div>
                        <span>F1</span>
                        <div>
                            <h1>TEMPORADA <span>2026</span></h1>
                            <p>Control de Escuderías & Carreras</p>
                        </div>
                    </div>

                    <nav>
                        <NavLink to="/home" className={linkStyles}>
                            🏁 Inicio (Carreras)
                        </NavLink>
            
                        <NavLink to="/equipos" className={linkStyles}>
                            🏎️ Escuderias
                        </NavLink>
            
                        <NavLink to="/favoritos" className={linkStyles}>
                            ⭐ Favoritos
                            {favoritos.length > 0 && (
                                <span>
                                    {favoritos.length}
                                </span>
                            )}
                        </NavLink>
                    </nav>
                </div>
            </header>
        )
}