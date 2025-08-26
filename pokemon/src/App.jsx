import React, { useState, useEffect } from 'react';

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllPokemon = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setPokemonList(data.results);
        setError(null);
      } catch (err) {
        setError(err.message);
        setPokemonList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllPokemon();
  }, []);

  if (loading) return <div>Loading all Pokémon...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>All Pokémon ({pokemonList.length} total)</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px' }}>
        {pokemonList.map((pokemon, index) => (
          <div key={pokemon.name} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
            <h3>#{index + 1} {pokemon.name}</h3>
            <p>URL: {pokemon.url}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;