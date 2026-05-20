const botonHome = document.getElementById('homeBtn');
const botonMiPerfil = document.getElementById('perfilBtn');
const buscador = document.getElementById('buscadorInput');
const botonBuscar = document.getElementById('buscadorBtn');
const contenedorAlbums = document.getElementById('contenedoralbums');
const appState ={
    vista: 'albums', // album | detalle | perfil
    albumsActuales: [],
    albumSeleccionado: null,
    favoritos: JSON.parse(localStorage.getItem('favoritos')) || [],
    origenDetalle: 'albums'
};

const DISCOGS_TOKEN = 'TVysyskeJLHLCBNKQWIkVGDJWFhMaUWGhIIHtRak';
const BASE_URL = 'https://api.discogs.com';
const URL_SEARCH = `${BASE_URL}/database/search`;
const URL_MASTER = `${BASE_URL}/masters`;

function normalizarAlbum(album) {
    return {
        id: album.id,
        master_id: album.master_id || album.id,
        titulo: album.titulo || album.title || 'Sin titulo',
        portada: album.portada || album.cover_image || ''
    };
}

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
        const albumsLimpios = data.results.map(normalizarAlbum);
        appState.vista = 'albums';
        appState.albumsActuales = albumsLimpios;
        history.pushState({vista: 'albums'}, '');
        renderizarVistaAlbums(appState.albumsActuales, 'Resultados de búsqueda');

        console.log("Datos Transformados:", albumsLimpios);
        renderizarVistaAlbums(albumsLimpios);
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

function renderizarVistaAlbums(albums, titulo = 'Álbumes') {
    contenedorAlbums.innerHTML = `
        <div class="col-span-full mb-2>"
            <h2 class="text-2xl font-bold text-slate-700">${titulo}</h2>
        </div>
    `;

    albums.forEach(album => {
        const esFav = appState.favoritos.some(fav => fav.master_id === album.master_id);
        const colorInicial = esFav ? 'text-red-500' : 'text-gray-500'


        const card = document.createElement('article');
        card.className = "bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 p-4 flex flex-col";

        card.innerHTML = `
        <img src="${album.portada}" class="w-full h-56 object-cover rounded-md mb-4 shadow-sm" alt="${album.titulo}">
        <h3 class="text-lg font-bold text-slate-800 mb-3 min-h-[56px]">${album.titulo}</h3>
        <div class="flex gap-2 w-full justify-between mt-auto">
            <button class="detallesBtn bg-slate-700 text-white px-3 py-2 rounded-lg text-sm hover:bg-slate-900 transition-colors">Ver Detalles</button>
            <button class="botonFav text-2xl ${colorInicial}" aria-label="Favorito">&#x2665;</button>
        </div>
        `;

        // Evento Favoritos
        const btnFav = card.querySelector(".botonFav");
        btnFav.addEventListener('click', () => toggleFavorito(album, btnFav));

        // Evento de Detalles
        const btnDetalles = card.querySelector('.detallesBtn');

        btnDetalles.addEventListener('click', () => abrirDetalle(album));
        contenedorAlbums.appendChild(card);
    });
}

async function abrirDetalle(album) {
    appState.origenDetalle = appState.vista;
    appState.albumSeleccionado = album;
    appState.vista = 'detalle';
    history.pushState({vista: 'detalle', masterID: album.master_id}, '');
    await cargarYRenderizarDetalle(album);
}

async function cargarYRenderizarDetalle(album) {
    contenedorAlbums.innerHTML = '<p class="text-slate-500 text-center col-span-full">Cargando detalles...</p>';
    const detalle = await obtenerDetallesMaster(album.master_id);
    if (!detalle) return;
    renderizarVistaDetalle(album, detalle);
}

function renderizarVistaDetalle(album, detalle) {
    const cancionesHTML = (detalle.tracklist || []).map(
        t => `<li class="py-2 border-b border-slate-200">${t.position || '-'} - ${t.title || 'Sin título'} (${t.duration || '--:--'})</li>`
    ).join('');

    contenedorAlbums.className = 'p-4 max-w-5xl mx-auto';
    contenedorAlbums.innerHTML = `
        <article class="bg-white rounded-2xl shadow-lg p-6>
            <button id="volverBtn" class="mb-4 bg-slate-200 hover:bg-slate-300 text-slate-800 px-4 py-2 rounded-lg">Volver atras</button>
            <div class="grid md:grid-cols-2 gap-6">
                <img src="${album.portada}" alt="${album.titulo}" class="w-full h-80 object-cover rounded-xl">
                <div>
                    <h2 class="text-3xl font-bold mb-4">${album.titulo}</h2>
                    <p><strong>Géneros:</strong> ${detalle.generos}</p>
                    <p><strong>Estilos:</strong> ${detalle.estilos}</p>
                    <p><strong>Año:</strong> ${detalle.año}</p>
                </div>
            </div>
            <section class="mt-6">
                <h3 class="text-xl font-semibold mb-3">Canciones:</h3>
                <ul>${cancionesHTML}</ul>
            </section>
        </article>
    `;
    
    document.getElementById('volverBtn').addEventListener('click', () => history.back());
}


function toggleFavorito(album, btn) {
    const index = appState.favoritos.findIndex(fav => fav.master_id === album.master_id);

    if (index > -1) {
        appState.favoritos.splice(index, 1);
        btn.classList.replace('text-red-500', 'text-gray-500');
    } else {
        appState.favoritos.push(album);
        btn.classList.replace('text-gray-500', 'text-red-500');
    }

    localStorage.setItem('favoritos', JSON.stringify(appState.favoritos));
}

async function buscarAlbumsAlAzar() {
    contenedorAlbums.innerHTML = '<p class="text-slate-500 text-center w-full">Cargando álbumes...</p>';
    try {
        const randomPage = Math.floor(Math.random() * 100) + 1; // Obtener una página aleatoria para variar los resultados
        const url = `${URL_SEARCH}?&type=master&page=${randomPage}&per_page=20&token=${DISCOGS_TOKEN}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Error al cargar álbumes');
        const data = await res.json();
        
        appState.albumsActuales = data.results.map(normalizarAlbum);
        appState.vista = 'albums';
        history.pushState({vista: 'albums'}, '');
        renderizarVistaAlbums(appState.albumsActuales);
    } catch (err) {
        contenedorAlbums.innerHTML = `<p class="text-red-600 text-center">${err.message}</p>`;
    }
}

// PERFIL
botonMiPerfil.addEventListener('click', () => {
    appState.vista = 'perfil';
    history.pushState({vista: 'perfil'}, '');
    renderizarVistaAlbums(appState.favoritos, 'Mis Favoritos');
});

botonHome.addEventListener("click", () => {
    contenedorAlbums.className = 'p-4 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6';
    buscarAlbumsAlAzar();
});

window.addEventListener('popstate', async (event) => {
    const vista = event.state?.vista;

    if (vista === 'detalle' && appState.albumSeleccionado) {
        await cargarYRenderizarDetalle(appState.albumSeleccionado);
        appState.vista = 'detalle';
    return;
    }

    if (vista === 'perfil') {
        appState.vista = 'perfil';
        contenedorAlbums.className = 'p-4 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6';
        renderizarVistaAlbums(appState.favoritos, 'Mis favoritos');
        return;
    }

    appState.vista = 'albums';
    contenedorAlbums.className = 'p-4 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6';
    renderizarVistaAlbums(appState.albumsActuales, 'Discografía');
    });

buscarAlbumsAlAzar();