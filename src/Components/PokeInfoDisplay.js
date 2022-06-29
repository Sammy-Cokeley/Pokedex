import React, {useState, useEffect} from 'react';
import axios from 'axios';


function PokeInfoDisplay(props) {

    //States to determine the current set of information based
    //on which pokemon has been selected
    const [pokemonData, setPokemonData] = useState([]);
    const [imageSRC, setImageSRC] = useState('');
    const [stats, setStats] = useState([]);

    //The base URL that all API calls will reference when 
    //obtaining a Pokemon's information
    const baseURL = `https://pokeapi.co/api/v2/pokemon/`

    //Fetches the data of the current pokemon using an
    //Axios get request
    const getPokemonData = () => {

        if (props.name == "") {
            console.log("need to select a pokemon first!")
        } else {
            axios.get(`${baseURL}${props.name}`)
                .then((response) => {
                    setPokemonData(response.data);
                    setImageSRC(response.data.sprites.front_default);
                    setStats(response.data.stats);
                })
                .catch(error => console.error(`Error: ${error}`));
        }
    }

    //If the selected pokemon changes, then getPokemonData will
    //be called again to update the pokemon information accordingly
    useEffect(() => {
        getPokemonData()
    }, [props.name]);



    return (
            <div className='poke-info'>
                <p className='poke-name'>{pokemonData.name}</p>
                <img className='poke-image' src={imageSRC}></img>
                <h3>Base Stats</h3>
                <div className='poke-stats'>
                {stats.map((stats) => (
                        <p className='stat'>{stats.stat.name}: {stats.base_stat}</p>
                ))}
                </div>
            </div>
    )
}

export default PokeInfoDisplay;