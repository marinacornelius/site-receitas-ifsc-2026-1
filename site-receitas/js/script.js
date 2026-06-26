/* ========================================
   Sabor Coletivo — Script
   JavaScript puro (sem frameworks)
   ======================================== */

// ===== DADOS INICIAIS =====
const STORAGE = {
  receitas: 'rf_receitas',
  categorias: 'rf_categorias',
  ratings: 'rf_ratings'
};

const RECEITAS_BASE = [
  {
    id: 1,
    nome: 'Bolo de Cenoura com Chocolate',
    autor: 'Vovó Maria',
    categoria: 'Sobremesa',
    tempo: 50,
    imagem: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop&q=70',
    ingredientes: '3 cenouras médias\n3 ovos\n1 xícara de óleo\n2 xícaras de farinha de trigo\n2 xícaras de açúcar\n1 colher de sopa de fermento\n2 colheres de sopa de chocolate em pó',
    modo: '1. Pré-aqueça o forno a 180°C.\n2. Bata no liquidificador a cenoura, os ovos e o óleo.\n3. Misture com a farinha, o açúcar e o chocolate em pó.\n4. Acrescente o fermento e asse por cerca de 40 minutos.'
  },
  {
    id: 2,
    nome: 'Macarrão ao Pesto',
    autor: 'Lúcia',
    categoria: 'Prato principal',
    tempo: 25,
    imagem: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=600&auto=format&fit=crop&q=70',
    ingredientes: '250 g de macarrão\n2 xícaras de manjericão\n2 colheres de azeite\n2 dentes de alho\n1/4 de xícara de queijo parmesão\n2 colheres de castanhas',
    modo: '1. Cozinhe o macarrão al dente.\n2. Bata no liquidificador o manjericão, o azeite, o alho e o queijo.\n3. Misture ao macarrão ainda quente e sirva.'
  },
  {
    id: 3,
    nome: 'Salada Mediterrânea',
    autor: 'Ana',
    categoria: 'Entrada',
    tempo: 15,
    imagem: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=70',
    ingredientes: 'Tomates\nPepino\nAzeitonas\nQueijo feta\nAzeite de oliva\nSal e orégano',
    modo: '1. Corte os legumes em pedaços pequenos.\n2. Misture com as azeitonas e o queijo.\n3. Tempere com azeite, sal e orégano.'
  },
  {
    id: 4,
    nome: 'Suco Verde Detox',
    autor: 'Beatriz',
    categoria: 'Bebida',
    tempo: 5,
    imagem: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=600&auto=format&fit=crop&q=70',
    ingredientes: '2 folhas de couve\n1 banana\n1 maçã\n1 copo de água gelada\nGelo a gosto',
    modo: '1. Bata todos os ingredientes no liquidificador.\n2. Sirva gelado.'
  },
  {
    id: 5,
    nome: 'Pão de Queijo Mineiro',
    autor: 'Tia Nena',
    categoria: 'Lanche',
    tempo: 40,
    imagem: 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?w=600&auto=format&fit=crop&q=70',
    ingredientes: '500 g de polvilho azedo\n2 ovos\n200 ml de leite\n100 g de queijo minas\n1 colher de sopa de manteiga\nSal a gosto',
    modo: '1. Misture todos os ingredientes até formar uma massa homogênea.\n2. Modele os pães e asse em forno preaquecido a 180°C por 25 minutos.'
  },
  {
    id: 6,
    nome: 'Risoto de Cogumelos',
    autor: 'Carlos',
    categoria: 'Prato principal',
    tempo: 35,
    imagem: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&auto=format&fit=crop&q=70',
    ingredientes: '1 xícara de arroz arbóreo\n250 g de cogumelos\n1 cebola\n2 colheres de manteiga\n2 xícaras de caldo\nQueijo parmesão',
    modo: '1. Refogue a cebola e os cogumelos.\n2. Adicione o arroz e mexa.\n3. Acrescente o caldo aos poucos até o arroz ficar cremoso.\n4. Finalize com parmesão.'
  }
];

const CATEGORIAS_BASE = ['Entrada', 'Prato principal', 'Sobremesa', 'Bebida', 'Lanche'];

// Imagem padrão caso o usuário não envie uma URL
const IMAGEM_PADRAO = 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=600&auto=format&fit=crop&q=70';

let receitas = [];
let categorias = [];
let ratings = {};

// ===== ELEMENTOS DO DOM =====
const cardsGrid = document.getElementById('cardsGrid');
const form = document.getElementById('formReceita');
const formMessage = document.getElementById('formMessage');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const catFilters = document.getElementById('catFilters');
const emptyMsg = document.getElementById('emptyMsg');

let categoriaAtiva = 'Todas';

function carregar() {
  try {
    receitas = JSON.parse(localStorage.getItem(STORAGE.receitas)) || [...RECEITAS_BASE];
    categorias = JSON.parse(localStorage.getItem(STORAGE.categorias)) || [...CATEGORIAS_BASE];
    ratings = JSON.parse(localStorage.getItem(STORAGE.ratings)) || {};
  } catch (error) {
    receitas = [...RECEITAS_BASE];
    categorias = [...CATEGORIAS_BASE];
    ratings = {};
  }
}

function salvar() {
  localStorage.setItem(STORAGE.receitas, JSON.stringify(receitas));
  localStorage.setItem(STORAGE.categorias, JSON.stringify(categorias));
  localStorage.setItem(STORAGE.ratings, JSON.stringify(ratings));
}

function renderSelect() {
  const selCat = document.getElementById('categoria');
  if (!selCat) return;

  selCat.innerHTML = '<option value="">Selecione uma categoria</option>';
  categorias.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat;
    selCat.appendChild(opt);
  });
}

function preencherCategorias() {
  renderSelect();
  renderFiltros();
}

function novoId() {
  return Date.now() + '-' + Math.random().toString(36).slice(2, 5);
}

function calcMedia(id) {
  const chave = String(id);
  const votos = Array.isArray(ratings[chave]) ? ratings[chave] : [];
  if (!votos.length) return 0;
  const soma = votos.reduce((total, valor) => total + Number(valor), 0);
  return soma / votos.length;
}

function htmlEstrelas(media, total) {
  const preenchidas = Math.round(media);
  const estrelas = Array.from({ length: 5 }, (_, index) => {
    const valor = index + 1;
    const ativa = valor <= preenchidas ? 'filled' : '';
    return `<button type="button" class="star-btn ${ativa}" data-valor="${valor}" aria-label="${valor} estrela${valor > 1 ? 's' : ''}">★</button>`;
  }).join('');

  return `${estrelas}<span class="rating-count">(${total})</span>`;
}

function renderStars(id, container = null) {
  const target = container || document.querySelector(`.card-stars[data-recipe-id="${id}"]`);
  if (!target) return;

  const media = calcMedia(id);
  const total = Array.isArray(ratings[String(id)]) ? ratings[String(id)].length : 0;
  target.innerHTML = htmlEstrelas(media, total);

  target.querySelectorAll('.star-btn').forEach((btn, index) => {
    const valor = index + 1;
    btn.addEventListener('mouseenter', () => {
      target.querySelectorAll('.star-btn').forEach((estrela, posicao) => {
        estrela.classList.toggle('hovered', posicao < valor);
      });
    });

    btn.addEventListener('mouseleave', () => {
      target.querySelectorAll('.star-btn').forEach(estrela => estrela.classList.remove('hovered'));
    });

    btn.addEventListener('click', () => votar(id, valor));
  });
}

function votar(id, valor) {
  const chave = String(id);
  if (!Array.isArray(ratings[chave])) {
    ratings[chave] = [];
  }

  ratings[chave].push(Number(valor));
  salvar();
  renderCards();
}

function renderCards() {
  renderizarReceitas();
}

// ===== MENU MOBILE =====
navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

// Fecha menu ao clicar em um link (mobile)
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== CRIAÇÃO DE CARDS =====
/**
 * Cria um elemento de card de receita.
 * @param {Object} receita - dados da receita
 * @returns {HTMLElement} elemento <article> pronto para inserção
 */
function criarCard(receita) {
  const card = document.createElement('article');
  card.className = 'card';

  card.innerHTML = `
    <img class="card-img" src="${receita.imagem || IMAGEM_PADRAO}"
         alt="Foto da receita ${receita.nome}"
         onerror="this.src='${IMAGEM_PADRAO}'" />
    <div class="card-body">
      <span class="card-category">${receita.categoria}</span>
      <h3 class="card-title">${receita.nome}</h3>
      <p class="card-time">⏱ ${receita.tempo} minutos</p>
      <div class="card-stars" data-recipe-id="${receita.id}"></div>
      <button type="button" class="card-btn">Ver receita</button>
    </div>
  `;

  renderStars(receita.id, card.querySelector('.card-stars'));

  // Ação do botão "Ver receita"
  card.querySelector('.card-btn').addEventListener('click', () => {
    alert(
      `Receita: ${receita.nome}\n` +
      `Categoria: ${receita.categoria}\n` +
      `Tempo de preparo: ${receita.tempo} minutos` +
      (receita.ingredientes ? `\n\nIngredientes:\n${receita.ingredientes}` : '') +
      (receita.modo ? `\n\nModo de preparo:\n${receita.modo}` : '')
    );
  });

  return card;
}

/**
 * Renderiza as receitas carregadas no grid.
 */
function renderFiltros() {
  if (!catFilters) return;

  if (categoriaAtiva !== 'Todas' && !categorias.includes(categoriaAtiva)) {
    categoriaAtiva = 'Todas';
  }

  catFilters.innerHTML = '';

  const btnTodas = document.createElement('button');
  btnTodas.type = 'button';
  btnTodas.className = 'filter-btn';
  if (categoriaAtiva === 'Todas') btnTodas.classList.add('active');
  btnTodas.textContent = 'Todas';
  btnTodas.addEventListener('click', () => filtrar('Todas'));
  catFilters.appendChild(btnTodas);

  categorias.forEach(cat => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'filter-btn';
    if (categoriaAtiva === cat) btn.classList.add('active');
    btn.textContent = cat;
    btn.addEventListener('click', () => filtrar(cat));
    catFilters.appendChild(btn);
  });
}

function filtrar(cat) {
  categoriaAtiva = cat;
  renderFiltros();
  renderizarReceitas();
}

function renderizarReceitas() {
  if (!cardsGrid) return;

  const receitasVisiveis = categoriaAtiva === 'Todas'
    ? receitas
    : receitas.filter(receita => receita.categoria === categoriaAtiva);

  cardsGrid.innerHTML = '';

  if (emptyMsg) {
    emptyMsg.hidden = receitasVisiveis.length > 0;
  }

  receitasVisiveis.forEach(receita => {
    cardsGrid.appendChild(criarCard(receita));
  });
}

// ===== VALIDAÇÃO DO FORMULÁRIO =====
/**
 * Valida os campos obrigatórios e marca visualmente os erros.
 * @returns {boolean} true se válido
 */
function validarFormulario() {
  let valido = true;

  // Limpa estados de erro anteriores
  form.querySelectorAll('.form-group').forEach(g => g.classList.remove('input-error'));

  const categoriaSelect = document.getElementById('categoria');
  const novaCategoriaInput = document.getElementById('novaCategoria');
  const categoriaSelecionada = (categoriaSelect.value || '').trim() || (novaCategoriaInput.value || '').trim();

  // Campos obrigatórios
  const obrigatorios = ['nome', 'autor', 'tempo', 'ingredientes', 'modo'];
  obrigatorios.forEach(id => {
    const campo = document.getElementById(id);
    if (!campo.value.trim()) {
      campo.closest('.form-group').classList.add('input-error');
      valido = false;
    }
  });

  if (!categoriaSelecionada) {
    categoriaSelect.closest('.form-group').classList.add('input-error');
    valido = false;
  }

  // Tempo deve ser > 0
  const tempo = document.getElementById('tempo');
  if (tempo.value && Number(tempo.value) <= 0) {
    tempo.closest('.form-group').classList.add('input-error');
    valido = false;
  }

  // Checkbox de autorização
  const autorizacao = document.getElementById('autorizacao');
  if (!autorizacao.checked) {
    autorizacao.closest('.form-group').classList.add('input-error');
    valido = false;
  }

  return valido;
}

/**
 * Exibe uma mensagem de feedback no formulário.
 * @param {string} texto
 * @param {'success'|'error'} tipo
 */
function mostrarMensagem(texto, tipo) {
  formMessage.textContent = texto;
  formMessage.className = `form-message ${tipo}`;

  // Esconde após 5 segundos
  setTimeout(() => {
    formMessage.className = 'form-message';
    formMessage.textContent = '';
  }, 5000);
}

// ===== SUBMIT DO FORMULÁRIO =====
form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!validarFormulario()) {
    mostrarMensagem('Por favor, preencha todos os campos obrigatórios.', 'error');
    return;
  }

  const categoriaSelect = document.getElementById('categoria');
  const novaCategoriaInput = document.getElementById('novaCategoria');
  const categoriaInformada = (novaCategoriaInput.value || '').trim();
  const categoriaFinal = categoriaInformada || categoriaSelect.value;

  if (categoriaInformada && !categorias.includes(categoriaInformada)) {
    categorias.push(categoriaInformada);
    preencherCategorias();
  }

  // Monta o objeto da nova receita
  const novaReceita = {
    id: novoId(),
    nome: document.getElementById('nome').value.trim(),
    autor: document.getElementById('autor').value.trim(),
    categoria: categoriaFinal,
    tempo: Number(document.getElementById('tempo').value),
    ingredientes: document.getElementById('ingredientes').value.trim(),
    modo: document.getElementById('modo').value.trim(),
    imagem: document.getElementById('imagem').value.trim() || IMAGEM_PADRAO
  };

  receitas.unshift(novaReceita);
  salvar();
  renderizarReceitas();

  // Feedback de sucesso e limpeza do formulário
  mostrarMensagem(`Receita "${novaReceita.nome}" enviada com sucesso!`, 'success');
  form.reset();
  preencherCategorias();

  // Rola a tela até a seção de receitas para mostrar o resultado
  setTimeout(() => {
    document.getElementById('receitas').scrollIntoView({ behavior: 'smooth' });
  }, 400);
});

// Remove o destaque de erro quando o usuário começa a digitar
form.querySelectorAll('input, select, textarea').forEach(campo => {
  campo.addEventListener('input', () => {
    campo.closest('.form-group').classList.remove('input-error');
  });
});

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
  carregar();
  preencherCategorias();
  renderizarReceitas();
});
