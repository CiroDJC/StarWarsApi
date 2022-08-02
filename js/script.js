class Personaje {
  constructor(name, image,species,gender,height,mass) {
    this.name = name;
    this.image = image;
    this.species = species;
    this.gender = gender;
    this.height = height;
    this.mass = mass;
  }
  obtenerNombre() {
    return this.name;
  }

  obtenerFoto() {
    return this.image;
  }
  obtenerSpecies(){
    return this.species;
  }
  obtenerGender(){
    return this.gender;
  }
  obtenerHeight(){
    return this.height;
  }
  obtenerMass(){
    this.mass;
  }
}

let personajes = [];
let elemento = document.getElementById("personajes-wrapper");

function buildCharacterCard(nombre,foto) {
  return `
  <div class="column-wrapper">
        <div class="card-personaje row text-center bg-dark"> 
            <div class="col card-img text-center">
              <img class="bg-dark" src="${foto}" alt="">
            </div>
            <div class="fw-bold col card-text text-center align-self-center" >
              <p class="tpersonaje">${nombre}</p>
            </div>
            <div class="btn-modal">
              <button data-bs-toggle="modal" data-bs-target="#exampleModal" class="fw-bold btn btn-outline-light" type="button">
                Ver más...
              </button>
            </div>
        </div>
        </div>
  `

}

function modal(nombre,foto,species,gender,height,mass){
  return `
  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
        <div class="modal-background">
          <img class="img-character bg-dark" src="${foto}" alt="img-character">                  
        </div>
        </div>
        <div class="modal-body">
        <p class="fw-bold">${nombre}</p>
        <p class="fw-bold">Especie: ${species}</p>
        <p class="fw-bold">Genero: ${gender}</p>
        <p class="fw-bold">Altura: ${height} mts</p>
        <p class="fw-bold">Peso: ${mass} kg</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="fw-bold btn btn-dark" data-bs-dismiss="modal">Cerrar</button>
        </div>
      </div>
    </div>
  </div>
  `
}

async function getPersonajes() {
  let url = "https://akabab.github.io/starwars-api/api/all.json";

  const response = await fetch(url);
  const data = await response.json();
  data.forEach(datum => {
    let nuevoPersonaje = new Personaje(datum.name, datum.image,datum.species,datum.gender,datum.height,datum.mass)
    personajes.push(nuevoPersonaje);
  });

  personajes.forEach((personaje) => {

    elemento.innerHTML += buildCharacterCard(
      personaje.obtenerNombre(),
      personaje.obtenerFoto(),
    )
    elemento.innerHTML += modal(
      personaje.obtenerNombre(),
      personaje.obtenerFoto(),
      personaje.obtenerSpecies(),
      personaje.obtenerGender(),
      personaje.obtenerHeight(),
      personaje.obtenerMass(),
    )
  })
}

function reiniciarData() {
  personajes.length = 0;
  elemento.innerHTML = null;
  getPersonajes();
}

function llamarBusqueda() {
  setTimeout(() => {
    const consulta = document.getElementById("buscador").value;
    const personajesFiltrados = personajes.filter(personaje => personaje.name.toLowerCase().includes(consulta.toLowerCase()))

    if (personajesFiltrados.length > 0) {
      elemento.innerHTML = null
      personajesFiltrados.forEach((personajeFiltrado) => {
        elemento.innerHTML += buildCharacterCard(
          personajeFiltrado.obtenerNombre(),
          personajeFiltrado.obtenerFoto(),
        )
        elemento.innerHTML += modal(
          personajeFiltrado.obtenerNombre(),
          personajeFiltrado.obtenerFoto(),
          personajeFiltrado.obtenerSpecies(),
          personajeFiltrado.obtenerGender(),
          personajeFiltrado.obtenerHeight(),
          personajeFiltrado.obtenerMass(),
        )
      })
    }
  }, 500);
}

function ordenarPersonajes() {
  const selector = document.getElementById("sort").value;
  const personajesOrdenados = personajes.filter(personaje => personaje.species.includes(selector.toLowerCase()))
  if (personajesOrdenados.length > 0) {
    elemento.innerHTML = null
    personajesOrdenados.forEach((personajeOrdenado) => {
      elemento.innerHTML += buildCharacterCard(
        personajeOrdenado.obtenerNombre(),
        personajeOrdenado.obtenerFoto(),
      )
      elemento.innerHTML += modal(
        personajeOrdenado.obtenerNombre(),
        personajeOrdenado.obtenerFoto(),
        personajeOrdenado.obtenerSpecies(),
        personajeOrdenado.obtenerGender(),
        personajeOrdenado.obtenerHeight(),
        personajeOrdenado.obtenerMass(),
      )
    })
  }
}

getPersonajes();