# frontend_itec

Tarea: Funciones y Operadores Aritméticos
Objetivo:
Hacer un programa en JavaScript que trabaje con un array de usuarios generado con Mockaroo.
Generen un archivo JSON con 50 registros que incluya al menos estos campos:
{
  "id": 1,
  "first_name": "Juan",
  "last_name": "Pérez",
  "bank": "BANK OF AMERICA",
  "city": "New York",
  "country": "United States",
  "salary": 3500,
  "expenses": 2200
}
Pueden dejar el resto de valores por defecto.
1) Función de balance mensual
Crear una función que reciba un usuario por prompt y devuelva:
nombre completo
banco
ahorro mensual (salary - expenses)
Ejemplo de salida:
{
  nombre: "Juan Pérez",
  banco: "BANK OF AMERICA",
  ahorro: 1300
}
2) Clasificación financiera (usar switch o ternario)
Crear una función que clasifique a cada usuario según su ahorro mensual:
ahorro menor a 500 → "Ahorro bajo"
entre 500 y 1500 → "Ahorro medio"
mayor a 1500 → "Ahorro alto"
3) Cantidad de ahorro por banco
Agrupar los usuarios por banco y:
Mostrar:
nombre del banco
cuántos usuarios tiene cada banco
ahorro total de cada banco
Ejemplo:
  {
    bank: "BANK OF AMERICA",
    cantidadUsuarios: 12,
    ahorroTotal: 11760
  }

4) País con mejor ahorro
Agrupar a los usuarios por país y:
Mostrar:
nombre del país
cantidad de usuarios de ese país
ahorro total de cada país
Ejemplo:
[
  {
    country: "Germany",
    cantidadUsuarios: 9,
    ahorroTotal: 15760
  }
]
Requisitos obligatorios
No se permite hacer todo el código suelto sin funciones. 
Evitar repetir lógica, si dos puntos hacen algo similar, deben reutilizar funciones o crear una función general
