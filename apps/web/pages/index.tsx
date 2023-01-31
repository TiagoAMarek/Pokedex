import Image from "next/image";
import { useCallback, useState } from "react";

type PokemonResponse = {
  name?: string;
  sprites?: {
    front_default?: string;
    back_default?: string;
  };
};

export default function Web() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonResponse, setPokemonResponse] = useState<
    undefined | PokemonResponse
  >();

  const searchPokemon = useCallback(async (e) => {
    e.preventDefault()
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );
    setPokemonResponse(await response.json());
  }, [pokemonName]);

  return (
    <div>
      <form onSubmit={searchPokemon}>
        <label>
          Buscar Pokémon:
          <input
            type="text"
            value={pokemonName}
            onChange={(e) => setPokemonName(e.target.value)}
          ></input>
          <button type="submit" >buscar</button>
        </label>
      </form>

      {pokemonResponse ? (
        <div>
          <h1>{pokemonResponse.name}</h1>
          <Image src={pokemonResponse.sprites?.front_default ?? ''} alt={`image of ${pokemonResponse.name}`} width={100} height={100} />
        </div>
      ) : null}
    </div>
  );
}
