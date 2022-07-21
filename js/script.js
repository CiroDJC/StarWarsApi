async function getPersonajes () {
  let url = "https://akabab.github.io/starwars-api/api/all.json";
  let elemento = document.getElementById("app");

  const data = await fetch(url);
  let personajes = await data.json();

  console.log(personajes);
}

getPersonajes();
