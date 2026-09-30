import { createContext, useContext, useEffect, useState } from "react";


export const FavoritosContext = createContext()

export const FavoritosProvider = ({ children }) => {
    const [favoritos, setFavoritos] = useState(() => {
        const guardados = localStorage.getItem('f1_favoritos');
        return guardados ? JSON.parse(guardados) : [];
    });

    useEffect(() => {
        localStorage.setItem('f1_favoritos', JSON.stringify(favoritos));
    }, [favoritos]);

    const alternarFavorito = (equipo) => {
        setFavoritos(prev => {
            const existe = prev.some(item => item.id === equipo.id);
            if (existe) {
                return prev.filter(item => item.id !== equipo.id);
            } else {
                return [...prev, equipo];
            }
        })
    };

    const esFavorito = (equipoID) => {
        return favoritos.some(item => item.id === equipoID)
    };

    return (
        <FavoritosContext.Provider value={{ favoritos, alternarFavorito, esFavorito }}>
            {children}
        </FavoritosContext.Provider>
    );
};

export const useFavoritos = () => {
    const contex = useContext(FavoritosContext);
    if (!contex) {
        throw new Error('useFavoritos debe usarse dentro de un FavoritosProvider')
    }
    return contex;
};