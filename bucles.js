const frutas = [
    {nombre: "Manzana", color: "Rojo"},
    {nombre: "Banana", color: "Amarillo"},
    {nombre: "Uva", color: "Morado"},
    {nombre: "Limón", color: "Amarillo"},
    {nombre:"Frutilla", color: "Rojo"},
    {nombre: "Cereza", color: "Rojo"},
    {nombre: "Durazno", color: "Naranja"},
    {nombre: "Naranja", color: "Naranja"},
    {nombre: "Pera", color: "Verde"}
];

// Bucle for
// for (let i = 0; i < frutas.length; i++) {
//     console.log(`fruta: ${frutas[i].nombre}`);
// }

// Bucle while
// let i = 0;
// while (i < frutas.length) {
//     console.log(`fruta: ${frutas[i].nombre}`);
//     i++;
// }

// Bucle do while: se ejecuta al menos una vez, aunque la condición sea falsa
// 
// let i = 4; 
// do {
//     console.log(`fruta: ${frutas[i].nombre}`);
//     i++;
// } while (i < frutas.length);

// for of: significa "para cada elemento de", es una forma más sencilla de recorrer arrays
// for (let fruta of frutas) {
//     console.log(`Fruta: ${fruta.nombre}`);
// }

// for in: significa "para cada propiedad de", se usa para recorrer objetos
// for (let index in frutas) {
//     console.log(`Fruta: ${frutas[index].nombre}, indice: ${index}`);
// }

// forEach y map
//forEach: ejecuta una función para cada elemento del array, no devuelve nada
// frutas.forEach((fruta, index) => {
//     console.log(`Fruta: ${fruta.nombre}, indice: ${index}`);
// });

// map: ejecuta una función para cada elemento del array, 
// devuelve un nuevo array con los resultados
// const frutasMapeadas = frutas.map(fruta => {
//     fruta.nombre = fruta.nombre.toUpperCase();
//     return fruta;
// });

// console.log(frutasMapeadas);

// filter y reduce
// filter: devuelve un nuevo array con los elementos que cumplen una condición
const frutasFiltradas = frutas.filter(fruta => fruta.color === "Amarillo");
console.log(frutasFiltradas);

// reduce: devuelve un único valor a partir de un array, 
// se puede usar para sumar, multiplicar, etc. los elementos de un array
// const conteoPorColor = frutas.reduce((acum, fruta) => {
//     let color = fruta.color;
// if (acum[color]) {
//         acum[color]++;
//     } else {
//         acum[color] = 1;
//     }
//     return acum;
// }, {});

// console.log(conteoPorColor);