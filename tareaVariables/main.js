function ingreso() {
  let nombre = prompt("Indica tu nombre:");
  
  if (nombre === "") {
    console.log("Error: El nombre no puede estar vacío.")
    return
  }
  
  let edad = Number(prompt("Indica tu edad:"))
  if (edad < 18) {
    console.log("ACCESO DENEGADO: Eres menor de Edad")
    return
  }
  
  let password = prompt("Contraseña:")
  if (password.length < 6) {
    console.log("Contraseña Inválida")
    return
  }

  edad += 10
  console.log(`¡BIENVENIDO ${nombre}!`)
  console.log(`Usuario: ${nombre}`)
  console.log(`Edad en 10 años: ${edad} años`)
  console.log(`Clave: ${password}!`)
}

ingreso()