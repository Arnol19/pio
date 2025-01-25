import React, { useEffect, useState } from 'react';
import ProductCard from '../Components/ProductCard';
import Modal from '../Components/Modal';
import axios from 'axios';

const Products = () => {
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null); // Estado para el Pokémon seleccionado
  const [showModal, setShowModal] = useState(false);
  const [description, setDescription] = useState(''); // Estado para la descripción del Pokémon

  useEffect(() => {
    obtenerPokemons();
  }, []);

  const obtenerPokemons = async () => {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20'); // Obtén los primeros 20 Pokémon
      const results = await Promise.all(
        response.data.results.map(async (pokemon, index) => {
          const details = await axios.get(pokemon.url); // Obtén detalles adicionales del Pokémon
          return {
            id: index + 1,
            name: details.data.name,
            image: details.data.sprites.front_default,
            url: pokemon.url,
          };
        })
      );
      setPokemons(results);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };

  // Maneja la apertura del modal y obtén la descripción del Pokémon
  const handleShowModal = async (pokemon) => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}`);
      const flavorText = response.data.flavor_text_entries.find(
        (entry) => entry.language.name === 'en'
      ); // Obtén la descripción en inglés
      setDescription(flavorText ? flavorText.flavor_text : 'No description available.');
    } catch (error) {
      console.error('Error al obtener la descripción:', error);
      setDescription('Error loading description.');
    }
    setSelectedPokemon(pokemon);
    setShowModal(true);
  };

  // Maneja el cierre del modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPokemon(null);
    setDescription('');
  };

  return (
    <div className="row">
      {pokemons.map((pokemon) => (
        <div className="col-md-4 mb-4" key={pokemon.id}>
          <ProductCard product={pokemon} onView={() => handleShowModal(pokemon)} />
        </div>
      ))}

      {/* Modal para mostrar los detalles */}
      {selectedPokemon && (
        <Modal
          show={showModal}
          onClose={handleCloseModal}
          title={selectedPokemon.name}
          image={selectedPokemon.image}
          description={description} // Pasa la descripción al modal
        />
      )}
    </div>
  );
};

export default Products;
