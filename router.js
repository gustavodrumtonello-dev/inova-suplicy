const routes = {
  painel: `
    <div class="page-header">
      <h1>Visão Geral - Hoje</h1>
      <div class="header-actions">
        <button class="btn btn-outline">Exportar Dados</button>
        <button class="btn btn-primary">Gerar Relatório</button>
      </div>
    </div>

    <section class="kpi-grid">
      <div class="kpi-card">
        <div class="title">Total de Alunos</div>
        <div class="number">1,248</div>
        <div class="subtext">Matriculados ativos</div>
      </div>
      <div class="kpi-card">
        <div class="title">Presentes</div>
        <div class="number">1,156</div>
        <div class="subtext positive">↑ 92.6% Frequência</div>
      </div>
      <div class="kpi-card">
        <div class="title">Ausentes</div>
        <div class="number">42</div>
        <div class="subtext">3.3% do total</div>
      </div>
      <div class="kpi-card alert">
        <div class="title">Atrasados (Apos 06:50)</div>
        <div class="number">50</div>
        <div class="subtext negative">⚠ Registros hoje</div>
      </div>
    </section>

    <h2 class="section-title">⏱️ Entradas Recentes & Atrasos (Tolerância: 06:50 AM)</h2>
    <div class="students-grid">
      
      <div class="student-card">
        <div class="student-card-header">
          <div class="student-avatar">LM</div>
          <div class="student-meta">
            <strong>Lucas Mendes</strong>
            <span>3º Ano B • Matutino</span>
          </div>
        </div>
        <div class="student-card-body">
          <span class="student-time">Chegada: 07:05 AM</span>
          <span class="badge-status delay">+15 min atraso</span>
        </div>
      </div>

      <div class="student-card">
        <div class="student-card-header">
          <div class="student-avatar">AS</div>
          <div class="student-meta">
            <strong>Ana Silva</strong>
            <span>1º Ano A • Matutino</span>
          </div>
        </div>
        <div class="student-card-body">
          <span class="student-time">Chegada: 07:12 AM</span>
          <span class="badge-status delay">+22 min atraso</span>
        </div>
      </div>

      <div class="student-card">
        <div class="student-card-header">
          <div class="student-avatar">JP</div>
          <div class="student-meta">
            <strong>João Pereira</strong>
            <span>2º Ano C • Matutino</span>
          </div>
        </div>
        <div class="student-card-body">
          <span class="student-time">Chegada: 06:48 AM</span>
          <span class="badge-status success">No Horário</span>
        </div>
      </div>

      <div class="student-card">
        <div class="student-card-header">
          <div class="student-avatar">CF</div>
          <div class="student-meta">
            <strong>Carlos Ferreira</strong>
            <span>1º Ano B • Matutino</span>
          </div>
        </div>
        <div class="student-card-body">
          <span class="student-time">Chegada: 07:00 AM</span>
          <span class="badge-status delay">+10 min atraso</span>
        </div>
      </div>

      <div class="student-card">
        <div class="student-card-header">
          <div class="student-avatar">BA</div>
          <div class="student-meta">
            <strong>Beatriz Almeida</strong>
            <span>2º Ano A • Matutino</span>
          </div>
        </div>
        <div class="student-card-body">
          <span class="student-time">Chegada: 06:45 AM</span>
          <span class="badge-status success">No Horário</span>
        </div>
      </div>

      <div class="student-card">
        <div class="student-card-header">
          <div class="student-avatar">GV</div>
          <div class="student-meta">
            <strong>Gabriel Vieira</strong>
            <span>3º Ano A • Matutino</span>
          </div>
        </div>
        <div class="student-card-body">
          <span class="student-time">Chegada: 06:55 AM</span>
          <span class="badge-status delay">+5 min atraso</span>
        </div>
      </div>

    </div>
  `,

  turmas: `
    <div class="page-header">
      <h1>Painel de Turmas</h1>
      <button class="btn btn-primary">+ Nova Turma</button>
    </div>

    <div class="classes-grid">
      
      <div class="class-card">
        <div class="class-card-header">
          <div>
            <h3>3º Ano Médio A</h3>
            <span>Prof. Responsável: Silva • Horário: 06:50</span>
          </div>
        </div>
        <div class="class-stats-row">
          <div class="class-stat">
            <label>Alunos</label>
            <val>32</val>
          </div>
          <div class="class-stat">
            <label>Presença</label>
            <val style="color: var(--success)">95%</val>
          </div>
        </div>
        <div>
          <div class="progress-bar-bg">
            <div class="progress-bar-fill" style="width: 95%; background-color: var(--success);"></div>
          </div>
        </div>
      </div>

      <div class="class-card">
        <div class="class-card-header">
          <div>
            <h3>2º Ano Médio B</h3>
            <span>Profª. Responsável: Costa • Horário: 06:50</span>
          </div>
        </div>
        <div class="class-stats-row">
          <div class="class-stat">
            <label>Alunos</label>
            <val>28</val>
          </div>
          <div class="class-stat">
            <label>Presença</label>
            <val style="color: var(--secondary)">88%</val>
          </div>
        </div>
        <div>
          <div class="progress-bar-bg">
            <div class="progress-bar-fill" style="width: 88%; background-color: var(--secondary);"></div>
          </div>
        </div>
      </div>

      <div class="class-card">
        <div class="class-card-header">
          <div>
            <h3>1º Ano Médio C</h3>
            <span>Prof. Responsável: Santos • Horário: 06:50</span>
          </div>
        </div>
        <div class="class-stats-row">
          <div class="class-stat">
            <label>Alunos</label>
            <val>35</val>
          </div>
          <div class="class-stat">
            <label>Presença</label>
            <val style="color: var(--error)">76%</val>
          </div>
        </div>
        <div>
          <div class="progress-bar-bg">
            <div class="progress-bar-fill" style="width: 76%; background-color: var(--error);"></div>
          </div>
        </div>
      </div>

    </div>
  `,

  relatorios: `
    <div class="page-header">
      <h1>Relatórios e Gestão</h1>
    </div>

    <div class="classes-grid">
      <div class="class-card">
        <h3>📅 Relatório Diário</h3>
        <p style="font-size:13px; color:#64748b;">Consolidado de presença e entradas após 06:50 AM.</p>
        <button class="btn btn-outline" style="width:100%; margin-top:12px;">GERAR PDF →</button>
      </div>
      <div class="class-card">
        <h3>📅 Relatório Semanal</h3>
        <p style="font-size:13px; color:#64748b;">Análise de alunos com atrasos recorrentes no portão.</p>
        <button class="btn btn-outline" style="width:100%; margin-top:12px;">GERAR PDF →</button>
      </div>
    </div>
  `,

  configuracoes: `
    <div class="page-header">
      <h1>Configurações do Sistema</h1>
    </div>
    <div class="class-card">
      <p style="font-size:14px; color:#0f172a; font-weight:600; margin-bottom:8px;">Horário limite de entrada:</p>
      <input type="time" value="06:50" style="padding:8px 12px; border:1px solid #cbd5e1; border-radius:6px; font-size:14px;">
    </div>
  `
};

function navigate() {
  const hash = window.location.hash.replace('#/', '') || 'painel';
  const pageContent = document.getElementById('page-content');
  
  if (routes[hash]) {
    pageContent.innerHTML = routes[hash];
  } else {
    pageContent.innerHTML = routes['painel'];
  }

  document.querySelectorAll('.nav-item').forEach(item => {
    if (item.getAttribute('data-page') === hash) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

window.addEventListener('hashchange', navigate);
window.addEventListener('load', navigate);