# 💻 Código Comentado - Entenda Cada Linha

Este documento mostra o código real do projeto **com explicações** em cada linha.

---

## App.jsx - O Maestro Completo

```javascript
import { useEffect, useState } from 'react'
import PokemonCard from './components/PokemonCard'
import SearchBar from './components/SearchBar'
import PokemonDetails from './components/PokemonDetails'
import './App.css'
import './pokemon.css'

// ============================================
// COMPONENTE PRINCIPAL (PAI)
// ============================================
function App() {
  // ============================================
  // ESTADOS - Guardar dados que mudam
  // ============================================
  
  const [page, setPage] = useState(0)
  // └─ page = número da página (0, 1, 2, ...)
  // └─ setPage = função para mudar
  // └─ useState(0) = começa em 0
  
  const [pokemons, setPokemons] = useState([])
  // └─ pokemons = array com 20 pokémons da página
  // └─ Muda quando busca dados da API
  
  const [loading, setLoading] = useState(false)
  // └─ loading = se está carregando dados
  // └─ TRUE enquanto busca, FALSE quando termina
  
  const [searchedPokemon, setSearchedPokemon] = useState(null)
  // └─ searchedPokemon = resultado da busca
  // └─ NULL = nenhuma busca ainda
  // └─ Objeto = pokémon encontrado
  
  const [selectedPokemon, setSelectedPokemon] = useState(null)
  // └─ selectedPokemon = pokémon clicado para ver detalhes
  // └─ NULL = nenhum clicado
  // └─ Objeto = pokémon com TODOS os dados
  
  const [selectedType, setSelectedType] = useState('')
  // └─ selectedType = tipo filtrado ('fire', 'water', '')
  // └─ '' = sem filtro
  // └─ 'fire' = só fire, etc
  
  const [filteredPokemons, setFilteredPokemons] = useState([])
  // └─ filteredPokemons = lista após aplicar filtro
  // └─ Muda quando selectedType muda
  
  const [allPokemonsOfType, setAllPokemonsOfType] = useState([])
  // └─ allPokemonsOfType = TODOS pokémons do tipo (não só 20)
  // └─ Usado para fazer paginação correta

  // ============================================
  // USEEFFECT 1: Buscar Pokémons da Página
  // ============================================
  useEffect(() => {
    // Este código roda quando 'page' muda
    
    setLoading(true)
    // ├─ Mostra "Carregando..."
    
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${page * 20}`)
    // ├─ Busca 20 pokémons
    // ├─ offset = página * 20 (página 0 = offset 0, página 1 = offset 20, etc)
    // └─ Exemplo: página 2 busca offset 40 (pokémons 40-59)
    
      .then(response => response.json())
      // ├─ Converte resposta para JSON
      // └─ Exemplo: texto HTTP vira objeto JavaScript
      
      .then(data => setPokemons(data.results || []))
      // ├─ data.results = array com 20 pokémons
      // ├─ Atualiza estado
      // └─ || [] = se não houver, usa array vazio
      
      .catch(() => console.error('Erro ao carregar'))
      // └─ Se erro, mostra no console
      
      .finally(() => setLoading(false))
      // └─ Sempre roda no final - tira "Carregando"
      
  }, [page])
  // └─ Roda QUANDO? Quando 'page' muda
  // └─ Exemplo: muda para página 1 → roda de novo
  // └─ Exemplo: busca pokemon → página não muda → NÃO roda

  // ============================================
  // USEEFFECT 2: Reset Página ao Trocar Tipo
  // ============================================
  useEffect(() => {
    // Este código roda quando 'selectedType' muda
    
    setPage(0)
    // └─ Volta para página 0 (primeira página)
    // └─ Isso faz o useEffect 1 rodar de novo com página 0
    
  }, [selectedType])
  // └─ Roda QUANDO? Quando 'selectedType' muda
  // └─ Exemplo: seleciona 'fire' → volta página 0 → busca Fire pokémons

  // ============================================
  // USEEFFECT 3: Filtrar por Tipo
  // ============================================
  useEffect(() => {
    // Este código roda quando 'selectedType', 'pokemons' ou 'page' mudam
    
    if (selectedType === '') {
      // Se nenhum tipo selecionado...
      
      setFilteredPokemons(pokemons)
      // └─ Mostra todos os pokémons
      
      setAllPokemonsOfType([])
      // └─ Limpa a lista de todos
      
    } else {
      // Se tipo foi selecionado...
      
      buscarTodosPokemonsPorTipo(selectedType)
      // └─ Chama função que busca e filtra
    }
    
  }, [selectedType, pokemons, page])
  // └─ Roda QUANDO? selectedType OU pokemons OU page mudam

  // ============================================
  // FUNÇÃO: Buscar Todos os Pokémons de um Tipo
  // ============================================
  const buscarTodosPokemonsPorTipo = async (type) => {
    // 'async' = esta função pode fazer requisições
    // 'type' = tipo a buscar (ex: 'fire')
    
    try {
      // Try = tenta fazer algo
      
      setLoading(true)
      // └─ Mostra "Carregando..."
      
      const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`)
      // ├─ Busca todos os pokémons de um tipo
      // ├─ await = espera a resposta voltar
      // └─ Exemplo: /type/fire retorna TODOS os Fire pokémons
      
      const data = await response.json()
      // └─ Converte resposta em objeto JavaScript
      
      const todosPokemonsDoTipo = data.pokemon.map(p => ({
        // ├─ data.pokemon = array com todos os Fire pokémons
        // ├─ .map() = transforma cada item
        // └─ Resultado: [{name: 'charmander', url: '...'}, ...]
        
        name: p.pokemon.name,
        // └─ Pega nome
        
        url: p.pokemon.url
        // └─ Pega URL (usada para buscar ID)
        
      }))
      
      setAllPokemonsOfType(todosPokemonsDoTipo)
      // └─ Armazena lista completa (para próximas páginas)
      
      // Faz paginação: mostra 20 por página
      const comecoDaPagina = page * 20
      // ├─ Página 0 = começo 0
      // ├─ Página 1 = começo 20
      // └─ Página 2 = começo 40
      
      const fimDaPagina = comecoDaPagina + 20
      // ├─ Página 0 = fim 20 (0-19)
      // ├─ Página 1 = fim 40 (20-39)
      // └─ Página 2 = fim 60 (40-59)
      
      const pokemonsPreDaPaginaAtual = todosPokemonsDoTipo.slice(comecoDaPagina, fimDaPagina)
      // ├─ .slice() = "fatia" a array
      // ├─ Pega só os 20 da página atual
      // └─ Exemplo página 1: pega do índice 20 ao 39
      
      setFilteredPokemons(pokemonsPreDaPaginaAtual)
      // └─ Mostra na tela os 20 desta página
      
    } catch (error) {
      // Catch = se algo der erro
      
      console.error('Erro ao filtrar:', error)
      // └─ Mostra erro no console
      
      setFilteredPokemons(pokemons)
      // └─ Volta aos pokémons normais
      
    } finally {
      // Finally = sempre roda no final (erro ou não)
      
      setLoading(false)
      // └─ Tira "Carregando..."
    }
  }

  // ============================================
  // FUNÇÃO: Pegar ID da URL
  // ============================================
  const getPokemonId = (url) => {
    // url = "https://pokeapi.co/api/v2/pokemon/1/"
    // Quer pegar só o "1"
    
    const parts = url?.split('/').filter(Boolean)
    // ├─ .split('/') = divide por "/"
    // ├─ Resultado: ['https:', '', 'pokeapi.co', 'api', 'v2', 'pokemon', '1', '']
    // ├─ .filter(Boolean) = remove strings vazias
    // └─ Resultado: ['https:', 'pokeapi.co', 'api', 'v2', 'pokemon', '1']
    
    return parts?.[parts.length - 1]
    // ├─ parts.length - 1 = último item do array
    // ├─ parts?.[...] = operador "seguro" (não quebra se não existe)
    // └─ Retorna: '1'
  }

  // ============================================
  // FUNÇÃO: Clique em um Pokémon
  // ============================================
  const handlePokemonClick = async (nome) => {
    // 'nome' = nome do pokémon clicado
    // 'async' = faz requisição
    
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`)
      // └─ Busca dados COMPLETOS deste pokémon
      
      const data = await response.json()
      // ├─ Resposta contém:
      // ├─ {id, name, height, weight, types, abilities, stats, sprites, ...}
      // └─ MUITA informação!
      
      setSelectedPokemon(data)
      // └─ Armazena pokémon completo
      // └─ Isso faz o modal aparecer
      
    } catch (error) {
      console.error('Erro:', error)
    }
  }

  // ============================================
  // FUNÇÃO: Resultado da Busca
  // ============================================
  const handlePokemonSearch = (pokemon) => {
    // 'pokemon' = pokémon encontrado
    
    setSearchedPokemon(pokemon)
    // └─ Armazena resultado
    // └─ Renderiza resultado ao invés da lista
  }

  // ============================================
  // FUNÇÃO: Tipo Selecionado
  // ============================================
  const handleTypeFilter = (type) => {
    // 'type' = tipo selecionado
    
    setSelectedType(type)
    // └─ Atualiza tipo
    // └─ Isso faz useEffect rodar
    // └─ Que busca e filtra pokémons do tipo
  }

  // ============================================
  // RENDERIZAR (O que mostra na tela)
  // ============================================
  return (
    <div className="app">
      {/* Buscador e Filtro */}
      <SearchBar 
        onSearch={handlePokemonSearch}
        // └─ Passa função para Search chamar ao buscar
        
        onFilterByType={handleTypeFilter}
        // └─ Passa função para Search chamar ao filtrar
      />
      
      {/* Se tem resultado de busca, mostra resultado */}
      {searchedPokemon && (
        // └─ && = "SE" há resultado
        // └─ Mostra só se searchedPokemon não é NULL
        
        <div>
          <h2>Resultado da Busca</h2>
          
          <PokemonCard
            nome={searchedPokemon.name}
            // └─ Passa nome do pokémon encontrado
            
            imagem={searchedPokemon.sprites?.other?.['official-artwork']?.front_default || 
                   `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${searchedPokemon.id}.png`}
            // ├─ Tenta buscar imagem oficial
            // ├─ Se não tiver, usa fallback (GitHub raw)
            // └─ ?. = operador seguro (não quebra se não existe)
            
            id={searchedPokemon.id}
            onClick={() => setSelectedPokemon(searchedPokemon)}
            // └─ Clica = abre detalhes (modal)
          />
          
          <button 
            className="ui button" 
            onClick={() => setSearchedPokemon(null)}
            // └─ Clica = volta para lista
          >
            Voltar para Lista
          </button>
        </div>
      )}

      {/* Se NÃO tem busca, mostra lista normal */}
      {!searchedPokemon && (
        // └─ ! = "NÃO"
        // └─ Mostra só se searchedPokemon é NULL
        
        <>
          {/* <> = Fragment (div invisível) */}
          
          <h1>Pokémons - Página {page + 1}</h1>
          {/* └─ page + 1 porque usuário vê página 1, 2, 3... mas código usa 0, 1, 2... */}
          
          {loading && <p className="loading">Carregando pokémons...</p>}
          {/* └─ && = mostra só se loading é TRUE */}
          
          <div className="pokemon-grid">
            {filteredPokemons.map((pokemon) => {
              // ├─ .map() = "para cada pokémon na lista"
              // └─ Renderiza um PokemonCard para cada um
              
              const id = getPokemonId(pokemon.url)
              // └─ Extrai ID da URL
              
              const imagem = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
              // └─ Monta URL da imagem
              
              return (
                <PokemonCard
                  key={pokemon.url}
                  // ├─ key = identificador único
                  // ├─ React usa para saber qual é qual
                  // └─ Não pode usar índice (pode causar bugs)
                  
                  nome={pokemon.name}
                  imagem={imagem}
                  id={id}
                  
                  onClick={() => handlePokemonClick(pokemon.name)}
                  // └─ Clica = chama função que abre detalhes
                />
              )
            })}
          </div>
          
          {/* Botões de Paginação */}
          <div className="pagination">
            <button 
              className="ui blue button" 
              disabled={page <= 0}
              // └─ Desabilita se page é 0 (não pode ir pra trás)
              
              onClick={() => setPage(page - 1)}
              // └─ Clica = page diminui
            >
              Anterior
            </button>
            
            <button 
              className="ui blue button" 
              disabled={filteredPokemons.length < 20}
              // └─ Desabilita se tem menos de 20 (chegou ao fim)
              
              onClick={() => setPage(page + 1)}
              // └─ Clica = page aumenta
            >
              Próximo
            </button>
          </div>
        </>
      )}

      {/* Modal de Detalhes */}
      {selectedPokemon && (
        // └─ Mostra só se selectedPokemon tem dados
        
        <PokemonDetails 
          pokemon={selectedPokemon}
          // └─ Passa pokémon completo
          
          onClose={() => setSelectedPokemon(null)}
          // └─ Clica = fecha modal (volta para NULL)
        />
      )}
    </div>
  )
}

export default App
```

---

## SearchBar.jsx - Comentado

```javascript
import { useState } from 'react'
import './Searchbar.css'

function SearchBar({ onSearch, onFilterByType }) {
  // ├─ onSearch = função que vem do pai (App.jsx)
  // ├─ onFilterByType = outra função do pai
  // └─ Filho chama essas funções para avisar o pai

  // ============================================
  // ESTADO LOCAL (só usa aqui)
  // ============================================
  const [pokemon, setPokemon] = useState('')
  // └─ pokemon = o que o usuário digita
  
  const [loading, setLoading] = useState(false)
  // └─ loading = se está buscando
  
  const [selectedType, setSelectedType] = useState('')
  // └─ selectedType = tipo que selecionou no dropdown

  // ============================================
  // LISTA DE TIPOS DISPONÍVEIS
  // ============================================
  const types = [
    'normal', 'fire', 'water', 'electric', 'grass', 'ice',
    'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
    'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
  ]

  // ============================================
  // FUNÇÃO: Buscar um Pokémon
  // ============================================
  const handleSearch = async () => {
    const searchValue = pokemon.trim().toLowerCase()
    // ├─ .trim() = remove espaços
    // ├─ .toLowerCase() = vira minúsculo
    // └─ Exemplo: "  PIKACHU  " vira "pikachu"

    if (!searchValue) {
      // └─ Se está vazio, não faz nada
      alert('Digite um nome ou ID de pokémon')
      return
    }

    setLoading(true)
    // └─ Mostra "Buscando..."

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchValue}`)
      // └─ Busca pokémon por nome ou ID
      
      if (!response.ok) {
        // └─ Se erro (404, etc)
        throw new Error('Pokémon não encontrado')
      }

      const data = await response.json()
      // └─ Converte em objeto

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
      // └─ Pega os dados importantes

      if (onSearch) {
        onSearch(pokemonData)
        // └─ Avisa o pai (App) que encontrou algo
      }

      setPokemon('')
      // └─ Limpa o input

    } catch (error) {
      alert('Pokémon não encontrado: ' + error.message)
      console.error('Erro:', error)
    } finally {
      setLoading(false)
      // └─ Tira "Buscando..."
    }
  }

  // ============================================
  // FUNÇÃO: Filtrar por Tipo
  // ============================================
  const handleTypeFilter = (e) => {
    const selectedValue = e.target.value
    // └─ Pega o tipo selecionado no dropdown
    
    setSelectedType(selectedValue)
    // └─ Atualiza estado local
    
    if (onFilterByType) {
      onFilterByType(selectedValue)
      // └─ Avisa o pai (App) que filtro mudou
    }
  }

  // ============================================
  // FUNÇÃO: Buscar ao Pressionar Enter
  // ============================================
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      // └─ Se pressionou Enter
      handleSearch()
      // └─ Faz a busca
    }
  }

  // ============================================
  // RENDERIZAR
  // ============================================
  return (
    <div className="search-container">
      {/* Buscador */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Digite o nome ou ID do pokémon..."
          value={pokemon}
          // └─ Mostra o que o usuário digita
          
          onChange={(e) => setPokemon(e.target.value)}
          // └─ Cada vez que digita, atualiza estado
          
          onKeyDown={handleKeyDown}
          // └─ Enter ativa a busca
          
          disabled={loading}
          // └─ Desabilita enquanto está buscando
        />
        
        <button
          type="button"
          className="search-button"
          onClick={handleSearch}
          // └─ Clica = busca
          
          disabled={loading}
          // └─ Desabilita enquanto está buscando
        >
          {loading ? 'Buscando...' : 'Pesquisar'}
          {/* └─ Muda texto dependendo de loading */}
        </button>
      </div>

      {/* Filtro por Tipo */}
      <div className="filter-bar">
        <label htmlFor="type-select">Filtrar por tipo:</label>
        
        <select
          id="type-select"
          value={selectedType}
          // └─ Mostra o tipo selecionado
          
          onChange={handleTypeFilter}
          // └─ Cada vez que muda, atualiza
          
          className="type-select"
        >
          <option value="">Todos os tipos</option>
          {/* └─ Opção padrão */}
          
          {types.map((type) => (
            // └─ Para cada tipo na lista
            
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
              {/* ├─ .charAt(0) = primeiro caractere
                  ├─ .toUpperCase() = maiúsculo
                  └─ .slice(1) = resto da palavra
                  └─ Resultado: "fire" vira "Fire" */}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default SearchBar
```

---

## PokemonCard.jsx - Comentado

```javascript
import './Card.css'

function PokemonCard({ nome, imagem, id, onClick }) {
  // ├─ nome = nome do pokémon (prop do pai)
  // ├─ imagem = URL da imagem (prop do pai)
  // ├─ id = ID do pokémon (prop do pai)
  // └─ onClick = função para quando clica (prop do pai)

  return (
    <div 
      className="pokemon-card" 
      onClick={onClick}
      // └─ Quando clica, executa onClick
      
      style={{ cursor: 'pointer' }}
      // └─ Cursor muda para mão (indica que é clicável)
    >
      <div className="card-image">
        <img 
          src={imagem}
          // └─ Mostra imagem
          
          alt={nome}
          // └─ Texto se imagem não carregar
        />
      </div>

      <div className="card-info">
        <p className="card-id">#{id}</p>
        {/* └─ Mostra ID com # */}
        
        <p className="card-name">{nome}</p>
        {/* └─ Mostra nome */}
      </div>
    </div>
  )
}

export default PokemonCard
```

---

## PokemonDetails.jsx - Comentado (Seções Principais)

```javascript
import './PokemonDetails.css'

function PokemonDetails({ pokemon, onClose }) {
  // ├─ pokemon = objeto completo com TUDO do pokémon
  // └─ onClose = função para fechar modal

  if (!pokemon) return null
  // └─ Se não tem pokémon, não renderiza nada

  return (
    <div className="pokemon-details-overlay">
      {/* Container do modal */}
      
      <div 
        className="pokemon-details-backdrop" 
        onClick={onClose}
        // └─ Fundo escuro - clique para fechar
      ></div>

      <div className="pokemon-details-modal">
        {/* Modal (janela) */}

        <button 
          className="close-btn" 
          onClick={onClose}
          // └─ X para fechar
        >
          ✕
        </button>

        <div className="details-content">
          {/* Conteúdo */}

          {/* Imagem Grande */}
          <div className="details-image">
            <img
              src={pokemon.sprites?.other?.['official-artwork']?.front_default || 
                   `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
              // ├─ Tenta imagem oficial
              // └─ Se não tiver, usa fallback
              
              alt={pokemon.name}
            />
          </div>

          <div className="details-info">
            {/* Informações */}

            <h1>{pokemon.name.toUpperCase()}</h1>
            {/* └─ Nome em maiúscula */}

            <p className="pokemon-id">ID: #{pokemon.id}</p>
            {/* └─ ID */}

            {/* Tipos */}
            <div className="types-section">
              <h3>Tipos:</h3>
              <div className="types-list">
                {pokemon.types?.map((typeObj) => (
                  // └─ Para cada tipo
                  
                  <span 
                    key={typeObj.type.name}
                    // └─ key = identificador único
                    
                    className={`type-badge type-${typeObj.type.name}`}
                    // └─ CSS muda cor por tipo
                  >
                    {typeObj.type.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Altura e Peso */}
            <div className="measurements">
              <div className="measurement-item">
                <strong>Altura:</strong>
                <span>{pokemon.height / 10} m</span>
                {/* └─ API dá em decímetros, divide por 10 para metros */}
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
                    {abilityObj.is_hidden && 
                      <span className="hidden"> (Oculta)</span>
                    }
                  </li>
                ))}
              </ul>
            </div>

            {/* Estatísticas */}
            <div className="stats-section">
              <h3>Estatísticas:</h3>
              <div className="stats-grid">
                {pokemon.stats?.map((statObj) => (
                  <div key={statObj.stat.name} className="stat-item">
                    <div className="stat-name">
                      {statObj.stat.name}
                    </div>
                    <div className="stat-bar">
                      <div 
                        className="stat-fill" 
                        style={{ 
                          width: `${(statObj.base_stat / 150) * 100}%`
                          // └─ Calcula porcentagem (150 = máximo possível)
                        }}
                      ></div>
                    </div>
                    <div className="stat-value">
                      {statObj.base_stat}
                      {/* └─ Número da estatística */}
                    </div>
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
```

---

# Fluxo do Clique Passo-a-Passo

```
USUÁRIO CLICA em PIKACHU
   │
   ▼
PokemonCard → onClick acionado
   │
   ▼
handlePokemonClick('pikachu') é chamada
   │
   ▼
fetch('/pokemon/pikachu') → busca dados
   │
   ▼
response = resposta gigante com tudo
   │
   ▼
data = {
  id: 25,
  name: 'pikachu',
  height: 4,
  weight: 60,
  types: [{ type: { name: 'electric' } }],
  abilities: [...],
  sprites: {...},
  stats: [...]
}
   │
   ▼
setSelectedPokemon(data)
   │
   ▼
Estado MUDA de NULL para data
   │
   ▼
React DETECTA mudança
   │
   ▼
Re-renderiza App
   │
   ▼
{selectedPokemon && <PokemonDetails ... />}
agora é TRUE!
   │
   ▼
PokemonDetails renderiza
   │
   ▼
Modal aparece na tela ✨
```

---

**Pronto!** Agora você tem o código comentado linha por linha! 📚

Leia com calma, entenda cada parte, depois brinque modificando! 🚀
