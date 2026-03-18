import StatBar from "./StatBar";
import { typeData } from "../data/pokemon";

export default function PokemonCard({ pokemon, maxHp, maxAttack, onClick }) {
  const { color, textColor, emoji } = typeData[pokemon.type];

  const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;

  return (
    <div
      className="pokemon-card"
      onClick={onClick}
      style={{
        border: `2px solid ${color}`,
        background: `linear-gradient(to bottom, ${color}90 0%, ${color}22 100%)`,
        boxShadow: `0 2px 8px ${color}30`,
      }}
    >
      <p className="type-label" style={{ color: textColor }}>
        {emoji} {pokemon.type}
      </p>
      <div className="card-sprite-frame" style={{ border: `1.5px solid ${color}` }}>
        <img src={spriteUrl} alt={pokemon.name} />
      </div>
      <h3 className="card-name" style={{ color: textColor }}>
        {pokemon.name}
      </h3>
      <StatBar value={pokemon.hp} max={maxHp} color="#228B22" emoji="❤️" />
      <StatBar value={pokemon.attack} max={maxAttack} color="#8B0000" emoji="⚔️" />
    </div>
  );
}
