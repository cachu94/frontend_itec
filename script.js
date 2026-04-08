const usuarios = [{"id":1,"first_name":"Evita","last_name":"Skinn","email":"eskinn0@youtube.com","gender":"Female","ip_address":"123.150.171.46"},
{"id":2,"first_name":"Nealon","last_name":"Covet","email":"ncovet1@php.net","gender":"Male","ip_address":"107.211.28.169"},
{"id":3,"first_name":"Jethro","last_name":"Sides","email":"jsides2@scribd.com","gender":"Male","ip_address":"244.31.186.155"},
{"id":4,"first_name":"Kale","last_name":"Rydings","email":"krydings3@jimdo.com","gender":"Male","ip_address":"18.87.218.22"},
{"id":5,"first_name":"Hussein","last_name":"Davitashvili","email":"hdavitashvili4@upenn.edu","gender":"Male","ip_address":"23.124.132.61"},
{"id":6,"first_name":"Tanny","last_name":"Bathurst","email":"tbathurst5@cnbc.com","gender":"Agender","ip_address":"126.20.104.73"},
{"id":7,"first_name":"Norine","last_name":"Lee","email":"nlee6@nature.com","gender":"Female","ip_address":"207.148.141.42"},
{"id":8,"first_name":"Austin","last_name":"Kenwrick","email":"akenwrick7@berkeley.edu","gender":"Male","ip_address":"254.45.164.140"},
{"id":9,"first_name":"Ferdinande","last_name":"Critcher","email":"fcritcher8@blinklist.com","gender":"Female","ip_address":"18.39.67.211"},
{"id":10,"first_name":"Yvette","last_name":"Fernando","email":"yfernando9@unesco.org","gender":"Female","ip_address":"83.102.142.246"},
{"id":11,"first_name":"Facundo","last_name":"Giacri","email":"fgiacri.94@gmail.com","gender":"Male","ip_address":"184.247.226.215"},
{"id":12,"first_name":"Colman","last_name":"Ion","email":"cionb@amazon.co.uk","gender":"Male","ip_address":"110.62.175.113"},
{"id":13,"first_name":"Theodoric","last_name":"Nussgen","email":"tnussgenc@cdbaby.com","gender":"Male","ip_address":"46.11.128.234"},
{"id":14,"first_name":"Vincent","last_name":"Holligan","email":"vholligand@exblog.jp","gender":"Male","ip_address":"85.98.94.54"},
{"id":15,"first_name":"Sascha","last_name":"Gianolini","email":"sgianolinie@sohu.com","gender":"Female","ip_address":"244.165.90.227"},
{"id":16,"first_name":"Dayna","last_name":"Wookey","email":"dwookeyf@engadget.com","gender":"Female","ip_address":"106.69.175.95"},
{"id":17,"first_name":"Noe","last_name":"Salzberg","email":"nsalzbergg@nps.gov","gender":"Male","ip_address":"213.44.243.129"},
{"id":18,"first_name":"Janella","last_name":"Aaron","email":"jaaronh@blog.com","gender":"Genderqueer","ip_address":"137.164.152.245"},
{"id":19,"first_name":"Winne","last_name":"Jaukovic","email":"wjaukovici@wikimedia.org","gender":"Female","ip_address":"94.52.229.35"},
{"id":20,"first_name":"Had","last_name":"Whodcoat","email":"hwhodcoatj@infoseek.co.jp","gender":"Male","ip_address":"96.182.111.218"},
{"id":21,"first_name":"Gallagher","last_name":"Elias","email":"geliask@artisteer.com","gender":"Male","ip_address":"185.21.202.119"},
{"id":22,"first_name":"Claudianus","last_name":"Dibben","email":"cdibbenl@soup.io","gender":"Male","ip_address":"231.64.44.163"},
{"id":23,"first_name":"Janie","last_name":"Befroy","email":"jbefroym@amazonaws.com","gender":"Female","ip_address":"113.225.58.98"},
{"id":24,"first_name":"Domenico","last_name":"Overil","email":"doveriln@issuu.com","gender":"Male","ip_address":"146.139.46.208"},
{"id":25,"first_name":"Lesli","last_name":"Hallbord","email":"lhallbordo@soup.io","gender":"Female","ip_address":"229.97.130.64"},
{"id":26,"first_name":"Gnni","last_name":"Burdus","email":"gburdusp@chron.com","gender":"Female","ip_address":"6.204.100.161"},
{"id":27,"first_name":"Olivier","last_name":"Aysh","email":"oayshq@360.cn","gender":"Male","ip_address":"191.121.216.98"},
{"id":28,"first_name":"Lynna","last_name":"Habgood","email":"lhabgoodr@behance.net","gender":"Female","ip_address":"6.172.166.85"},
{"id":29,"first_name":"Tersina","last_name":"Tavener","email":"ttaveners@pbs.org","gender":"Female","ip_address":"211.15.202.171"},
{"id":30,"first_name":"Lianna","last_name":"Kinvig","email":"lkinvigt@ed.gov","gender":"Female","ip_address":"209.140.149.213"},
{"id":31,"first_name":"Joe","last_name":"Ellsbury","email":"jellsburyu@nasa.gov","gender":"Male","ip_address":"58.249.210.214"},
{"id":32,"first_name":"Rahel","last_name":"Dobney","email":"rdobneyv@seesaa.net","gender":"Female","ip_address":"163.238.46.21"},
{"id":33,"first_name":"Oralle","last_name":"Bunson","email":"obunsonw@engadget.com","gender":"Female","ip_address":"102.235.198.90"},
{"id":34,"first_name":"Beret","last_name":"Hazelden","email":"bhazeldenx@a8.net","gender":"Female","ip_address":"67.218.178.202"},
{"id":35,"first_name":"Miller","last_name":"Straw","email":"mstrawy@naver.com","gender":"Male","ip_address":"234.73.131.114"},
{"id":36,"first_name":"Mercie","last_name":"Lindbergh","email":"mlindberghz@mayoclinic.com","gender":"Female","ip_address":"188.133.44.203"},
{"id":37,"first_name":"Kariotta","last_name":"Still","email":"kstill10@123-reg.co.uk","gender":"Female","ip_address":"173.206.110.4"},
{"id":38,"first_name":"Jacobo","last_name":"Sweet","email":"jsweet11@cnbc.com","gender":"Male","ip_address":"147.4.32.111"},
{"id":39,"first_name":"Glori","last_name":"Jedraszczyk","email":"gjedraszczyk12@flavors.me","gender":"Female","ip_address":"228.176.199.133"},
{"id":40,"first_name":"Christabel","last_name":"Sarle","email":"csarle13@geocities.com","gender":"Female","ip_address":"249.165.123.152"},
{"id":41,"first_name":"Amberly","last_name":"Meininking","email":"ameininking14@friendfeed.com","gender":"Female","ip_address":"225.27.168.119"},
{"id":42,"first_name":"Madelene","last_name":"Borgne","email":"mborgne15@sina.com.cn","gender":"Female","ip_address":"156.74.177.108"},
{"id":43,"first_name":"Karissa","last_name":"Godmer","email":"kgodmer16@smh.com.au","gender":"Female","ip_address":"102.14.251.134"},
{"id":44,"first_name":"Rora","last_name":"Brookson","email":"rbrookson17@imageshack.us","gender":"Female","ip_address":"20.142.35.119"},
{"id":45,"first_name":"Karly","last_name":"Kenealy","email":"kkenealy18@theglobeandmail.com","gender":"Female","ip_address":"212.157.157.142"},
{"id":46,"first_name":"Bonita","last_name":"Wymer","email":"bwymer19@godaddy.com","gender":"Genderqueer","ip_address":"28.63.98.25"},
{"id":47,"first_name":"Steward","last_name":"Ellingham","email":"sellingham1a@answers.com","gender":"Male","ip_address":"69.8.174.231"},
{"id":48,"first_name":"Peggie","last_name":"Tilberry","email":"ptilberry1b@i2i.jp","gender":"Female","ip_address":"185.151.68.214"},
{"id":49,"first_name":"Daphne","last_name":"Osmund","email":"dosmund1c@google.co.uk","gender":"Female","ip_address":"38.210.162.153"},
{"id":50,"first_name":"Derron","last_name":"Prydie","email":"dprydie1d@nps.gov","gender":"Male","ip_address":"179.24.236.110"}]

// for usuario in usuarios  si usuario.id == id ----> 
// return datos de ese usuario si no encuentra a nadie mostrar usuario no encontrado

let id = Number(prompt("Ingrese su ID: "))
let usuarioEncontrado = null;
for (let usuario of usuarios) {
    if (usuario.id == id) {
        usuarioEncontrado = usuario   
    }
}

if (usuarioEncontrado == null) {
    console.log('Usuario No Econtrado')
} else {
    console.log(`Nombre: ${usuarioEncontrado.first_name}`)
    console.log(`Apellido: ${usuarioEncontrado.last_name}`)
    console.log(`Email: ${usuarioEncontrado.email}`)
    console.log(`Genero: ${usuarioEncontrado.gender}`)
    console.log(`Dirección IP: ${usuarioEncontrado.ip_address}`)
}
        

// Reducir a un nuevo array los datos de los generos de los usuarios y contar cuantos usuarios hay de cada genero

let generos = []
for (let usuario of usuarios){
    if (!generos.includes(usuario.gender)) {
        generos.push(usuario.gender)
    }
}
console.log(generos)
