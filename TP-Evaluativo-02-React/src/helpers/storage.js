// leemos los vehiculos guardados en el navegador
export const obtenerGuardia = () => {
  const datos = localStorage.getItem('glp_guardia');
  // Si los datos existen, los parseamos de JSON a un objeto JS y los retornamos. Si no existen, retornamos una lista vacia.
  return datos ? JSON.parse(datos) : [];
};

// Agregamos un vehiculo a "Mi Guardia"
export const agregarGuardia = (vehiculo) => {
  const guardiaActual = obtenerGuardia();
  // Validamos si el vehiculo ya existe en la guardia
  if (!guardiaActual.some((v) => v.id === vehiculo.id)) {
    guardiaActual.push(vehiculo);
    localStorage.setItem('glp_guardia', JSON.stringify(guardiaActual));
  }
  return guardiaActual;
};

// Eliminamos un vehiculo de "Mi Guardia"
export const eliminarGuardia = (id) => {
  const guardiaActual = obtenerGuardia();
  // Filtramos la lista dejando afuera el ID que queremos eliminar
  const nuevaGuardia = guardiaActual.filter((v) => v.id !== id);
  localStorage.setItem('glp_guardia', JSON.stringify(nuevaGuardia));
  return nuevaGuardia;
}
