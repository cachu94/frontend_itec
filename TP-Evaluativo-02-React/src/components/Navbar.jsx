import React from "react";
import logoGLP from '../assets/logo_glp.jpg';

function Navbar({vistaActual, setVistaActual}) {
  return (
    <header className="bg-[#0F172A] border-b-2 border-[#C5A059] p-4 sticky top-0 z-50 shadow-lg">
      <nav className="max-w-6xl mx-auto flex justify-between items-center" aria-label="Navegación principal">
        
        <div className="flex items-center space-x-4">
          <div className="bg-white p-1 rounded-lg border border-slate-700 shadow-inner">
            <img 
              src={logoGLP} 
              alt="Escudo Guardia Local Río Cuarto" 
              className="h-12 w-auto object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-wider text-white leading-tight">GUARDIA LOCAL</span>
            <span className="text-xs font-bold text-[#C5A059] tracking-widest">RÍO CUARTO</span>
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={() => setVistaActual('general')}
            className={`px-4 py-2 rounded-lg font-bold text-sm tracking-wide transition-all duration-200 ${
              vistaActual === 'general'
                ? 'bg-[#C5A059] text-slate-950 shadow-md shadow-[#C5A059]/20 font-extrabold scale-105'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Flota General
          </button>
          <button
            onClick={() => setVistaActual('guardia')}
            className={`px-4 py-2 rounded-lg font-bold text-sm tracking-wide transition-all duration-200 ${
              vistaActual === 'guardia'
                ? 'bg-[#C5A059] text-slate-950 shadow-md shadow-[#C5A059]/20 font-extrabold scale-105'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Mi Guardia
          </button>
        </div>

      </nav>
    </header>
  );
}

export default Navbar;