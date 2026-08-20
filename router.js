const routes = {
  painel: `
    <div class="page-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
      <div>
        <h1 style="font-size: 24px; font-weight: 700; color: #00236f; margin: 0;">Visão Geral - Hoje</h1>
        <p style="font-size: 14px; color: #64748b; margin: 4px 0 0 0;">Acompanhamento de fluxo de entrada e controle de frequência</p>
      </div>
      <div class="header-actions" style="display: flex; gap: 12px;">
        <button class="btn btn-secondary" style="padding: 8px 16px; border: 1px solid #cbd5e1; background: #fff; border-radius: 6px; cursor: pointer; font-weight: 600; color: #334155;">Exportar Dados</button>
        <button class="btn btn-primary" style="padding: 8px 16px; background: #00236f; color: #fff; border: none; border-radius: 6px; cursor: pointer; font-weight: 600;">Gerar Relatório</button>
      </div>
    </div>

    <!-- Indicadores Principais -->
    <section style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; margin-bottom: 32px;">
      <div class="card" style="background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0;">
        <span style="font-size: 14px; color: #64748b;">Total de Alunos</span>
        <div style="font-size: 28px; font-weight: 700; color: #1e293b; margin-top: 8px;">1,248</div>
        <span style="font-size: 12px; color: #64748b;">Matriculados ativos</span>
      </div>
      <div class="card" style="background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0;">
        <span style="font-size: 14px; color: #64748b;">Presentes</span>
        <div style="font-size: 28px; font-weight: 700; color: #16a34a; margin-top: 8px;">1,156</div>
        <span style="font-size: 12px; color: #16a34a; font-weight: 600;">↑ 92.6% Frequência</span>
      </div>
      <div class="card" style="background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0;">
        <span style="font-size: 14px; color: #64748b;">Atrasados (Após 06:50)</span>
        <div style="font-size: 28px; font-weight: 700; color: #dc2626; margin-top: 8px;">50</div>
        <span style="font-size: 12px; color: #dc2626; font-weight: 600;">⚠ Registros hoje</span>
      </div>
    </section>

    <!-- Entradas Recentes -->
    <h2 style="font-size: 18px; font-weight: 700; color: #0f172a; margin-bottom: 16px;">⏱️ Entradas Recentes & Atrasos (Tolerância: 06:50 AM)</h2>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
      <div style="background: #fff; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <strong style="color: #1e293b; display: block;">Lucas Mendes</strong>
            <span style="font-size: 13px; color: #64748b;">3º Ano B • Matutino</span>
          </div>
          <span style="background: #fef3c7; color: #92400e; font-size: 12px; font-weight: 600; padding: 4px 8px; border-radius: 4px;">Chegada: 07:05 (+15m)</span>
        </div>
      </div>
      <div style="background: #fff; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <strong style="color: #1e293b; display: block;">Ana Silva</strong>
            <span style="font-size: 13px; color: #64748b;">1º Ano A • Matutino</span>
          </div>
          <span style="background: #fef3c7; color: #92400e; font-size: 12px; font-weight: 600; padding: 4px 8px; border-radius: 4px;">Chegada: 07:12 (+22m)</span>
        </div>
      </div>
      <div style="background: #fff; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <strong style="color: #1e293b; display: block;">João Pereira</strong>
            <span style="font-size: 13px; color: #64748b;">2º Ano C • Matutino</span>
          </div>
          <span style="background: #dcfce7; color: #166534; font-size: 12px; font-weight: 600; padding: 4px 8px; border-radius: 4px;">Chegada: 06:48 (No prazo)</span>
        </div>
      </div>
    </div>
  `,

  turmas: `

    <!-- Cabeçalho -->
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
      <h1 style="font-size: 24px; font-weight: 700; color: #0f172a; margin: 0;">Painel de Turmas</h1>
      <button style="background-color: #00236f; color: #ffffff; border: none; padding: 10px 20px; border-radius: 6px; font-weight: 600; font-size: 14px; cursor: pointer;">+ Nova Turma</button>
    </div>

    <!-- Grid de Cards de TODAS as Turmas -->
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px;">
      
      <!-- 6º Ano A -->
      <div style="background: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; padding: 20px; display: flex; flex-direction: column; gap: 16px;">
        <div>
          <h3 style="font-size: 18px; font-weight: 700; color: #00236f; margin: 0 0 4px 0;">6º Ano Fundamental A</h3>
          <p style="font-size: 13px; color: #64748b; margin: 0;">Profª. Responsável: Oliveira • Horário: 06:50</p>
        </div>
        <div style="background-color: #f8fafc; border-radius: 6px; padding: 12px 16px; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <span style="display: block; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase;">ALUNOS</span>
            <span style="font-size: 18px; font-weight: 700; color: #1e293b;">30</span>
          </div>
          <div style="text-align: right;">
            <span style="display: block; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase;">PRESENÇA</span>
            <span style="font-size: 18px; font-weight: 700; color: #16a34a;">94%</span>
          </div>
        </div>
        <div style="width: 100%; height: 6px; background-color: #e2e8f0; border-radius: 999px; overflow: hidden;">
          <div style="width: 94%; height: 100%; background-color: #16a34a; border-radius: 999px;"></div>
        </div>
      </div>

      <!-- 6º Ano B -->
      <div style="background: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; padding: 20px; display: flex; flex-direction: column; gap: 16px;">
        <div>
          <h3 style="font-size: 18px; font-weight: 700; color: #00236f; margin: 0 0 4px 0;">6º Ano Fundamental B</h3>
          <p style="font-size: 13px; color: #64748b; margin: 0;">Prof. Responsável: Souza • Horário: 06:50</p>
        </div>
        <div style="background-color: #f8fafc; border-radius: 6px; padding: 12px 16px; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <span style="display: block; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase;">ALUNOS</span>
            <span style="font-size: 18px; font-weight: 700; color: #1e293b;">28</span>
          </div>
          <div style="text-align: right;">
            <span style="display: block; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase;">PRESENÇA</span>
            <span style="font-size: 18px; font-weight: 700; color: #2563eb;">91%</span>
          </div>
        </div>
        <div style="width: 100%; height: 6px; background-color: #e2e8f0; border-radius: 999px; overflow: hidden;">
          <div style="width: 91%; height: 100%; background-color: #2563eb; border-radius: 999px;"></div>
        </div>
      </div>

      <!-- 7º Ano A -->
      <div style="background: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; padding: 20px; display: flex; flex-direction: column; gap: 16px;">
        <div>
          <h3 style="font-size: 18px; font-weight: 700; color: #00236f; margin: 0 0 4px 0;">7º Ano Fundamental A</h3>
          <p style="font-size: 13px; color: #64748b; margin: 0;">Profª. Responsável: Lima • Horário: 06:50</p>
        </div>
        <div style="background-color: #f8fafc; border-radius: 6px; padding: 12px 16px; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <span style="display: block; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase;">ALUNOS</span>
            <span style="font-size: 18px; font-weight: 700; color: #1e293b;">32</span>
          </div>
          <div style="text-align: right;">
            <span style="display: block; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase;">PRESENÇA</span>
            <span style="font-size: 18px; font-weight: 700; color: #2563eb;">88%</span>
          </div>
        </div>
        <div style="width: 100%; height: 6px; background-color: #e2e8f0; border-radius: 999px; overflow: hidden;">
          <div style="width: 88%; height: 100%; background-color: #2563eb; border-radius: 999px;"></div>
        </div>
      </div>

      <!-- 7º Ano B -->
      <div style="background: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; padding: 20px; display: flex; flex-direction: column; gap: 16px;">
        <div>
          <h3 style="font-size: 18px; font-weight: 700; color: #00236f; margin: 0 0 4px 0;">7º Ano Fundamental B</h3>
          <p style="font-size: 13px; color: #64748b; margin: 0;">Prof. Responsável: Rocha • Horário: 06:50</p>
        </div>
        <div style="background-color: #f8fafc; border-radius: 6px; padding: 12px 16px; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <span style="display: block; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase;">ALUNOS</span>
            <span style="font-size: 18px; font-weight: 700; color: #1e293b;">31</span>
          </div>
          <div style="text-align: right;">
            <span style="display: block; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase;">PRESENÇA</span>
            <span style="font-size: 18px; font-weight: 700; color: #2563eb;">82%</span>
          </div>
        </div>
        <div style="width: 100%; height: 6px; background-color: #e2e8f0; border-radius: 999px; overflow: hidden;">
          <div style="width: 82%; height: 100%; background-color: #2563eb; border-radius: 999px;"></div>
        </div>
      </div>

      <!-- 8º Ano A -->
      <div style="background: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; padding: 20px; display: flex; flex-direction: column; gap: 16px;">
        <div>
          <h3 style="font-size: 18px; font-weight: 700; color: #00236f; margin: 0 0 4px 0;">8º Ano Fundamental A</h3>
          <p style="font-size: 13px; color: #64748b; margin: 0;">Profª. Responsável: Alves • Horário: 06:50</p>
        </div>
        <div style="background-color: #f8fafc; border-radius: 6px; padding: 12px 16px; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <span style="display: block; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase;">ALUNOS</span>
            <span style="font-size: 18px; font-weight: 700; color: #1e293b;">29</span>
          </div>
          <div style="text-align: right;">
            <span style="display: block; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase;">PRESENÇA</span>
            <span style="font-size: 18px; font-weight: 700; color: #16a34a;">95%</span>
          </div>
        </div>
        <div style="width: 100%; height: 6px; background-color: #e2e8f0; border-radius: 999px; overflow: hidden;">
          <div style="width: 95%; height: 100%; background-color: #16a34a; border-radius: 999px;"></div>
        </div>
      </div>

      <!-- 8º Ano B -->
      <div style="background: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; padding: 20px; display: flex; flex-direction: column; gap: 16px;">
        <div>
          <h3 style="font-size: 18px; font-weight: 700; color: #00236f; margin: 0 0 4px 0;">8º Ano Fundamental B</h3>
          <p style="font-size: 13px; color: #64748b; margin: 0;">Prof. Responsável: Carvalho • Horário: 06:50</p>
        </div>
        <div style="background-color: #f8fafc; border-radius: 6px; padding: 12px 16px; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <span style="display: block; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase;">ALUNOS</span>
            <span style="font-size: 18px; font-weight: 700; color: #1e293b;">30</span>
          </div>
          <div style="text-align: right;">
            <span style="display: block; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase;">PRESENÇA</span>
            <span style="font-size: 18px; font-weight: 700; color: #2563eb;">89%</span>
          </div>
        </div>
        <div style="width: 100%; height: 6px; background-color: #e2e8f0; border-radius: 999px; overflow: hidden;">
          <div style="width: 89%; height: 100%; background-color: #2563eb; border-radius: 999px;"></div>
        </div>
      </div>

      <!-- 9º Ano A -->
      <div style="background: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; padding: 20px; display: flex; flex-direction: column; gap: 16px;">
        <div>
          <h3 style="font-size: 18px; font-weight: 700; color: #00236f; margin: 0 0 4px 0;">9º Ano Fundamental A</h3>
          <p style="font-size: 13px; color: #64748b; margin: 0;">Profª. Responsável: Martins • Horário: 06:50</p>
        </div>
        <div style="background-color: #f8fafc; border-radius: 6px; padding: 12px 16px; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <span style="display: block; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase;">ALUNOS</span>
            <span style="font-size: 18px; font-weight: 700; color: #1e293b;">33</span>
          </div>
          <div style="text-align: right;">
            <span style="display: block; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase;">PRESENÇA</span>
            <span style="font-size: 18px; font-weight: 700; color: #16a34a;">93%</span>
          </div>
        </div>
        <div style="width: 100%; height: 6px; background-color: #e2e8f0; border-radius: 999px; overflow: hidden;">
          <div style="width: 93%; height: 100%; background-color: #16a34a; border-radius: 999px;"></div>
        </div>
      </div>

      <!-- 9º Ano B -->
      <div style="background: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; padding: 20px; display: flex; flex-direction: column; gap: 16px;">
        <div>
          <h3 style="font-size: 18px; font-weight: 700; color: #00236f; margin: 0 0 4px 0;">9º Ano Fundamental B</h3>
          <p style="font-size: 13px; color: #64748b; margin: 0;">Prof. Responsável: Barbosa • Horário: 06:50</p>
        </div>
        <div style="background-color: #f8fafc; border-radius: 6px; padding: 12px 16px; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <span style="display: block; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase;">ALUNOS</span>
            <span style="font-size: 18px; font-weight: 700; color: #1e293b;">34</span>
          </div>
          <div style="text-align: right;">
            <span style="display: block; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase;">PRESENÇA</span>
            <span style="font-size: 18px; font-weight: 700; color: #2563eb;">84%</span>
          </div>
        </div>
        <div style="width: 100%; height: 6px; background-color: #e2e8f0; border-radius: 999px; overflow: hidden;">
          <div style="width: 84%; height: 100%; background-color: #2563eb; border-radius: 999px;"></div>
        </div>
      </div>

      <!-- 1º Ano Médio A -->
      <div style="background: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; padding: 20px; display: flex; flex-direction: column; gap: 16px;">
        <div>
          <h3 style="font-size: 18px; font-weight: 700; color: #00236f; margin: 0 0 4px 0;">1º Ano Médio A</h3>
          <p style="font-size: 13px; color: #64748b; margin: 0;">Profª. Responsável: Castro • Horário: 06:50</p>
        </div>
        <div style="background-color: #f8fafc; border-radius: 6px; padding: 12px 16px; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <span style="display: block; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase;">ALUNOS</span>
            <span style="font-size: 18px; font-weight: 700; color: #1e293b;">36</span>
          </div>
          <div style="text-align: right;">
            <span style="display: block; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase;">PRESENÇA</span>
            <span style="font-size: 18px; font-weight: 700; color: #16a34a;">96%</span>
          </div>
        </div>
        <div style="width: 100%; height: 6px; background-color: #e2e8f0; border-radius: 999px; overflow: hidden;">
          <div style="width: 96%; height: 100%; background-color: #16a34a; border-radius: 999px;"></div>
        </div>
      </div>

      <!-- 1º Ano Médio B -->
      <div style="background: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; padding: 20px; display: flex; flex-direction: column; gap: 16px;">
        <div>
          <h3 style="font-size: 18px; font-weight: 700; color: #00236f; margin: 0 0 4px 0;">1º Ano Médio B</h3>
          <p style="font-size: 13px; color: #64748b; margin: 0;">Prof. Responsável: Duarte • Horário: 06:50</p>
        </div>
        <div style="background-color: #f8fafc; border-radius: 6px; padding: 12px 16px; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <span style="display: block; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase;">ALUNOS</span>
            <span style="font-size: 18px; font-weight: 700; color: #1e293b;">35</span>
          </div>
          <div style="text-align: right;">
            <span style="display: block; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase;">PRESENÇA</span>
            <span style="font-size: 18px; font-weight: 700; color: #2563eb;">90%</span>
          </div>
        </div>
        <div style="width: 100%; height: 6px; background-color: #e2e8f0; border-radius: 999px; overflow: hidden;">
          <div style="width: 90%; height: 100%; background-color: #2563eb; border-radius: 999px;"></div>
        </div>
      </div>

      <!-- 1º Ano Médio C -->
      <div style="background: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; padding: 20px; display: flex; flex-direction: column; gap: 16px;">
        <div>
          <h3 style="font-size: 18px; font-weight: 700; color: #00236f; margin: 0 0 4px 0;">1º Ano Médio C</h3>
          <p style="font-size: 13px; color: #64748b; margin: 0;">Prof. Responsável: Santos • Horário: 06:50</p>
        </div>
        <div style="background-color: #f8fafc; border-radius: 6px; padding: 12px 16px; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <span style="display: block; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase;">ALUNOS</span>
            <span style="font-size: 18px; font-weight: 700; color: #1e293b;">35</span>
          </div>
          <div style="text-align: right;">
            <span style="display: block; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase;">PRESENÇA</span>
            <span style="font-size: 18px; font-weight: 700; color: #dc2626;">76%</span>
          </div>
        </div>
        <div style="width: 100%; height: 6px; background-color: #e2e8f0; border-radius: 999px; overflow: hidden;">
          <div style="width: 76%; height: 100%; background-color: #dc2626; border-radius: 999px;"></div>
        </div>
      </div>

      <!-- 2º Ano Médio A -->
      <div style="background: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; padding: 20px; display: flex; flex-direction: column; gap: 16px;">
        <div>
          <h3 style="font-size: 18px; font-weight: 700; color: #00236f; margin: 0 0 4px 0;">2º Ano Médio A</h3>
          <p style="font-size: 13px; color: #64748b; margin: 0;">Profª. Responsável: Fernandes • Horário: 06:50</p>
        </div>
        <div style="background-color: #f8fafc; border-radius: 6px; padding: 12px 16px; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <span style="display: block; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase;">ALUNOS</span>
            <span style="font-size: 18px; font-weight: 700; color: #1e293b;">31</span>
          </div>
          <div style="text-align: right;">
            <span style="display: block; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase;">PRESENÇA</span>
            <span style="font-size: 18px; font-weight: 700; color: #16a34a;">92%</span>
          </div>
        </div>
        <div style="width: 100%; height: 6px; background-color: #e2e8f0; border-radius: 999px; overflow: hidden;">
          <div style="width: 92%; height: 100%; background-color: #16a34a; border-radius: 999px;"></div>
        </div>
      </div>

      <!-- 2º Ano Médio B -->
      <div style="background: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; padding: 20px; display: flex; flex-direction: column; gap: 16px;">
        <div>
          <h3 style="font-size: 18px; font-weight: 700; color: #00236f; margin: 0 0 4px 0;">2º Ano Médio B</h3>
          <p style="font-size: 13px; color: #64748b; margin: 0;">Profª. Responsável: Costa • Horário: 06:50</p>
        </div>
        <div style="background-color: #f8fafc; border-radius: 6px; padding: 12px 16px; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <span style="display: block; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase;">ALUNOS</span>
            <span style="font-size: 18px; font-weight: 700; color: #1e293b;">28</span>
          </div>
          <div style="text-align: right;">
            <span style="display: block; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase;">PRESENÇA</span>
            <span style="font-size: 18px; font-weight: 700; color: #2563eb;">88%</span>
          </div>
        </div>
        <div style="width: 100%; height: 6px; background-color: #e2e8f0; border-radius: 999px; overflow: hidden;">
          <div style="width: 88%; height: 100%; background-color: #2563eb; border-radius: 999px;"></div>
        </div>
      </div>

      <!-- 3º Ano Médio A -->
      <div style="background: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; padding: 20px; display: flex; flex-direction: column; gap: 16px;">
        <div>
          <h3 style="font-size: 18px; font-weight: 700; color: #00236f; margin: 0 0 4px 0;">3º Ano Médio A</h3>
          <p style="font-size: 13px; color: #64748b; margin: 0;">Prof. Responsável: Silva • Horário: 06:50</p>
        </div>
        <div style="background-color: #f8fafc; border-radius: 6px; padding: 12px 16px; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <span style="display: block; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase;">ALUNOS</span>
            <span style="font-size: 18px; font-weight: 700; color: #1e293b;">32</span>
          </div>
          <div style="text-align: right;">
            <span style="display: block; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase;">PRESENÇA</span>
            <span style="font-size: 18px; font-weight: 700; color: #16a34a;">95%</span>
          </div>
        </div>
        <div style="width: 100%; height: 6px; background-color: #e2e8f0; border-radius: 999px; overflow: hidden;">
          <div style="width: 95%; height: 100%; background-color: #16a34a; border-radius: 999px;"></div>
        </div>
      </div>

      <!-- 3º Ano Médio E -->
      <div style="background: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; padding: 20px; display: flex; flex-direction: column; gap: 16px;">
        <div>
          <h3 style="font-size: 18px; font-weight: 700; color: #00236f; margin: 0 0 4px 0;">3º Ano Médio E</h3>
          <p style="font-size: 13px; color: #64748b; margin: 0;">Profª. Responsável: Mendes • Horário: 06:50</p>
        </div>
        <div style="background-color: #f8fafc; border-radius: 6px; padding: 12px 16px; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <span style="display: block; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase;">ALUNOS</span>
            <span style="font-size: 18px; font-weight: 700; color: #1e293b;">30</span>
          </div>
          <div style="text-align: right;">
            <span style="display: block; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase;">PRESENÇA</span>
            <span style="font-size: 18px; font-weight: 700; color: #2563eb;">87%</span>
          </div>
        </div>
        <div style="width: 100%; height: 6px; background-color: #e2e8f0; border-radius: 999px; overflow: hidden;">
          <div style="width: 87%; height: 100%; background-color: #2563eb; border-radius: 999px;"></div>
        </div>
      </div>

    </div>
  `,

  relatorios: `
    <div style="margin-bottom: 24px;">
      <h1 style="font-size: 24px; font-weight: 700; color: #00236f; margin: 0 0 4px 0;">Relatórios e Gestão</h1>
      <p style="font-size: 14px; color: #64748b; margin: 0;">Emissão e exportação de documentos consolidados de assiduidade</p>
    </div>

    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px;">
      <div style="background: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0;">
        <h3 style="font-size: 18px; font-weight: 700; color: #1e293b; margin: 0 0 8px 0;">📅 Relatório Diário</h3>
        <p style="font-size: 14px; color: #64748b; margin: 0 0 16px 0;">Consolidado contendo entradas no horário e registros de atraso do dia.</p>
        <button style="width: 100%; padding: 10px; background-color: #ffffff; border: 1px solid #cbd5e1; border-radius: 6px; color: #334155; font-weight: 600; cursor: pointer;">Gerar PDF</button>
      </div>

      <div style="background: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0;">
        <h3 style="font-size: 18px; font-weight: 700; color: #1e293b; margin: 0 0 8px 0;">⚠️ Histórico de Atrasos</h3>
        <p style="font-size: 14px; color: #64748b; margin: 0 0 16px 0;">Listagem de alunos com frequência crítica ou reincidência de horários.</p>
        <button style="width: 100%; padding: 10px; background-color: #ffffff; border: 1px solid #cbd5e1; border-radius: 6px; color: #334155; font-weight: 600; cursor: pointer;">Exportar CSV</button>
      </div>
    </div>
  `,

  configuracoes: `
    <div style="margin-bottom: 24px;">
      <h1 style="font-size: 24px; font-weight: 700; color: #00236f; margin: 0 0 4px 0;">Configurações do Sistema</h1>
      <p style="font-size: 14px; color: #64748b; margin: 0;">Parâmetros globais para validações do portão e catracas</p>
    </div>

    <div style="background: #ffffff; padding: 24px; border-radius: 8px; border: 1px solid #e2e8f0; max-width: 600px;">
      <div style="margin-bottom: 20px;">
        <label style="display: block; font-size: 14px; font-weight: 600; color: #1e293b; margin-bottom: 8px;">Horário Limite para Entrada sem Atraso:</label>
        <input type="time" value="06:50" style="padding: 8px 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 14px; color: #334155;">
      </div>

    

      <button style="background-color: #00236f; color: #ffffff; border: none; padding: 10px 20px; border-radius: 6px; font-weight: 600; font-size: 14px; cursor: pointer;">Salvar Alterações</button>
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