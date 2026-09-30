const URL_BASE = "https://api.openf1.org/v1" // Base URL de OpenF1 API


// Obtener el calendario de carreras de la temporada 2026
export const obtenerCarreras2026 = async () => {
    try {
        const responses = await fetch(`${URL_BASE}/meetings?year=2026`);
        if (!responses.ok) throw new Error("Error al obtener el calendario de carreras");
        const data = await responses.json();
        return data;
    } catch (error) {
        console.error('Error al obtener el calendario de carreras:', error);
        return null;
    }
}

// Obtener lista de pilotos de la temporada 2026
export const obtenerPilotosyEquipos = async () => {
    try {
        const responses = await fetch(`${URL_BASE}/drivers?session_key=latest`);
        if (!responses.ok) throw new Error("Error al obtener la parrilla de pilotos");
        const drivers = await responses.json();
        
        const equiposMap = {};

        drivers.forEach(driver => {
            if (!driver.team_name) return;

            const teamKey = driver.team_name.toLowerCase().replace(/\s+/g, '-');

            if (!equiposMap[teamKey]) {
                equiposMap[teamKey] = {
                    id: teamKey,
                    nombre: driver.team_name,
                    colorHex: driver.team_colour ? `#${driver.team_colour}` : '#E20600',
                    pilotos: []
                };
            }

            const yaExiste = equiposMap[teamKey].pilotos.some(p => p.driver.number === driver.driver_number);

            if (!yaExiste) {
                equiposMap[teamKey].pilotos.push({
                    numero: driver.driver_number,
                    nombreCompleto: driver.full_name || driver.broadcast_name,
                    pais: driver.country_code,
                    fotoUrl: driver.headshot_url
                });
            }
        });
        return Object.values(equiposMap);
    } catch (error) {
        console.error('Error al obtener la parrilla de pilotos:', error);
        return null;
    }
};