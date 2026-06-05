# 🎮 App Pokémon - Documentação Completa

## 📋 Índice de Documentos

Este projeto tem vários arquivos de documentação para ajudar você a entender e testar:

1. **GUIA_TESTES.md** ← **COMECE AQUI!** 🚀
   - Como testar cada funcionalidade
   - Checklist para garantir que tudo funciona
   - Dicas de debug

2. **HOOKS_EXPLICADO.md** ← Se quer ENTENDER o código
   - Explicação de `useState()` com metáforas
   - Explicação de `useEffect()` com exemplos
   - Exercícios práticos
   - Regras de ouro

3. **FLUXO_DADOS.md** ← Para VER COMO os dados se movem
   - Diagrama de arquitetura
   - Fluxo passo-a-passo de cada ação
   - Árvore de estados
   - Props flow

4. **Este arquivo (README.md)** ← Visão geral

---

## 🚀 Como Rodar o Projeto

### 1. Abra o Terminal na Pasta do Projeto

```bash
cd "c:\Users\pc\Documents\Gabriel vscode\React teste\segundo-react"
```

### 2. Instale as Dependências (primeira vez só)

```bash
npm install
```

### 3. Inicie o Servidor de Desenvolvimento

```bash
npm run dev
```

### 4. Abra no Navegador

A saída do terminal vai mostrar algo como:
```
Local:   http://localhost:5173
```

Copie e cole isso no navegador! 🌐

---

## 📁 Estrutura de Arquivos

```
segundo-react/
├── src/
│   ├── App.jsx                      ← Componente principal (todo o lógica)
│   ├── App.css                      ← Estilos do App
│   ├── pokemon.css                  ← Estilos dos cards
│   ├── index.css                    ← Estilos globais
│   ├── main.jsx                     ← Entrada (não mexa!)
│   ├── components/
│   │   ├── SearchBar.jsx            ← Buscador e Filtro por Tipo
│   │   ├── Searchbar.css            ← Estilos de SearchBar
│   │   ├── PokemonCard.jsx          ← Card individual (clicável)
│   │   ├── Card.css                 ← Estilos de Card
│   │   ├── PokemonDetails.jsx       ← Modal de detalhes (NOVO!)
│   │   └── PokemonDetails.css       ← Estilos do Modal (NOVO!)
│   └── assets/
├── package.json                     ← Dependências do projeto
├── vite.config.js                   ← Configuração do Vite
│
├── GUIA_TESTES.md                   ← Como testar ✅
├── HOOKS_EXPLICADO.md               ← Tutorial de hooks 📚
├── FLUXO_DADOS.md                   ← Diagrama de fluxo 🗺️
└── README.md                        ← Este arquivo
```

---

## 🎯 O que Cada Componente Faz

### App.jsx (O Maestro 🎼)
- **Responsabilidade:** Orquestradora principal
- **Estados que gerencia:**
  - `page` - qual página estamos
  - `pokemons` - lista de 20 da página
  - `selectedType` - tipo filtrado
  - `filteredPokemons` - lista após filtro
  - `selectedPokemon` - pokemon clicado
  - `searchedPokemon` - resultado da busca
- **O que faz:**
  - Busca pokémons da API
  - Filtra por tipo
  - Gerencia cliques
  - Renderiza tudo

### SearchBar.jsx (O Buscador 🔍)
- **Responsabilidade:** Busca e Filtro
- **Props:**
  - `onSearch` - callback quando busca
  - `onFilterByType` - callback quando tipo muda
- **O que faz:**
  - Input para digitar nome/ID
  - Botão de pesquisar
  - Dropdown com 18 tipos
  - Manda dados para o pai (App.jsx)

### PokemonCard.jsx (O Card 🎨)
- **Responsabilidade:** Mostrar 1 pokémon
- **Props:**
  - `nome` - nome do pokémon
  - `imagem` - URL da imagem
  - `id` - ID do pokémon
  - `onClick` - função ao clicar
- **O que faz:**
  - Mostra imagem
  - Mostra nome e ID
  - Fica clicável
  - Chama onClick quando clicado

### PokemonDetails.jsx (O Modal 📱)
- **Responsabilidade:** Mostrar detalhes completos
- **Props:**
  - `pokemon` - objeto com dados completos
  - `onClose` - função para fechar
- **O que faz:**
  - Abre um modal (janela)
  - Mostra imagem grande
  - Mostra tipos, altura, peso
  - Mostra habilidades
  - Mostra estatísticas em barras
  - Permite fechar

---

## 🔧 Funcionabilidades Implementadas

### ✅ Listagem de Pokémons
- Mostra 20 pokémons por página
- Cada um com: imagem, nome, ID
- Botões Anterior/Próximo para paginar

### ✅ Busca
- Digita nome ou ID
- Clica "Pesquisar"
- Mostra resultado (se encontrar)
- Botão "Voltar para Lista" para voltar

### ✅ Filtro por Tipo
- Dropdown com 18 tipos
- Seleciona um tipo
- Lista mostra só pokémons daquele tipo
- Primeira opção "Todos" para limpar filtro

### ✅ Detalhes
- Clica em qualquer card
- Abre modal com informações completas:
  - Imagem grande (oficial-artwork)
  - Nome em MAIÚSCULA
  - ID com #
  - Tipos com cores
  - Altura em metros
  - Peso em quilos
  - Habilidades (marca ocultas)
  - Estatísticas (HP, Atk, Def, etc) em barras
- Fecha ao clicar X ou no fundo escuro

---

## 🧠 Conceitos React Usados

| Conceito | Onde? | Por Quê? |
|----------|-------|---------|
| `useState()` | App.jsx | Guardar estados (page, selectedType, etc) |
| `useEffect()` | App.jsx | Buscar pokémons quando página muda, filtrar quando tipo muda |
| `fetch()` | SearchBar.jsx, App.jsx, PokemonCard.jsx | Buscar dados da PokeAPI |
| `async/await` | SearchBar.jsx, App.jsx | Esperar requisição da API |
| **Props** | Todos | Passar dados de pai para filho |
| **Event Handlers** | Todos | onClick, onChange, etc |
| **Conditional Rendering** | App.jsx, PokemonDetails.jsx | Mostrar/esconder elementos |
| **Map/Filter** | App.jsx | Renderizar listas e filtrar |
| **Template Literals** | Todos | Construir URLs dinâmicas |

---

## 🌐 APIs Usadas

### PokeAPI (Pokémon API)
- **URL:** https://pokeapi.co/api/v2/

### Endpoints Utilizados:

1. **Listar Pokémons**
   ```
   GET /pokemon?limit=20&offset=0
   ```

2. **Detalhes de 1 Pokémon**
   ```
   GET /pokemon/{nome_ou_id}
   ```

3. **Pokémons por Tipo**
   ```
   GET /type/{tipo}
   ```

### Imagens

**Oficial Artwork (prioridade):**
```
pokemon.sprites.other['official-artwork'].front_default
```

**Fallback (se não tiver):**
```
https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{id}.png
```

---

## 🛠️ Como Editar o Código

### Se quer adicionar novo tipo:
1. Abra `SearchBar.jsx`
2. Ache a array `types`
3. Adicione o tipo lá:
```javascript
const types = [
  'normal', 'fire', 'water', ...,
  'seu_novo_tipo'  // ← adicione aqui
]
```

### Se quer mudar cores dos tipos:
1. Abra `PokemonDetails.css`
2. Procure por `.type-fire`, `.type-water`, etc
3. Mude as cores (`background`)

### Se quer mostrar mais informações no Modal:
1. Abra `PokemonDetails.jsx`
2. Veja que `pokemon` tem todos os dados
3. Adicione uma nova seção copiando a estrutura

---

## 🐛 Troubleshooting

### "Pokémon não encontrado"
- Verifique a ortografia
- Tente usar o ID (1, 25, etc)
- Não são todos que existem na API

### Filtro por tipo não funciona
- Verifique se existe pokémon daquele tipo na página
- Teste em outras páginas
- Verifique o console (F12) por erros

### Modal não abre ao clicar
- Clique direto no card (não no fundo branco)
- Abra o console (F12) e veja por erros
- Recarga a página

### Imagens não carregam
- Pode ser conexão lenta
- Recarregue a página
- Verifique se o navegador permite carregar imagens externas

---

## 💡 Próximos Passos Sugeridos

1. **Entender Hooks:**
   - Leia `HOOKS_EXPLICADO.md`
   - Pratique modificando states

2. **Entender Fluxo:**
   - Leia `FLUXO_DADOS.md`
   - Abra DevTools e veja mudanças

3. **Testar Tudo:**
   - Siga `GUIA_TESTES.md`
   - Garanta que funciona

4. **Modificar:**
   - Tente mudar cores
   - Adicione novos tipos
   - Mude o layout

5. **Aprender Mais:**
   - Adicionar localStorage (salvar favoritos)
   - Adicionar loading spinner
   - Melhorar responsividade mobile

---

## 📞 Referências Rápidas

### Variáveis Importantes em App.jsx

```javascript
// Página atual (0, 1, 2, ...)
page

// Lista de 20 pokémons ({name, url})
pokemons

// Tipo selecionado ('fire', 'water', '', etc)
selectedType

// Lista após aplicar filtro de tipo
filteredPokemons

// Pokémon clicado (objeto completo da API)
selectedPokemon

// Resultado da busca (objeto completo da API)
searchedPokemon
```

### Funções Importantes em App.jsx

```javascript
// Busca dados completos de 1 pokémon
handlePokemonClick(nome)

// Trata resultado da busca
handlePokemonSearch(pokemon)

// Trata seleção de tipo
handleTypeFilter(type)

// Filtra pokémons por tipo
filterPokemonsByType(type)
```

---

## ✅ Checklist Final

- [ ] Leu este README
- [ ] Conseguiu rodar `npm run dev`
- [ ] Vê a lista de pokémons
- [ ] Consegue paginar
- [ ] Consegue buscar
- [ ] Consegue filtrar por tipo
- [ ] Consegue clicar e ver detalhes
- [ ] Consegue fechar o modal
- [ ] Leu `HOOKS_EXPLICADO.md`
- [ ] Entende como useState funciona
- [ ] Entende como useEffect funciona
- [ ] Leu `FLUXO_DADOS.md`
- [ ] Entende o fluxo geral

---

## 🎉 Parabéns!

Você agora tem uma app Pokémon funcional e bem estruturada em React! 

**Próximo passo:** Comece a experimentar, modificar, quebrar e aprender! 

*Happy Coding! 🚀*
