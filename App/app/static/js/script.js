
// O formulario deve enviar para o banco .. Obs: banco temporario em memoria ... 
// Usar Ajax na busca ? Axios ? 

// JavaScript para adicionar sugestões à lista
const suggestionForm = document.getElementById('suggestionForm');
const suggestionList = document.getElementById('suggestionList');

// Função para carregar sugestões do Local Storage
function loadSuggestions() {
    const storedSuggestions = JSON.parse(localStorage.getItem('suggestions')) || []; // Recupera as sugestões ou inicializa como vazio
    return storedSuggestions;
}

// Função para salvar sugestões no Local Storage
function saveSuggestions(suggestions) {
    localStorage.setItem('suggestions', JSON.stringify(suggestions)); // Salva as sugestões no Local Storage
}

// Carrega as sugestões ao inicializar a página
let suggestions = loadSuggestions();
renderSuggestions(); // Renderiza as sugestões carregadas

suggestionForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário

    // Cria um novo item de lista
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const language = document.getElementById('language').value || "N/A";
    const complexity = document.getElementById('complexity').value;

    const newSuggestion = {
        title,
        description,
        language,
        complexity,
        likes: 0 // Inicializa os likes como 0
    };

    suggestions.push(newSuggestion); // Adiciona a nova sugestão ao array
    saveSuggestions(suggestions); // Salva as sugestões atualizadas no Local Storage
    renderSuggestions(); // Renderiza a lista de sugestões

    // Limpa os campos do formulário
    suggestionForm.reset();
});

// Função para renderizar as sugestões
function renderSuggestions() {
    suggestionList.innerHTML = ''; // Limpa a lista atual

    // Ordena as sugestões por likes em ordem decrescente
    suggestions.sort((a, b) => b.likes - a.likes);

    // Adiciona cada sugestão à lista
    suggestions.forEach((suggestion, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <strong>${suggestion.title}</strong><br>
            ${suggestion.description}<br>
            <em>Linguagem: ${suggestion.language} | Complexidade: ${suggestion.complexity}</em><br>
            <button onclick="likeSuggestion(${index})">Like (${suggestion.likes})</button>
            <button onclick="deleteSuggestion(${index})">Excluir</button>
        `;
        suggestionList.appendChild(listItem);
    });
}

// Função para dar like em uma sugestão
function likeSuggestion(index) {
    suggestions[index].likes++; // Incrementa os likes da sugestão
    saveSuggestions(suggestions); // Salva as sugestões atualizadas no Local Storage
    renderSuggestions(); // Re-renderiza a lista de sugestões
}

// Função para excluir uma sugestão
function deleteSuggestion(index) {
    suggestions.splice(index, 1); // Remove a sugestão do array
    saveSuggestions(suggestions); // Salva as sugestões atualizadas no Local Storage
    renderSuggestions(); // Re-renderiza a lista de sugestões
}
