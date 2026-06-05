import './Card.css'

function PokemonCard({ nome, imagem, id, onClick }) {
  return (
    <div className="pokemon-card" onClick={onClick} style={{ cursor: 'pointer' }}>
      <div className="card-image">
        <img src={imagem} alt={nome} />
      </div>
      <div className="card-info">
        <p className="card-id">#{id}</p>
        <p className="card-name">{nome}</p>
      </div>
    </div>
  )
}

export default PokemonCard
