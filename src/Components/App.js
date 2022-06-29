import '../App.css';
import React, { useState } from 'react';
import axios from 'axios';
import DropdownContainer from './GenerationSearch';
import PokeInfoDisplay from './PokeInfoDisplay';


function App() {

  //States to determine the current set generation
  //as well as the current selected name
  const [generation, setGeneration] = useState(0);
  const [currentName, setCurrentName] = useState("");

  const handleGeneration = (gen) => {
    setGeneration(gen);
  }

  const handleName = (name) => {
    setCurrentName(name);
  }

  if (currentName == "") {

    return (
      <div className="App">
        <DropdownContainer func={handleGeneration} />
        <div className="poke-call">
          <div>
            <GenerationListDisplay generation={generation} func={handleName} />
          </div>
          <div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="App">
        <DropdownContainer func={handleGeneration} />
        <div className="poke-call">
          <div>
            <GenerationListDisplay generation={generation} func={handleName} />
          </div>
          <div>
            <PokeInfoDisplay name={currentName} />
          </div>
        </div>
      </div>
    );
  }
}

//Lists the names of the Pokemon in the selected
//generation. Each name in the list has an click 
//event where additional information about that 
//Pokemon will show up on the right hand side of
//the screen.
function GenerationListDisplay(props) {

  //State to determine if there has been a change in 
  //the generation that has been selected
  const [pokemonData, setPokemonData] = useState([]);

  //Click handler to pass the name of the clicked 
  //Pokemon back to the parent function.
  const handleClick = (name) => {
    props.func(name);
  }

  //Axios request to get the API information of the
  //current selected generation.
  const getPokemon = async () => {
    try {
      const url = `https://pokeapi.co/api/v2/generation/${props.generation}`
      const res = await axios.get(url)
      setPokemonData(res.data.pokemon_species);
    } catch (e) {
      console.log(e)
    }
  }

  if (props.generation > 0) {

    getPokemon()

    return (

      <div className='poke-list'>
        {pokemonData.map((names) => (
          <div className='poke-names' onClick={() => { handleClick(names.name) }}>
            <p>{names.name}</p>
          </div>
        ))}
      </div>
    )
  } else {
    return (
      <div>
        <p className='poke-holder'>Search to find pokemon by generation.</p>
      </div>
    )
  }
}

export default App;