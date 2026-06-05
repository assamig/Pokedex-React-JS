import { useEffect, useState } from 'react'
import PokemonCard from './components/PokemonCard'
import SearchBar from './components/SearchBar'
import PokemonDetails from './components/PokemonDetails'
import './App.css'
import './pokemon.css'

function App() {
  const [page, setPage] = useState(0)
  const [pokemons, setPokemons] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchedPokemon, setSearchedPokemon] = useState(null)
  const [selectedPokemon, setSelectedPokemon] = useState(null)
  const [selectedType, setSelectedType] = useState('')
  const [filteredPokemons, setFilteredPokemons] = useState([])
  const [allPokemonsOfType, setAllPokemonsOfType] = useState([]) // Armazena TODOS os pokémons do tipo

  // Carrega a lista de 20 pokemons (quando não tem filtro de tipo)
  useEffect(() => {
    setLoading(true)
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${page * 20}`)
      .then(response => response.json())
      .then(data => setPokemons(data.results || []))
      .catch(() => console.error('Erro ao carregar a lista de pokémons'))
      .finally(() => setLoading(false))
  }, [page])

  // NOVO: Quando tipo muda, RESETA A PÁGINA para 0
  useEffect(() => {
    setPage(0)
  }, [selectedType])

  // Quando o tipo selecionado muda, busca TODOS os pokémons daquele tipo
  useEffect(() => {
    if (selectedType === '') {
      // Se nenhum tipo foi selecionado, mostra todos
      setFilteredPokemons(pokemons)
      setAllPokemonsOfType([])
    } else {
      // Se um tipo foi selecionado, busca TODOS os pokémons daquele tipo
      buscarTodosPokemonsPorTipo(selectedType)
    }
  }, [selectedType, pokemons, page])

  // NOVA FUNÇÃO: Busca TODOS os pokémons de um tipo e faz paginação
  const buscarTodosPokemonsPorTipo = async (type) => {
    try {
      setLoading(true)
      
      // Faz uma requisição para a API de tipos
      const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`)
      const data = await response.json()
      
      // Pega TODOS os pokémons desse tipo
      const todosPokemonsDoTipo = data.pokemon.map(p => ({
        name: p.pokemon.name,
        url: p.pokemon.url
      }))

      // Armazena a lista completa
      setAllPokemonsOfType(todosPokemonsDoTipo)

      // Faz paginação: mostra 20 por página
      const comecoDaPagina = page * 20
      const fimDaPagina = comecoDaPagina + 20
      const pokemonsPreDaPaginaAtual = todosPokemonsDoTipo.slice(comecoDaPagina, fimDaPagina)

      // Atualiza a lista de pokémons a exibir
      setFilteredPokemons(pokemonsPreDaPaginaAtual)
    } catch (error) {
      console.error('Erro ao filtrar por tipo:', error)
      setFilteredPokemons(pokemons)
    } finally {
      setLoading(false)
    }
  }

  const getPokemonId = (url) => {
    const parts = url?.split('/').filter(Boolean)
    return parts?.[parts.length - 1]
  }

  // Função para buscar todos os detalhes de um pokemon quando clicado
  const handlePokemonClick = async (nome) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`)
      const data = await response.json()
      setSelectedPokemon(data)
    } catch (error) {
      console.error('Erro ao carregar detalhes do pokémon:', error)
    }
  }

  const handlePokemonSearch = (pokemon) => {
    setSearchedPokemon(pokemon)
  }

  const handleTypeFilter = (type) => {
    setSelectedType(type)
  }

  return (
    <div className="app">
      <SearchBar onSearch={handlePokemonSearch} onFilterByType={handleTypeFilter} />
      
      {/* Se um pokemon foi encontrado pela busca, mostra ele */}
      {searchedPokemon && (
        <div>
          <h2>Resultado da Busca</h2>
          <PokemonCard
            nome={searchedPokemon.name}
            imagem={searchedPokemon.sprites?.other?.['official-artwork']?.front_default || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${searchedPokemon.id}.png`}
            id={searchedPokemon.id}
            onClick={() => setSelectedPokemon(searchedPokemon)}
          />
          <button className="ui button" onClick={() => setSearchedPokemon(null)}>
            Voltar para Lista
          </button>
        </div>
      )}

      {/* Se nenhum pokemon foi buscado, mostra a lista normal */}
      {!searchedPokemon && (
        <>
          <h1>Pokémons - Página {page + 1}</h1>
          {loading && <p className="loading">Carregando pokémons...</p>}
          <div className="pokemon-grid">
            {filteredPokemons.map((pokemon) => {
              const id = getPokemonId(pokemon.url)
              const imagem = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`

              return (
                <PokemonCard
                  key={pokemon.url}
                  nome={pokemon.name}
                  imagem={imagem}
                  id={id}
                  onClick={() => handlePokemonClick(pokemon.name)}
                />
              )
            })}
          </div>
          <div className="pagination">
            <button className="ui blue button" disabled={page <= 0} onClick={() => setPage(page - 1)}>
              Anterior
            </button>
            <button className="ui blue button" disabled={filteredPokemons.length < 20} onClick={() => setPage(page + 1)}>
              Próximo
            </button>
          </div>
        </>
      )}

      {/* Mostra o modal de detalhes quando um pokemon foi clicado */}
      {selectedPokemon && <PokemonDetails pokemon={selectedPokemon} onClose={() => setSelectedPokemon(null)} />}
    </div>
  )
}

export default App
