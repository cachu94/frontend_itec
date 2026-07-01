import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import VehiculoCard from './components/VehiculoCard';
import AltaVehiculo from './components/AltaVehiculo';
import { obtenerGuardia, agregarGuardia, eliminarGuardia } from './helpers/storage';

function App() {
  const [vistaActual, setVistaActual] = useState('general');
  const [vehiculos, setVehiculos] = useState([]);
  const [error, setError] = useState(null);
  const [guardia, setGuardia] = useState(obtenerGuardia());
  const [isAltaAbierto, setIsAltaAbierto] = useState(false);

  const [idBusqueda, setIdBusqueda] = useState('');
  const [filtradoPorId, setFiltradoPorId] = useState(false);
  

  // Conectamos con la API para obtener los datos de los vehículos
  const API_URL = "http://127.0.0.1:8000/vehiculos";


  // READ GET GENERAL
  const obtenerVehiculos = async () => {
    try {
      setError(null);
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`Error al conectarse al servidor`);
      }
      const datos = await response.json();
      setVehiculos(datos);
      setFiltradoPorId(false);
      setIdBusqueda('');
    } catch (error) {
      console.error('Error al obtener los vehículos:', error);
      setError("No se pudo conectar con el servidor de la Guardia Local");
    }
  };

  // READ GET BY ID
  const buscarVehiculoPorId = async (e) => {
    e.preventDefault();
    if (!idBusqueda.trim()) return;
    try {
      setError(null);
      const response = await fetch(`${API_URL}/${parseInt(idBusqueda)}`);
      if (!response.ok) {
        throw new Error(`Error al buscar el vehículo con ID ${idBusqueda}`);
      }
      const datos = await response.json();
      setVehiculos([datos]);
      setFiltradoPorId(true);
    } catch (error) {
      console.error('Error al buscar el vehículo:', error);
      setError("No se pudo encontrar el vehículo con el ID proporcionado");
    }
  };

  // UPDATE (PUT - Cambiar estado del vehículo)
  const actualizarEstadoVehiculo = async (id, nuevoEstado, kmActual, detalles) => {
    const datosUpdate = {
      estado: nuevoEstado,
      km_actual: kmActual,
      detalles: detalles
    };
    try {
      const putResponse = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {"content-type": "application/json"},
        body: JSON.stringify(datosUpdate),
      });

      if (!putResponse.ok) {
        const errorData = await putResponse.json();
        console.error('Error al actualizar el estado del vehículo:', errorData);
        throw new Error(errorData.detail || 'Error al actualizar el estado del vehículo');
      }

      const guardiaActual = obtenerGuardia();
      const guardiaActualizada = guardiaActual.map(v => {
        if (v.id === id) {
          return { ...v, estado: nuevoEstado, km_actual: kmActual, detalles: detalles };
        }
        return v;
      });

      localStorage.setItem('guardia', JSON.stringify(guardiaActualizada));
      setGuardia(guardiaActualizada);

      if (filtradoPorId) {
        const response = await fetch(`${API_URL}/${id}`);
        const datos = await response.json();
        setVehiculos([datos]);
      } else {
        obtenerVehiculos();
      }
    } catch (error) {
      console.error('Error al actualizar el estado del vehículo:', error);
      alert(`Operación rechazada: ${error.message}`);
    }
  };

  // DELETE (DELETE - Eliminar vehículo)
  const eliminarVehiculo = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        eliminarGuardia(id);
        setGuardia(obtenerGuardia());
        obtenerVehiculos();
      }
    } catch (error) {
      console.error('Error al eliminar el vehículo:', error);
      setError("No se pudo eliminar el vehículo");
    }
  };

  const controlarAgregarGuardia = (vehiculo) => {
    const nuevaLista = agregarGuardia(vehiculo);
    setGuardia(nuevaLista);
  };
  const controlarEliminarGuardia = (id) => {
    const nuevaLista = eliminarGuardia(id);
    setGuardia(nuevaLista);
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
            <div className='flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4'>
              <div>
                <h2 id='titulo-general' className='text-2xl font-bold text-slate-200 mb-4'>
                  Estado Actual de la Flota
                </h2>
                <p className='text-slate-400 text-sm'>Monitoreo en tiempo real de móviles GLP</p>
              </div>

              <form onSubmit={buscarVehiculoPorId} className='flex gap-2 bg-slate-900 border border-slate-700/60 p-1.5 rounded-xl'>
                <input
                  type='number'
                  required
                  min="1"
                  placeholder='Buscar por ID...'
                  value={idBusqueda}
                  onChange={e => setIdBusqueda(e.target.value)}
                  className='bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#C5A059] w-32 font-medium'
                  />
                <button
                  type='submit'
                  className='bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-200 font-bold text-xs px-3 py-1.5 rounded-lg transition-colors uppercase tracking-wider'>
                  Buscar
                </button>
              
              {filtradoPorId && (
                <button
                  type='button'
                  onClick={obtenerVehiculos}
                  className='bg-red-950/40 text-red-400 hover:bg-red-900/20 border border-red-500/30 font-bold text-xs px-2 py-1.5 rounded-lg transition-colors'>
                  ✕ Limpiar
                </button>
              )}
              </form>

              <button 
              onClick={() => setIsAltaAbierto(true)}
              className='bg-[#c5a059] hover:bg-[#b08e4f] text-slate-950 font-black text-xs px-4 py-2.5 rounded-lg uppercase tracking-wider transition-colors shadow-md'>
                + Alta de Vehículo
              </button>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {vehiculos.length > 0 ? (
                vehiculos.map((v) => (
                  <VehiculoCard key={v.id} vehiculo={v} 
                  enGuardia={guardia.some(g => g.id === v.id)}
                  onAgregarGuardia={controlarAgregarGuardia}
                  onQuitarGuardia={controlarEliminarGuardia}
                  onCambiarEstado={actualizarEstadoVehiculo}
                  onEliminar={eliminarVehiculo}
                  />
                ))
              ) : (
                <p className='text-slate-400 col-span-full text-center py-8'>
                  Cargando Unidades desde el servidor de la GLP...
                </p>
              )}
            </div>
          </section>
        ) : (
          <section aria-labelledby='titulo-guardia'>
            <div className='mb-6'>
              <h2 id='titulo-guardia' className='text-2xl font-bold text-slate-200 mb-4'>
                Vehículos en Mi Guardia (Seguimiento)
              </h2>
              <p className='text-slate-400 text-sm'>Móviles en seguimiento prioritario</p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {guardia.length > 0 ? (
                guardia.map((v) => (
                  <VehiculoCard key={v.id} 
                  vehiculo={v} 
                  enGuardia={true}
                  onQuitarGuardia={controlarEliminarGuardia}
                  onCambiarEstado={actualizarEstadoVehiculo}
                  onEliminar={eliminarVehiculo}
                  />
                ))
              ) : (
                <div className='col-span-full border border-dashed border-slate-700 bg-slate-900/20 p-12 rounded-xl text-center'>
                  <p className='text-slate-500 font-medium'>
                    No hay vehículos bajo seguimiento en "Mi Guardia".
                  </p>
                  <button onClick={() => setVistaActual('general')}
                    className='mt-3 text-xs font-bold text-[#C5A059] hover:underline uppercase tracking-wider'
                    >
                    Ir a la Flota General para agregar
                  </button>
                </div>
              )}
            </div>
          </section>
        )
        }
      </main>

      <AltaVehiculo
      isOpen={isAltaAbierto}
      onClose={() => setIsAltaAbierto(false)}
      onAltaSuccess={obtenerVehiculos}
      />


      <footer className="bg-slate-850 border-t border-slate-800 p-4 text-center text-sm text-slate-500">
        <p>&copy; 2026 - Sistema de Gestión Operativa GLP</p>
      </footer>
    </div>
  )
};

export default App
