import React, { useState } from 'react';
import PokedexContext from '../contexts/pokedex';
import InfoContainer from './InfoContainer';
import ListContainer from './ListContainer';

function Content() {

  const [activePokemon, setActivePokemon] = useState({});
  const [mainImage, setMainImage] = useState('');

  const utils = {
    activePokemon,
    setActivePokemon,
    mainImage,
    setMainImage
  };

  return (
    <PokedexContext.Provider value={utils}>
      <div className="content">
        <InfoContainer/>
        <ListContainer/>
      </div>
    </PokedexContext.Provider>
  );
}

export default Content;
