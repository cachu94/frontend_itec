const usuarios = [{"id":1,"first_name":"Bernie","last_name":"Assiter","bank":"Bank Ochrony Środowiska S.A.","city":"Quilino","country":"Argentina","salary":5130.68,"expenses":337.71},
{"id":2,"first_name":"Brande","last_name":"Rabbage","bank":"Raiffeisenbank Region Baden eGen","city":"Guji","country":"China","salary":12861.51,"expenses":8596.44},
{"id":3,"first_name":"Augustus","last_name":"Jagiela","bank":"FIRST BANK","city":"Kapenguria","country":"Kenya","salary":1636.25,"expenses":6097.27},
{"id":4,"first_name":"Sunny","last_name":"Kilborn","bank":"FIRST NATIONAL BANK","city":"Spanish Town","country":"Jamaica","salary":6860.76,"expenses":6146.42},
{"id":5,"first_name":"Colan","last_name":"Darlison","bank":"UNITED COMMUNITY BANK","city":"Khao Khitchakut","country":"Thailand","salary":18666.94,"expenses":6092.84},
{"id":6,"first_name":"Melodie","last_name":"Oulner","bank":"Kreissparkasse Märkisch-Oderland","city":"Kachia","country":"Nigeria","salary":13468.27,"expenses":14402.88},
{"id":7,"first_name":"Kaylil","last_name":"Vanelli","bank":"IBERIABANK","city":"Pasatan","country":"Indonesia","salary":17928.05,"expenses":18569.23},
{"id":8,"first_name":"Kalie","last_name":"Moncey","bank":"FARMERS STATE BANK","city":"Šenkovec","country":"Croatia","salary":3955.1,"expenses":5744.95},
{"id":9,"first_name":"Peta","last_name":"Docket","bank":"CASSA RAIFFEISEN ALTA PUSTERIA SOCIETA' COOPERATIVA (IN LINGUA TEDESCA RAIFFEISENKASSE HOCHPUSTERTAL GENOSSENSCHAFT)","city":"Balaklava","country":"Ukraine","salary":16139.48,"expenses":13592.41},
{"id":10,"first_name":"Leyla","last_name":"Mullender","bank":"BANCA DI CREDITO COOPERATIVO BRIANZA E LAGHI - SOCIETA' COOPERATIVA","city":"Kazanskaya","country":"Russia","salary":8802.55,"expenses":15435.2},
{"id":11,"first_name":"Vannie","last_name":"Rooze","bank":"UNION BANK & TRUST","city":"Suwatu","country":"Indonesia","salary":10657.31,"expenses":13433.72},
{"id":12,"first_name":"Leonie","last_name":"Malone","bank":"FARMERS STATE BANK","city":"Lembursawah","country":"Indonesia","salary":4020.71,"expenses":16317.37},
{"id":13,"first_name":"Friederike","last_name":"Rudland","bank":"BNP Paribas","city":"Erjiegou","country":"China","salary":4824.18,"expenses":16272.65},
{"id":14,"first_name":"Carney","last_name":"Gaffon","bank":"Sparkasse Wetzlar","city":"Xinqiao","country":"China","salary":8180.89,"expenses":398.98},
{"id":15,"first_name":"Rose","last_name":"Simonou","bank":"BANK OF AMERICA","city":"Barwałd Średni","country":"Poland","salary":5891.93,"expenses":276.66},
{"id":16,"first_name":"Desmond","last_name":"Everit","bank":"Banque Pouyanne","city":"Kubangsari","country":"Indonesia","salary":16982.68,"expenses":14787.7},
{"id":17,"first_name":"Kerwin","last_name":"Davidson","bank":"Sparkasse Minden-Lübbecke Zweckverbandssparkasse des Kreises Minden-Lübbecke und der Städte Minden und Petershagen","city":"Arrap’i","country":"Armenia","salary":19401.77,"expenses":12294.2},
{"id":18,"first_name":"Tracie","last_name":"Blodget","bank":"Sparkasse Zollernalb","city":"Karlskoga","country":"Sweden","salary":10508.21,"expenses":14214.01},
{"id":19,"first_name":"Willis","last_name":"Janovsky","bank":"COMMERCE BANK","city":"Cañas","country":"Costa Rica","salary":6700.67,"expenses":6935.19},
{"id":20,"first_name":"Vinita","last_name":"Scobbie","bank":"FIRST BANK","city":"Hujiaying","country":"China","salary":6389.59,"expenses":14152.44},
{"id":21,"first_name":"Gerard","last_name":"Exrol","bank":"FIRST NATIONAL BANK","city":"Shuixi","country":"China","salary":11392.94,"expenses":13923.28},
{"id":22,"first_name":"Lynn","last_name":"L' Estrange","bank":"BANCO BPM SOCIETA' PER AZIONI","city":"Haghartsin","country":"Armenia","salary":4971.32,"expenses":19298.61},
{"id":23,"first_name":"Cris","last_name":"Tuddall","bank":"FIRST TENNESSEE BANK","city":"Pan-an","country":"Philippines","salary":7852.81,"expenses":7324.88},
{"id":24,"first_name":"Royal","last_name":"Raffeorty","bank":"Sparkasse Gummersbach","city":"Xianghua","country":"China","salary":2399.91,"expenses":16698.56},
{"id":25,"first_name":"Tandi","last_name":"Cozens","bank":"Crédit Agricole S.A.","city":"Lyon","country":"France","salary":4066.59,"expenses":4776.28},
{"id":26,"first_name":"Morly","last_name":"Eles","bank":"LIBERTY BANK","city":"Saint-Nazaire","country":"France","salary":15006.89,"expenses":10830.39},
{"id":27,"first_name":"Yolanda","last_name":"Terzo","bank":"PNC BANK","city":"Kabul","country":"Afghanistan","salary":1651.29,"expenses":14566.32},
{"id":28,"first_name":"Eustacia","last_name":"Padberry","bank":"ClearBank Europe N.V.","city":"Hostouň","country":"Czech Republic","salary":16979.47,"expenses":6340.03},
{"id":29,"first_name":"Karine","last_name":"Allmark","bank":"Süd-West-Kreditbank Finanzierung GmbH","city":"Pustomyty","country":"Ukraine","salary":5196.04,"expenses":15194.41},
{"id":30,"first_name":"Cherilynn","last_name":"Flaune","bank":"CITIZENS BANK","city":"Si Thep","country":"Thailand","salary":8890.12,"expenses":4867.59},
{"id":31,"first_name":"Jobi","last_name":"Dicks","bank":"BNP Paribas Fortis","city":"Yanqi","country":"China","salary":4982.47,"expenses":18206.3},
{"id":32,"first_name":"Garvy","last_name":"Desport","bank":"BANCO BPM SOCIETA' PER AZIONI","city":"Mosoc Llacta","country":"Peru","salary":8205.1,"expenses":19048.27},
{"id":33,"first_name":"Amelita","last_name":"McIllroy","bank":"Salzburger Sparkasse Bank Aktiengesellschaft","city":"San Antonio","country":"Mexico","salary":4951.0,"expenses":8983.02},
{"id":34,"first_name":"Wye","last_name":"Fairall","bank":"BANCA MACERATA S.P.A. (IN FORMA ABBREVIATA BPRM S.P.A.)","city":"Binagadi","country":"Azerbaijan","salary":3157.13,"expenses":7804.86},
{"id":35,"first_name":"Janifer","last_name":"Storror","bank":"PINNACLE BANK","city":"Alibago","country":"Philippines","salary":8973.94,"expenses":3990.73},
{"id":36,"first_name":"Carmine","last_name":"Lidgey","bank":"Raiffeisenbank Eberndorf registrierte Genossenschaft mit beschränkter Haftung","city":"Medveditskiy","country":"Russia","salary":3883.47,"expenses":13795.29},
{"id":37,"first_name":"Ophelia","last_name":"Wakeham","bank":"Core Credit Union Limited","city":"Cové","country":"Benin","salary":18648.16,"expenses":12472.23},
{"id":38,"first_name":"Verne","last_name":"Truran","bank":"CAPITAL ONE","city":"Liudong","country":"China","salary":12211.95,"expenses":5951.25},
{"id":39,"first_name":"Aggie","last_name":"Brounsell","bank":"Vereinigte Volksbank eG Saarlouis - Losheim am See - Sulzbach/Saar","city":"Bernardo Larroudé","country":"Argentina","salary":9770.02,"expenses":9387.76},
{"id":40,"first_name":"Alika","last_name":"Monier","bank":"Caisse régionale de crédit agricole mutuel Normandie-Seine","city":"Saint-Étienne","country":"France","salary":3505.17,"expenses":15043.25},
{"id":41,"first_name":"Merci","last_name":"McGorman","bank":"FIRST TENNESSEE BANK","city":"Feričanci","country":"Croatia","salary":18945.47,"expenses":10185.76},
{"id":42,"first_name":"Fedora","last_name":"Giorgetti","bank":"Carlow District Credit Union Limited","city":"Qiaotou","country":"China","salary":1809.73,"expenses":12732.92},
{"id":43,"first_name":"Zondra","last_name":"Haps","bank":"SECURITY BANK","city":"Potikosin","country":"Indonesia","salary":2853.44,"expenses":19432.14},
{"id":44,"first_name":"Leola","last_name":"Minear","bank":"Bank11 für Privatkunden und Handel GmbH","city":"Chahe","country":"China","salary":16491.04,"expenses":438.63},
{"id":45,"first_name":"Cammi","last_name":"Pilpovic","bank":"Dunboyne and District Credit Union Limited","city":"Srostki","country":"Russia","salary":6073.74,"expenses":18319.18},
{"id":46,"first_name":"Darci","last_name":"Blenkiron","bank":"FIRST FINANCIAL BANK","city":"Krasnotur’insk","country":"Russia","salary":12342.41,"expenses":10658.84},
{"id":47,"first_name":"Lyell","last_name":"Abeau","bank":"FIFTH THIRD BANK","city":"Masoli","country":"Philippines","salary":18857.28,"expenses":15441.66},
{"id":48,"first_name":"Erick","last_name":"Moen","bank":"BANK OF NORTH CAROLINA","city":"Kindersley","country":"Canada","salary":8159.72,"expenses":9690.34},
{"id":49,"first_name":"Kimberly","last_name":"Piniur","bank":"BRANCH BANKING & TRUST COMPANY","city":"Shuangjing","country":"China","salary":16765.69,"expenses":13739.6},
{"id":50,"first_name":"Carey","last_name":"Anthiftle","bank":"Sparkasse Vogtland","city":"Baishi","country":"China","salary":15220.5,"expenses":4179.32}]

function ahorro(usuario){
  let ahorro = usuario.salary - usuario.expenses
  return ahorro
}

function balanceMensual(id, usuarios){
  let usuarioEncontrado = null
  for (let usuario of usuarios) {
    if (usuario.id === Number(id)){
      usuarioEncontrado = usuario
    }
  }

  if (!usuarioEncontrado) {
    console.log(`No existe usuario con el ID: ${id}`)
  } else {
    resultado = {
      Nombre: `${usuarioEncontrado.last_name} ${usuarioEncontrado.first_name}`,
      Banco: usuarioEncontrado.bank,
      Ahorro: ahorro(usuarioEncontrado)
    }
    return resultado
  }

}

function clasificacionFinanciera(usuarios){
  const estadofinanciero = usuarios.map(usuario => {
    const ahorroMensual = ahorro(usuario)
    let tipo_ahorro = ahorroMensual < 500 ? "Ahorro Bajo" : ahorroMensual < 1500 ? "Ahorro Medio" : "Ahorro Alto"

    usuario = {
      "Nombre": `${usuario.last_name} ${usuario.first_name}`,
      "Clas Financiera": tipo_ahorro,
      "Ahorro": ahorroMensual
    }
    return usuario
  })

  return estadofinanciero
}

function ahorroPor(usuarios, unir_por){
  const resumenPorAtributo = usuarios.reduce((acum, usuario) => {
    const grupo = usuario[unir_por]

    if (!acum[grupo]){
      acum[grupo] = {
        [unir_por]: grupo,
        cantidadUsuarios: 0,
        ahorroTotal: 0
      };
    };

    const ahorroMensual = ahorro(usuario)
    acum[grupo].cantidadUsuarios += 1;
    acum[grupo].ahorroTotal += ahorroMensual;

    return acum

  }, {})

  return Object.values(resumenPorAtributo)
}

let id = Number(prompt("Ingrese ID de Usuario: "))
console.log(balanceMensual(id, usuarios))

console.log(clasificacionFinanciera(usuarios))
console.log(ahorroPor(usuarios, "bank"))
console.log(ahorroPor(usuarios, "country"))