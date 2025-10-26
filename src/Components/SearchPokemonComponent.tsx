import React from "react";
interface Props {
  descripcion:string
  query: string;
  setquery: (value: string) => void;
  handleSearch: () => void;
}

export const SearchPokemonComponent = ({
  descripcion,
  query,
  setquery,
  handleSearch,
}: Props) => {
  return (
    <>
      <div className="searchBar-container">
        <span>{ descripcion}</span>
        <input
          onChange={(e) => {
            setquery(e.target.value);
            console.log("Escribiendo:", e.target.value);
          }}
          value={query}
          type="text"
          placeholder="Busqua tu pokemon favorito"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <button onClick={handleSearch}> Buscar</button>
      </div>
    </>
  );
};
