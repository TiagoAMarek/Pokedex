import Image from "next/image";
import { useCallback } from "react";
import { useSearchPokemon } from "../data/use-search-pokemon";

export default function Web() {
  const { trigger, pokemonName, pokemonResponse, setPokemonName } =
    useSearchPokemon();

  const triggerPokemonSearch = useCallback(
    async (e: { preventDefault: () => void }) => {
      e.preventDefault();
      trigger();
    },
    []
  );

  return (
    <div>
      <form
        onSubmit={triggerPokemonSearch}
      >
        <label>
          Buscar Pokémon:
          <input
            type="text"
            value={pokemonName}
            onChange={(e) => setPokemonName(e.target.value)}
          ></input>
          <button className="text-3xl font-bold underline" type="submit">
            buscar
          </button>
        </label>
      </form>

      {pokemonResponse ? (
        <div>
          <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
            <div className="shrink-0">
              <Image
                src={pokemonResponse.sprites?.front_default ?? ""}
                alt={`image of ${pokemonResponse.name}`}
                className="h-12 w-12"
                width={100}
                height={100}
              />
            </div>
            <div>
              <div className="text-xl font-medium text-black">
                {pokemonResponse.name}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
