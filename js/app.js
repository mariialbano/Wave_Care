const API_KEY = '9f93b4fa9aa9d8aa799a6af275de422f';
const alertaDiv = document.getElementById('alerta');
alertaDiv.style.display = 'none'; 

const cidadeSelecionada = document.getElementById('estado');
const cidadeTexto = document.getElementById('cidade');
const dataTexto = document.getElementById('data');
const temperatura = document.getElementById('temperatura');
const sensacao = document.getElementById('sensacao');
const condicao = document.getElementById('condicao');

cidadeSelecionada.addEventListener('change', () => {
    const cidade = cidadeSelecionada.value;
    buscarDadosClima(cidade);
});

function buscarDadosClima(cidade) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade},BR&appid=${API_KEY}&units=metric&lang=pt_br`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar dados');
            }
            return response.json();
        })
        .then(dados => {
            const temp = Math.round(dados.main.temp);
            const feelsLike = Math.round(dados.main.feels_like);
            const descricao = dados.weather[0].description;

            cidadeTexto.textContent = cidade;
            temperatura.textContent = `${temp}°C`;
            sensacao.textContent = `${feelsLike}°C`;
            condicao.textContent = descricao.charAt(0).toUpperCase() + descricao.slice(1);

            verificarAlerta(feelsLike);
            atualizarData();
        })
        .catch(error => {
            console.error('Erro:', error);
            alertaDiv.style.display = 'block';
            alertaDiv.classList.replace('alert-warning', 'alert-danger');
            alertaDiv.innerHTML = '<strong>Erro ao carregar dados da cidade.</strong>';
        });
}

function verificarAlerta(feelsLike) {
    if (feelsLike >= 35) {
        alertaDiv.style.display = 'flex';
        alertaDiv.classList.remove('alert-danger');
        alertaDiv.classList.add('alert-warning');
        alertaDiv.innerHTML = '<span class="me-2">⚠</span> <div>Onda de calor! Evite exposição ao sol e mantenha-se hidratado.</div>';
    } else {
        alertaDiv.style.display = 'none';
    }
}

function atualizarData() {
    const hoje = new Date();
    const opcoes = { weekday: 'long', day: 'numeric', month: 'long' };
    const dataFormatada = hoje.toLocaleDateString('pt-BR', opcoes);
    dataTexto.textContent = dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1);
}

window.onload = () => {
    cidadeSelecionada.value = 'São Paulo';
    buscarDadosClima('São Paulo');
};
