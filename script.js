const getOption = () => {
  let x = document.getElementById('pokeName');
  let text = x.value.toLowerCase();

  console.log(`https://pokeapi.co/api/v2/pokemon/${text}`);
  fetchPokemon(`https://pokeapi.co/api/v2/pokemon/${text}`);
};

const fetchPokemon = (pokeUrl) => {
  fetch(pokeUrl)
    .then((res) => {
      if (res.status != '200') {
        pokeImage('img/404Error.png');
        setName('Error 404');
        setType('Error');
      } else {
        return res.json();
      }
    })
    .then((data) => {
      console.log(data);
      // Img
      pokeImage(data.sprites.front_default);
      // Name
      setName(data.name);
      // Types
      if (data.types.length == 2) {
        setType(data.types[0].type.name + ' ' + data.types[1].type.name);
      } else {
        setType(data.types[0].type.name);
      }
      // PSs
      setPS(data.stats[0].base_stat);
      // ATK
      setAtk(data.stats[1].base_stat);

      // DEF
      setDef(data.stats[2].base_stat);
      // SPATK
      setSpAtk(data.stats[3].base_stat);
      // SPDEF
      setSpDef(data.stats[4].base_stat);
      // SPEED
      setSpeed(data.stats[5].base_stat);
      // Moves
      removeOptions(document.getElementById('pMoves'));
      for (var i = 0; i < data.moves.length; i++) {
        console.log(data.moves[i].move.name);
        setMoves(data.moves[i].move.name);
      }
    });
};

// Imagen
const pokeImage = (url) => {
  const pokeImg = document.getElementById('pokeImg');
  pokeImg.src = url;
};
// Name
const setName = (data) => {
  const pName = document.getElementById('pName');
  pName.innerHTML = 'Nombre: ' + data;
};
// Types
const setType = (data) => {
  const pType = document.getElementById('pType');
  pType.innerHTML = 'Tipo/s: ' + data;
};
// PS
const setPS = (data) => {
  const pPS = document.getElementById('pPS');
  pPS.innerHTML = 'PS: ' + data;
};
// ATK
const setAtk = (data) => {
  const pAtk = document.getElementById('pAtk');
  pAtk.innerHTML = 'ATK: ' + data;
};
// DEF
const setDef = (data) => {
  const pDef = document.getElementById('pDef');
  pDef.innerHTML = 'DEF: ' + data;
};
// SPATK
const setSpAtk = (data) => {
  const pSpAtk = document.getElementById('pSpAtk');
  pSpAtk.innerHTML = 'SP.ATK: ' + data;
};
// SPDEF
const setSpDef = (data) => {
  const pSpDef = document.getElementById('pSpDef');
  pSpDef.innerHTML = 'SP.DEF: ' + data;
};
// SPEED
const setSpeed = (data) => {
  const pSpeed = document.getElementById('pSpeed');
  pSpeed.innerHTML = 'SP: ' + data;
};
// MOVES
const setMoves = (data) => {
  const pMoves = document.getElementById('pMoves');
  var opt = document.createElement('option');
  opt.value = data;
  opt.innerHTML = data;
  pMoves.appendChild(opt);
};
// Remove all the previous options (pokemon moves)
function removeOptions(selectElement) {
  var i,
    L = selectElement.options.length - 1;
  for (i = L; i >= 0; i--) {
    selectElement.remove(i);
  }
}
