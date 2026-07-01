import React, { useState } from 'react';
import tailwindConfig from '../../tailwind.config.js';
import { parse } from 'postcss';

function AltaVehiculo({ isOpen, onClose, onAltaSuccess }) {
    const [patente, setPatente] = useState('');
    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [halcon, setHalcon] = useState('');
    const [kmActual, setKmActual] = useState('');

    if (!isOpen) return null;

    const enviarFormulario = async (e) => {
        e.preventDefault();
        const nuevoVehiculo = {
            patente: patente.toUpperCase().trim(),
            marca: marca.trim(),
            modelo: modelo.trim(),
            halcon: parseInt(halcon),
            km_actual: parseInt(kmActual),
            estado: 'Disponible',
            km_inicio_servicio_o_mantenimiento: 0
        };

        try {
            const response = await fetch('http://localhost:8000/vehiculos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevoVehiculo),
            });

            if (!response.ok) {
                throw new Error('Error al agregar el vehículo');
            }

            onAltaSuccess(nuevoVehiculo);
            onClose();
            setHalcon('');
            setPatente('');
            setMarca('');
            setModelo('');
            setKmActual('');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
            <div className='bg-[#1E293B] border border-slate-700 rounded-xl max-w-md w-full p-6 shadow-2xl animate-fade-in' role="dialog" aria-modal="true">
                <div className='flex justify-between items-center mb-4 border-b border-slate-700 pb-2'>
                    <h3 className="text-lg font-black text-white tracking-wide">NUEVA UNIDAD OPERATIVA</h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-white font-bold text-sm">✕</button>
                </div>

                <form onSubmit={enviarFormulario} className='space-y-4'>
                    <div>
                        <label htmlFor='halcon' className='block text-xs font-bold text-[#C5A059] tracking-wider mb-1'>NÚMERO DE HALCÓN</label>
                        <input
                            type='number'
                            required
                            value={halcon}
                            onChange={e => setHalcon(e.target.value)}
                            className='w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-[#C5A059]'
                            placeholder='Ej: 14'
                        />
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <label className='block text-xs font-bold text-[#C5A059] tracking-wider mb-1'>PATENTE</label>
                            <input
                            type='text'
                            required
                            value={patente}
                            onChange={e => setPatente(e.target.value)}
                            className='w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-[#C5A059]'
                            placeholder='Ej: ABC123'
                            />
                        </div>
                        <div>
                            <label  className='block text-xs font-bold text-[#C5A059] tracking-wider mb-1 font-sans'>KM INICIAL</label>
                            <input
                                type='number'
                                required
                                value={kmActual}
                                onChange={e => setKmActual(e.target.value)}
                                className='w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-[#C5A059]'
                                placeholder='Ej: 0'
                            />
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <label className='block text-xs font-bold text-[#C5A059] tracking-wider mb-1'>MARCA</label>
                            <input
                                type='text'
                                required
                                value={marca}
                                onChange={e => setMarca(e.target.value)}
                                className='w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-[#C5A059]'
                                placeholder='Ej: Toyota'
                            />
                        </div>
                    </div>
                    <div>
                        <label className='block text-xs font-bold text-[#C5A059] tracking-wider mb-1'>MODELO</label>
                        <input
                            type='text'
                            required
                            value={modelo}
                            onChange={e => setModelo(e.target.value)}
                            className='w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-[#C5A059]'
                            placeholder='Ej: Corolla'
                        />
                    </div>

                    <div className='pt-4 border-t border-slate-700 flex space-x-3 justify-end text-xs uppercase tracking-wider font-bold'>
                        <button type='button' onClick={onClose} className='px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-750 transition-colors'>Cancelar</button>
                        <button type='submit' className='px-4 py-2 rounded-lg bg-[#C5A059] text-slate-950 font-black hover:bg-[#b08e4f] transition-colors shadow-md'>Agregar Vehículo</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AltaVehiculo;
