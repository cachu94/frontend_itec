import { Link } from "react-router-dom";


export function NotFound() {
    return (
        <div>
            <span>404</span>
            <h2>Página fuera de pista 🏎️🚨</h2>
            <p>La dirección URL consultada no corresponde a ninguna ruta válida de la aplicación.</p>
            <Link to="/home">
                🏁 Volver al Inicio
            </Link>
        </div>
    );
}