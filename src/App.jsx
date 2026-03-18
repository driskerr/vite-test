import { useState } from "react";
import "./App.css";
import { pokemons, typeData } from "./data/pokemon";
import PokemonCard from "./components/PokemonCard";
import PokemonModal from "./components/PokemonModal";
import RangeSlider from "./components/RangeSlider";

const allTypes = [...new Set(pokemons.map((p) => p.type))].sort();
const maxHp = Math.max(...pokemons.map((p) => p.hp));
const maxAttack = Math.max(...pokemons.map((p) => p.attack));

function App() {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [hpRange, setHpRange] = useState([0, maxHp]);
  const [attackRange, setAttackRange] = useState([0, maxAttack]);
  const [sortBy, setSortBy] = useState("hp");
  const [search, setSearch] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  function toggleType(type) {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  }

  function resetFilters() {
    setSelectedTypes([]);
    setHpRange([0, maxHp]);
    setAttackRange([0, maxAttack]);
    setSearch("");
  }

  const filtered = pokemons
    .filter((p) => {
      const typeMatch =
        selectedTypes.length === 0 || selectedTypes.includes(p.type);
      const hpMatch = p.hp >= hpRange[0] && p.hp <= hpRange[1];
      const attackMatch =
        p.attack >= attackRange[0] && p.attack <= attackRange[1];
      const searchMatch = p.name.toLowerCase().includes(search.toLowerCase());
      return typeMatch && hpMatch && attackMatch && searchMatch;
    })
    .sort((a, b) => {
      if (sortBy === "hp") return b.hp - a.hp;
      if (sortBy === "attack") return b.attack - a.attack;
      if (sortBy === "type") return a.type.localeCompare(b.type) || a.hp - b.hp;
      if (sortBy === "popularity") return b.popularity - a.popularity;
    });

  return (
    <>
      <h1 className="pokemon-title">Pokémon!</h1>
      <p className="pokemon-tagline">I choose you!</p>
      <div className="header-stripe" />

      <div className="filter-panel">
        <div className="filter-columns">
          <div className="filter-col">
            <div className="type-pills">
              {allTypes.map((type) => {
                const active = selectedTypes.includes(type);
                const { color, emoji } = typeData[type];
                return (
                  <button
                    key={type}
                    className="type-pill"
                    onClick={() => toggleType(type)}
                    style={{
                      border: `2px solid ${color}`,
                      backgroundColor: active ? color : `${color}18`,
                      color: active ? "#fff" : color,
                    }}
                  >
                    {emoji} {type}
                  </button>
                );
              })}
            </div>
            <input
              className="search-input"
              type="text"
              placeholder="Search Pokémon..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="filter-col">
            <div className="slider-row">
              <RangeSlider
                label="Health"
                min={0}
                max={maxHp}
                value={hpRange}
                onChange={setHpRange}
                color="#228B22"
              />
              <RangeSlider
                label="Attack"
                min={0}
                max={maxAttack}
                value={attackRange}
                onChange={setAttackRange}
                color="#8B0000"
              />
            </div>
            <div className="sort-row">
              <p
                className="filter-label"
                style={{ margin: 0, minWidth: "52px" }}
              >
                Sort By
              </p>
              <div className="sort-row-inner">
                <div className="sort-spacer" />
                <select
                  className="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="hp">Health</option>
                  <option value="attack">Attack</option>
                  <option value="type">Type</option>
                  <option value="popularity">Popularity</option>
                </select>
                <div className="sort-spacer" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="cards-header">
        <div className="cards-header-left">
          <p className="cards-count">
            Showing {filtered.length} of {pokemons.length} Pokémon
          </p>
          <p className="cards-hint">👆 click any card for details</p>
        </div>
        <button className="reset-btn" onClick={resetFilters}>
          Reset filters
        </button>
      </div>

      <div className="card-grid">
        {filtered.length === 0 ? (
          <div className="no-results">
            <p className="no-results-title">No Pokémon found!</p>
            <p className="no-results-sub">
              Try adjusting your filters or{" "}
              <button className="no-results-reset" onClick={resetFilters}>
                reset
              </button>{" "}
              to start over.
            </p>
          </div>
        ) : (
          filtered.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              maxHp={maxHp}
              maxAttack={maxAttack}
              onClick={() => setSelectedPokemon(pokemon)}
            />
          ))
        )}
      </div>

      {selectedPokemon && (
        <PokemonModal
          pokemon={selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
        />
      )}
    </>
  );
}

export default App;
