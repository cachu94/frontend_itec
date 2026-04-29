const home = document.getElementById('homeBtn');
const perfil = document.getElementById('perfilBtn');
const buscador = document.getElementById('buscadorInput');
const buscarBtn = document.getElementById('buscadorBtn');
const contenedorAlbums = document.getElementById('contenedoralbums');

const DISCOGS_TOKEN = 'TVysyskeJLHLCBNKQWIkVGDJWFhMaUWGhIIHtRak';
const BASE_URL = 'https://api.discogs.com';
const URL_SEARCH = `${BASE_URL}/database/search`;
const URL_MASTER = `${BASE_URL}/masters`;

buscarBtn.addEventListener('click', () => {
    const query = buscador.value.trim();
    if (!query) return alert('Por favor, ingresa un artista o álbum.');
    buscarAlbums(query);
    });

async function buscarAlbums(query) {
    contenedorAlbums.innerHTML = '<p>Buscando...</p>'
    try {
        const url = `${URL_SEARCH}?q=${query}&type=master&per_page=10&token=${DISCOGS_TOKEN}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Error en la busqueda ...');
        const data = await res.json();
        
        // TRANSFORMAMOS DATOS PARA MOSTRAR SOLO LO NECESARIO
        const albumsLimpios = data.results.map(album => ({
            id: album.id,
            master_id: album.master_id || album.id,
            titulo: album.title,
            portada: album.cover_image,
            
        }));

        console.log("Datos Transformados:", albumsLimpios);
        renderizarAlbums(albumsLimpios);
    } catch (error) {
        contenedorAlbums.innerHTML = `<p>${error.message}</p>`};
}

async function obtenerDetallesMaster(masterId) {
    try {
        const url = `${URL_MASTER}/${masterId}?token=${DISCOGS_TOKEN}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Error al obtener detalles del álbum.');
        const data = await res.json();
        return {
            generos: data.genres ? data.genres.join(', ') : 'Desconocido',
            estilos: data.styles ? data.styles.join(', ') : 'Desconocido',
            año: data.year || 'Desconocido',
            tracklist: data.tracklist
        };} catch (error) {
            contenedorAlbums.innerHTML = `<p>${error.message}</p>`;
            console.error("Error detallado:", error);
            return null;
         }
    }

function renderizarAlbums(albums) {
    contenedorAlbums.innerHTML = '';

    albums.forEach(album => {
        const card = document.createElement('article');
        card.classList.add('card-album');

        card.innerHTML = `
        <img src="${album.portada}" alt="${album.titulo}">
        <h2>${album.titulo}</h2>
        <button class="detallesBtn" data-id="${album.master_id}">Ver Detalles</button>
        <button class="favBtn" data-id="${album.id}">&#x2665</button>
        <div class="info-extra" id="extra-${album.master_id}" style="display: none;"></div>
        `;

        card.querySelector('.detallesBtn').addEventListener('click', async (e) => {
            const extraDiv = document.getElementById(`extra-${album.master_id}`);
            if (extraDiv.innerHTML !== "") {
                extraDiv.style.display = extraDiv.style.display === 'none' ? 'block' : 'none';
                return;
            }

            const detalle = await obtenerDetallesMaster(album.master_id);
            if (detalle) {
                const cancionesHTML = detalle.tracklist.map(t => `<li>${t.position} - ${t.title} (${t.duration})</li>`).join('');
                extraDiv.innerHTML = `
                <p>Géneros: ${detalle.generos}</p>
                <p>Estilos: ${detalle.estilos}</p>
                <p>Año: ${detalle.año}</p>
                <ul>${cancionesHTML}</ul>
                `;
            }
        });
        contenedorAlbums.appendChild(card);
    });

}