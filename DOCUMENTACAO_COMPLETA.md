# 📚 DOCUMENTAÇÃO COMPLETA - App Pokémon

## 🎯 Para Iniciantes Totais em React

---

## 📖 Índice (Comece por aqui!)

1. [O que é React?](#o-que-é-react)
2. [Entender a Estrutura do Projeto](#estrutura-do-projeto)
3. [Os 4 Componentes Principais](#4-componentes)
4. [useState - Guardar Informações](#usestate)
5. [useEffect - Fazer Coisas Automaticamente](#useeffect)
6. [Como os Dados Fluem](#fluxo-de-dados)
7. [Guia Passo-a-Passo: Do Clique ao Modal](#guia-prático)
8. [Erros Comuns e Como Evitar](#erros-comuns)
9. [Como Modificar o Projeto](#como-modificar)

---

# O que é React?

## A Metáfora Mais Simples Possível

Imagine que você é **o gerente de um restaurante** e a **tela do site é o cardápio**.

- **React** = seu sistema de gerenciamento
- **Componentes** = as seções do cardápio (entrada, prato principal, sobremesa)
- **Estado (state)** = informações que mudam (quantidade de pratos, preço)
- **Props** = como você passa informações de um garçom para outro

Quando um **cliente pede algo** → **seu estado muda** → **o cardápio é atualizado automaticamente** ✨

---

## O Que React Faz?

```
1. React "observa" os dados (state)
2. Quando os dados mudam → React detecta
3. React re-desenha a tela (re-render)
4. Usuário vê as mudanças
```

É **tipo um robô que atualiza automaticamente**.

---

# Estrutura do Projeto

## 📁 Visualização Completa

```
segundo-react/
│
├── src/
│   │
│   ├── App.jsx ⭐ (O MAESTRO - controla tudo)
│   │   └─ Estados principais
│   │   └─ Lógica de busca e filtro
│   │   └─ Renderiza os outros componentes
│   │
│   ├── components/ (Os Instrumentos da Orquestra)
│   │   │
│   │   ├── SearchBar.jsx 🔍
│   │   │   └─ Busca por nome/ID
│   │   │   └─ Filtro por tipo
│   │   │
│   │   ├── PokemonCard.jsx 🎨
│   │   │   └─ Mostra 1 pokémon
│   │   │   └─ Clicável para abrir detalhes
│   │   │
│   │   └── PokemonDetails.jsx 📱
│   │       └─ Modal com informações completas
│   │
│   ├── App.css (Estilos principais)
│   ├── pokemon.css (Estilos dos cards)
│   └── index.css (Estilos globais)
│
└── package.json (Dependências do projeto)
```

---

## O Fluxo do Arquivo

Quando você abre a página:

```
1. main.jsx é executado primeiro
2. Renderiza <App />
3. App.jsx carrega e roda todos os useEffect()
4. App.jsx renderiza SearchBar, PokemonCard, PokemonDetails
5. Tudo aparece na tela! 🎉
```

---

# 4 Componentes Principais

## 1️⃣ App.jsx - O Maestro 🎼

É o **componente pai** que controla **tudo**.

### O que ele faz?

```javascript
function App() {
  // 1. Armazena os dados (estados)
  // 2. Busca dados da API
  // 3. Filtra dados
  // 4. Renderiza os filhos (SearchBar, PokemonCard, PokemonDetails)
  // 5. Passa dados e funções para os filhos via PROPS
}
```

### Os 7 Estados que App usa:

```javascript
const [page, setPage] = useState(0)
// ├─ O que é: Número da página (0, 1, 2, ...)
// ├─ Muda quando: Clica Anterior/Próximo
// └─ Por quê: Controlar paginação

const [pokemons, setPokemons] = useState([])
// ├─ O que é: Lista de 20 pokémons da página
// ├─ Muda quando: Mudança de página
// └─ Por quê: Armazenar dados da API

const [selectedType, setSelectedType] = useState('')
// ├─ O que é: Tipo filtrado ('fire', 'water', '')
// ├─ Muda quando: Seleciona no dropdown
// └─ Por quê: Controlar qual tipo está filtrado

const [filteredPokemons, setFilteredPokemons] = useState([])
// ├─ O que é: Lista após aplicar filtro
// ├─ Muda quando: Tipo muda
// └─ Por quê: Mostrar apenas pokémons do tipo selecionado

const [selectedPokemon, setSelectedPokemon] = useState(null)
// ├─ O que é: Pokémon clicado (objeto completo)
// ├─ Muda quando: Clica em um card
// └─ Por quê: Abrir modal de detalhes

const [searchedPokemon, setSearchedPokemon] = useState(null)
// ├─ O que é: Resultado da busca
// ├─ Muda quando: Clica "Pesquisar"
// └─ Por quê: Mostrar resultado da busca

const [allPokemonsOfType, setAllPokemonsOfType] = useState([])
// ├─ O que é: TODOS os pokémons de um tipo (não só 20)
// ├─ Muda quando: Seleciona um tipo
// └─ Por quê: Fazer paginação correta dos tipos
```

### Estrutura do Return (O que renderiza)

```jsx
return (
  <div className="app">
    {/* 1. Buscador e Filtro */}
    <SearchBar onSearch={...} onFilterByType={...} />
    
    {/* 2. Se há resultado de busca, mostra resultado */}
    {searchedPokemon && (
      <div>
        <h2>Resultado</h2>
        <PokemonCard ... />
      </div>
    )}
    
    {/* 3. Se não há busca, mostra lista normal */}
    {!searchedPokemon && (
      <div>
        <h1>Lista de Pokémons</h1>
        {filteredPokemons.map(pokemon => (
          <PokemonCard key={pokemon.url} ... />
        ))}
        {/* Botões Anterior/Próximo */}
      </div>
    )}
    
    {/* 4. Modal de detalhes (sobrepõe tudo) */}
    {selectedPokemon && <PokemonDetails pokemon={...} />}
  </div>
)
```

---

## 2️⃣ SearchBar.jsx - O Buscador 🔍

Responsável por **buscar pokémons** e **filtrar por tipo**.

### Como funciona:

```javascript
function SearchBar({ onSearch, onFilterByType }) {
  // PROPS = dados que vem do pai (App.jsx)
  // onSearch = função para enviar resultado da busca para o pai
  // onFilterByType = função para enviar tipo filtrado para o pai

  const [pokemon, setPokemon] = useState('')
  // Estado LOCAL (só usa neste componente)
  // Guarda o que o usuário digita no input
  
  const handleSearch = async () => {
    // 1. Pega o que o usuário digitou
    const searchValue = pokemon.trim().toLowerCase()
    
    // 2. Valida
    if (!searchValue) {
      alert('Digite algo!')
      return
    }
    
    // 3. Busca na API
    const response = await fetch(`/pokemon/${searchValue}`)
    const data = await response.json()
    
    // 4. Manda o resultado de volta para App.jsx
    onSearch(data)  // ← IMPORTANTE! Passa dados para o pai
    
    // 5. Limpa o input
    setPokemon('')
  }
  
  const handleTypeFilter = (e) => {
    const type = e.target.value
    
    // Manda o tipo para App.jsx
    onFilterByType(type)  // ← IMPORTANTE! Passa dados para o pai
  }
}
```

### O que renderiza:

```jsx
return (
  <div className="search-container">
    {/* Input de busca */}
    <input
      placeholder="Digite o nome ou ID..."
      value={pokemon}
      onChange={(e) => setPokemon(e.target.value)}
    />
    <button onClick={handleSearch}>Pesquisar</button>
    
    {/* Dropdown de tipos */}
    <select onChange={handleTypeFilter}>
      <option value="">Todos os tipos</option>
      <option value="fire">Fire</option>
      <option value="water">Water</option>
      {/* ... etc */}
    </select>
  </div>
)
```

---

## 3️⃣ PokemonCard.jsx - O Card 🎨

Mostra **1 pokémon** de forma simples.

### Como funciona:

```javascript
function PokemonCard({ nome, imagem, id, onClick }) {
  // PROPS = dados que vem do pai (App.jsx)
  // nome = nome do pokémon
  // imagem = URL da imagem
  // id = ID do pokémon
  // onClick = função para chamar quando clica
  
  return (
    <div className="pokemon-card" onClick={onClick}>
      {/* Quando clica neste div, roda onClick() */}
      
      <div className="card-image">
        <img src={imagem} alt={nome} />
      </div>
      
      <div className="card-info">
        <p>#{id}</p>
        <p>{nome}</p>
      </div>
    </div>
  )
}
```

### O que é simples aqui:

- ✅ Não tem estado próprio
- ✅ Só recebe dados (props)
- ✅ Renderiza o que recebe
- ✅ Chama onClick quando clicado

É um componente **"burro"** (no bom sentido) - só mostra dados! 🧠

---

## 4️⃣ PokemonDetails.jsx - O Modal 📱

Mostra **todas as informações** de um pokémon em uma janela flutuante.

### Como funciona:

```javascript
function PokemonDetails({ pokemon, onClose }) {
  // PROPS
  // pokemon = objeto com TODAS as informações do pokémon
  // onClose = função para chamar quando fecha
  
  if (!pokemon) return null  // Se não há pokémon, não renderiza
  
  return (
    <div className="pokemon-details-overlay">
      {/* Fundo escuro (clique para fechar) */}
      <div 
        className="pokemon-details-backdrop" 
        onClick={onClose}  // Quando clica no fundo, fecha
      ></div>
      
      {/* Modal (janela) */}
      <div className="pokemon-details-modal">
        {/* Botão X para fechar */}
        <button onClick={onClose}>✕</button>
        
        {/* Conteúdo */}
        <div className="details-content">
          {/* Imagem */}
          <img src={pokemon.sprites.other['official-artwork'].front_default} />
          
          {/* Nome */}
          <h1>{pokemon.name}</h1>
          
          {/* Tipos */}
          {pokemon.types.map(t => (
            <span className={`type-badge type-${t.type.name}`}>
              {t.type.name}
            </span>
          ))}
          
          {/* Altura e Peso */}
          <p>Altura: {pokemon.height / 10} m</p>
          <p>Peso: {pokemon.weight / 10} kg</p>
          
          {/* Habilidades */}
          {pokemon.abilities.map(a => (
            <li>{a.ability.name}</li>
          ))}
          
          {/* Estatísticas */}
          {pokemon.stats.map(s => (
            <div className="stat">
              <div className="stat-bar" style={{width: s.base_stat}}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
```

### Estrutura do Modal:

```
┌─────────────────────────────────────┐
│ X    PIKACHU                        │  ← Botão fechar
├─────────────────────────────────────┤
│                                     │
│  [Imagem]      PIKACHU #25         │
│                Type: Electric      │
│                Altura: 0.4 m       │
│                Peso: 6 kg          │
│                                     │
│  Habilidades:                       │
│  - Static                           │
│  - Lightning Rod                    │
│                                     │
│  Estatísticas:                      │
│  HP:     ████████░░  35             │
│  ATK:    ███████░░░  55             │
│  DEF:    ███░░░░░░░  40             │
│  ...                                │
│                                     │
└─────────────────────────────────────┘
```

---

# useState - Guardar Informações

## A Metáfora do Armário 🚪

Imagine um **armário de cozinha**:

```
const [quantidade, setQuantidade] = useState(5)
//     ^^^^^^^^^^                 ^^^^^^^^^^^
//     Gaveta (guardar)           Mão (mudar)
```

### Funcionando:

```javascript
// Lê o valor
console.log(quantidade)  // Imprime: 5

// Muda o valor
setQuantidade(10)  // Agora quantidade = 10
console.log(quantidade)  // Imprime: 10

// React re-renderiza a tela automaticamente! ✨
```

### Por que não fazer assim?

```javascript
❌ ERRADO:
let quantidade = 5
quantidade = 10  // Muda, mas React não sabe!
// Tela NÃO atualiza

✅ CERTO:
const [quantidade, setQuantidade] = useState(5)
setQuantidade(10)  // React detecta a mudança
// Tela ATUALIZA automaticamente!
```

## Exemplos do Projeto

### Exemplo 1: Guardar o que o usuário digita

```javascript
const [pokemon, setPokemon] = useState('')

// Input
<input 
  value={pokemon}
  onChange={(e) => setPokemon(e.target.value)}
/>

// Fluxo:
// 1. Usuário digita "pikachu"
// 2. onChange é chamado
// 3. setPokemon('pikachu') atualiza o estado
// 4. React re-renderiza o input com novo valor
```

### Exemplo 2: Guardar tipo selecionado

```javascript
const [selectedType, setSelectedType] = useState('')

// Dropdown
<select onChange={(e) => setSelectedType(e.target.value)}>
  <option value="">Todos</option>
  <option value="fire">Fire</option>
  <option value="water">Water</option>
</select>

// Fluxo:
// 1. Usuário seleciona "fire"
// 2. onChange é chamado
// 3. setSelectedType('fire') atualiza
// 4. useEffect detecta mudança
// 5. Filtra pokémons automaticamente
```

### Exemplo 3: Guardar pokémon clicado

```javascript
const [selectedPokemon, setSelectedPokemon] = useState(null)

// Card
<PokemonCard 
  onClick={() => setSelectedPokemon(pokemonCompleto)}
/>

// Modal
{selectedPokemon && <PokemonDetails pokemon={selectedPokemon} />}

// Fluxo:
// 1. Usuário clica no card
// 2. setSelectedPokemon(dados) é chamado
// 3. Estado muda de null para dados
// 4. Condicional {selectedPokemon && ...} agora é TRUE
// 5. Modal aparece na tela! ✨
```

---

# useEffect - Fazer Coisas Automaticamente

## A Metáfora do Alarme ⏰

```javascript
useEffect(() => {
  // Código aqui roda quando algo muda
  console.log('Algo mudou!')
}, [dependencias])
```

É como um **alarme que toca quando algo específico acontece**.

## 3 Formas Diferentes de Usar

### Forma 1: Roda Uma Vez (quando carrega)

```javascript
useEffect(() => {
  console.log('Componente carregou!')
}, [])  // Array vazio = roda SÓ 1 vez
```

**Quando usar:** 
- Buscar dados da API na primeira vez
- Inicializar variáveis
- Configurar event listeners

### Forma 2: Roda Quando Algo Muda

```javascript
const [page, setPage] = useState(0)

useEffect(() => {
  console.log('Página mudou para:', page)
  // Buscar pokémons da nova página
  fetch(`/pokemon?offset=${page * 20}`)
}, [page])  // Roda quando page muda
```

**Fluxo:**
```
1. Componente carrega → useEffect roda (page = 0)
2. Usuário clica Próximo → page muda para 1
3. useEffect DETECTA mudança → roda de novo
4. Busca pokémons da página 1
5. Mostra na tela
```

### Forma 3: Roda Sempre (não recomendado)

```javascript
useEffect(() => {
  console.log('Renderizou!')
})  // Sem array = roda TODA vez que renderiza
// ⚠️ Cuidado: pode causar loop infinito!
```

## Exemplos do Projeto

### Exemplo 1: Buscar Pokémons da Página

```javascript
// Em App.jsx
const [page, setPage] = useState(0)
const [pokemons, setPokemons] = useState([])

useEffect(() => {
  // 1. Carrega dados da API
  fetch(`/pokemon?limit=20&offset=${page * 20}`)
    .then(response => response.json())
    .then(data => setPokemons(data.results))
}, [page])  // Roda quando page muda

// O que acontece:
// - Página 0 (1ª vez): busca pokémons 0-19
// - Clica Próximo → page vira 1
// - useEffect roda de novo: busca pokémons 20-39
// - Clica Anterior → page vira 0
// - useEffect roda de novo: busca pokémons 0-19
```

### Exemplo 2: Reset de Página ao Trocar Tipo

```javascript
const [selectedType, setSelectedType] = useState('')
const [page, setPage] = useState(0)

// Quando tipo muda, volta página para 0
useEffect(() => {
  setPage(0)
}, [selectedType])

// O que acontece:
// - Usuário está na página 5 vendo Fire pokémons
// - Seleciona Water (muda selectedType)
// - useEffect DETECTA mudança
// - setPage(0) volta para página 1
// - Agora vê Water pokémons da página 1
```

### Exemplo 3: Filtrar Pokémons por Tipo

```javascript
const [selectedType, setSelectedType] = useState('')
const [filteredPokemons, setFilteredPokemons] = useState([])

useEffect(() => {
  if (selectedType === '') {
    // Sem tipo selecionado = mostra todos
    setFilteredPokemons(pokemons)
  } else {
    // Com tipo selecionado = filtra
    buscarTodosPokemonsPorTipo(selectedType)
  }
}, [selectedType, page])  // Roda quando tipo ou página muda

// O que acontece:
// - Usuário seleciona "Fire"
// - useEffect detecta mudança
// - buscarTodosPokemonsPorTipo('fire') é chamada
// - API retorna TODOS os pokémons Fire
// - Filtra para mostrar 20 por página
// - setFilteredPokemons atualiza
// - Tela mostra Fire pokémons!
```

---

# Fluxo de Dados

## Como os Dados se Movem no Projeto

### Visão Geral (Big Picture)

```
                    ┌─────────────┐
                    │  App.jsx    │
                    │  (Pai)      │
                    └──────┬──────┘
                           │
            ┌──────────────┼──────────────┐
            │              │              │
            ▼              ▼              ▼
        ┌────────┐   ┌──────────┐   ┌──────────┐
        │Search  │   │Pokemon   │   │Pokemon   │
        │Bar     │   │Card      │   │Details   │
        │(Filho) │   │(Filho)   │   │(Filho)   │
        └────────┘   └──────────┘   └──────────┘
```

### Props vs Estado

```javascript
// ❌ Estado (só guardar em App.jsx)
const [pokemons, setPokemons] = useState([])  // Aqui!

// ✅ Props (passar para filhos)
<PokemonCard pokemons={pokemons} />  // Para cá!
```

**Regra de Ouro:**
- 📍 Estado fica no componente pai (App)
- 📍 Props descem para filhos (SearchBar, PokemonCard, etc)
- 📍 Eventos (onClick) sobem (filho chama função do pai)

### Exemplo: Usuário Clica em um Pokémon

```
1. Usuário CLICA no card
   ↓
2. PokemonCard → onClick é acionado
   ↓
3. Chama a função que recebeu via PROPS
   handlePokemonClick(nome)  ← vem de App.jsx
   ↓
4. App.jsx → handlePokemonClick roda
   - Busca dados completos da API
   - setSelectedPokemon(dados)
   ↓
5. Estado selectedPokemon MUDA
   ↓
6. React re-renderiza
   ↓
7. {selectedPokemon && <PokemonDetails ...>}
   Agora é TRUE! Modal aparece
   ↓
8. PokemonDetails recebe pokemon como PROPS
   ↓
9. Modal mostra na tela ✨
```

---

# Guia Prático: Do Clique ao Modal

## Cenário Real: Clique em Pikachu

### Passo 1: O Clique

```javascript
// PokemonCard.jsx renderiza:
<div 
  className="pokemon-card" 
  onClick={onClick}  // ← Espera um clique
>
  <img src="pikachu.png" />
  <p>Pikachu</p>
</div>

// Usuário CLICA
// onClick é acionado com o valor passado em:
// <PokemonCard onClick={() => handlePokemonClick('pikachu')} />
```

### Passo 2: Buscar Dados Completos

```javascript
// App.jsx
const handlePokemonClick = async (nome) => {
  // 1. Nome recebido: 'pikachu'
  // 2. Busca dados completos
  const response = await fetch(`/pokemon/pikachu`)
  
  // 3. Resposta é um objeto GIGANTE com:
  // {
  //   id: 25,
  //   name: 'pikachu',
  //   height: 4,
  //   weight: 60,
  //   types: [{type: {name: 'electric'}}],
  //   abilities: [{ability: {name: 'static'}}],
  //   sprites: {other: {official-artwork: {front_default: 'url...'}}},
  //   stats: [{stat: {name: 'hp'}, base_stat: 35}, ...]
  // }
  
  const data = await response.json()
  
  // 4. Atualiza estado
  setSelectedPokemon(data)
}
```

### Passo 3: Estado Muda

```javascript
// Antes:
selectedPokemon = null

// Depois de setSelectedPokemon(data):
selectedPokemon = {
  id: 25,
  name: 'pikachu',
  height: 4,
  weight: 60,
  types: [...],
  abilities: [...],
  sprites: {...},
  stats: [...]
}

// React DETECTA mudança!
// Re-renderiza o componente todo
```

### Passo 4: Renderizar Modal

```javascript
// App.jsx renderiza:
{selectedPokemon && <PokemonDetails pokemon={selectedPokemon} />}

// Antes: selectedPokemon era NULL → condição FALSE → não renderiza
// Depois: selectedPokemon tem dados → condição TRUE → RENDERIZA!

// PokemonDetails recebe via PROPS:
function PokemonDetails({ pokemon }) {
  // pokemon = aquele objeto gigante do Pikachu
  return (
    <div className="modal">
      <img src={pokemon.sprites.other['official-artwork'].front_default} />
      <h1>{pokemon.name.toUpperCase()}</h1>
      <p>Altura: {pokemon.height / 10} m</p>
      <p>Peso: {pokemon.weight / 10} kg</p>
      
      {/* Tipos */}
      {pokemon.types.map(t => (
        <span className={`type type-${t.type.name}`}>
          {t.type.name}
        </span>
      ))}
      
      {/* Habilidades */}
      {pokemon.abilities.map(a => (
        <li>{a.ability.name}</li>
      ))}
      
      {/* Estatísticas */}
      {pokemon.stats.map(s => (
        <div className="stat">
          <span>{s.stat.name}</span>
          <div className="bar" style={{width: s.base_stat}}>
            {s.base_stat}
          </div>
        </div>
      ))}
    </div>
  )
}
```

### Passo 5: Fechar Modal

```javascript
// PokemonDetails renderiza:
<button onClick={onClose}>✕</button>

// Ou:
<div 
  className="backdrop" 
  onClick={onClose}  // Clique no fundo escuro
></div>

// onClose é a função do App.jsx:
<PokemonDetails 
  pokemon={selectedPokemon} 
  onClose={() => setSelectedPokemon(null)}  // ← Aqui!
/>

// Quando clica:
// onClose() é chamada
// setSelectedPokemon(null) é executada
// selectedPokemon volta a ser NULL
// React re-renderiza
// {selectedPokemon && ...} agora é FALSE
// Modal desaparece! ✨
```

---

# Erros Comuns e Como Evitar

## ❌ Erro 1: Mudar Estado Diretamente

```javascript
❌ ERRADO:
const [pokemon, setPokemon] = useState('pikachu')
pokemon = 'charmander'  // Mudou, mas React não sabe!
// Tela NÃO atualiza

✅ CERTO:
const [pokemon, setPokemon] = useState('pikachu')
setPokemon('charmander')  // React sabe e atualiza!
// Tela ATUALIZA
```

## ❌ Erro 2: Usar Index como Key em Listas

```javascript
❌ ERRADO:
{pokemons.map((pokemon, index) => (
  <PokemonCard key={index} ... />
))}
// Quando ordena lista → index muda → confunde React

✅ CERTO:
{pokemons.map((pokemon) => (
  <PokemonCard key={pokemon.url} ... />
))}
// URL é única → React sempre sabe qual é qual
```

## ❌ Erro 3: useEffect Sem Dependências Corretas

```javascript
❌ ERRADO:
useEffect(() => {
  fetch(`/pokemon?page=${page}`)
}, [])  // Array vazio = roda uma vez
// Mudou page, mas useEffect não roda de novo!
// Continua buscando página 0

✅ CERTO:
useEffect(() => {
  fetch(`/pokemon?page=${page}`)
}, [page])  // Roda quando page muda
// Cada vez que page muda, busca dados novos
```

## ❌ Erro 4: Loop Infinito

```javascript
❌ ERRADO:
useEffect(() => {
  setPage(page + 1)  // Muda page
})  // Sem array = roda sempre
// Fluxo:
// 1. renderiza
// 2. useEffect roda → setPage(page + 1)
// 3. page muda → re-renderiza
// 4. useEffect roda de novo → setPage(page + 2)
// 5. page muda → re-renderiza
// NUNCA PARA! 😱

✅ CERTO:
useEffect(() => {
  console.log('Renderizou com page:', page)
}, [page])
// Só roda quando page muda, não causa loop
```

## ❌ Erro 5: Esquecer de Retornar em Map

```javascript
❌ ERRADO:
{pokemons.map((pokemon) => {
  const id = getPokemonId(pokemon.url)
  const imagem = `url/${id}.png`
  // Faltou o RETURN!
})}

✅ CERTO:
{pokemons.map((pokemon) => {
  const id = getPokemonId(pokemon.url)
  const imagem = `url/${id}.png`
  
  return (
    <PokemonCard key={pokemon.url} nome={pokemon.name} />
  )
})}
```

---

# Como Modificar o Projeto

## 🎨 Quer Mudar Cores dos Tipos?

Abra `src/components/PokemonDetails.css` e procure:

```css
.type-fire { background: #F08030; }
.type-water { background: #6890F0; }
.type-electric { background: #F8D030; }
/* etc */
```

Mude as cores `background` para as que quer!

---

## ➕ Quer Adicionar um Novo Tipo?

Abra `src/components/SearchBar.jsx` e procure:

```javascript
const types = [
  'normal', 'fire', 'water', 'electric', 'grass',
  // ... adicione seu tipo aqui
  'seu-novo-tipo'
]
```

Pronto! Vai aparecer no dropdown!

---

## 📊 Quer Mostrar Mais Informações no Modal?

Abra `src/components/PokemonDetails.jsx` e adicione após `stats`:

```jsx
{/* Novo: Experiência Base */}
<div className="exp-section">
  <h3>Experiência Base:</h3>
  <p>{pokemon.base_experience}</p>
</div>

{/* Novo: Taxa de Captura */}
<div className="catch-section">
  <h3>Taxa de Captura:</h3>
  <p>{pokemon.capture_rate}%</p>
</div>

{/* Novo: Moves (Ataques) - mostra os 4 primeiros */}
<div className="moves-section">
  <h3>Ataques:</h3>
  <ul>
    {pokemon.moves.slice(0, 4).map(m => (
      <li key={m.move.name}>{m.move.name}</li>
    ))}
  </ul>
</div>
```

---

## 🔍 Quer Filtrar Também por Geração?

1. Abra `src/App.jsx`
2. Adicione novo estado:

```javascript
const [selectedGeneration, setSelectedGeneration] = useState('')
```

3. Abra `src/components/SearchBar.jsx`
4. Adicione novo select:

```jsx
<select onChange={(e) => onFilterByGeneration(e.target.value)}>
  <option value="">Todas as gerações</option>
  <option value="generation-i">Gen 1</option>
  <option value="generation-ii">Gen 2</option>
</select>
```

5. Em `App.jsx`, implemente a lógica de filtro similar ao tipo

---

## 💾 Quer Salvar Pokémons Favoritos?

Adicione em `App.jsx`:

```javascript
const [favoritos, setFavoritos] = useState([])

// Função para adicionar/remover favorito
const toggleFavorito = (id) => {
  if (favoritos.includes(id)) {
    // Remove
    setFavoritos(favoritos.filter(f => f !== id))
  } else {
    // Adiciona
    setFavoritos([...favoritos, id])
  }
}

// Salva no navegador (localStorage)
useEffect(() => {
  localStorage.setItem('favoritos', JSON.stringify(favoritos))
}, [favoritos])

// Carrega ao iniciar
useEffect(() => {
  const saved = localStorage.getItem('favoritos')
  if (saved) setFavoritos(JSON.parse(saved))
}, [])
```

---

## 🎯 Quer Mostrar Apenas Favoritos?

Adicione estado:

```javascript
const [showFavoritos, setShowFavoritos] = useState(false)

// Filtrar
const pokemonsParaMostrar = showFavoritos 
  ? filteredPokemons.filter(p => favoritos.includes(getPokemonId(p.url)))
  : filteredPokemons
```

Renderize:

```jsx
<button onClick={() => setShowFavoritos(!showFavoritos)}>
  {showFavoritos ? 'Mostrando Favoritos' : 'Mostrando Todos'}
</button>

{pokemonsParaMostrar.map(pokemon => ...)}
```

---

# Glossário para Iniciantes

| Termo | Significado | Exemplo |
|-------|-------------|---------|
| **Component** | Peça reutilizável da interface | `PokemonCard` |
| **State** | Dados que mudam no tempo | `selectedPokemon` |
| **Props** | Dados do pai para filho | `nome={pokemon.name}` |
| **Hook** | Função especial do React | `useState`, `useEffect` |
| **useState** | Hook para guardar dados | `const [x, setX] = useState(0)` |
| **useEffect** | Hook para fazer coisas automaticamente | `useEffect(() => {...}, [dep])` |
| **Render** | Desenhar na tela | Quando React mostra o componente |
| **Re-render** | Desenhar de novo | Quando estado muda |
| **Fetch** | Buscar dados da internet | `fetch('/api/pokemon')` |
| **Async/Await** | Esperar requisição terminar | `const data = await fetch(...)` |
| **Map** | Repetir para cada item | `array.map(item => ...)` |
| **Key** | Identificador único em listas | `key={pokemon.url}` |
| **Conditional Rendering** | Mostrar/esconder baseado em condição | `{pokemon && <Details />}` |

---

# Resumo Final (TL;DR)

## Os 5 Pontos Principais:

1. **React é declarativo**
   - Você descreve como deve parecer
   - React cuida de atualizar a tela

2. **Estado (state) é tudo**
   - Armazena dados com `useState`
   - Muda com `setState`
   - Re-renderiza automaticamente

3. **useEffect é o "observador"**
   - Roda código quando dependências mudam
   - Usado para buscar dados
   - Importante: sempre coloque dependências corretas

4. **Props descem, eventos sobem**
   - Dados de pai para filho via props
   - Funções de filho para pai via callbacks

5. **Components são blocos reutilizáveis**
   - App = orquestrador
   - SearchBar, PokemonCard, PokemonDetails = jogadores

---

# Exercícios para Praticar

## Exercício 1: Adicionar Contador
Adicione um estado que conta quantas vezes clicou em um pokémon.

## Exercício 2: Mostrar Número de Pokémons
Na lista, mostre quantos pokémons de cada tipo existem.

## Exercício 3: Histórico de Buscas
Guarde as últimas 5 buscas e mostre como um dropdown.

## Exercício 4: Ordenar Pokémons
Adicione opção de ordenar por nome ou ID.

## Exercício 5: Modo Escuro
Adicione um toggle para tema escuro/claro.

---

# Próximos Passos

1. ✅ Leia esta documentação inteira
2. ✅ Abra o projeto e teste cada funcionalidade
3. ✅ Abra DevTools (F12) e veja os states mudando
4. ✅ Tente fazer um dos exercícios
5. ✅ Modifique cores e textos
6. ✅ Adicione uma nova funcionalidade

---

**🎉 Parabéns! Você agora entende React Pokémon!**

Qualquer dúvida, me chama! 🚀
