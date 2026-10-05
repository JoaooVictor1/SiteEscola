const respostas = [
  { k: ['oi', 'ola', 'olá', 'eai', 'hey'], r: 'Olá! Sou um robô de demonstração. O que deseja saber sobre IA?' },
  { k: ['o que é ia', 'o que e ia', 'ia'], r: 'A Inteligência Artificial (IA) é a capacidade de sistemas simularem raciocínio humano, reconhecendo padrões e dados.' },
  { k: ['onde usa', 'onde a ia é usada', 'exemplos'], r: 'A IA está presente em assistentes de voz, redes sociais, sistemas bancários e plataformas de streaming.' },
  { k: ['netflix', 'filme', 'serie'], r: 'A Netflix usa algoritmos de recomendação para analisar seu histórico e sugerir títulos semelhantes.' },
  { k: ['vantagens', 'vantagem'], r: 'Acelera tarefas complexas, otimiza processos industriais e auxilia em diagnósticos médicos.' },
  { k: ['perigo', 'desvantagens', 'riscos'], r: 'Envolve questões sobre privacidade de dados, vieses algorítmicos e o uso ético da informação.' },
  { k: ['futuro'], r: 'Tendências apontam para maior integração em mobilidade autônoma e pesquisas científicas avançadas.' },
  { k: ['chatgpt', 'gemini', 'assistente'], r: 'Sistemas baseados em IA generativa, treinados com grandes volumes de dados textuais.' },
  { k: ['obrigado', 'obrigada', 'valeu'], r: 'Disponha! Bom trabalho escolar.' },
  { k: ['tchau', 'adeus'], r: 'Até mais.' },
];

const chatBox = document.getElementById('chatBox');

function responder(texto) {
  for (const r of respostas) {
    if (r.k.some(p => texto.includes(p))) return r.r;
  }
  return 'Não compreendi. Tente perguntar sobre: o que é IA, exemplos, vantagens ou riscos.';
}

function enviar() {
  const input = document.getElementById('chatInput');
  const texto = input.value.trim();
  if (!texto) return;

  chatBox.innerHTML += `<div class="chat-msg user"><b>Você:</b> ${escapeHtml(texto)}</div>`;
  
  const respostaRobo = responder(texto.toLowerCase());
  chatBox.innerHTML += `<div class="chat-msg robot"><b>Robô:</b> ${respostaRobo}</div>`;

  chatBox.scrollTop = chatBox.scrollHeight;
  input.value = '';
}

function escapeHtml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

document.getElementById('chatBtn').onclick = enviar;
document.getElementById('chatInput').addEventListener('keydown', e => { 
  if (e.key === 'Enter') enviar(); 
});

const perguntas = [
  { p: '1. Qual assistente virtual pertence à Amazon?', ops: ['Siri', 'Alexa', 'Cortana'], a: 1 },
  { p: '2. O que plataformas como a Netflix usam para sugerir conteúdos?', ops: ['Sistemas de recomendação por IA', 'Sorteio aleatório', 'Seleção manual diária'], a: 0 },
  { p: '3. A Inteligência Artificial pode ser aplicada na saúde?', ops: ['Não, apenas em tecnologia', 'Sim, em diagnósticos e análises', 'Apenas em ficção'], a: 1 },
  { p: '4. Qual destes é um exemplo prático de IA no celular?', ops: ['Desbloqueio facial biométrico', 'Cabo carregador', 'Capa protetora'], a: 0 },
  { p: '5. O que significa a sigla "IA"?', ops: ['Internet Ampla', 'Inteligência Artificial', 'Instrução Automática'], a: 1 },
];

let i = 0, pontos = 0;
const quizBox = document.getElementById('quizBox');

function mostrarPergunta() {
  if (i >= perguntas.length) {
    quizBox.innerHTML = `
      <div class="quiz-result">
        <h3>Fim do Quiz</h3>
        <p style="margin-top: 8px; color: #888;">Você acertou ${pontos} de ${perguntas.length} questões.</p>
        <button class="quizBtn" style="margin-top: 16px; text-align: center;" onclick="reiniciarQuiz()">Refazer Quiz</button>
      </div>`;
    return;
  }

  const q = perguntas[i];
  let html = `<p>${q.p}</p><div class="quizBtn-group">`;
  q.ops.forEach((o, idx) => {
    html += `<button class="quizBtn" data-i="${idx}">${o}</button>`;
  });
  html += `</div>`;
  
  quizBox.innerHTML = html;

  quizBox.querySelectorAll('button').forEach(b => {
    b.onclick = () => {
      if (+b.dataset.i === q.a) pontos++;
      i++; 
      mostrarPergunta();
    };
  });
}

function reiniciarQuiz() {
  i = 0;
  pontos = 0;
  mostrarPergunta();
}

mostrarPergunta();