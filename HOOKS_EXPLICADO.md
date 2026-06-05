# 🎣 Hooks Explicado de Forma MUITO Simples

## O que é um Hook?

Hooks são como **superpoderes** do React. Permitem você usar recursos especiais dentro de componentes.

Os dois principais são:
1. **useState** - para guardar informações
2. **useEffect** - para fazer coisas quando dados mudam

---

## 1️⃣ useState() - Guardar Informações

### A Metáfora do Armário

```javascript
const [email, setEmail] = useState('')
```

É como um armário:
- **`email`** = gaveta do armário (o valor guardado)
- **`setEmail`** = sua mão (função para mudar o que está na gaveta)
- **`useState('')`** = o armário começa vazio

### Na Prática

```javascript
// Começa assim
const [contador, setContador] = useState(0)

console.log(contador)  // Imprime: 0

// Agora você muda
setContador(5)

console.log(contador)  // Imprime: 5 (React re-renderizou o componente!)
```

### Exemplo Real: Pokémon Selecionado

```javascript
const [selectedPokemon, setSelectedPokemon] = useState(null)
//     ^^^^^^^^^^^^^^^^                         ^^^^
//     Gaveta                                   Começa vazio (null)

// Usuário clica em um pokémon
const handleClick = () => {
  setSelectedPokemon({
    name: 'Pikachu',
    type: 'Electric'
  })
  // Agora selectedPokemon = { name: 'Pikachu', type: 'Electric' }
}

// Se selectedPokemon for null (vazio), não mostra
// Se selectedPokemon tiver dados, mostra
{selectedPokemon && <h1>{selectedPokemon.name}</h1>}
```

### ⚠️ IMPORTANTE: Não mude direto!

❌ **ERRADO:**
```javascript
const [pokemon, setPokemon] = useState(null)
pokemon = 'Pikachu'  // ❌ Não funciona! React não sabe que mudou
```

✅ **CERTO:**
```javascript
const [pokemon, setPokemon] = useState(null)
setPokemon('Pikachu')  // ✅ Funciona! React detecta a mudança
```

---

## 2️⃣ useEffect() - Fazer Coisas Quando Dados Mudam

### A Metáfora do Alarme

```javascript
useEffect(() => {
  // Código aqui roda quando as dependências mudam
}, [dependencias])
```

É como um alarme:
- **Código dentro** = o que o alarme faz quando toca
- **Dependências** = o que faz o alarme tocar

### Exemplo 1: Sem Dependências (roda uma vez)

```javascript
useEffect(() => {
  console.log('Componente carregou!')
}, [])  // Array vazio = roda SÓ na primeira vez
```

### Exemplo 2: Com Dependências (roda quando algo muda)

```javascript
const [tipo, setTipo] = useState('')

useEffect(() => {
  console.log('Tipo mudou para:', tipo)
  // Aqui você pode buscar pokémons daquele tipo
}, [tipo])  // Roda toda vez que 'tipo' muda
```

**O que acontece:**
1. Componente carrega → useEffect roda
2. Usuário clica e tipo muda → useEffect roda de novo
3. Se tipo não mudar → useEffect não roda

### Exemplo 3: Na Nossa App Real

```javascript
const [selectedType, setSelectedType] = useState('')
const [pokemons, setPokemons] = useState([])
const [filteredPokemons, setFilteredPokemons] = useState([])

// Toda vez que tipo ou pokemons mudam, filtra a lista
useEffect(() => {
  if (selectedType === '') {
    setFilteredPokemons(pokemons)  // Mostra todos
  } else {
    filterPokemonsByType(selectedType)  // Filtra por tipo
  }
}, [selectedType, pokemons])  // Observadores
```

---

## 🔄 Como Funciona o Fluxo Completo

### Cenário: Usuário Clica em um Pokémon

```
1. Usuário CLICA no card de Pikachu
                ↓
2. handlePokemonClick('pikachu') é CHAMADA
                ↓
3. fetch() busca dados da API (https://pokeapi.co/api/v2/pokemon/pikachu)
                ↓
4. Resultado vem: { id: 25, name: 'pikachu', ... }
                ↓
5. setSelectedPokemon(dados) é CHAMADA
                ↓
6. React detecta que selectedPokemon MUDOU
                ↓
7. React re-renderiza o componente (roda o return() de novo)
                ↓
8. Agora {selectedPokemon && ...} é TRUE, então aparece na tela
                ↓
9. PokemonDetails mostra o modal com detalhes ✨
```

### Cenário: Usuário Muda o Tipo

```
1. Usuário SELECT "Fire" no dropdown
                ↓
2. handleTypeFilter('fire') é CHAMADA
                ↓
3. setSelectedType('fire') muda o estado
                ↓
4. useEffect() DETECTA que selectedType mudou
                ↓
5. Código dentro do useEffect() RODA:
   - filterPokemonsByType('fire')
   - Busca API de tipos
   - Filtra pokémons daquele tipo
   - setFilteredPokemons(resultado)
                ↓
6. React re-renderiza com a nova lista
                ↓
7. Na tela aparecem só pokémons Fire ✨
```

---

## 📊 Comparação: Com vs Sem useEffect

### ❌ Sem useEffect (BUG):

```javascript
const [tipo, setTipo] = useState('')
const [pokemonsFiltrados, setPokemonsFiltrados] = useState([])

const handleSelectTipo = (novoTipo) => {
  setTipo(novoTipo)
  // ❌ Problema: setPokemonsFiltrados não foi chamado aqui!
  // A lista não atualiza
}
```

### ✅ Com useEffect (CORRETO):

```javascript
const [tipo, setTipo] = useState('')
const [pokemonsFiltrados, setPokemonsFiltrados] = useState([])

useEffect(() => {
  // ✅ Toda vez que tipo muda, isso roda
  const filtrados = pokemons.filter(p => p.type === tipo)
  setPokemonsFiltrados(filtrados)
}, [tipo])  // Observar mudanças de tipo

const handleSelectTipo = (novoTipo) => {
  setTipo(novoTipo)  // useEffect detecta e filtra automaticamente
}
```

---

## 💡 Regras de Ouro

### useState()
1. ✅ Use `setEstado()` para mudar, nunca mude direto
2. ✅ Pode ter múltiplos `useState()` no mesmo componente
3. ✅ Deve estar no topo do componente (não dentro de if/loop)

### useEffect()
1. ✅ Dependências são importantes! Sem elas, roda toda render
2. ✅ `[]` vazio = roda uma vez só
3. ✅ `[a, b]` = roda quando a ou b mudam
4. ✅ Deve estar no topo do componente (não dentro de if/loop)

---

## 🎯 Na Nossa App Específico

| Estado | Para Quê? | Muda Quando? |
|--------|-----------|--------------|
| `page` | Qual página da lista | Clica em Anterior/Próximo |
| `pokemons` | Lista de 20 pokémons | Mudança de página |
| `selectedType` | Tipo selecionado | Dropdown de tipo muda |
| `selectedPokemon` | Pokémon clicado | Clica em um card |
| `filteredPokemons` | Lista filtrada por tipo | selectedType muda |
| `searchedPokemon` | Resultado da busca | Clica em "Pesquisar" |

---

## 🧠 Exercício para Praticar

**Modifique o código:**

1. Adicione um `console.log()` no useEffect:

```javascript
useEffect(() => {
  console.log('selectedType mudou para:', selectedType)
  if (selectedType === '') {
    setFilteredPokemons(pokemons)
  } else {
    filterPokemonsByType(selectedType)
  }
}, [selectedType, pokemons])
```

2. Abra o Console (F12) e mude os tipos
3. Veja os logs mostrando cada mudança!
4. Isso ajuda a entender quando o código roda

---

## 📚 Resumo da Aula

- **useState** = guardar informações (gaveta)
- **setEstado** = mudar informações (sua mão)
- **useEffect** = fazer coisas quando dados mudam (alarme)
- **Dependências** = o que observar para o alarme tocar
- **React re-renderiza** = atualiza a tela quando estado muda

É isso! 🎉
