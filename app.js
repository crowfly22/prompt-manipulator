// 🔥 Prompt Manipulation Engine v2.0 — UI controller
let CURRENT_LANG = 'both';
let CURRENT_RESULTS = {};

const SEV_ICON = {CRITICAL:'🔴', HIGH:'🟠', MEDIUM:'🟡', LOW:'🟢'};

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function applyFilter(results) {
  const sev = document.getElementById('sev-filter').value;
  const vec = document.getElementById('vector-filter').value.trim().toUpperCase();
  const filtered = {};
  for (const [name, variants] of Object.entries(results)) {
    let kept = variants;
    if (CURRENT_LANG !== 'both') kept = kept.filter(v => v.lang === CURRENT_LANG);
    if (sev) kept = kept.filter(v => v.severity === sev);
    if (vec) kept = kept.filter(v => v.vector === vec);
    if (kept.length) filtered[name] = kept;
  }
  return filtered;
}

function renderStats(results) {
  let total = 0, en = 0, id = 0;
  const sev = {CRITICAL:0, HIGH:0, MEDIUM:0, LOW:0};
  for (const variants of Object.values(results)) {
    for (const v of variants) {
      total++;
      if (v.lang === 'en') en++; else if (v.lang === 'id') id++;
      if (sev[v.severity] !== undefined) sev[v.severity]++;
    }
  }
  const el = document.getElementById('stats');
  el.innerHTML = `
    <span class="stat">Total: <strong>${total}</strong> variants</span>
    <span class="stat">🇬🇧 EN: <strong>${en}</strong></span>
    <span class="stat">🇮🇩 ID: <strong>${id}</strong></span>
    <span class="stat">🔴 CRIT: <strong>${sev.CRITICAL}</strong></span>
    <span class="stat">🟠 HIGH: <strong>${sev.HIGH}</strong></span>
    <span class="stat">🟡 MED: <strong>${sev.MEDIUM}</strong></span>
    <span class="stat">🟢 LOW: <strong>${sev.LOW}</strong></span>
    <span class="stat">Techniques: <strong>${Object.keys(results).length}</strong>/25</span>
  `;
}

function renderVariant(v, idx) {
  const flag = v.lang === 'en' ? '🇬🇧 EN' : '🇮🇩 ID';
  const sevIcon = SEV_ICON[v.severity] || '⚪';
  let body = '';
  if (v.sequence) {
    body = v.sequence.map((step, i) =>
      `<div class="sequence-step"><span class="turn-label">Turn ${i+1}:</span>${escapeHtml(step)}</div>`
    ).join('');
  } else {
    const promptText = v.prompt || '';
    body = `<div class="variant-prompt">${escapeHtml(promptText)}</div>`;
  }
  const copyContent = v.sequence ? v.sequence.join('\n---\n') : (v.prompt || '');
  return `
    <div class="variant" data-content="${escapeHtml(copyContent)}">
      <div class="variant-meta">
        <span class="variant-name">[${idx}] ${escapeHtml(v.name)}</span>
        <span class="tag tag-lang">${flag}</span>
        <span class="tag tag-vector">${v.vector}</span>
        <span class="tag tag-sev-${v.severity}">${sevIcon} ${v.severity}</span>
        <button class="copy-btn" data-copy="1">📋 Copy</button>
      </div>
      ${body}
    </div>`;
}

function renderResults(results) {
  const out = document.getElementById('output');
  if (Object.keys(results).length === 0) {
    out.innerHTML = '<div class="empty">No variants match the current filters.</div>';
    return;
  }
  let html = '';
  for (const [name, variants] of Object.entries(results)) {
    const niceName = name.replace(/_/g, ' ').toUpperCase();
    html += `
      <div class="technique">
        <div class="technique-header" data-toggle="1">
          <span class="technique-title">🎯 ${niceName}</span>
          <span class="variant-count">${variants.length} variants</span>
        </div>
        <div class="technique-body">
          ${variants.map((v, i) => renderVariant(v, i+1)).join('')}
        </div>
      </div>`;
  }
  out.innerHTML = html;
}

function generate() {
  const prompt = document.getElementById('prompt-input').value.trim();
  if (!prompt) {
    document.getElementById('output').innerHTML = '<div class="empty">Enter a prompt above.</div>';
    document.getElementById('stats').innerHTML = '';
    return;
  }
  CURRENT_RESULTS = buildTechniques(prompt);
  const filtered = applyFilter(CURRENT_RESULTS);
  renderStats(filtered);
  renderResults(filtered);
}

function exportData(format) {
  const filtered = applyFilter(CURRENT_RESULTS);
  let content, filename, mime;
  if (format === 'json') {
    content = JSON.stringify(filtered, null, 2);
    filename = 'prompt-variants.json';
    mime = 'application/json';
  } else {
    const lines = ['🔥 Prompt Manipulation Engine v2.0 — Export', '='.repeat(60), ''];
    for (const [name, variants] of Object.entries(filtered)) {
      lines.push(`\n## ${name.toUpperCase()}`);
      variants.forEach((v, i) => {
        const flag = v.lang === 'en' ? 'EN' : 'ID';
        lines.push(`\n[${i+1}] ${v.name} | ${flag} | ${v.vector} | ${v.severity}`);
        if (v.sequence) {
          v.sequence.forEach((s, j) => lines.push(`Turn ${j+1}: ${s}`));
        } else {
          lines.push(v.prompt || '');
        }
      });
    }
    content = lines.join('\n');
    filename = 'prompt-variants.txt';
    mime = 'text/plain';
  }
  const blob = new Blob([content], {type: mime});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

// Event delegation
document.addEventListener('click', e => {
  // Language toggle
  const langBtn = e.target.closest('#lang-toggle button');
  if (langBtn) {
    document.querySelectorAll('#lang-toggle button').forEach(b => b.classList.remove('active'));
    langBtn.classList.add('active');
    CURRENT_LANG = langBtn.dataset.lang;
    if (Object.keys(CURRENT_RESULTS).length) {
      const filtered = applyFilter(CURRENT_RESULTS);
      renderStats(filtered);
      renderResults(filtered);
    }
    return;
  }
  // Copy button
  if (e.target.dataset.copy) {
    const variant = e.target.closest('.variant');
    if (variant) {
      navigator.clipboard.writeText(variant.dataset.content);
      const orig = e.target.textContent;
      e.target.textContent = '✅ Copied';
      setTimeout(() => { e.target.textContent = orig; }, 1200);
    }
    return;
  }
  // Technique collapse toggle
  if (e.target.closest('[data-toggle]')) {
    e.target.closest('.technique').classList.toggle('collapsed');
    return;
  }
});

document.getElementById('generate-btn').addEventListener('click', generate);
document.getElementById('export-json-btn').addEventListener('click', () => exportData('json'));
document.getElementById('export-txt-btn').addEventListener('click', () => exportData('txt'));
document.getElementById('sev-filter').addEventListener('change', () => {
  if (Object.keys(CURRENT_RESULTS).length) {
    const f = applyFilter(CURRENT_RESULTS);
    renderStats(f); renderResults(f);
  }
});
document.getElementById('vector-filter').addEventListener('input', () => {
  if (Object.keys(CURRENT_RESULTS).length) {
    const f = applyFilter(CURRENT_RESULTS);
    renderStats(f); renderResults(f);
  }
});

// Auto-generate on load
generate();
