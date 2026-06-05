import { useState } from 'react'
import './Searchbar.css'

function SearchBar({ onSearch, onFilterByType }) {
    const [pokemon, setPokemon] = useState('')
    const [loading, setLoading] = useState(false)
    const [selectedType, setSelectedType] = useState('')

    // Lista de tipos de pokémon disponíveis
    const types = [
        'normal', 'fire', 'water', 'electric', 'grass', 'ice',
        'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
        'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
    ]

    // Função para buscar um pokémon específico
    const handleSearch = async () => {
        const searchValue = pokemon.trim().toLowerCase()
        if (!searchValue) {
            alert('Digite um nome ou ID de pokémon')
            return
        }
        setLoading(true)
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchValue}`)
            if (!response.ok) {
                throw new Error('Pokémon não encontrado')
            }
            const data = await response.json()
            
            const pokemonData = {
                id: data.id,
                name: data.name,
                sprites: data.sprites,
                types: data.types,
                height: data.height,
                weight: data.weight,
                abilities: data.abilities,
                stats: data.stats
            }
            
            if (onSearch) {
                onSearch(pokemonData)
            }
            setPokemon('')
        } catch (error) {
            alert('Pokémon não encontrado: ' + error.message)
            console.error('Erro ao buscar Pokémon:', error)
        } finally {
            setLoading(false)
        }
    }

    // Função para filtrar por tipo
    const handleTypeFilter = (e) => {
        const selectedValue = e.target.value
        setSelectedType(selectedValue)
        
        if (onFilterByType) {
            onFilterByType(selectedValue)
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch()
        }
    }

    return (
        <div className="search-container">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Digite o nome ou ID do pokémon..."
                    value={pokemon}
                    onChange={(e) => setPokemon(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={loading}
                />
                <button
                    type="button"
                    className="search-button"
                    onClick={handleSearch}
                    disabled={loading}
                >
                    {loading ? 'Buscando...' : 'Pesquisar'}
                </button>
            </div>

            {/* Filtro por tipo */}
            <div className="filter-bar">
                <label htmlFor="type-select">Filtrar por tipo:</label>
                <select
                    id="type-select"
                    value={selectedType}
                    onChange={handleTypeFilter}
                    className="type-select"
                >
                    <option value="">Todos os tipos</option>
                    {types.map((type) => (
                        <option key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default SearchBar