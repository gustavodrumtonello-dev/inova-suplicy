// Mapeamento com os caminhos e arquivos HTML EXATOS do seu projeto
const routes = {
  "/": "./dashboard_page/view/dashboard.html",
  "/dashboard": "./dashboard_page/view/dashboard.html",
  "/relatorios": "./relatorios_page/view/relatorios.html",
  "/turmas": "./turmas_page/view/turmas.html"
};

/**
 * Navega para a URL informada sem recarregar a página
 */
const navigateTo = (url) => {
  window.history.pushState(null, null, url);
  router();
};

/**
 * Carrega dinamicamente o HTML correspondente à rota
 */
const router = async () => {
  let path = window.location.pathname;

  // Trata o carregamento inicial via Live Server no index.html
  if (path === "/" || path.endsWith("/index.html")) {
    path = "/";
  }

  const route = routes[path] || routes["/"];

  try {
    const response = await fetch(route);

    if (!response.ok) {
      throw new Error(`Status ${response.status}`);
    }

    const html = await response.text();
    document.getElementById("app").innerHTML = html;
  } catch (error) {
    console.error("Erro ao carregar a visão:", error);
    document.getElementById("app").innerHTML = `
      <div style="padding: 2rem; text-align: center;">
        <h2>Erro 404 - Arquivo Não Encontrado</h2>
        <p>Não foi possível carregar o arquivo no caminho: <code>${route}</code></p>
      </div>
    `;
  }
};

// Eventos de navegação da aplicação
document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });

  window.addEventListener("popstate", router);
  router();
});