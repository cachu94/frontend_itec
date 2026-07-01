import React, { useState } from 'react';
import Navbar from './components/Navbar';

function App() {
  const [vistaActual, setVistaActual] = useState('general');

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white flex flex-col">
      {/*Encabezado y Navegación*/}
      <Navbar vistaActual={vistaActual} setVistaActual={setVistaActual} />

      {/*Contenido principal*/}
      <main className="flex-grow max-w-6xl w-full mx-auto p-4">
        {vistaActual === 'general' ? (
          <section aria-labelledby='titulo-general'>
            <h2 id='titulo-general' className='text-2xl font-bold text-slate-200 mb-4'>
              Estado Actual de la Flota
            </h2>
            <p className='text-slate-400'>Aqui se consumira la API mediante el GET general.</p>
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
