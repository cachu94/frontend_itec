const homeBtn = document.getElementById("homeBtn");
const profileBtn = document.getElementById("profileBtn");
const input = document.getElementById("busquedaInput");
const buscarBtn = document.getElementById("buscarBtn");
const contenedor = document.getElementById("albumsContainer");

const DISCOGS_TOKEN = 'TVysyskeJLHLCBNKQWIkVGDJWFhMaUWGhIIHtRak';
const BASE_URL = 'https://api.discogs.com/database/search';

buscarBtn.addEventListener("click", () => {
    const query = input.value.trim();
    if (!query) return alert('Escribí un artista o álbum para buscar.');
    buscarAlbums(query);
});

async function buscarAlbums(query) {
    contenedor.innerHTML = '<p class="text-gray-500 text-center w-full">Cargando ...</p>';
    try {
        const url = `${BASE_URL}?q=${query}&type=release&per_page=20&token=${DISCOGS_TOKEN}`; // Construir la URL con los parámetros de búsqueda y el token de autenticación
        const res = await fetch(url); // await para esperar la respuesta de la API y fetch para hacer la solicitud HTTP
        if (!res.ok) throw new Error('Error en la busqueda');
        const data = await res.json(); // await para esperar la conversión de la respuesta a JSON
        renderAlbums(data.results); // Llamar a la función para renderizar los álbumes con los resultados obtenidos
    } catch (err) {
        contenedor.innerHTML = `<p class="text-red-600 text-center">${err.message}</p>`;
    }
};

// Renderizar los álbumes obtenidos de la API
function renderAlbums(albums) {
    contenedor.innerHTML = ''; // Limpiar el contenedor antes de renderizar los nuevos resultados
    if (!albums.length) {
        contenedor.innerHTML = '<p class="text-gray-500 text-center w-full">No se encontraron álbumes.</p>';
        return;
    }

    albums.forEach(album => {
        const card = document.createElement('div');
        card.className = 'bg-white p-4 rounded shadow text-center hover:shadow-lg transition';

        const portada = album.cover_image;
        const titulo = album.title || 'Sin Título';
        const id = album.id;

        card.innerHTML = `
        <img src="${portada}" alt="${titulo}" class="w-full h-60 object-cover rounded-md mb-3">
        <h3 class="font-bold text-gray-800 mb-2">${titulo}</h3>
        <div class="flex justify-center gap-1 mb-2" data-id="${id}">
            ${crearEstrellasHTML(id)}
        </div>
        `;

        contenedor.appendChild(card);
    });

    agregarEventosEstrellas();
}

// Crear estrellas
function crearEstrellasHTML(id) {
    const puntuacion = obtenerPuntuacion(id); // Obtener la puntuación actual del álbum
    let html = '';
    for (let i = 1; i <= 5; i++) {
        const filled = i <= puntuacion ? 'text-yellow-400' : 'text-gray-300';
        html += `<span class="estrella cursor-pointer text-2xl ${filled}" data-rating="${i}">&#9733;</span>`;
    }
    return html;
}

// agregar estrellas
function agregarEventosEstrellas() {
    const estrellas = document.querySelectorAll('.estrella');
    estrellas.forEach(e => {
        e.addEventListener('click', () => {
            const id = e.parentElement.dataset.id; // Obtener el ID del álbum desde el contenedor de las estrellas
            const rating = Number(e.dataset.rating);
            guardarPuntuacion(id, rating); // Guardar la puntuación en localStorage
            e.parentElement.innerHTML = crearEstrellasHTML(id); // Actualizar las estrellas para reflejar la nueva puntuación
            agregarEventosEstrellas(); // Volver a agregar los eventos a las nuevas estrellas renderizadas
        });
    });
}

// Helpers localStorage
function guardarPuntuacion(id, rating) {
    const ratings = JSON.parse(localStorage.getItem('ratings') || '{}');
    ratings[id] = rating;
    localStorage.setItem('ratings', JSON.stringify(ratings));
}

function obtenerPuntuacion(id) {
    const ratings = JSON.parse(localStorage.getItem('ratings') || '{}');
    return ratings[id] || 0;
}

// PROFILE
profileBtn.addEventListener("click", async () => {
    const ratings = JSON.parse(localStorage.getItem('ratings') || '{}');
    const ids = Object.keys(ratings);
    if (ids.length === 0) {
        contenedor.innerHTML = '<p class="text-gray-500 text-center w-full">No has puntuado ningún álbum.</p>';
        return;
    }

    contenedor.innerHTML = '<p class="text-gray-500 text-center w-full">Cargando tus álbumes puntuados...</p>';

    try {
        const detallesPromises = ids.map(id => 
            fetch(`${BASE_URL}?release_id=${id}&token=${DISCOGS_TOKEN}`).then(r => r.json()));
        const detalles = await Promise.all(detallesPromises);
        const albums = detalles.flatMap(d => d.results || []); // Aplanar los resultados para obtener un array de álbumes
        renderAlbums(albums);
    } catch (err) {
        contenedor.innerHTML = `<p class="text-red-600 text-center">${err.message}</p>`;
    }
});

// HOME
homeBtn.addEventListener("click", async () => {
    async function buscarAlbumsAlAzar() {
        contenedor.innerHTML = '<p class="text-gray-500 text-center w-full">Cargando álbumes...</p>';
        try {
            const randomPage = Math.floor(Math.random() * 100) + 1; // Obtener una página aleatoria para variar los resultados
            const url = `${BASE_URL}?type=release&page=${randomPage}&per_page=12&token=${DISCOGS_TOKEN}`;
            const res = await fetch(url);
            if (!res.ok) throw new Error('Error al cargar álbumes');
            const data = await res.json();
            renderAlbums(data.results);
        } catch (err) {
            contenedor.innerHTML = `<p class="text-red-600 text-center">${err.message}</p>`;
        }
    }

    buscarAlbumsAlAzar();
});

