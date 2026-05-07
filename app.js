const botonHome = document.getElementById('homeBtn');
const botonMiPerfil = document.getElementById('perfilBtn');
const buscador = document.getElementById('buscadorInput');
const botonBuscar = document.getElementById('buscadorBtn');
const contenedorAlbums = document.getElementById('contenedoralbums');
let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

const DISCOGS_TOKEN = 'TVysyskeJLHLCBNKQWIkVGDJWFhMaUWGhIIHtRak';
const BASE_URL = 'https://api.discogs.com';
const URL_SEARCH = `${BASE_URL}/database/search`;
const URL_MASTER = `${BASE_URL}/masters`;

// Al hacer click en el botón de búsqueda, se obtiene el valor del input y se inicia la búsqueda
botonBuscar.addEventListener('click', () => {
    const query = buscador.value.trim();
    if (!query) return alert('Por favor, ingresa un artista o álbum.');
    buscarAlbums(query);
    });

// Si la busqueda se realiza, se muestra un mensaje de "Buscando..." mientras se obtienen los datos de la API. Luego, se transforman los datos para mostrar solo lo necesario (id, master_id, título y portada) y se renderizan las tarjetas de álbumes en el contenedor correspondiente. Al hacer click en el botón "Ver Detalles" de cada tarjeta, se obtiene información adicional del álbum (géneros, estilos, año y tracklist) y se muestra debajo de la tarjeta. Si ocurre algún error durante la búsqueda o al obtener detalles, se muestra un mensaje de error en el contenedor.
async function buscarAlbums(query) {
    contenedorAlbums.innerHTML = '<p>Buscando...</p>'
    try {
        const url = `${URL_SEARCH}?q=${query}&type=master&per_page=20&token=${DISCOGS_TOKEN}`;
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
        const esFav = favoritos.some(fav => fav.master_id === album.master_id);
        const colorInicial = esFav ? 'text-red-500' : 'text-gray-500'


        const card = document.createElement('article');
        card.className = "card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 p-4 flex flex-col items-center text-center";

        const imagen = album.portada || album.cover_image
        const titulo = album.titulo || album.title
        const masterId = album.master_id

        card.innerHTML = `
        <img src="${imagen}" class="w-full h-48 object-cover rounded-md mb-4 shadow-sm">
        <h2 class="text-lg font-bold text-slate-800 mb-2 h-14 overflow-hidden">${titulo}</h2>
        <div class="flex gap-2 w-full justify-center mt-auto">
            <button class="detallesBtn bg-slate-700 text-white px-3 py-1 rounded-full text-sm hover:bg-slate-900 transition-colors">Ver Detalles</button>
            <button class="botonFav text-2xl ${colorInicial}">&#x2665;</button>
        </div>
        <div class="info-extra" id="extra-${masterId}" style="display: none;"></div>
        `;

        // Evento Favoritos
        const btnFav = card.querySelector(".botonFav");
        btnFav.addEventListener('click', () => {
            toggleFavorito(album, btnFav);
        });

        // Evento de Detalles
        const btnDetalles = card.querySelector('.detallesBtn');

        btnDetalles.addEventListener('click', async () => {
            const extraDiv = document.getElementById(`extra-${masterId}`);
            if (extraDiv.style.display === 'block') {
                extraDiv.style.display = 'none';
                return    
            }
            
            extraDiv.innerHTML = '<p>Cargando ...</p>';
            extraDiv.style.display = 'block';

            const detalle = await obtenerDetallesMaster(masterId);
            if (detalle) {
                const cancionesHTML = detalle.tracklist.map(t => `<li class="mt-2">${t.position} - ${t.title} (${t.duration})</li>`).join('');
                extraDiv.innerHTML = `
                <p><strong>Géneros:</strong> ${detalle.generos}</p>
                <p><strong>Estilos:</strong> ${detalle.estilos}</p>
                <p><strong>Año:</strong> ${detalle.año}</p>
                <ul class="mt-4">${cancionesHTML}</ul>
                `;
            }
        });
        contenedorAlbums.appendChild(card);
    });

}

function toggleFavorito(album, btn) {
    const index = favoritos.findIndex(fav => fav.master_id === album.master_id);

    if (index > -1) {
        favoritos.splice(index, 1);
        btn.classList.replace('text-red-500', 'text-gray-500');
    } else {
        favoritos.push(album);
        btn.classList.replace('text-gray-500', 'text-red-500');
    }

    localStorage.setItem('favoritos', JSON.stringify(favoritos));
}


// PERFIL
botonMiPerfil.addEventListener('click', () => {
    renderizarAlbums(favoritos);
});

botonHome.addEventListener("click", async () => {
    async function buscarAlbumsAlAzar() {
        contenedorAlbums.innerHTML = '<p class="text-slate-500 text-center w-full">Cargando álbumes...</p>';
        try {
            const randomPage = Math.floor(Math.random() * 100) + 1; // Obtener una página aleatoria para variar los resultados
            const url = `${URL_SEARCH}?&type=master&page=${randomPage}&per_page=20&token=${DISCOGS_TOKEN}`;
            const res = await fetch(url);
            if (!res.ok) throw new Error('Error al cargar álbumes');
            const data = await res.json();
            renderizarAlbums(data.results);
        } catch (err) {
            contenedorAlbums.innerHTML = `<p class="text-red-600 text-center">${err.message}</p>`;
        }
    }

    buscarAlbumsAlAzar();
});