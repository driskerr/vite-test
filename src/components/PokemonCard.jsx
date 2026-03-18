import { useState } from "react";
import StatBar from "./StatBar";
import { typeData } from "../data/pokemon";

export default function PokemonCard({ pokemon, maxHp, onClick }) {
  const { color, textColor, emoji } = typeData[pokemon.type];
  const [hovered, setHovered] = useState(false);

  const staticUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
  const animatedUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemon.id}.gif`;

  return (
    <div
      className="pokemon-card"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
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
        <img
          src={hovered ? animatedUrl : staticUrl}
          alt={pokemon.name}
          onError={(e) => { e.target.src = staticUrl; }}
        />
      </div>
      <h3 className="card-name" style={{ color: textColor }}>
        {pokemon.name}
      </h3>
      <StatBar value={pokemon.hp} max={maxHp} color="#228B22" emoji="❤️" />
      <StatBar value={pokemon.attack} max={160} color="#8B0000" emoji="⚔️" />
      {hovered && <div className="card-tooltip">Click for details</div>}
    </div>
  );
}
