import './PokemonDetails.css'

function PokemonDetails({ pokemon, onClose }) {
  // Se o pokemon não existir, não mostra nada
  if (!pokemon) return null

  return (
    <div className="pokemon-details-overlay">
      {/* Fundo escuro que você clica para fechar */}
      <div className="pokemon-details-backdrop" onClick={onClose}></div>

      {/* Modal com os detalhes */}
      <div className="pokemon-details-modal">
        <button className="close-btn" onClick={onClose}>✕</button>

        <div className="details-content">
          {/* Imagem grande do pokemon */}
          <div className="details-image">
            <img
              src={pokemon.sprites?.other?.['official-artwork']?.front_default || 
                   `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
              alt={pokemon.name}
            />
          </div>

          {/* Informações do pokemon */}
          <div className="details-info">
            <h1>{pokemon.name.toUpperCase()}</h1>
            <p className="pokemon-id">ID: #{pokemon.id}</p>

            {/* Tipos */}
            <div className="types-section">
              <h3>Tipos:</h3>
              <div className="types-list">
                {pokemon.types?.map((typeObj) => (
                  <span key={typeObj.type.name} className={`type-badge type-${typeObj.type.name}`}>
                    {typeObj.type.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Medidas (altura e peso) */}
            <div className="measurements">
              <div className="measurement-item">
                <strong>Altura:</strong>
                <span>{pokemon.height / 10} m</span>
              </div>
              <div className="measurement-item">
                <strong>Peso:</strong>
                <span>{pokemon.weight / 10} kg</span>
              </div>
            </div>

            {/* Habilidades */}
            <div className="abilities-section">
              <h3>Habilidades:</h3>
              <ul>
                {pokemon.abilities?.map((abilityObj) => (
                  <li key={abilityObj.ability.name}>
                    {abilityObj.ability.name}
                    {abilityObj.is_hidden && <span className="hidden"> (Oculta)</span>}
                  </li>
                ))}
              </ul>
            </div>

            {/* Estatísticas Base */}
            <div className="stats-section">
              <h3>Estatísticas:</h3>
              <div className="stats-grid">
                {pokemon.stats?.map((statObj) => (
                  <div key={statObj.stat.name} className="stat-item">
                    <div className="stat-name">{statObj.stat.name}</div>
                    <div className="stat-bar">
                      <div 
                        className="stat-fill" 
                        style={{ width: `${(statObj.base_stat / 150) * 100}%` }}
                      ></div>
                    </div>
                    <div className="stat-value">{statObj.base_stat}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PokemonDetails
