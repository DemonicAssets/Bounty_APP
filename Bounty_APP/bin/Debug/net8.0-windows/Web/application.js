(() => {
  'use strict';

  const STORAGE_KEY = 'hsc_incident_reports_v1';

  const cases = (window.HSC_SUBJECTS || []).map(item => ({
    id: item.id,
    name: item.name,
    alias: item.alias,
    classification: item.classification,
    threat: String(item.threat || 'medium').toLowerCase(),
    status: item.status,
    location: item.location,
    bounty: item.bounty,
    image: item.image,
    summary: item.summary
  }));

  const refs = {
    search: document.querySelector('#case-search'),
    threat: document.querySelector('#threat-filter'),
    status: document.querySelector('#status-filter'),
    list: document.querySelector('#case-list'),
    resultCount: document.querySelector('#result-count'),
    activeStat: document.querySelector('#stat-active'),
    highStat: document.querySelector('#stat-high'),
    reportStat: document.querySelector('#stat-reports'),
    form: document.querySelector('#incident-form'),
    formMessage: document.querySelector('#form-message'),
    reportList: document.querySelector('#report-list'),
    clearReports: document.querySelector('#clear-reports')
  };

  const detail = {
    id: document.querySelector('#detail-id'), status: document.querySelector('#detail-status'), image: document.querySelector('#detail-image'),
    threat: document.querySelector('#detail-threat-badge'), name: document.querySelector('#detail-name'), alias: document.querySelector('#detail-alias'),
    summary: document.querySelector('#detail-summary'), classification: document.querySelector('#detail-classification'), location: document.querySelector('#detail-location'),
    bounty: document.querySelector('#detail-bounty'), caseStatus: document.querySelector('#detail-case-status')
  };

  let selectedId = cases[0].id;

  function titleCase(value) {
    return value.replace(/\b\w/g, char => char.toUpperCase());
  }

  function getReports() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      return Array.isArray(parsed) ? parsed : [];
    } catch (_) {
      return [];
    }
  }

  function saveReports(reports) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
  }

  function updateStats() {
    if (refs.activeStat) refs.activeStat.textContent = String(cases.filter(item => item.status !== 'Contained').length).padStart(2, '0');
    if (refs.highStat) refs.highStat.textContent = String(cases.filter(item => ['critical', 'high'].includes(item.threat)).length).padStart(2, '0');
    if (refs.reportStat) refs.reportStat.textContent = String(getReports().length).padStart(2, '0');
  }

  function showCase(record) {
    selectedId = record.id;
    detail.id.textContent = `CASE #${record.id}`;
    detail.status.textContent = record.status.toUpperCase();
    detail.status.className = `case-status ${record.status === 'Contained' ? 'contained-status' : 'danger-status'}`;
    detail.name.textContent = record.name;
    detail.alias.textContent = `Alias: ${record.alias}`;
    detail.summary.textContent = record.summary;
    detail.classification.textContent = record.classification;
    detail.location.textContent = record.location;
    detail.bounty.textContent = record.bounty;
    detail.caseStatus.textContent = record.status;
    detail.threat.textContent = record.threat.toUpperCase();
    detail.threat.className = `threat-badge threat-${record.threat}`;

    if (record.image) {
      detail.image.src = record.image;
      detail.image.hidden = false;
    } else {
      detail.image.src = 'assets/robot-logo.png';
      detail.image.hidden = false;
    }

    renderCases();
  }

  function caseMatches(record) {
    const q = (refs.search.value || '').trim().toLowerCase();
    const threat = refs.threat.value;
    const status = refs.status.value;
    const haystack = [record.id, record.name, record.alias, record.classification, record.location, record.summary].join(' ').toLowerCase();
    return (!q || haystack.includes(q)) && (threat === 'all' || record.threat === threat) && (status === 'all' || record.status === status);
  }

  function renderCases() {
    const filtered = cases.filter(caseMatches);
    refs.list.replaceChildren();
    refs.resultCount.textContent = `${filtered.length} RECORD${filtered.length === 1 ? '' : 'S'}`;

    if (!filtered.length) {
      const empty = document.createElement('div');
      empty.className = 'terminal-empty';
      empty.textContent = 'NO RECORDS MATCH THE CURRENT FILTERS.';
      refs.list.append(empty);
      return;
    }

    filtered.forEach(record => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `case-row${record.id === selectedId ? ' selected' : ''}`;
      button.setAttribute('aria-label', `Open case ${record.id}, ${record.name}`);

      const main = document.createElement('span');
      main.className = 'case-row-main';
      const id = document.createElement('strong');
      id.textContent = record.id;
      const name = document.createElement('span');
      name.textContent = `${record.name} // ${record.alias}`;
      main.append(id, name);

      const meta = document.createElement('span');
      meta.className = 'case-row-meta';
      const threat = document.createElement('span');
      threat.className = `mini-threat threat-${record.threat}`;
      threat.textContent = record.threat.toUpperCase();
      const status = document.createElement('span');
      status.textContent = record.status.toUpperCase();
      meta.append(threat, status);

      button.append(main, meta);
      button.addEventListener('click', () => showCase(record));
      refs.list.append(button);
    });
  }

  function renderReports() {
    const reports = getReports();
    refs.reportList.replaceChildren();

    if (!reports.length) {
      const empty = document.createElement('div');
      empty.className = 'terminal-empty';
      empty.textContent = 'NO FIELD REPORTS SAVED ON THIS DEVICE.';
      refs.reportList.append(empty);
      updateStats();
      return;
    }

    reports.slice().reverse().forEach(report => {
      const article = document.createElement('article');
      article.className = 'report-entry';

      const top = document.createElement('div');
      top.className = 'report-entry-top';
      const code = document.createElement('strong');
      code.textContent = report.caseId.toUpperCase();
      const priority = document.createElement('span');
      priority.className = `report-priority priority-${report.priority.toLowerCase()}`;
      priority.textContent = report.priority.toUpperCase();
      top.append(code, priority);

      const type = document.createElement('h3');
      type.textContent = report.type;
      const body = document.createElement('p');
      body.textContent = report.details;
      const meta = document.createElement('small');
      meta.textContent = `${report.officer} // ${report.location} // ${new Date(report.timestamp).toLocaleString()}`;
      const remove = document.createElement('button');
      remove.type = 'button';
      remove.className = 'report-remove';
      remove.textContent = 'REMOVE';
      remove.addEventListener('click', () => {
        saveReports(getReports().filter(item => item.id !== report.id));
        renderReports();
      });

      article.append(top, type, body, meta, remove);
      refs.reportList.append(article);
    });

    updateStats();
  }

  [refs.search, refs.threat, refs.status].forEach(control => {
    control.addEventListener(control.tagName === 'INPUT' ? 'input' : 'change', renderCases);
  });

  refs.form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(refs.form);
    const report = {
      id: `r-${Date.now()}`,
      officer: String(data.get('officer') || '').trim(),
      caseId: String(data.get('caseId') || '').trim(),
      type: String(data.get('type') || ''),
      priority: String(data.get('priority') || ''),
      location: String(data.get('location') || '').trim(),
      details: String(data.get('details') || '').trim(),
      timestamp: new Date().toISOString()
    };

    if (!report.officer || !report.caseId || !report.location || !report.details) return;
    const reports = getReports();
    reports.push(report);
    saveReports(reports);
    refs.form.reset();
    refs.formMessage.textContent = 'REPORT TRANSMITTED // SAVED';
    renderReports();
    window.setTimeout(() => { refs.formMessage.textContent = ''; }, 3500);
  });

  refs.clearReports.addEventListener('click', () => {
    if (!getReports().length) return;
    if (window.confirm('Clear all locally saved HSC field reports?')) {
      localStorage.removeItem(STORAGE_KEY);
      refs.formMessage.textContent = 'LOCAL REPORT LOG CLEARED';
      renderReports();
      window.setTimeout(() => { refs.formMessage.textContent = ''; }, 3000);
    }
  });

  updateStats();
  renderCases();
  showCase(cases[0]);
  renderReports();
})();
