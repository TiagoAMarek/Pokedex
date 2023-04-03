import { PokemonSprite } from "ui/PokemonSprite";
import { useCallback, useState } from "react";
import { useSearchPokemon } from "../data/use-search-pokemon";

export default function Web() {
  const [pokemonName, setPokemonName] = useState("");
  const { pokemonResponse, searchForNewPokemon } = useSearchPokemon();

  const triggerPokemonSearch = useCallback(
    async (e: { preventDefault: () => void }) => {
      e.preventDefault();
      searchForNewPokemon(pokemonName);
    },
    [pokemonName, searchForNewPokemon]
  );

  console.log(pokemonResponse);
  return (
    <div className="container mx-auto px-4">
      <form onSubmit={triggerPokemonSearch}>
        <label>
          <input
            type="text"
            value={pokemonName}
            onChange={(e) => setPokemonName(e.target.value)}
          ></input>
          <button className="text-3xl font-bold" type="submit">
            Search
          </button>
        </label>
      </form>

      {pokemonResponse?.results?.map(({ name, sprites }) => (
        <div key={name}>
          <PokemonSprite imageSrc={sprites?.front_default} />
          <div>
            <div className="text-xl font-medium">{name}</div>
          </div>
        </div>
      )) ?? null}
    </div>
  );
}
