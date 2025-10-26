export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  abilities: Ability[];
  sprites: {
    front_default: string;
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
  types: Array<{
    type: {
      name: string;
    };
  }>;
  species: {
    name: string;
    url: string; // aquí puedes hacer otro fetch para saber generación y evolución
  };
}

// Si haces fetch a species.url, te viene info extra como:
export interface PokemonSpecies {
  generation: {
    name: string; // "generation-i", "generation-ii", etc
  };
  evolution_chain: {
    url: string; // aquí puedes hacer OTRO fetch para la cadena evolutiva
  };
}
export interface Ability {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}
