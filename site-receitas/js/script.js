/* ========================================
   Sabor Coletivo — Script
   JavaScript puro (sem frameworks)
   ======================================== */

// ===== RECEITAS INICIAIS =====
// Lista de receitas exibidas ao carregar a página.
const receitasIniciais = [
  {
    nome: 'Bolo de Cenoura com Chocolate',
    categoria: 'Sobremesa',
    tempo: 50,
    imagem: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop&q=70'
  },
  {
    nome: 'Macarrão ao Pesto',
    categoria: 'Prato principal',
    tempo: 25,
    imagem: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=600&auto=format&fit=crop&q=70'
  },
  {
    nome: 'Salada Mediterrânea',
    categoria: 'Entrada',
    tempo: 15,
    imagem: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=70'
  },
  {
    nome: 'Suco Verde Detox',
    categoria: 'Bebida',
    tempo: 5,
    imagem: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=600&auto=format&fit=crop&q=70'
  },
  {
    nome: 'Pão de Queijo Mineiro',
    categoria: 'Lanche',
    tempo: 40,
    imagem: 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?w=600&auto=format&fit=crop&q=70'
  },
  {
    nome: 'Risoto de Cogumelos',
    categoria: 'Prato principal',
    tempo: 35,
    imagem: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&auto=format&fit=crop&q=70'
  }
];

// Imagem padrão caso o usuário não envie uma URL
const IMAGEM_PADRAO = 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=600&auto=format&fit=crop&q=70';

// ===== ELEMENTOS DO DOM =====
const cardsGrid = document.getElementById('cardsGrid');
const form = document.getElementById('formReceita');
const formMessage = document.getElementById('formMessage');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

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
      <button type="button" class="card-btn">Ver receita</button>
    </div>
  `;

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
 * Renderiza a lista inicial de receitas no grid.
 */
function renderizarReceitasIniciais() {
  receitasIniciais.forEach(receita => {
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

  // Campos obrigatórios
  const obrigatorios = ['nome', 'autor', 'categoria', 'tempo', 'ingredientes', 'modo'];
  obrigatorios.forEach(id => {
    const campo = document.getElementById(id);
    if (!campo.value.trim()) {
      campo.closest('.form-group').classList.add('input-error');
      valido = false;
    }
  });

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

  // Monta o objeto da nova receita
  const novaReceita = {
    nome: document.getElementById('nome').value.trim(),
    autor: document.getElementById('autor').value.trim(),
    categoria: document.getElementById('categoria').value,
    tempo: Number(document.getElementById('tempo').value),
    ingredientes: document.getElementById('ingredientes').value.trim(),
    modo: document.getElementById('modo').value.trim(),
    imagem: document.getElementById('imagem').value.trim() || IMAGEM_PADRAO
  };

  // Adiciona dinamicamente na área de cards (sem recarregar a página)
  const novoCard = criarCard(novaReceita);
  cardsGrid.prepend(novoCard);

  // Feedback de sucesso e limpeza do formulário
  mostrarMensagem(`Receita "${novaReceita.nome}" enviada com sucesso!`, 'success');
  form.reset();

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
document.addEventListener('DOMContentLoaded', renderizarReceitasIniciais);
