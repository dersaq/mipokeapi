// PokemonTipoComponent.tsx
export const PokemonTipoComponent = (props: Props) => {
  const { tipo, tipoOriginal, ontipoclick } = props;

  return (
    <div className="tipos">
      <div
        className={`tipo-${tipo} tipo-card`}
        onClick={() => ontipoclick(tipoOriginal)} // ← ¿Está esto?
      >
        <img src={`${import.meta.env.BASE_URL}img/tipos/${tipo}.svg`} alt="" />
        <h3 className="titulo-tipo">{tipo}</h3>
      </div>
    </div>
  );
};
