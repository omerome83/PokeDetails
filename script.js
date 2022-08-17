"use strict";

const container = document.querySelector(".pokemon-container");
const pokemonID = document.querySelector(".pokemon-card__id");
const pokemonName = document.querySelector(".pokemon-card__name");
const pokemonImage = document.querySelector(".pokemon-card__image");
const pokemonHP = document.querySelector(".pokemon-card__hp");

let pokemonCount = 905;

const fetchPokemon = async () => {
  // let id = 18;
  // const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  // const data = await response.json();

  // return data;

  for (let id = 1; id <= 150; id++) {
    await getPokemon(id);
  }
};

const getPokemon = async (id) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await response.json();

  const formatID = () => `${data.id.toString().padStart(3, "0")}`;
  const formatWeight = () => `${parseFloat(data.weight / 10).toFixed(1)}`;
  const formatHeight = () => `${parseFloat(data.height / 10).toFixed(1)}`;

  const pokemon = {
    id: formatID(),
    hp: data.stats[0].base_stat,
    name: data.name,
    image: data.sprites.other.home.front_default,
    type: data.types.map((type) => type.type.name),
    weight: formatWeight(),
    height: formatHeight(),
  };

  formatPokemon(pokemon);
};

fetchPokemon().catch((err) => {
  console.error(err);
});

const formatPokemon = (pokemon) => {
  const { id, hp, name, image, type, weight, height } = pokemon;

  let html = `
  <div class="pokemon-card">
      <div class="pokemon-card__top_container">
        <span class="pokemon-card__id">#${id}</span>
        <span class="pokemon-card__hp"><img src=" ./images/hp-heart.png" />
          ${hp} / ${hp}
        </span>
      </div>
      <h1 class="pokemon-card__name center-text">${name}</h1>
      <img class="pokemon-card__image" src="${image}" />
      <h2 class="pokemon-card__type center-text">${type.join(", ")}</h2>
      <div class="pokemon-card__info center-text">
          <h3 class="pokemon-card__info">
              Height: ${height}m | Weight: ${weight}kg
          </h3>
      </div>
  </div>
      `;
  container.innerHTML += html;
};
