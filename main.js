/* =====================================================
   CONFIGURACIÓN — cambia aquí tus datos una sola vez
   y se actualizan en todas las páginas.
   ===================================================== */
const CONFIG = {
  telefono: '+51 900 000 000',
  correoRelatos: 'relatos@entredientes.pe',
  diaAnuncio: 'domingo 15 de noviembre',
  redes: {
    Instagram: '#',
    TikTok: '#',
    Facebook: '#'
  },
  plataformas: {
    Spotify: '#',
    YouTube: '#',
    'Apple Podcasts': '#',
    iVoox: '#',
    'Amazon Music': '#'
  }
};
/* ===================================================== */

const PAGINAS = [
  { url: 'index.html', nombre: 'Inicio' },
  { url: 'episodios.html', nombre: 'Episodios' },
  { url: 'nosotros.html', nombre: 'Quiénes somos' },
  { url: 'privacidad.html', nombre: 'Privacidad' }
];

const actual = (location.pathname.split('/').pop() || 'index.html').toLowerCase();

// ---------- Cabecera ----------
const cabecera = document.getElementById('cabecera');
if (cabecera) {
  const enlaces = PAGINAS.filter(p => p.url !== 'privacidad.html').map(p =>
    `<a href="${p.url}"${p.url === actual ? ' aria-current="page"' : ''}>${p.nombre}</a>`
  ).join('');
  cabecera.innerHTML = `
  <a class="saltar" href="#contenido">Saltar al contenido</a>
  <header class="cabecera">
    <div class="wrap">
      <a class="marca" href="index.html" aria-label="Entre Dientes, inicio">
        <img src="logo-rojo-chico.png" alt="" width="40" height="41"><span>Entre Dientes</span>
      </a>
      <nav class="menu" id="menu" aria-label="Principal">
        ${enlaces}
        <a class="solo-movil" href="relatos.html"${actual === 'relatos.html' ? ' aria-current="page"' : ''}>Envía tu relato</a>
      </nav>
      <a class="btn solo-escritorio" href="relatos.html">Envía tu relato</a>
      <button type="button" class="abrir-menu" aria-expanded="false" aria-controls="menu" aria-label="Abrir menú">
        <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
      </button>
    </div>
  </header>`;
  const boton = cabecera.querySelector('.abrir-menu');
  const menu = cabecera.querySelector('.menu');
  boton.addEventListener('click', () => {
    const abierto = menu.classList.toggle('abierto');
    boton.setAttribute('aria-expanded', abierto);
    boton.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
  });
}

// ---------- Pie ----------
const pie = document.getElementById('pie');
if (pie) {
  const lista = obj => Object.entries(obj).map(([n, u]) => `<a href="${u}">${n}</a>`).join('');
  pie.innerHTML = `
  <footer class="pie">
    <div class="wrap">
      <div class="pie-marca"><img src="logo-rojo-chico.png" alt="" width="64" height="66"><div><strong>Entre Dientes</strong><span>A Dark Odyssey</span></div></div>
      <div class="pie-cols">
        <div class="pie-col"><span>Explora</span>
          <a href="index.html">Inicio</a><a href="relatos.html">Envía tu relato</a><a href="episodios.html">Episodios</a><a href="nosotros.html">Quiénes somos</a>
        </div>
        <div class="pie-col"><span>Escúchanos en</span>${lista(CONFIG.plataformas)}</div>
        <div class="pie-col"><span>Síguenos</span>${lista(CONFIG.redes)}</div>
        <div class="pie-col"><span>Relatos por WhatsApp</span><a class="js-whatsapp" href="#"><span class="js-telefono"></span></a></div>
      </div>
      <div class="legal"><span>© ${new Date().getFullYear()} Entre Dientes. Escúchalo con las luces encendidas.</span><a href="privacidad.html">Privacidad y uso de tu relato</a></div>
    </div>
  </footer>
  <div class="oscuridad" id="oscuridad" aria-hidden="true"></div>
  <button type="button" class="luces" id="luces" aria-pressed="false" aria-label="Apagar las luces">
    <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"/><path d="M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/></svg>
    <span id="luces-texto">Apagar las luces</span>
  </button>`;
}

// ---------- Datos de contacto en toda la página ----------
document.querySelectorAll('.js-telefono').forEach(el => el.textContent = CONFIG.telefono);
document.querySelectorAll('.js-correo').forEach(el => el.textContent = CONFIG.correoRelatos);
document.querySelectorAll('.js-whatsapp').forEach(a => a.href = 'https://wa.me/' + CONFIG.telefono.replace(/\D/g, ''));
document.querySelectorAll('.js-correo-enlace').forEach(a => a.href = 'mailto:' + CONFIG.correoRelatos);
document.querySelectorAll('[data-red]').forEach(a => { const u = CONFIG.redes[a.dataset.red]; if (u) a.href = u; });
document.querySelectorAll('[data-plataforma]').forEach(a => {
  const u = CONFIG.plataformas[a.dataset.plataforma]; if (u) a.href = u;
});

// ---------- La puerta que se abre (inicio) ----------
const puerta = document.getElementById('puerta');
if (puerta) {
  const pista = document.getElementById('pista');
  puerta.addEventListener('click', () => {
    const abierta = puerta.classList.toggle('abierta');
    puerta.setAttribute('aria-pressed', abierta);
    pista.textContent = abierta ? 'Toca otra vez para volver' : 'Toca el emblema, si te atreves';
  });
}

// ---------- Reproductor de demostración ----------
document.querySelectorAll('.reproductor').forEach(rep => {
  const play = rep.querySelector('.play');
  const tiempo = rep.querySelector('.rep-tiempo span');
  const progreso = rep.querySelector('.barra i');
  if (!play) return;
  const DURACION = parseInt(rep.dataset.duracion, 10) || 1800;
  let seg = 0, timer = null;
  const pintar = () => {
    tiempo.textContent = String(Math.floor(seg / 60)).padStart(2, '0') + ':' + String(seg % 60).padStart(2, '0');
    progreso.style.width = (seg / DURACION * 100) + '%';
  };
  play.addEventListener('click', () => {
    if (timer) {
      clearInterval(timer); timer = null;
      play.classList.remove('sonando'); play.setAttribute('aria-label', 'Reproducir episodio');
    } else {
      timer = setInterval(() => { seg = (seg + 1) % DURACION; pintar(); }, 1000);
      play.classList.add('sonando'); play.setAttribute('aria-label', 'Pausar episodio');
    }
  });
});

// ---------- Votación ----------
const opciones = document.querySelectorAll('.opcion');
if (opciones.length) {
  const mensaje = document.getElementById('voto-mensaje');
  const base = {};
  opciones.forEach(op => base[op.dataset.id] = parseInt(op.dataset.votos, 10) || 0);
  const marcar = id => {
    const votos = { ...base }; votos[id] += 1;
    const total = Object.values(votos).reduce((a, b) => a + b, 0);
    opciones.forEach(op => {
      const elegida = op.dataset.id === id;
      const pct = Math.round(votos[op.dataset.id] / total * 100);
      op.setAttribute('aria-pressed', elegida);
      op.style.setProperty('--pct', pct + '%');
      op.classList.add('con-resultado');
      op.querySelector('.e').textContent = (elegida ? 'Tu voto, ' : '') + pct + ' % de los votos';
      if (elegida) mensaje.textContent = 'Votaste por «' + op.querySelector('.t').textContent + '». Van ' + total + ' votos. Anunciamos el relato ganador el ' + CONFIG.diaAnuncio + '.';
    });
  };
  opciones.forEach(op => op.addEventListener('click', () => {
    marcar(op.dataset.id);
    try { localStorage.setItem('entre-dientes-voto', op.dataset.id); } catch (e) {}
  }));
  try { const g = localStorage.getItem('entre-dientes-voto'); if (g && base[g] !== undefined) marcar(g); } catch (e) {}
}

// ---------- Carrusel de voces ----------
const pista = document.querySelector('.carrusel-pista');
if (pista) {
  const flechas = document.querySelectorAll('.flecha');
  const actualizar = () => {
    const max = pista.scrollWidth - pista.clientWidth - 2;
    flechas.forEach(f => f.disabled = f.dataset.dir === '-1' ? pista.scrollLeft <= 2 : pista.scrollLeft >= max);
    pista.classList.toggle('al-final', pista.scrollLeft >= max);
  };
  flechas.forEach(f => f.addEventListener('click', () => {
    const paso = pista.querySelector('.conductor').offsetWidth + 16;
    pista.scrollBy({ left: paso * Number(f.dataset.dir), behavior: 'smooth' });
  }));
  pista.addEventListener('scroll', actualizar, { passive: true });
  window.addEventListener('resize', actualizar);
  actualizar();
}

// ---------- Apagar las luces ----------
const luces = document.getElementById('luces');
if (luces) {
  const texto = document.getElementById('luces-texto');
  const oscuridad = document.getElementById('oscuridad');
  const fijar = (x, y) => { oscuridad.style.setProperty('--x', x + 'px'); oscuridad.style.setProperty('--y', y + 'px'); };
  let apagado = false;
  try { apagado = sessionStorage.getItem('entre-dientes-luces') === 'off'; } catch (e) {}
  const aplicar = () => {
    document.body.classList.toggle('apagado', apagado);
    luces.setAttribute('aria-pressed', apagado);
    texto.textContent = apagado ? 'Encender las luces' : 'Apagar las luces';
    luces.setAttribute('aria-label', texto.textContent);
  };
  aplicar();
  luces.addEventListener('click', () => {
    apagado = !apagado; aplicar();
    try { sessionStorage.setItem('entre-dientes-luces', apagado ? 'off' : 'on'); } catch (e) {}
  });
  window.addEventListener('mousemove', e => fijar(e.clientX, e.clientY));
  ['touchstart', 'touchmove'].forEach(ev => window.addEventListener(ev, e => {
    if (e.touches[0]) fijar(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true }));
}
