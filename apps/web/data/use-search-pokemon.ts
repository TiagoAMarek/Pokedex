import { useState } from "react";
import useSWRMutation from "swr/mutation";

export type PokemonResponse = {
  name?: string;
  sprites?: {
    front_default?: string;
    back_default?: string;
  };
};

const updatePokemon = async (name: string) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  return response.json();
};

export function useSearchPokemon() {
  const [pokemonName, setPokemonName] = useState("");

  const { data, trigger } = useSWRMutation<PokemonResponse>(
    pokemonName,
    updatePokemon
  );

  return { pokemonName, setPokemonName, pokemonResponse: data, trigger };
}
