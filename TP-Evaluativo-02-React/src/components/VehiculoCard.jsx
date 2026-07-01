import React from 'react';
@import "tailwindcss"

function VehiculoCard({ vehiculo }) {
    const obtenerEstiloEstado = (estado) => {
        switch (estado) {
            case 'Disponible':
                return 'bg-esmerald-500/10 text-esmerald-400 border-esmerald-500/30';
            case 'En Servicio':
                return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
            case 'En Mantenimiento':
                return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
            default:
                return 'bg-slate-500/10 text-slate-400 border-slate-500/30';
        }
    };

    return (
        <article className='bg-[#1E293B] border border-slate-700/60 rounded-xl p-5 shadow-md flex flex-col justify-between hover:border-slate-500 transition-all duration-200'>
            <div className='flex justify-between items-start mb-3'>
                <div className='flex flex-col'>
                    <span className='text-xs font-bold text-[#C5A059] tracking-wider'>HALCÓN N° {vehiculo.halcon}</span>

                </div>

            </div>
        </article>
    )
};