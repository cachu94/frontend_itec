import React from 'react';
import tailwindConfig from '../../tailwind.config.js';

function VehiculoCard({ vehiculo, enGuardia, onAgregarGuardia, onQuitarGuardia, onCambiarEstado, onEliminar }) {
    const obtenerEstiloEstado = (estado) => {
        switch (estado) {
            case 'Disponible':
                return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
            case 'En Servicio':
                return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
            case 'En Mantenimiento':
                return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
            default:
                return 'bg-slate-500/10 text-slate-400 border-slate-500/30';
        }
    };

    const ejecutarCambioEstado = (nuevoEstado, requiereKm) => {
      let km = vehiculo.km_actual;
      let detalles = null;

      if (requiereKm) {
        const kmInput = prompt(`Ingrese el kilometraje actual del vehículo (actual: ${vehiculo.km_actual} KM):`);
        if (kmInput === null || kmInput.trim() === '') return;
        km = parseInt(kmInput);
        if (isNaN(km) || km < 0) {
          alert('Por favor, ingrese un número válido para el kilometraje.');
          return;
        }

        const obsInput = prompt('Ingrese observaciones adicionales (opcional):');
        if (obsInput !== null) detalles = obsInput.trim();
      } else {
        const obsInput = prompt('Asignando Unidad. Ingrese novedades (opcional):');
        if (obsInput !== null) detalles = obsInput.trim();
      }

      onCambiarEstado(vehiculo.id, nuevoEstado, km, detalles);
    }

    return (
        <article className='bg-[#1E293B] border border-slate-700/60 rounded-xl p-5 shadow-md flex flex-col justify-between hover:border-slate-500 transition-all duration-200 relative'>
            
            <button
            onClick={() => onEliminar(vehiculo.id)}
            className='absolute bottom-2 right-3 text-slate-500 hover:text-red-400 text-xs font-bold transition-colors'
            title='Dar de baja vehiculo'
            >
              ✕ Baja
            </button>

            {/* Identificación del vehículo */}
            <div>
              <div className='flex justify-between items-start mb-3'>
                  <div className='flex flex-col'>
                      <span className='text-xs font-bold text-[#C5A059] tracking-wider'>HALCÓN N° {vehiculo.halcon}</span>
                      <h3 className='text-xl font-extrabold text-white tracking-wide mt-0.5'>
                          {vehiculo.marca} <span className='font-medium text-slate-300'>{vehiculo.modelo}</span>
                      </h3>
                  </div>
                  {/* Estado del vehículo */}
                  <span className={`px-2.5 py-1 rounded-full text-xs font-black border ${obtenerEstiloEstado(vehiculo.estado)}`}>
                      {vehiculo.estado}
                  </span>
              </div>

              {/* Datos Tecnicos (Patente y Odometro) */}
              <div className='space-y-1.5 border-t border-slate-700 pt-3 text-sm text-slate-300'>
                  <p className='flex justify-between'>
                      <span className='text-slate-400'>Patente:</span>
                      <span className='font-mono font-bold tracking-wider uppercase text-slate-100'>
                          {vehiculo.patente}
                      </span>
                  </p>
                  <p className='flex justify-between'>
                      <span className='text-slate-400'>Kilometraje Actual:</span>
                      <span className='font-bold text-slate-100'>
                          {vehiculo.km_actual.toLocaleString()} KM
                      </span>
                  </p>
              </div>
            </div>

            <div className='mt-5 pt-3 border-t border-slate-700 flex flex-col space-y-2'>
              {/* Caso 1: Disponible -> En Servicio (Entrega) */}
              {vehiculo.estado === 'Disponible' && (
                <button 
                onClick={() => ejecutarCambioEstado('En Servicio', false)}
                className='w-full bg-emerald-600 hover:bg-emerald-700 text-slate-950 font-black text-xs py-2 rounded-lg tracking-wider transition-colors uppercase'>
                    Asignar Entrega
                </button>
              )}

              {/* Caso 2: En Servicio -> Disponible (Devolución) o En Mantenimiento (Taller) */}
              {vehiculo.estado === 'En Servicio' && (
                <div className='grid grid-cols-2 gap-2'>
                  <button 
                  onClick={() => ejecutarCambioEstado('Disponible', true)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black text-xs py-2 rounded-lg tracking-wider transition-colors uppercase">
                    Devolución
                  </button>
                  <button 
                  onClick={() => ejecutarCambioEstado('En Mantenimiento', true)}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-slate-950 font-black text-xs py-2 rounded-lg tracking-wider transition-colors uppercase">
                    Taller
                  </button>
                </div>
              )}

              {/* Caso 3: En Mantenimiento -> Disponible (Finalizar Mantenimiento) */}
              {vehiculo.estado === 'En Mantenimiento' && (
                <button
                  onClick={() => ejecutarCambioEstado('Disponible', true)}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-slate-950 font-black text-xs py-2 rounded-lg tracking-wider transition-colors uppercase">
                    Finalizar Mantenimiento
                </button>
              )}

              {enGuardia ? (
                <button
                onClick={() => onQuitarGuardia(vehiculo.id)}
                className='w-full bg-[#C5A059]/10 hover:bg-[#C5A059]/20 text-[#C5A059] font-bold text-xs py-1.5 rounded-lg border border-[#C5A059]/40 transition-colors'>
                  ★ Quitar de la Guardia
                </button>
              ) : (
                <button
                onClick={() => onAgregarGuardia(vehiculo)}
                className='w-full bg-slate-800 hover:bg-slate-750 text-slate-400 font-medium text-xs py-1.5 rounded-lg border border-slate-700 transition-colors mb-2'
                >
                  ☆ Seguir Unidad
                </button>
              )}
            </div>
        </article>
    );
};

export default VehiculoCard;