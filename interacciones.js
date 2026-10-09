(() => {
  'use strict';
  const titles = ANIME_CATALOGO;
  const byId = id => titles.find(a => a.id === Number(id));
  const safe = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const get = (key, fallback) => {try {const value = JSON.parse(localStorage.getItem('ans-v3-'+key));return value && typeof value==='object' ? value : fallback;} catch {return fallback;}};
  const save = (key, value) => {try {localStorage.setItem('ans-v3-'+key,JSON.stringify(value));return true;}catch{return false;}};
  const tabs = ['poll','battle','quiz'];
  tabs.forEach(name => document.getElementById('tab-'+name).addEventListener('click', () => {
    tabs.forEach(t => {document.getElementById('tab-'+t).setAttribute('aria-selected',String(t===name));document.getElementById('panel-'+t).hidden=t!==name;});
  }));
  const pollSelect=document.getElementById('poll-anime');
  titles.forEach(a=>{const opt=document.createElement('option');opt.value=String(a.id);opt.textContent=a.title;pollSelect.append(opt);});
  const pollForm=document.getElementById('poll-form');
  const pollResults=document.getElementById('poll-results');
  let poll=get('poll',{});
  function drawPoll(){
    const entries=Object.entries(poll).filter(([id,v])=>byId(id)&&v&&Number.isInteger(v.rating)&&v.rating>=1&&v.rating<=5);
    pollResults.innerHTML='<h4>Resultados guardados en este navegador</h4>'+(entries.length?`<p>${entries.length} ${entries.length===1?'anime calificado':'animes calificados'}. Puedes cambiar tu voto por un mismo anime.</p>`+entries.sort((a,b)=>b[1].rating-a[1].rating).map(([id,v])=>`<div class="result-row"><div class="result-row-head"><strong>${safe(byId(id).title)}</strong><span>${v.rating}/5</span></div><div class="result-bar"><div class="result-bar-fill" style="width:${v.rating*20}%"></div></div>${v.comment?`<p>${safe(v.comment)}</p>`:''}</div>`).join(''):'<p>Aún no has votado. Selecciona un anime para comenzar.</p>');
  }
  pollSelect.addEventListener('change',()=>{const v=poll[pollSelect.value];document.getElementById('poll-rating').value=v?.rating||'5';document.getElementById('poll-comment').value=v?.comment||'';});
  pollForm.addEventListener('submit',e=>{e.preventDefault();const id=pollSelect.value;const rating=Number(document.getElementById('poll-rating').value);const comment=document.getElementById('poll-comment').value.trim().slice(0,300);poll[id]={rating,comment};document.getElementById('poll-feedback').textContent=save('poll',poll)?'Tu opinión se guardó en este navegador.':'Tu opinión se registró temporalmente, pero el navegador no permitió guardarla.';drawPoll();});
  drawPoll();
  const battles=[[3,7],[1,2],[5,8],[9,6],[10,12],[4,11]];
  let votes=get('battles',{});
  const battleList=document.getElementById('battle-list');
  function drawBattles(){
    battleList.innerHTML=battles.map(([a,b],i)=>{const selected=Number(votes[i]);const left=byId(a),right=byId(b);return `<article class="battle-card"><h4>Enfrentamiento ${i+1}</h4><div class="battle-choices"><button data-battle="${i}" data-vote="${a}" aria-pressed="${selected===a}">${safe(left.title)}</button><button data-battle="${i}" data-vote="${b}" aria-pressed="${selected===b}">${safe(right.title)}</button></div><p>${selected?`Tu elección: <strong>${safe(byId(selected)?.title||'')}</strong>. Resultado local: ${selected===a?'100 % / 0 %':'0 % / 100 %'} (un voto).`:'Todavía no has votado en este enfrentamiento.'}</p></article>`;}).join('');
  }
  battleList.addEventListener('click',e=>{const button=e.target.closest('[data-battle][data-vote]');if(!button)return;votes[button.dataset.battle]=Number(button.dataset.vote);save('battles',votes);drawBattles();});
  drawBattles();
  const questions=[
    {q:'¿Qué estudio produjo El viaje de Chihiro?',o:['Bones','Studio Ghibli','Madhouse','ufotable'],a:1,why:'El viaje de Chihiro es una producción de Studio Ghibli.'},
    {q:'¿Qué anime de este catálogo gira en torno al voleibol?',o:['Haikyuu!!','One Piece','Death Note','Violet Evergarden'],a:0,why:'Haikyuu!! sigue a un equipo escolar de voleibol.'},
    {q:'¿En qué anime aparece un cuaderno con poderes peligrosos?',o:['Frieren','Mob Psycho 100','Death Note','Your Name'],a:2,why:'Death Note presenta un cuaderno sobrenatural.'},
    {q:'¿Cuál de estos animes trata sobre una familia con identidades secretas?',o:['A Silent Voice','Spy x Family','Demon Slayer','Fullmetal Alchemist: Brotherhood'],a:1,why:'Spy x Family reúne personajes que ocultan su verdadera identidad.'},
    {q:'¿Qué protagonista emprende un viaje para comprender mejor los vínculos humanos?',o:['Frieren','Luffy','Light Yagami','Tanjiro'],a:0,why:'Frieren reflexiona sobre el paso del tiempo y las relaciones humanas.'}
  ];
  const quizQuestions=document.getElementById('quiz-questions');
  const quizResult=document.getElementById('quiz-result');
  function drawQuiz(){quizQuestions.innerHTML=questions.map((q,i)=>`<div class="quiz-question"><fieldset><legend>${i+1}. ${safe(q.q)}</legend>${q.o.map((o,j)=>`<label class="quiz-option"><input type="radio" name="q${i}" value="${j}" required> ${safe(o)}</label>`).join('')}</fieldset><div id="explain-${i}"></div></div>`).join('');quizResult.textContent='';}
  document.getElementById('quiz-form').addEventListener('submit',e=>{e.preventDefault();let score=0;questions.forEach((q,i)=>{const chosen=Number(document.querySelector(`input[name="q${i}"]:checked`).value);if(chosen===q.a)score++;document.getElementById('explain-'+i).innerHTML=`<div class="quiz-explanation">${chosen===q.a?'Correcto.':'Incorrecto.'} ${safe(q.why)}</div>`;});const previous=get('quiz',{});const best=Math.max(score,Number(previous.best)||0);const stored=save('quiz',{last:score,best});quizResult.textContent=`Tu resultado: ${score} de ${questions.length} respuestas correctas. Mejor puntuación: ${best}/${questions.length}. ${stored?'Guardado en este navegador.':'No se pudo guardar de forma permanente.'}`;});
  document.getElementById('quiz-reset').addEventListener('click',()=>{document.getElementById('quiz-form').reset();drawQuiz();});
  drawQuiz();
})();
