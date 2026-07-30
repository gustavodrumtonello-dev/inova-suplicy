// Lógica de roteamento simples em Vanilla JS
async function navegar(rota) {
    const contentDiv = document.getElementById('app-content');
    
    // Atualiza a classe ativa no menu
    document.querySelectorAll('.nav-links button').forEach(btn => btn.classList.remove('active'));
    event.currentTarget.classList.add('active');

    try {
        // Busca o arquivo HTML correspondente na pasta da view
        const response = await fetch(`${rota}_page/view/index.html`);
        if (!response.ok) throw new Error('Página não encontrada');
        
        const html = await response.text();
        contentDiv.innerHTML = html;

        // Se houver scripts específicos da página (Controller), carrega aqui
        carregarScriptDaPagina(rota);
        
    } catch (error) {
        contentDiv.innerHTML = `<h2>Erro 404</h2><p>Módulo de ${rota} em construção.</p>`;
    }
}

function carregarScriptDaPagina(rota) {
    const scriptAntigo = document.getElementById('page-script');
    if (scriptAntigo) scriptAntigo.remove();

    const novoScript = document.createElement('script');
    novoScript.id = 'page-script';
    // Aponta para o controller da respectiva página
    novoScript.src = `${rota}_page/controller/main.js`; 
    document.body.appendChild(novoScript);
}

// Inicia na aba de relatórios
window.onload = () => navegar('relatorios');