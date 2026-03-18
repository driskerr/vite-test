import { useState, useEffect } from "react";
import { typeData } from "../data/pokemon";

const STAT_LABELS = {
  hp: "Health",
  attack: "Attack",
  defense: "Defense",
  "special-attack": "Special Attack",
  "special-defense": "Special Defense",
  speed: "Speed",
};

function toTitleCase(str) {
  const s = str.replace(/-/g, " ");
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default function PokemonModal({ pokemon, onClose }) {
  const [details, setDetails] = useState(null);
  const { color, textColor, emoji } = typeData[pokemon.type];

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  useEffect(() => {
    setDetails(null);
    Promise.all([
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`).then((r) => r.json()),
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}`).then((r) => r.json()),
    ]).then(([poke, species]) => setDetails({ poke, species }));
  }, [pokemon.id]);

  const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

  const flavorText = details?.species.flavor_text_entries
    .find((e) => e.language.name === "en")
    ?.flavor_text.replace(/\f/g, " ");

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        <div
          className="modal-left"
          style={{ background: `linear-gradient(to bottom, ${color}90, ${color}22)` }}
        >
          <img className="modal-sprite" src={spriteUrl} alt={pokemon.name} />
        </div>

        <div className="modal-right">
          <p className="type-label" style={{ color: textColor }}>
            {emoji} {pokemon.type}
          </p>
          <h2 className="modal-name" style={{ color: textColor }}>
            {pokemon.name}
          </h2>

          {!details && <p className="modal-loading">Loading...</p>}

          {details && (
            <>
              {flavorText && (
                <p className="modal-flavor">"{flavorText}"</p>
              )}

              <div className="modal-meta">
                <span><strong style={{ color: textColor }}>{Math.floor(details.poke.height * 3.93701 / 12)} ft {Math.round(details.poke.height * 3.93701 % 12)} in</strong> height</span>
                <span><strong style={{ color: textColor }}>{Math.round(details.poke.weight * 0.220462 / 5) * 5} lb</strong> weight</span>
              </div>

              <div className="modal-abilities">
                <strong style={{ color: textColor }}>
                  {details.poke.abilities.map((a) => toTitleCase(a.ability.name)).join(", ")}
                </strong>
              </div>

              <p className="filter-label" style={{ margin: "0 0 6px" }}>Base Stats</p>
              {details.poke.stats.map((s) => (
                <div key={s.stat.name} className="modal-stat-row">
                  <span className="modal-stat-label">
                    {STAT_LABELS[s.stat.name] || s.stat.name}
                  </span>
                  <div className="modal-stat-track">
                    <div
                      className="modal-stat-fill"
                      style={{ width: `${(s.base_stat / 255) * 100}%`, background: color }}
                    />
                  </div>
                  <span className="modal-stat-value" style={{ color: textColor }}>
                    {s.base_stat}
                  </span>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
