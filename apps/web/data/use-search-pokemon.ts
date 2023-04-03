import useSWR from "swr";

export type PokemonResponse = {
  name?: string;
  sprites?: {
    front_default?: string;
    back_default?: string;
  };
};

export type PokemonsListResponse = {
  results?: PokemonResponse[];
};

const fetchPokemons = async (url: string) => {
  const response = await fetch(`https://pokeapi.co/api/v2${url}`);
  const body = (await response.json()) as
    | PokemonResponse
    | PokemonsListResponse;

  const pokemonsList: PokemonsListResponse =
    "results" in body ? body : { results: [body as PokemonResponse] };

  return pokemonsList;
};

export function useSearchPokemon() {
  const { data: pokemonResponse, mutate } = useSWR<PokemonsListResponse>(
    "/pokemon",
    fetchPokemons
  );

  const searchForNewPokemon = async (name: string) => {
    const updatedData = await fetchPokemons(`/pokemon/${name}`);
    mutate(updatedData);
  };

  return { pokemonResponse, searchForNewPokemon };
}
