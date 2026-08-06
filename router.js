// Mapeamento das rotas para o caminho de cada arquivo HTML
const rotas = {
  dashboard: './dashboard_page/view/dashboard.html',
  relatorios: './relatorios_page/view/relatorios.html',
  turmas: './turmas_page/view/turmas.html'
};

// Função principal para carregar o HTML da página solicitada
async function navegar(pagina) {
  const container = document.getElementById('app-content');
  const caminho = rotas[pagina];

  if (!caminho) {
    container.innerHTML = '<div class="error-msg">Página não encontrada</div>';
    return;
  }

  try {
    // Busca o arquivo HTML correspondente
    const resposta = await fetch(caminho);

    if (!resposta.ok) {
      throw new Error(`Erro ao carregar arquivo: ${resposta.statusText}`);
    }

    // Injeta o conteúdo no container <main id="app-content">
    const html = await resposta.text();
    container.innerHTML = html;

    // Atualiza o estado visual do menu
    atualizarMenuAtivo(pagina);

  } catch (erro) {
    console.error('Erro na navegação:', erro);
    container.innerHTML = '<div class="error-msg">Erro ao carregar a página.</div>';
  }
}

// Atualiza a classe 'active' nos botões de navegação
function atualizarMenuAtivo(pagina) {
  const botoes = document.querySelectorAll('.nav-links button');

  botoes.forEach(botao => {
    // Verifica se o handler onclick corresponde à página atual
    if (botao.getAttribute('onclick')?.includes(`'${pagina}'`)) {
      botao.classList.add('active');
    } else {
      botao.classList.remove('active');
    }
  });
}

// Carrega a página inicial por padrão quando o documento terminar de carregar
document.addEventListener('DOMContentLoaded', () => {
  navegar('dashboard'); // Ou 'relatorios' / 'turmas'
});