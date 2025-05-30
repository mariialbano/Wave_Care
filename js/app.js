const apiKey = '9f93b4fa9aa9d8aa799a6af275de422f
';

document.getElementById('buscarBtn').addEventListener('click', () => {
  const cidade = document.getElementById('cidadeInput').value.trim();
  const idade = parseInt(document.getElementById('idadeInput').value.trim());

  if (!cidade || isNaN(idade)) {
    alert('Por favor, preencha cidade e idade corretamente.');
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Cidade não encontrada');
      }
      return response.json();
    })
    .then(dados => {
      const temp = dados.main.temp;
      const sensacao = dados.main.feels_like;
      const condicao = dados.weather[0].description;

      document.getElementById('temperatura').textContent = `🌡️ Temperatura: ${temp.toFixed(1)}°C`;
      document.getElementById('sensacao').textContent = `🤔 Sensação térmica: ${sensacao.toFixed(1)}°C`;
      document.getElementById('condicao').textContent = `☁️ Condição: ${condicao.charAt(0).toUpperCase() + condicao.slice(1)}`;

      atualizarAlerta(temp);
      mostrarDicas(idade);
    })
    .catch(error => {
      console.error('Erro:', error);
      alert('Erro ao buscar dados. Verifique a cidade informada.');
    });
});

function atualizarAlerta(temp) {
  const alerta = document.getElementById('alerta');

  if (temp > 34) {
    alerta.textContent = '⚠️ Onda de calor! Evite se expor ao sol entre 10h e 16h.';
    alerta.style.backgroundColor = '#ff4d4d'; // vermelho
    alerta.style.color = '#fff';
  } else if (temp >= 30) {
    alerta.textContent = '☀️ Clima quente, hidrate-se!';
    alerta.style.backgroundColor = '#ffcc00'; // amarelo
    alerta.style.color = '#000';
  } else {
    alerta.textContent = '🌤️ Temperatura agradável.';
    alerta.style.backgroundColor = '#00aeef'; // azul
    alerta.style.color = '#fff';
  }
}

function mostrarDicas(idade) {
  const dicas = document.getElementById('dicas');
  let conteudo = '';

  if (idade <= 12) {
    conteudo = `
      <ul>
        <li>👶 Ofereça água com frequência</li>
        <li>🧢 Mantenha as crianças à sombra</li>
        <li>🍉 Dê alimentos leves e frescos</li>
      </ul>
    `;
  } else if (idade >= 60) {
    conteudo = `
      <ul>
        <li>🪑 Evite sair durante o dia</li>
        <li>💧 Hidrate-se mesmo sem sede</li>
        <li>🌀 Fique em ambientes ventilados</li>
      </ul>
    `;
  } else {
    conteudo = `
      <ul>
        <li>🚰 Beba água com frequência</li>
        <li>🧴 Use protetor solar</li>
        <li>⏱️ Evite atividades entre 10h e 16h</li>
      </ul>
    `;
  }

  dicas.innerHTML = `
    <div class="mt-3 p-3 bg-light rounded border">
      <h5>Dicas para você:</h5>
      ${conteudo}
    </div>
  `;
}
