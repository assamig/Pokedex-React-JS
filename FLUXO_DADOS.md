# 🗺️ Mapa Mental - Fluxo da App Pokémon

## Arquitetura Geral

```
┌─────────────────────────────────────────────┐
│           App.jsx (Componente Pai)          │
│                                             │
│  Estado:                                    │
│  - page (página)                            │
│  - pokemons (lista de 20)                   │
│  - selectedType (tipo filtrado)             │
│  - filteredPokemons (lista após filtro)     │
│  - selectedPokemon (pokemon clicado)        │
│  - searchedPokemon (resultado busca)        │
│                                             │
└────────┬────────────────────────────────────┘
         │
         ├─────────────────────────────┬────────────────────────┬──────────────────┐
         │                             │                        │                  │
         ▼                             ▼                        ▼                  ▼
    ┌─────────────┐           ┌──────────────────┐      ┌──────────────┐   ┌─────────────┐
    │SearchBar    │           │PokemonCard       │      │PokemonDetails│   │PokemonCard  │
    │(Buscador)   │           │(Cada card)       │      │(Modal)       │   │(List)       │
    │             │           │                  │      │              │   │             │
    │- Input      │           │onClick →         │      │- Imagem      │   │Renderiza    │
    │- Dropdown   │           │handlePokemonClick│      │- Detalhes    │   │cada pokemon │
    │  tipo       │           │                  │      │- Fechar      │   │da lista     │
    │             │           │selectedPokemon   │      │              │   │             │
    │Props:       │           │é atualizado      │      │Props:        │   │Props:       │
    │-onSearch   │           │                  │      │- pokemon     │   │- nome       │
    │-onFilterBy │           │Props:            │      │- onClose     │   │- imagem     │
    │ Type        │           │- nome            │      │              │   │- id         │
    │             │           │- imagem          │      │Condicional:  │   │- onClick    │
    └─────────────┘           │- id              │      │Só aparece    │   │             │
                              │- onClick         │      │se pokemon    │   │Condicional: │
                              │                  │      │foi clicado   │   │Renderizado  │
                              └──────────────────┘      └──────────────┘   │em mapa      │
                                                                           └─────────────┘
```

---

## Fluxo de Dados 1: Listar Pokémons

```
1. App carrega
   ↓
2. useEffect roda (com dependência [page])
   ↓
3. fetch(`/pokemon?limit=20&offset=${page*20}`)
   ↓
4. setPokemons(data.results)
   ↓
5. React re-renderiza
   ↓
6. Mapeia cada pokemon para um <PokemonCard>
   ↓
7. Na tela aparecem 20 cards com:
   - Imagem (do GitHub raw)
   - Nome
   - ID

✅ RESULTADO: Lista de 20 pokémons
```

---

## Fluxo de Dados 2: Buscar por Nome/ID

```
Usuário digita "pikachu" e clica "Pesquisar"
   ↓
SearchBar → handleSearch()
   ↓
fetch(`/pokemon/pikachu`)
   ↓
const pokemonData = { id, name, sprites, ... }
   ↓
onSearch(pokemonData)  [prop do SearchBar]
   ↓
App → handlePokemonSearch(pokemon)
   ↓
setSearchedPokemon(pokemon)
   ↓
React re-renderiza
   ↓
{searchedPokemon && <div>Mostra resultado</div>}
   ↓
✅ RESULTADO: Mostra 1 card grande com Pikachu
```

---

## Fluxo de Dados 3: Filtrar por Tipo

```
Usuário seleciona "Fire" no dropdown
   ↓
SearchBar → handleTypeFilter('fire')
   ↓
onFilterByType('fire')  [prop do SearchBar]
   ↓
App → handleTypeFilter(type)
   ↓
setSelectedType('fire')
   ↓
useEffect DETECTA mudança de selectedType
   ↓
filterPokemonsByType('fire')
   ↓
fetch(`/type/fire`)
   ↓
data.pokemon contém todos pokémons Fire
   ↓
Filtra só os 20 que estão na página atual
   ↓
setFilteredPokemons(resultado)
   ↓
React re-renderiza
   ↓
{filteredPokemons.map(...)} mostra lista filtrada
   ↓
✅ RESULTADO: Mostra só pokémons Fire da página
```

---

## Fluxo de Dados 4: Clicar em um Pokémon

```
Usuário CLICA em um card
   ↓
PokemonCard → onClick prop acionada
   ↓
App → handlePokemonClick(nome)
   ↓
fetch(`/pokemon/${nome}`)  ← Busca dados COMPLETOS
   ↓
const data contém:
   - id, name
   - sprites (imagem)
   - height, weight
   - abilities
   - stats
   - types
   ↓
setSelectedPokemon(data)
   ↓
React re-renderiza
   ↓
{selectedPokemon && <PokemonDetails ... />}
   ↓
Modal aparece na tela ✨
   ↓
✅ RESULTADO: Abre modal com todos os detalhes
```

---

## Fluxo de Dados 5: Fechar o Modal

```
Usuário clica em X ou no fundo escuro
   ↓
PokemonDetails → onClose prop acionada
   ↓
App → setSelectedPokemon(null)
   ↓
React re-renderiza
   ↓
{selectedPokemon && ...} agora é FALSE
   ↓
Modal desaparece
   ↓
✅ RESULTADO: Volta para lista normal
```

---

## Árvore de Estados

```
App (Pai)
│
├─ page (0, 1, 2, ...) 
│  └─ muda ao clicar Anterior/Próximo
│     └─ useEffect busca novos 20 pokémons
│        └─ setPokemons(dados)
│           └─ Lista re-renderiza
│
├─ pokemons ([...20 pokémons da página])
│  └─ cada um tem: { name, url }
│
├─ selectedType ('fire', 'water', '', ...)
│  └─ muda ao selecionar no dropdown
│     └─ useEffect filtra a lista
│        └─ setFilteredPokemons(resultado)
│           └─ Lista re-renderiza mostrando só aquele tipo
│
├─ filteredPokemons ([...pokémons do tipo selecionado])
│  └─ renderizado em <PokemonCard> múltiplas vezes
│
├─ selectedPokemon ({ id, name, sprites, height, weight, abilities, stats, ... })
│  └─ muda ao clicar em um card
│     └─ <PokemonDetails> renderiza
│        └─ Mostra modal com detalhes completos
│
└─ searchedPokemon ({ id, name, sprites, ... })
   └─ muda ao buscar no SearchBar
      └─ Mostra 1 card grande
         └─ User pode clicar para ver detalhes
```

---

## Props Flow (Passagem de Dados)

```
App
├─ SearchBar
│  ├─ Props: onSearch, onFilterByType
│  └─ Callbacks: handlePokemonSearch(), handleTypeFilter()
│
├─ PokemonCard (renderizado em map)
│  ├─ Props: nome, imagem, id, onClick
│  └─ Callback: handlePokemonClick()
│
└─ PokemonDetails
   ├─ Props: pokemon (dados completos), onClose
   └─ Callback: setSelectedPokemon(null)
```

---

## O que Muda quando Você Interage?

| Ação | Estado que Muda | Efeito |
|------|-----------------|--------|
| Clica "Próximo" | `page` | Lista carrega próximos 20 |
| Clica "Anterior" | `page` | Lista carrega 20 anteriores |
| Digita "pikachu" + Pesquisar | `searchedPokemon` | Mostra 1 resultado |
| Clica "Voltar para Lista" | `searchedPokemon = null` | Volta lista normal |
| Seleciona tipo "Fire" | `selectedType` | Lista filtra Fires |
| Seleciona "Todos tipos" | `selectedType = ''` | Lista volta ao normal |
| Clica em um card | `selectedPokemon` | Abre modal com detalhes |
| Clica X ou fundo | `selectedPokemon = null` | Modal fecha |

---

## Debug: Como Saber o Estado Atual?

Adicione no topo do return() do App.jsx:

```javascript
console.log({
  page,
  pokemonsCount: pokemons.length,
  filteredPokemonsCount: filteredPokemons.length,
  selectedType,
  selectedPokemonName: selectedPokemon?.name,
  searchedPokemonName: searchedPokemon?.name
})
```

Abra F12 → Console e veja os valores mudarem em tempo real! 📊
