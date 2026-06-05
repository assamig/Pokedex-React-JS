# 🎮 Guia de Testes - App Pokémon

## 🚀 Como Testar Cada Funcionalidade

### 1️⃣ **Listar 20 Pokémons**
- Abra o app
- Vê os 20 primeiros pokémons com nome, ID e imagem? ✅
- Clique em "Próximo" → vê mais 20? ✅
- Clique em "Anterior" → volta? ✅

---

### 2️⃣ **Buscar por Nome/ID**
- Digite "pikachu" na barra de busca → clique "Pesquisar"
- Mostra um pikachu? ✅
- Digite "1" → clique "Pesquisar"
- Mostra um Bulbasaur (ID 1)? ✅
- Clique "Voltar para Lista" → volta aos 20? ✅

**Dica:** Pode usar parte do nome também!

---

### 3️⃣ **Filtrar por Tipo**
- Selecione "Fire" no dropdown "Filtrar por tipo"
- Lista atualiza para mostrar só pokémons Fire? ✅
- Mude para "Water"
- Mostra só pokémons Water? ✅
- Selecione "Todos os tipos" (primeira opção)
- Volta a mostrar os 20 normais? ✅

---

### 4️⃣ **Ver Detalhes de um Pokémon**
- **Na lista normal:** Clique em qualquer card de pokémon
- Abre uma janela (modal) com detalhes? ✅
- **Informações visíveis:**
  - [ ] Imagem grande
  - [ ] Nome em MAIÚSCULA
  - [ ] ID (#123)
  - [ ] Tipos (Fire, Water, etc)
  - [ ] Altura em metros
  - [ ] Peso em quilos
  - [ ] Habilidades (com marca de "oculta" se tiver)
  - [ ] Estatísticas em barras (HP, Attack, Defense, Sp. Atk, Sp. Def, Speed)

---

### 5️⃣ **Fechar Detalhes**
- Clique no X no canto superior direito da janela
- Fecha e volta à lista? ✅
- Clique em um pokémon novamente
- Clique no fundo escuro (backdrop)
- Também fecha? ✅

---

### 6️⃣ **Busca + Clique em Detalhes**
- Busque um pokémon (tipo "charmander")
- Clique no card que aparece
- Abre os detalhes de Charmander? ✅
- Clique "Voltar para Lista"
- Lista normal volta? ✅

---

## 🧪 Teste Avançado (Entender o Código)

### Abra o Console (F12)
Adicione este código em `App.jsx` para ver o fluxo:

```javascript
console.log('Página atual:', page)
console.log('Pokemons carregados:', pokemons.length)
console.log('Tipo filtrado:', selectedType)
console.log('Pokemon selecionado:', selectedPokemon?.name)
```

Abra o DevTools → Console e veja os valores mudarem conforme interage!

---

## 📋 Checklist Final

- [ ] Listagem de 20 pokémons funciona
- [ ] Paginação (Anterior/Próximo) funciona
- [ ] Busca por nome/ID funciona
- [ ] Filtro por tipo funciona
- [ ] Clique em card abre detalhes
- [ ] Modal de detalhes mostra tudo correto
- [ ] Fechar modal funciona
- [ ] Sem erros no console (F12)

---

## 💡 Dicas para Debugar

**Se um pokémon não aparecer na busca:**
- Verifique o console (F12) por mensagens de erro
- Tente com ID (ex: 1, 2, 3)

**Se o filtro não funcionar:**
- Verifique se selecionou um tipo
- Talvez nenhum pokémon daquele tipo esteja nesta página
- Teste em outras páginas

**Se o modal não aparecer:**
- Clique em um card (não no fundo branco, clique no card mesmo)
- Abra o console e veja se há erro

---

## 📞 Conceitos que Aparece Aqui

| Conceito | Onde Usa |
|----------|----------|
| `useState()` | Guardar pokemon selecionado, tipo filtrado |
| `useEffect()` | Atualizar lista quando tipo muda |
| `fetch()` | Buscar dados da PokeAPI |
| `async/await` | Esperar a resposta da API |
| Props | Passar dados entre componentes |
| Conditional Rendering | Mostrar/esconder modal e listas |

