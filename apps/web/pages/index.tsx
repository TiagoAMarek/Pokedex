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

  const searchPokemon = useCallback(
    async (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
      );
      setPokemonResponse(await response.json());
    },
    [pokemonName]
  );

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
          <button className="text-3xl font-bold underline" type="submit">buscar</button>
        </label>
      </form>

      {pokemonResponse ? (
        <div>
          <div className="p-6 max-w-sm mx-auto bg-black rounded-xl shadow-lg flex items-center space-x-4">
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
              <p className="text-slate-500">You have a new message!</p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
