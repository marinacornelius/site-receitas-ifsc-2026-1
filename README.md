# 🍲 Receitas de Família

Projeto acadêmico desenvolvido para a disciplina de **Programação para Internet I**  
**IFSC — Campus Garopaba · CST em Sistemas para Internet · 2026/1**  
Docente: Prof. André Moraes

---

## Sumário

1. [Sobre o projeto](#sobre-o-projeto)
2. [Estrutura de arquivos](#estrutura-de-arquivos)
3. [Estrutura e Organização HTML](#estrutura-e-organização-html)
4. [Layout e Flexbox](layout-e-flexbox)
5. [Formulário](#formulário)
6. [Interatividade JavaScript](#interatividade-javascript)
7. [Como executar](#como-executar)

---

## Sobre o projeto

O **Receitas de Família** é um site colaborativo de receitas culinárias.  
O visitante pode **explorar receitas** existentes, **filtrar por categoria**, **avaliar por estrelas** e **enviar novas receitas** pelo formulário.

**Tecnologias utilizadas:** HTML5 · CSS3 · JavaScript puro (sem frameworks)

**Tema escolhido:** Tema 6 — Gastronomia e Alimentação  
Sub-tema: Site de Receitas com formulário para envio de sugestões

---

## Estrutura de arquivos

```
projeto-final/
├── index.html        ← Página principal (4 seções)
├── css/
│   └── style.css     ← Estilização com Flexbox, IDs e Classes
├── js/
│   └── script.js     ← Lógica DOM, validação e interatividade
└── assets/
    └── img/          ← Imagens locais (opcional)
```

---

## Estrutura e Organização HTML

### Semântica HTML5

O documento usa as tags semânticas corretas em cada parte da página.  
Cada tag tem um significado: o navegador, os mecanismos de busca e os leitores de tela entendem o que cada bloco representa.

```html
<!-- Cabeçalho fixo com navegação -->
<header class="header" id="topo">
  <nav class="navbar" aria-label="Navegação principal">
    ...
  </nav>
</header>

<!-- Conteúdo principal — agrupa as 4 seções -->
<main>
  <section id="inicio">...</section>   <!-- Seção 1: Hero      -->
  <section id="receitas">...</section> <!-- Seção 2: Receitas  -->
  <section id="enviar">...</section>   <!-- Seção 3: Formulário-->
  <section id="sobre">...</section>    <!-- Seção 4: Sobre     -->
</main>

<!-- Cada receita é um artigo independente -->
<article class="card">...</article>

<!-- Bloco lateral na seção Sobre -->
<aside class="about-aside">...</aside>

<!-- Rodapé -->
<footer class="footer">...</footer>
```

> O projeto respeita o limite de **4 seções principais** e **3 níveis de profundidade** hierárquica  
> (`<main>` → `<section>` → `<div>`/`<article>`).

---

### Hierarquia de títulos

Os títulos seguem a ordem correta: `<h1>` único, `<h2>` por seção, `<h3>` para subtópicos.

```html
<h1>As receitas da <span class="accent">vovó</span>
    nunca saem de moda.</h1>         <!-- único na página -->

<h2 id="titulo-receitas">
  Receitas em destaque</h2>          <!-- cabeçalho de seção -->

<h3 class="card-title">
  Bolo de Cenoura</h3>               <!-- subtítulo dentro do card -->
```

---

### IDs e Classes

**IDs** identificam elementos únicos na página (usados pelo JS e por âncoras de navegação):

```html
<section id="receitas">    <!-- âncora do menu "Receitas" -->
<div id="cardsGrid">       <!-- JS injeta os cards aqui    -->
<form id="formReceita">    <!-- JS escuta o submit aqui    -->
<div id="recipeModal">     <!-- JS abre/fecha o modal      -->
```

**Classes** estilizam grupos de elementos com o mesmo visual:

```html
<article class="card">          <!-- todo card usa o mesmo estilo  -->
<button class="btn btn-primary"><!-- botão laranja                  -->
<button class="btn btn-outline"> <!-- botão com borda               -->
<span class="tag-cat">          <!-- pílula de categoria            -->
```

---

### Indentação

O código usa **2 espaços por nível** de indentação de forma consistente:

```html
<section id="receitas" class="section">
  <div class="section-header">
    <h2 id="titulo-receitas">Receitas em destaque</h2>
    <p>Pratos com amor, compartilhados pela comunidade.</p>
  </div>
  <nav class="cat-filters" id="catFilters"></nav>
  <div class="cards-grid" id="cardsGrid"></div>
</section>
```

---

### Acessibilidade (atributos ARIA)

Atributos ARIA conectam elementos relacionados para leitores de tela:

```html
<!-- Seção conectada ao seu título via aria-labelledby -->
<section id="receitas" aria-labelledby="titulo-receitas">
  <h2 id="titulo-receitas">Receitas em destaque</h2>

<!-- Modal com papel de diálogo -->
<div id="recipeModal" role="dialog" aria-modal="true"
     aria-labelledby="modalTitle" hidden>

<!-- Botão hambúrguer anuncia estado aberto/fechado -->
<button id="navToggle" aria-label="Abrir menu" aria-expanded="false">

<!-- Grid anuncia mudanças de conteúdo (ao filtrar) -->
<div id="cardsGrid" aria-live="polite">
```

---

## Layout e Flexbox

### Paleta de cores — variáveis CSS

Todas as cores do projeto são definidas como variáveis em `:root`.  
Isso centraliza a paleta: mudar uma variável atualiza a cor em todo o site.

```css
:root {
  --cafe-torrado: #5c3d1e;  /* Navbar e rodapé          */
  --paprica:      #c45c3a;  /* Botões e links            */
  --terracota:    #d4956a;  /* Hover e bordas de card    */
  --canela:       #9a6234;  /* Legendas e rótulos        */
  --pergaminho:   #fdf7ef;  /* Fundo da página           */
  --creme:        #fff9f2;  /* Fundo dos cards           */
  --baunilha:     #f5ece0;  /* Seções alternadas         */
  --corda:        #e8d5b7;  /* Bordas e divisores        */
  --salvia:       #6b7c5c;  /* Tags de categoria         */
  --mogno:        #3d1e0a;  /* Texto principal           */
  --castanho:     #6b5040;  /* Texto secundário          */
  --star-on:      #d4880a;  /* Estrela preenchida        */
}
```

---

### Navbar com Flexbox

A navbar usa `display: flex` para alinhar logo e links nas extremidades opostas, com `align-items: center` para centralizar verticalmente.

```css
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between; /* logo à esquerda, links à direita */
  flex-wrap: wrap;                /* quebra em telas pequenas          */
  gap: 0.5rem;
}
```

---

### Hero com Flexbox

O Hero divide a tela em duas colunas: texto à esquerda e emojis flutuantes à direita.  
Em telas menores, os emojis somem e o texto centraliza.

```css
.hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3rem;
  flex-wrap: wrap;    /* colunas empilham no mobile */
}

.hero-content { flex: 1; min-width: 300px; } /* coluna do texto  */
.hero-art     { flex: 1; min-width: 260px; } /* coluna dos emojis*/
```

---

### Grid de cards com Flexbox

Os cards se organizam em linha e quebram automaticamente quando não há espaço.  
Cada card cresce e encolhe de forma igual, respeitando o mínimo de 280px.

```css
.cards-grid {
  display: flex;
  flex-wrap: wrap;          /* quebra para a linha seguinte */
  gap: 1.5rem;
  justify-content: center;
}

.card {
  flex: 1 1 280px;   /* cresce · encolhe · largura mínima 280px */
  max-width: 340px;
  display: flex;
  flex-direction: column; /* imagem em cima, conteúdo embaixo */
}
```

**Resultado visual:**

| Tela larga   | Tela média   | Tela pequena |
|:---:|:---:|:---:|
| 3 cards/linha | 2 cards/linha | 1 card/linha |

---

### Anatomia de um card

```
┌─────────────────────────────┐
│  [imagem — 195px de altura] │  ← .card-img
├─────────────────────────────┤
│  [SOBREMESA]                │  ← .tag-cat  (clicável, filtra)
│  Bolo de Cenoura            │  ← .card-title
│  por Vovó Maria             │  ← .card-author
│  ⏱ 50 min.                  │  ← .card-time
│  ★★★★☆ (12)                │  ← .card-stars
│  [Ver receita completa]     │  ← .card-btn-view
└─────────────────────────────┘
```

O corpo do card também usa `flex-direction: column` para empilhar os elementos, com `margin-top: auto` no botão para que ele sempre fique colado ao fundo.

```css
.card-body {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 0.5rem;
}
.card-btn-view {
  margin-top: auto; /* empurra o botão para o final do card */
}
```

---

### Formulário com Flexbox (form-row)

Os campos do formulário ficam lado a lado em telas largas e empilham em telas estreitas:

```css
.form-row {
  display: flex;
  gap: 1.25rem;
  flex-wrap: wrap;         /* empilha quando não há espaço */
}
.form-row .form-group {
  flex: 1 1 220px;         /* cada campo ocupa no mínimo 220px */
}
```

---

### Seção Sobre com Flexbox

Texto e card lateral ficam um ao lado do outro, com proporções diferentes (2:1):

```css
.about {
  display: flex;
  gap: 3rem;
  align-items: flex-start;
  flex-wrap: wrap;
}
.about-text  { flex: 2; min-width: 280px; } /* dois terços */
.about-aside { flex: 1; min-width: 250px; } /* um terço    */
```

---

### Responsividade

```css
/* Tablets e celulares maiores */
@media (max-width: 768px) {
  .nav-toggle { display: flex; }   /* aparece o hambúrguer   */
  .nav-links  { display: none;  }  /* links somem por padrão */
  .nav-links.open { display: flex; flex-direction: column; }

  .hero-art { display: none; }     /* emojis somem no mobile */
  .hero-content { text-align: center; }
}

/* Celulares pequenos */
@media (max-width: 600px) {
  .cat-filters {
    flex-wrap: nowrap;
    overflow-x: auto;  /* filtros rolam horizontalmente */
  }

  /* Modal sobe da base como bottom sheet */
  .modal { align-items: flex-end; padding: 0; }
  .modal-content {
    border-radius: 14px 14px 0 0;
    width: 100%;
  }
}
```

---

## Formulário

### Tipos de input utilizados

O formulário usa **6 tipos diferentes** de campos:

```html
<form id="formReceita" novalidate>

  <!-- text: nome e autor -->
  <input type="text" id="nome" name="nome"
         placeholder="Ex.: Bolo de cenoura da vovó" required />

  <!-- text: nova categoria (opcional) -->
  <input type="text" id="novaCategoria" name="novaCategoria"
         placeholder="Ex.: Café da Manhã" />

  <!-- number: tempo de preparo -->
  <input type="number" id="tempo" name="tempo"
         min="1" max="999" placeholder="Ex.: 45" required />

  <!-- url: endereço da imagem -->
  <input type="url" id="imagem" name="imagem"
         placeholder="https://exemplo.com/foto.jpg" />

  <!-- select: categoria existente -->
  <select id="categoria" name="categoria">
    <option value="">Selecione uma categoria</option>
    <!-- Preenchido via JS -->
  </select>

  <!-- textarea: ingredientes e modo de preparo -->
  <textarea id="ingredientes" name="ingredientes" rows="5"
    placeholder="Um ingrediente por linha" required></textarea>

  <textarea id="modo" name="modo" rows="6"
    placeholder="Passo a passo" required></textarea>

  <!-- checkbox: autorização de publicação -->
  <input type="checkbox" id="autorizacao" name="autorizacao" required />
  <label for="autorizacao">
    Autorizo a publicação desta receita no site. *
  </label>

</form>
```

**Resumo dos tipos:**

| Campo          | Tipo         | Obrigatório |
|----------------|--------------|:-----------:|
| Nome           | `text`       | ✅          |
| Autor          | `text`       | ✅          |
| Categoria      | `select`     | ✅          |
| Nova categoria | `text`       | ❌          |
| Tempo          | `number`     | ✅          |
| Imagem         | `url`        | ❌          |
| Ingredientes   | `textarea`   | ✅          |
| Modo           | `textarea`   | ✅          |
| Autorização    | `checkbox`   | ✅          |

---

### Vínculo correto entre label e input

Cada `<label>` aponta para seu campo com o atributo `for`, que deve ser igual ao `id` do input.  
Isso permite clicar no texto do label para focar o campo.

```html
<div class="form-group">
  <label for="nome">Nome da receita *</label>
  <input type="text" id="nome" name="nome" required />
</div>

<div class="form-group checkbox-group">
  <input type="checkbox" id="autorizacao" name="autorizacao" required />
  <label for="autorizacao">Autorizo a publicação desta receita no site. *</label>
</div>
```

---

### Estrutura com form-group

Cada par label+campo é envolvido por `.form-group`, que usa `flex-direction: column` para empilhá-los:

```css
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;     /* espaço entre label e input */
}
```

---

## Interatividade JavaScript 

### Persistência com localStorage

As receitas, categorias e avaliações são salvas no navegador.  
Ao recarregar a página, os dados continuam lá.

```js
const STORAGE = {
  receitas:   'rf_receitas',
  categorias: 'rf_categorias',
  ratings:    'rf_ratings'
};

function carregar() {
  const r  = localStorage.getItem(STORAGE.receitas);
  receitas = r ? JSON.parse(r) : [...RECEITAS_BASE];
  // idem para categorias e ratings
}

function salvar() {
  localStorage.setItem(STORAGE.receitas, JSON.stringify(receitas));
  // idem para categorias e ratings
}
```

---

### Criação dinâmica de cards (manipulação do DOM)

Os cards não existem no HTML. O JavaScript os cria e insere no `#cardsGrid` ao carregar e a cada novo envio.

```js
function criarCard(r) {
  const art = document.createElement('article'); // cria o elemento
  art.className = 'card';

  art.innerHTML = `
    <img class="card-img" src="${r.imagem}" alt="Foto de ${r.nome}" />
    <div class="card-body">
      <span class="tag-cat">${r.categoria}</span>
      <h3 class="card-title">${r.nome}</h3>
      <p class="card-author">por ${r.autor}</p>
      <p class="card-time">⏱ ${r.tempo} min.</p>
      <div class="card-stars">${htmlEstrelas(media, total)}</div>
      <button class="card-btn-view"
              data-id="${r.id}">Ver receita completa</button>
    </div>
  `;
  return art;
}

function renderCards() {
  cardsGrid.innerHTML = '';           // limpa o grid
  const lista = catAtiva === 'todas'
    ? receitas
    : receitas.filter(r => r.categoria === catAtiva); // filtra

  lista.forEach(r => cardsGrid.appendChild(criarCard(r))); // insere
}
```

---

### Filtro de categorias

Ao clicar em um botão de filtro, só as receitas daquela categoria são exibidas.

```js
function filtrar(cat) {
  catAtiva = cat;   // guarda a categoria ativa

  // Marca o botão correto como ativo
  catFilters.querySelectorAll('.filter-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.cat === cat);
  });

  renderCards(); // re-renderiza com o filtro aplicado
}
```

A tag de categoria dentro de cada card também é clicável:

```js
// Dentro de criarCard():
art.querySelector('.tag-cat').addEventListener('click', () => {
  filtrar(r.categoria);
  document.getElementById('receitas').scrollIntoView({ behavior: 'smooth' });
});
```

---

### Validação do formulário

A validação é feita em JavaScript antes de aceitar o envio. Campos inválidos recebem a classe `.input-error`, que aplica borda vermelha via CSS.

```js
function validar() {
  let ok = true;

  // Verifica campos de texto obrigatórios
  ['nome', 'autor', 'tempo', 'ingredientes', 'modo'].forEach(id => {
    const el  = document.getElementById(id);
    const grp = el.closest('.form-group');
    if (!el.value.trim()) {
      grp.classList.add('input-error');    // marca em vermelho
      ok = false;
    } else {
      grp.classList.remove('input-error'); // remove se corrigido
    }
  });

  // Tempo deve ser um número positivo
  const tempoEl = document.getElementById('tempo');
  if (tempoEl.value && Number(tempoEl.value) <= 0) {
    tempoEl.closest('.form-group').classList.add('input-error');
    ok = false;
  }

  // Categoria: selecionar uma existente OU digitar uma nova
  if (!selCat.value && !inputNovaCat.value.trim()) {
    selCat.closest('.form-group').classList.add('input-error');
    ok = false;
  }

  // Checkbox de autorização
  const aut = document.getElementById('autorizacao');
  if (!aut.checked) {
    aut.closest('.form-group').classList.add('input-error');
    ok = false;
  }

  return ok;
}
```

O CSS da borda de erro:

```css
.form-group.input-error input,
.form-group.input-error select,
.form-group.input-error textarea {
  border-color: #b53a3a;
  background: #fff5f5;
}
```

---

### Submit: adiciona receita e rola até os cards

```js
form.addEventListener('submit', e => {
  e.preventDefault(); // impede recarregamento da página

  if (!validar()) {
    showMsg('Preencha todos os campos obrigatórios.', 'error');
    return;
  }

  // Monta o objeto da nova receita
  const rec = {
    id:           novoId(),
    nome:         document.getElementById('nome').value.trim(),
    autor:        document.getElementById('autor').value.trim(),
    categoria:    cat,
    tempo:        Number(document.getElementById('tempo').value),
    ingredientes: document.getElementById('ingredientes').value.trim(),
    modo:         document.getElementById('modo').value.trim(),
    imagem:       document.getElementById('imagem').value.trim() || IMG_PADRAO
  };

  receitas.unshift(rec); // nova receita aparece primeiro no grid
  salvar();              // persiste no localStorage
  renderCards();         // atualiza o DOM

  showMsg(`Receita "${rec.nome}" enviada com sucesso! 🎉`, 'success');
  form.reset();

  // Rola suavemente até a seção de receitas
  setTimeout(() => {
    document.getElementById('receitas').scrollIntoView({ behavior: 'smooth' });
  }, 450);
});
```

---

### Modal de receita completa

Ao clicar em "Ver receita completa", um painel é exibido sobre a página com todos os detalhes da receita. Fecha com ✕, clique no overlay escuro ou tecla `Escape`.

```js
function abrirModal(id) {
  const rec = receitas.find(r => String(r.id) === String(id));
  if (!rec) return;

  // Preenche os elementos do modal com os dados da receita
  document.getElementById('modalTitle').textContent      = rec.nome;
  document.getElementById('modalAuthor').textContent     = `✍ por ${rec.autor}`;
  document.getElementById('modalTime').textContent       = `⏱ ${rec.tempo} minutos`;
  document.getElementById('modalIngredientes').textContent = rec.ingredientes;
  document.getElementById('modalModo').textContent         = rec.modo;

  modal.hidden = false;
  document.body.style.overflow = 'hidden'; // impede scroll da página
}

function fecharModal() {
  modal.hidden = true;
  document.body.style.overflow = '';
}

// Fecha ao pressionar Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !modal.hidden) fecharModal();
});
```

---

### Sistema de avaliação por estrelas

O usuário clica em uma estrela no modal para votar. O voto é salvo e a média é atualizada em tempo real nos cards e no modal.

```js
function calcMedia(id) {
  const votos = ratings[id];
  if (!votos || !Object.keys(votos).length) return { media: 0, total: 0 };
  const valores = Object.values(votos);
  const soma = valores.reduce((a, b) => a + b, 0);
  return { media: soma / valores.length, total: valores.length };
}

function votar(id, valor) {
  if (!ratings[id]) ratings[id] = {};
  ratings[id][userId] = valor;  // substitui o voto anterior se já existir
  salvar();                     // persiste no localStorage

  const { media, total } = calcMedia(id);
  renderStars(id);              // redesenha estrelas no modal
  renderCards();                // atualiza estrelas nos cards
}
```

---

### Menu mobile (hambúrguer)

```js
navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open'); // abre/fecha
  navToggle.setAttribute('aria-expanded', open);  // atualiza ARIA
});

// Fecha ao clicar em qualquer link
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', false);
  });
});
```

---

### Nova categoria via formulário

Se o usuário preencher "Criar nova categoria", ela é criada, salva e aparece imediatamente nos filtros e no select — sem recarregar a página.

```js
function addCategoria(nome) {
  const n = nome.trim();
  if (!n || categorias.includes(n)) return false; // evita duplicata
  categorias.push(n);
  return true;
}

// No submit:
const novaCat = document.getElementById('novaCategoria').value.trim();
if (novaCat) {
  addCategoria(novaCat);
  renderFiltros();  // atualiza botões de filtro
  renderSelect();   // atualiza o <select> do formulário
}
```

---

## Como executar

1. Clone ou baixe o repositório
2. Abra a pasta `projeto-final/` no seu computador
3. Abra o arquivo `index.html` diretamente no navegador

Não é necessário servidor, instalação ou internet.  
Todas as funcionalidades rodam localmente no navegador.

```
projeto-final/
├── index.html   ← abra este arquivo
├── css/style.css
├── js/script.js
└── assets/img/
```

---

*Projeto desenvolvido por: Marina Carmen Cornelius e Sabrina Moro Villela Pacheco*  
*Disciplina: Programação para Internet I — IFSC Campus Garopaba — 2026/1*
