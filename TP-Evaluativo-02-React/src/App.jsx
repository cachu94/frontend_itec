import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';

function App() {
  const [vistaActual, setVistaActual] = useState('general');
  const [vehiculos, setVehiculos] = useState([]);
  const [error, setError] = useState(null);

  // Conectamos con la API para obtener los datos de los vehículos
  const API_URL = "https://127.0.0.1:8000/vehiculos";

  const obtenerVehiculos = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`Error al conectarse al servidor`);
      }
      const datos = await response.json();
      setVehiculos(datos);
    } catch (error) {
      console.error('Error al obtener los vehículos:', error);
      setError("No se pudo conectar con el servidor de la Guardia Local");
    }
  };

  useEffect(() => {
    obtenerVehiculos();
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white flex flex-col">
      {/*Encabezado y Navegación*/}
      <Navbar vistaActual={vistaActual} setVistaActual={setVistaActual} />

      {/*Contenido principal*/}
      <main className="flex-grow max-w-6xl w-full mx-auto p-4">
        {error && (
          <div className="bg-red-950/40 border border-red-500 text-red-200 p-4 rounded-lg mb-6 text-sm font-semibold" role="alert">
            ⚠️ {error} (Verifique que el backend de la Guardia Local esté activo y funcionando correctamente)
          </div>
        )}
        {vistaActual === 'general' ? (
          <section aria-labelledby='titulo-general'>
            <h2 id='titulo-general' className='text-2xl font-bold text-slate-200 mb-4'>
              Estado Actual de la Flota
            </h2>
            <div className='bg-slate-900 border border-slate-800 p-4 rounded-lg'>
              <span className='text-xs font-bold text-[#C5A059] tracking-widest block mb-2'>
                DATOS EN VIVO DESDE LA API ({vehiculos.length} unidades encontradas):
              </span>
              <pre className='text-xs text-shadow-emerald-400 overflow-x-auto font-mono'>
                {vehiculos.length > 0 ? JSON.stringify(vehiculos, null, 2) : 'Cargando datos...'}
              </pre>
            </div>
          </section>
        ) : (
          <section aria-labelledby='titulo-guardia'>
            <h2 id='titulo-guardia' className='text-2xl font-bold text-slate-200 mb-4'>
              Vehículos en Mi Guardia (Seguimiento)
            </h2>
            <p className='text-slate-400'>Aquí se mostrarán los datos guardados en LocalStorage.</p>
          </section>
        )
        }
      </main>
      <footer className="bg-slate-850 border-t border-slate-800 p-4 text-center text-sm text-slate-500">
        <p>&copy; 2026 - Sistema de Gestión Operativa GLP</p>
      </footer>
    </div>
  )
};

export default App
