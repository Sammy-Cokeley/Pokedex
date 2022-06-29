import React, { useState, useEffect } from 'react';
import logo from '../pokemon-logo.png'



function DropdownContainer(props) {

    //States used to detect that the dropdown menu is 
    //in use and that an option from the menu has been 
    //selected.  
    const [search, setSearch] = useState("search...");
    const [open, setOpen] = useState(false);

    //Array of the possible generations to select from 
    //mapped into the dropdown menu.
    const generations = ["Generation I", "Generation II", "Generation III", "Generation IV", "Generation V", 
        "Generation VI", "Generation VII", "Generation VIII",];

    //Handles a change in the generation selection,
    //this only sets the state but does not pass the 
    //information back to the parent function.
    const handleGeneration = (gen) => {
        setSearch(gen);
    }

    //Handles the current generation selection by
    //sending it back to the parent function, uses a 
    //swtich case since the generations are limited.
    const handleClick = () => {
        switch (search) {
            case 'Generation I':
                props.func(1)
                return 1;
            case 'Generation II':
                props.func(2)
                return 2;
            case 'Generation III':
                props.func(3)
                return 3;
            case 'Generation IV':
                props.func(4)
                return 4;
            case 'Generation V':
                props.func(5)
                return 1;
            case 'Generation VI':
                props.func(6)
                return 2;
            case 'Generation VII':
                props.func(7)
                return 3;
            case 'Generation VII':
                props.func(8)
                return 4;
            default:
                console.log("try again")
                return 0;
        }
    }


    if (open) {
        return (
            <div className='dropdown-container'>
                <img src={logo} className='pokemon-logo'></img>
                <div className='generation-selection'>
                    <p className='search-title'>Find a pokemon</p>
                    <div>
                        <div className='hor-flex' onClick={() => setOpen(!open)}>
                            <div className='search-stuff'>
                                <p className='search-label'>Generation</p>
                                <p className='search-box'>{search}</p>
                            </div>
                            <p className='search-arrow'>&#9660;</p>
                            <div className='search-items'>
                                {generations.map((gen) => (
                                    <DropdownItem value={gen} generation={handleGeneration} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <p className='search-button'>search</p>
                </div>
            </div>
        )
    } else {
        return (
            <div className='dropdown-container'>
                <img src={logo} className='pokemon-logo'></img>
                <div className='generation-selection'>
                    <p className='search-title'>Find a pokemon</p>
                    <div>
                        <div className='hor-flex' onClick={() => setOpen(!open)}>
                            <div className='search-stuff'>
                                <p className='search-label'>Generation</p>
                                <p className='search-box'>{search}</p>
                            </div>
                            <p className='search-arrow'>&#9660;</p>
                            <div className='search-items'>
                            </div>
                        </div>
                    </div>
                    <p className='search-button' onClick={handleClick}>search</p>
                </div>
            </div>
        )
    }
}

//Populates the dropdown menu with an item that
//contains a click event with a corresponding value
//this value will be passed back to the parent if
//clicked.

function DropdownItem(props) {

    const handleClick = (value) => {
        props.generation(value);
    }

    return (
        <div>
            <p className='search-item' onClick={() => handleClick(props.value)}>{props.value}</p>
        </div>
    )
}

export default DropdownContainer;