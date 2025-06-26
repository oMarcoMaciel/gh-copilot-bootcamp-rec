# Diagrama de Sequência - Página de Pesquisa de Pessoas

```mermaid
sequenceDiagram
    participant Usuário
    participant DOM
    participant PessoaManager
    participant Timer

    Usuário->>DOM: Acessa indice.html
    DOM->>DOM: Exibe loading inicial
    DOM->>Timer: Aguarda 1.5s (simula carregamento)
    Timer-->>DOM: Timeout 1.5s
    DOM->>PessoaManager: Instancia PessoaManager
    PessoaManager->>PessoaManager: generateInitialData()
    PessoaManager->>PessoaManager: updateDisplay()
    PessoaManager->>DOM: Esconde loading
    PessoaManager->>Timer: Inicia setInterval (10s)
    loop A cada 10s
        Timer-->>PessoaManager: Timeout 10s
        PessoaManager->>DOM: Exibe loading
        PessoaManager->>PessoaManager: updateRandomData()
        PessoaManager->>PessoaManager: updateDisplay()
        PessoaManager->>DOM: Esconde loading
    end
    Usuário-->>DOM: Fecha página
    DOM->>PessoaManager: stopAutoUpdate()
```

---

**Legenda:**
- `PessoaManager` é a classe JS que gerencia os dados mockados e atualizações.
- O DOM exibe/atualiza a interface conforme os dados mudam.
- O Timer representa os delays simulando chamadas de API e o intervalo de atualização automática.
