// Dados mockados para simulação
const nomesMock = [
    'Ana Silva', 'Bruno Santos', 'Carla Oliveira', 'Daniel Costa', 'Elena Rodrigues',
    'Felipe Almeida', 'Gabriela Lima', 'Henrique Ferreira', 'Isabela Pereira', 'João Martins',
    'Karen Souza', 'Lucas Barbosa', 'Marina Castro', 'Nicolas Rocha', 'Olivia Mendes',
    'Pedro Araújo', 'Quiteria Dias', 'Rafael Cardoso', 'Sophia Nascimento', 'Thiago Melo',
    'Ursula Campos', 'Vitor Pinto', 'Wesley Teixeira', 'Ximena Cruz', 'Yara Freitas',
    'Zé Carlos', 'Amanda Torres', 'Bernardo Gomes', 'Cristina Moura', 'Diego Silva'
];

const dominiosMock = [
    'gmail.com', 'hotmail.com', 'yahoo.com.br', 'outlook.com', 'uol.com.br',
    'terra.com.br', 'ig.com.br', 'bol.com.br', 'globo.com', 'r7.com'
];

// Classe para gerenciar os dados das pessoas
class PessoaManager {
    constructor() {
        this.pessoas = [];
        this.lastUpdateTime = null;
        this.updateInterval = null;
        this.init();
    }

    init() {
        this.hideLoading();
        this.generateInitialData();
        this.startAutoUpdate();
        this.updateDisplay();
    }

    // Gera dados iniciais
    generateInitialData() {
        const quantidadePessoas = this.getRandomNumber(8, 15);
        this.pessoas = [];
        
        for (let i = 0; i < quantidadePessoas; i++) {
            this.pessoas.push(this.generatePessoa());
        }
    }

    // Gera uma pessoa com dados mockados
    generatePessoa() {
        const nome = this.getRandomItem(nomesMock);
        const email = this.generateEmail(nome);
        const telefone = this.generateTelefone();

        return {
            id: this.generateId(),
            nome,
            email,
            telefone
        };
    }

    // Gera email baseado no nome
    generateEmail(nome) {
        const nomeArray = nome.toLowerCase().split(' ');
        const primeiroNome = nomeArray[0];
        const ultimoNome = nomeArray.length > 1 ? nomeArray[nomeArray.length - 1] : '';
        const dominio = this.getRandomItem(dominiosMock);
        
        const formatos = [
            `${primeiroNome}.${ultimoNome}`,
            `${primeiroNome}${ultimoNome}`,
            `${primeiroNome}_${ultimoNome}`,
            `${primeiroNome}${this.getRandomNumber(10, 999)}`
        ];

        const emailBase = this.getRandomItem(formatos);
        return `${emailBase}@${dominio}`;
    }

    // Gera telefone brasileiro
    generateTelefone() {
        const ddd = this.getRandomNumber(11, 99);
        const nono = this.getRandomNumber(6, 9);
        const numero = this.getRandomNumber(1000, 9999);
        const complemento = this.getRandomNumber(1000, 9999);
        
        return `(${ddd}) ${nono}${numero}-${complemento}`;
    }

    // Gera ID único
    generateId() {
        return Date.now() + Math.random().toString(36).substr(2, 9);
    }

    // Utilitários
    getRandomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Atualiza alguns dados aleatoriamente
    updateRandomData() {
        const actionsCount = this.getRandomNumber(1, 3);
        
        for (let i = 0; i < actionsCount; i++) {
            const action = this.getRandomNumber(1, 3);
            
            switch (action) {
                case 1: // Adicionar nova pessoa
                    if (this.pessoas.length < 20) {
                        this.pessoas.push(this.generatePessoa());
                    }
                    break;
                case 2: // Remover pessoa (se houver mais de 5)
                    if (this.pessoas.length > 5) {
                        const randomIndex = this.getRandomNumber(0, this.pessoas.length - 1);
                        this.pessoas.splice(randomIndex, 1);
                    }
                    break;
                case 3: // Atualizar dados de uma pessoa existente
                    if (this.pessoas.length > 0) {
                        const randomIndex = this.getRandomNumber(0, this.pessoas.length - 1);
                        this.pessoas[randomIndex] = this.generatePessoa();
                    }
                    break;
            }
        }
    }

    // Inicia a atualização automática
    startAutoUpdate() {
        this.updateInterval = setInterval(() => {
            this.showLoading();
            
            setTimeout(() => {
                this.updateRandomData();
                this.updateDisplay();
                this.hideLoading();
            }, 1000); // Simula delay da API
            
        }, 10000); // 10 segundos
    }

    // Atualiza a exibição
    updateDisplay() {
        this.updateLastUpdateTime();
        this.renderTable();
        this.updateResultsCount();
    }

    // Atualiza horário da última atualização
    updateLastUpdateTime() {
        this.lastUpdateTime = new Date();
        const timeString = this.lastUpdateTime.toLocaleTimeString('pt-BR');
        document.getElementById('lastUpdate').textContent = timeString;
    }

    // Renderiza a tabela
    renderTable() {
        const tbody = document.getElementById('resultsBody');
        const resultsContainer = document.getElementById('resultsContainer');
        
        tbody.innerHTML = '';
        
        this.pessoas.forEach((pessoa, index) => {
            const row = document.createElement('tr');
            row.className = 'fade-in-row';
            row.style.animationDelay = `${index * 0.1}s`;
            
            row.innerHTML = `
                <td>${pessoa.nome}</td>
                <td>${pessoa.email}</td>
                <td>${pessoa.telefone}</td>
            `;
            
            tbody.appendChild(row);
        });

        resultsContainer.classList.add('show');
    }

    // Atualiza contador de resultados
    updateResultsCount() {
        const count = this.pessoas.length;
        const resultsCount = document.getElementById('resultsCount');
        const text = count === 1 ? '1 pessoa encontrada' : `${count} pessoas encontradas`;
        resultsCount.textContent = text;
    }

    // Mostra loading
    showLoading() {
        const loading = document.getElementById('loading');
        const resultsContainer = document.getElementById('resultsContainer');
        
        loading.style.display = 'block';
        resultsContainer.style.opacity = '0.5';
    }

    // Esconde loading
    hideLoading() {
        const loading = document.getElementById('loading');
        const resultsContainer = document.getElementById('resultsContainer');
        
        setTimeout(() => {
            loading.style.display = 'none';
            resultsContainer.style.opacity = '1';
        }, 500);
    }

    // Para a atualização automática
    stopAutoUpdate() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
    }
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    // Mostra loading inicial
    document.getElementById('loading').style.display = 'block';
    
    // Simula carregamento inicial
    setTimeout(() => {
        window.pessoaManager = new PessoaManager();
    }, 1500);
});

// Cleanup quando a página for fechada
window.addEventListener('beforeunload', () => {
    if (window.pessoaManager) {
        window.pessoaManager.stopAutoUpdate();
    }
});
