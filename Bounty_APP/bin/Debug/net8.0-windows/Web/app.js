(() => {
  'use strict';

  const subjects = [
    {
      id: '7742-A', name: 'Subject 7742-A', alias: 'The Half Machine', classification: 'Augmented Human',
      threat: 'Critical', status: 'At Large', location: 'Neo Harbor / Sector 7', lastSeen: { lat: 34.0536, lng: -118.2455, label: 'Neo Harbor / Sector 7' }, bounty: '$1,000,000',
      image: 'assets/mugshots1.png', tint: 'tint-1', // Image for Subject 7742-A
      lead: 'A human mind. A machine advantage.',
      summary: 'Former HSC systems engineer linked to neural-interface theft, city infrastructure intrusions, surveillance tampering, and unauthorized cybernetic augmentation.',
      story: [
        'Subject #7742-A was once an HSC systems engineer assigned to experimental neural-interface research. After an unauthorized augmentation procedure, the subject disappeared with prototype technology and restricted network credentials.',
        'HSC intelligence later linked the subject to coordinated intrusions against city infrastructure, classified data theft, surveillance tampering, and the remote takeover of automated security systems. Investigators believe the augmentation allows direct neural interaction with machines at a speed normal operators cannot match.',
        'The subject remains at large. HSC field units are instructed to identify, report, and contain rather than approach without specialized support.'
      ],
      quote: '“He doesn’t just hack systems. He thinks inside them.”'
    },
    {
      id: '2190-X', name: 'Mara Voss', alias: 'Ghostline', classification: 'Cyber Operative',
      threat: 'High', status: 'Wanted', location: 'Neon Market / District 4', lastSeen: { lat: 34.0469, lng: -118.2565, label: 'Neon Market / District 4' }, bounty: '$750,000',
      image: 'assets/bounty-02.jpg', tint: 'tint-2', // Image for Mara Voss
      lead: 'Invisible in the cameras. Everywhere in the network.',
      summary: 'Suspected broker of stolen biometric identities and restricted network credentials with a pattern of erasing surveillance records after operations.',
      story: [
        'Mara Voss, known in underground channels as Ghostline, is suspected of building false identities from stolen biometric records and compromised civic databases.',
        'Multiple HSC investigations place her near high-value data thefts where security footage disappeared within minutes. Analysts believe she uses portable intrusion hardware and human contacts inside private security firms.',
        'Ghostline is wanted for questioning in several active cases and should be treated as a high-threat cyber operative capable of defeating normal electronic tracking.'
      ],
      quote: '“If a camera saw her, the footage usually doesn’t survive.”'
    },
    {
      id: '6021-C', name: 'Unit C-19', alias: 'Cold Signal', classification: 'Synthetic',
      threat: 'High', status: 'Wanted', location: 'Industrial Ring / Zone 11', lastSeen: { lat: 34.0712, lng: -118.2298, label: 'Industrial Ring / Zone 11' }, bounty: '$600,000',
      image: 'assets/bounty-03.jpg', tint: 'tint-3', // Image for Unit C-19
      lead: 'No registered owner. No known command source.',
      summary: 'Unregistered synthetic unit repeatedly detected near secure HSC relay sites. Its origin and remote command source remain unknown.',
      story: [
        'Unit C-19 first appeared on HSC monitoring systems after an unregistered synthetic signature was detected inside the Industrial Ring.',
        'The unit has since been recorded near secure relay stations, abandoned manufacturing plants, and restricted freight corridors. No verified owner, manufacturer, or legal registration has been located.',
        'HSC believes the unit may be receiving instructions from an unknown remote operator. Recovery of the synthetic intact is considered a priority.'
      ],
      quote: '“It never speaks. It just appears where the network is weakest.”'
    },
    {
      id: '1188-M', name: 'Elias Renn', alias: 'Switchback', classification: 'Human / Neural Modded',
      threat: 'High', status: 'Wanted', location: 'Old Metro / Sector 3', lastSeen: { lat: 34.0418, lng: -118.2673, label: 'Old Metro / Sector 3' }, bounty: '$450,000',
      image: 'assets/bounty-04.jpg', tint: 'tint-4', // Image for Elias Renn
      lead: 'Black-market hardware with a human face.',
      summary: 'Illegal hardware technician tied to black-market neural modifications and resale of decommissioned law-enforcement components.',
      story: [
        'Elias Renn operated as a licensed hardware technician before investigators connected his workshop to illegal neural modifications and restricted police technology.',
        'Witnesses say Renn can rebuild damaged implants, alter identification chips, and hide prohibited upgrades from standard scanners. Several wanted subjects are believed to have used his services.',
        'Renn abandoned his registered shop after an HSC raid and is now believed to be operating from temporary labs beneath the Old Metro.'
      ],
      quote: '“If it can be installed, Switchback can make it disappear from the records.”'
    },
    {
      id: '4317-K', name: 'Kira Sol', alias: 'Blue Static', classification: 'Augmented Human',
      threat: 'Medium', status: 'Wanted', location: 'Glassline / Sector 9', lastSeen: { lat: 34.0617, lng: -118.2741, label: 'Glassline / Sector 9' }, bounty: '$300,000',
      image: 'assets/bounty-05.jpg', tint: 'tint-5', // Image for Kira Sol
      lead: 'Fast courier. Faster signal.',
      summary: 'Data courier accused of transporting encrypted intelligence, stolen access keys, and prototype components between criminal networks.',
      story: [
        'Kira Sol became known as Blue Static after several encrypted data transfers were traced to brief wireless bursts matching her travel pattern.',
        'Investigators believe she serves as a courier for physical storage devices, access keys, and prototype components that cannot safely move through normal networks.',
        'Her mobility and modified reflex system make conventional pursuit difficult. HSC has issued an active warrant and a standing information bounty.'
      ],
      quote: '“By the time the signal appears, she is already leaving the district.”'
    },
    {
      id: '8804-V', name: 'Dax Mercer', alias: 'Red Vector', classification: 'Combat Augmented',
      threat: 'Critical', status: 'At Large', location: 'South Arc / Zone 2', lastSeen: { lat: 34.0278, lng: -118.2397, label: 'South Arc / Zone 2' }, bounty: '$900,000',
      image: 'assets/bounty-06.jpg', tint: 'tint-6', // Image for Dax Mercer
      lead: 'Military-grade upgrades. Civilian rules no longer apply.',
      summary: 'Former private security contractor suspected of trafficking combat augmentations and leading raids on automated transport depots.',
      story: [
        'Dax Mercer disappeared from private security employment after an internal investigation into missing military-grade augmentation hardware.',
        'HSC later connected the alias Red Vector to coordinated raids on automated transport depots, weapons shipments, and restricted maintenance facilities.',
        'Mercer is considered extremely dangerous due to combat-grade reflex, strength, and targeting enhancements. Specialized response units are required for any attempted apprehension.'
      ],
      quote: '“Red Vector does not run from security. He breaks through it.”'
    }
  ];

  window.HSC_SUBJECTS = subjects;
  let selectedSubject = subjects[0];

  const viewMeta = {
    login: { context: 'HSC NETWORK // AUTHORIZATION REQUIRED', motto: 'SECURE ACCESS // AUTHENTICATION REQUIRED', title: 'HSC // Secure Login' },
    home: { context: 'CIVIL PROTECTION // ACTIVE NETWORK', motto: 'REAL PEOPLE · REAL THREATS · REAL SOLUTIONS', title: 'HSC // Human Systems Check' },
    model: { context: 'SUBJECT ANALYSIS // LAST-SEEN LOCATOR', motto: 'LAST-SEEN LOCATION // ACTIVE TRACK', title: 'HSC // Bounty Locator' },
    story: { context: 'CASE FILE // ACCESS GRANTED', motto: 'ACTIVE CASE FILE // CLASSIFIED', title: 'HSC // Subject Story' },
    inspo: { context: 'DESIGN ARCHIVE // INSPIRATION LOG', motto: 'INSPIRATION ARCHIVE // FILE 04', title: 'HSC // Inspiration' },
    terminal: { context: 'HSC NETWORK // CASE TERMINAL', motto: 'CASE TERMINAL // WEB APPLICATION', title: 'HSC // Case Terminal' },
    'customer-service': { context: 'HSC SUPPORT NETWORK // CUSTOMER SERVICE', motto: 'CUSTOMER SERVICE // APPOINTMENT DESK', title: 'HSC // Customer Service' }
  };

  const views = [...document.querySelectorAll('.app-view')];
  const navLinks = [...document.querySelectorAll('.nav-chip[data-route]')];
  const headerContext = document.querySelector('#header-context');
  const footerMotto = document.querySelector('#footer-motto');
  const loginForm = document.querySelector('#login-form');
  const loginMessage = document.querySelector('#login-message');
  const signupForm = document.querySelector('#signup-form');
  const signupMessage = document.querySelector('#signup-message');
  const openSignupButton = document.querySelector('#open-signup');
  const closeSignupButton = document.querySelector('#close-signup');
  const signupPrompt = document.querySelector('.signup-prompt');
  const authStatusText = document.querySelector('#auth-status-text');
  const logoutButton = document.querySelector('#logout-button');
  const protectedRoutes = new Set(['home', 'model', 'story', 'terminal', 'customer-service']);
  const adminRoutes = new Set(['terminal']);

  function isAuthenticated() {
    return sessionStorage.getItem('hsc-authenticated') === 'true';
  }

  function getSignedInName() {
    return sessionStorage.getItem('hsc-auth-name') || 'AUTHORIZED USER';
  }

  function getSignedInRole() {
    return (sessionStorage.getItem('hsc-auth-role') || 'officer').toLowerCase();
  }

  function isAdmin() {
    return isAuthenticated() && getSignedInRole() === 'admin';
  }

  function syncAuthUI() {
    const authed = isAuthenticated();
    document.body.classList.toggle('authenticated', authed);
    document.body.classList.toggle('admin-access', isAdmin());
    if (authStatusText) {
      authStatusText.textContent = authed
        ? `${getSignedInName()} // ${isAdmin() ? 'ADMIN' : 'OFFICER'} // ONLINE`
        : 'ACCESS LOCKED';
    }
    if (logoutButton) logoutButton.hidden = !authed;
  }

  function normalizeRoute(value) {
    const route = String(value || '').replace(/^#/, '').toLowerCase();
    return Object.prototype.hasOwnProperty.call(viewMeta, route) ? route : 'home';
  }

  function selectSubject(id) {
    const match = subjects.find(item => item.id === id);
    if (match) selectedSubject = match;
    updateSubjectViews();
  }

  function updateSubjectViews() {
    const s = selectedSubject;
    const setText = (selector, value) => {
      const node = document.querySelector(selector);
      if (node) node.textContent = value;
    };

    setText('#model-subject-title', `SUBJECT #${s.id}`);
    setText('#model-classification', s.classification);
    setText('#model-threat', s.threat);
    setText('#model-bounty', s.bounty);
    setText('#model-status', s.status);
    setText('#model-alias', s.alias);
    setText('#model-id', s.id);
    const modelImage = document.querySelector('#model-subject-image');
    if (modelImage) modelImage.src = s.image;

    setText('#model-location', s.location);
    setText('#model-coordinates', s.lastSeen ? `${s.lastSeen.lat.toFixed(5)}, ${s.lastSeen.lng.toFixed(5)}` : 'COORDINATES UNAVAILABLE');
    setText('#model-latitude', s.lastSeen ? s.lastSeen.lat.toFixed(5) : 'N/A');
    setText('#model-longitude', s.lastSeen ? s.lastSeen.lng.toFixed(5) : 'N/A');
    setText('#model-last-seen-label', s.lastSeen?.label || s.location);
    window.dispatchEvent(new CustomEvent('hsc:subjectchange', { detail: { subject: s } }));

    setText('#story-case-tag', `HSC // CASE FILE #${s.id}`);
    setText('#story-lead', s.lead);
    setText('#story-bounty', s.bounty);
    setText('#story-id', `#${s.id}`);
    setText('#story-classification', s.classification);
    setText('#story-threat', s.threat);
    setText('#story-location', s.location);
    setText('#story-quote', s.quote);
    const storyImage = document.querySelector('#story-subject-image');
    if (storyImage) storyImage.src = s.image;
    const storyBody = document.querySelector('#story-body');
    if (storyBody) storyBody.innerHTML = s.story.map(text => `<p>${text}</p>`).join('');

    const storyLink = document.querySelector('#model-story-link');
    if (storyLink) storyLink.dataset.subject = s.id;
    document.body.dataset.subject = s.id;
  }

  function renderBountyBoard() {
    const list = document.querySelector('#bounty-list');
    if (!list) return;
    list.innerHTML = subjects.map((s, index) => `
      <article class="bounty-row panel-frame" data-subject-row="${s.id}">
        <div class="bounty-index">${String(index + 1).padStart(2, '0')}</div>
        <a class="bounty-thumb-link" href="#model" data-subject="${s.id}" aria-label="Open last-seen locator for ${s.name}">
          <div class="bounty-thumb ${s.tint}">
            <img src="${s.image}" alt="${s.name}" />
            <span class="thumb-scan-line"></span>
            <span class="thumb-hover">OPEN LOCATOR</span>
          </div>
        </a>
        <div class="bounty-info">
          <div class="bounty-info-top">
            <div>
              <p class="section-tag danger">WANTED // CASE ${s.id}</p>
              <h2>${s.name}</h2>
              <p class="bounty-alias">ALIAS: ${s.alias}</p>
            </div>
            <span class="threat-level threat-${s.threat.toLowerCase()}">${s.threat.toUpperCase()}</span>
          </div>
          <p class="bounty-summary">${s.summary}</p>
          <div class="bounty-meta-grid">
            <span>CLASSIFICATION <strong>${s.classification}</strong></span>
            <span>STATUS <strong>${s.status}</strong></span>
            <span>LAST SEEN <strong>${s.location}</strong></span>
          </div>
        </div>
        <a class="bounty-list-button" href="#story" data-subject="${s.id}" aria-label="Open case story for ${s.name}">
          <span>WANTED BOUNTY</span>
          <strong>${s.bounty}</strong>
          <small>OPEN CASE FILE ›</small>
        </a>
      </article>`).join('');
  }

  function showView(route, { scroll = true } = {}) {
    route = normalizeRoute(route);
    if (!isAuthenticated() && protectedRoutes.has(route)) {
      route = 'login';
      if (location.hash !== '#login') history.replaceState({ route: 'login' }, '', '#login');
    }
    if (isAuthenticated() && adminRoutes.has(route) && !isAdmin()) {
      route = 'home';
      if (location.hash !== '#home') history.replaceState({ route: 'home', subject: selectedSubject.id }, '', '#home');
      if (authStatusText) {
        authStatusText.textContent = 'ACCESS DENIED // ADMIN CLEARANCE REQUIRED';
        window.setTimeout(syncAuthUI, 2200);
      }
    }
    if (isAuthenticated() && route === 'login') {
      route = 'home';
      if (location.hash !== '#home') history.replaceState({ route: 'home', subject: selectedSubject.id }, '', '#home');
    }
    views.forEach(view => {
      const active = view.dataset.view === route;
      view.classList.toggle('is-active', active);
      view.setAttribute('aria-hidden', active ? 'false' : 'true');
    });
    navLinks.forEach(link => link.classList.toggle('active', link.dataset.route === route));
    const meta = viewMeta[route];
    if (headerContext) headerContext.textContent = meta.context;
    if (footerMotto) footerMotto.textContent = meta.motto;
    document.title = meta.title;
    document.body.dataset.activeView = route;
    window.dispatchEvent(new CustomEvent('hsc:viewchange', { detail: { route, subject: selectedSubject } }));
    if (scroll) window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;
    let route = normalizeRoute(link.getAttribute('href'));
    if (!Object.prototype.hasOwnProperty.call(viewMeta, route)) return;
    event.preventDefault();

    if (!isAuthenticated() && protectedRoutes.has(route)) {
      route = 'login';
      if (loginMessage) {
        loginMessage.textContent = 'AUTHENTICATION REQUIRED // SIGN IN TO ACCESS BOUNTY RECORDS';
        loginMessage.classList.remove('success');
      }
    } else if (adminRoutes.has(route) && !isAdmin()) {
      route = 'home';
      if (authStatusText) {
        authStatusText.textContent = 'ACCESS DENIED // ADMIN CLEARANCE REQUIRED';
        window.setTimeout(syncAuthUI, 2200);
      }
    } else if (link.dataset.subject) {
      selectSubject(link.dataset.subject);
    }

    if (location.hash !== `#${route}`) history.pushState({ route, subject: selectedSubject.id }, '', `#${route}`);
    showView(route);
  });

  window.addEventListener('popstate', event => {
    if (event.state && event.state.subject && isAuthenticated()) selectSubject(event.state.subject);
    showView(location.hash, { scroll: false });
  });
  window.addEventListener('hashchange', () => showView(location.hash, { scroll: false }));

  function getRegisteredUsers() {
    try {
      const saved = JSON.parse(localStorage.getItem('hsc-registered-users') || '[]');
      return Array.isArray(saved) ? saved : [];
    } catch (error) {
      return [];
    }
  }

  function getAllUsers() {
    const configured = Array.isArray(window.HSC_AUTH?.users) ? window.HSC_AUTH.users : [];
    return [...configured, ...getRegisteredUsers()];
  }

  function setSignupMode(enabled) {
    if (!loginForm || !signupForm) return;
    loginForm.hidden = enabled;
    signupForm.hidden = !enabled;
    if (signupPrompt) signupPrompt.hidden = enabled;
    if (enabled) {
      if (loginMessage) loginMessage.textContent = '';
      const field = document.querySelector('#signup-display-name');
      if (field) window.setTimeout(() => field.focus(), 0);
    } else {
      if (signupMessage) signupMessage.textContent = '';
      const field = document.querySelector('#login-username');
      if (field) window.setTimeout(() => field.focus(), 0);
    }
  }

  if (openSignupButton) openSignupButton.addEventListener('click', () => setSignupMode(true));
  if (closeSignupButton) closeSignupButton.addEventListener('click', () => setSignupMode(false));

  if (signupForm) {
    signupForm.addEventListener('submit', event => {
      event.preventDefault();
      const formData = new FormData(signupForm);
      const displayName = String(formData.get('displayName') || '').trim();
      const username = String(formData.get('username') || '').trim();
      const password = String(formData.get('password') || '');
      const confirmPassword = String(formData.get('confirmPassword') || '');

      if (password !== confirmPassword) {
        if (signupMessage) {
          signupMessage.textContent = 'REGISTRATION FAILED // PASSWORDS DO NOT MATCH';
          signupMessage.classList.remove('success');
        }
        return;
      }

      const usernameTaken = getAllUsers().some(user =>
        String(user.username || '').toLowerCase() === username.toLowerCase()
      );
      if (usernameTaken) {
        if (signupMessage) {
          signupMessage.textContent = 'REGISTRATION FAILED // USERNAME ALREADY EXISTS';
          signupMessage.classList.remove('success');
        }
        return;
      }

      const registeredUsers = getRegisteredUsers();
      registeredUsers.push({ username, password, displayName: displayName || username, role: 'officer' });
      localStorage.setItem('hsc-registered-users', JSON.stringify(registeredUsers));

      signupForm.reset();
      setSignupMode(false);
      const loginUsername = document.querySelector('#login-username');
      if (loginUsername) loginUsername.value = username;
      if (loginMessage) {
        loginMessage.textContent = 'ACCOUNT CREATED // SIGN IN WITH YOUR NEW CREDENTIALS';
        loginMessage.classList.add('success');
      }
      const loginPassword = document.querySelector('#login-password');
      if (loginPassword) loginPassword.focus();
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', event => {
      event.preventDefault();
      const formData = new FormData(loginForm);
      const username = String(formData.get('username') || '').trim();
      const password = String(formData.get('password') || '');
      const users = getAllUsers();
      const account = users.find(user =>
        String(user.username || '').toLowerCase() === username.toLowerCase() &&
        String(user.password || '') === password
      );

      if (!account) {
        if (loginMessage) {
          loginMessage.textContent = 'ACCESS DENIED // INVALID OFFICER ID OR SECURITY KEY';
          loginMessage.classList.remove('success');
        }
        const passwordInput = document.querySelector('#login-password');
        if (passwordInput) { passwordInput.value = ''; passwordInput.focus(); }
        return;
      }

      sessionStorage.setItem('hsc-authenticated', 'true');
      sessionStorage.setItem('hsc-auth-name', account.displayName || account.username || 'AUTHORIZED USER');
      sessionStorage.setItem('hsc-auth-role', String(account.role || 'officer').toLowerCase());
      syncAuthUI();
      renderBountyBoard();
      updateSubjectViews();
      if (loginMessage) {
        loginMessage.textContent = isAdmin()
          ? 'ADMIN ACCESS GRANTED // OPERATIONS TERMINAL CLEARANCE ENABLED'
          : 'ACCESS GRANTED // LOADING ACTIVE WARRANT DATABASE';
        loginMessage.classList.add('success');
      }
      loginForm.reset();
      history.replaceState({ route: 'home', subject: selectedSubject.id }, '', '#home');
      showView('home');
    });
  }

  // Customer service contact info + appointment requests
  const customerService = window.HSC_CUSTOMER_SERVICE || {};
  const supportName = document.querySelector('#support-contact-name');
  const supportEmail = document.querySelector('#support-contact-email');
  const supportPhone = document.querySelector('#support-contact-phone');
  const supportHours = document.querySelector('#support-contact-hours');
  const appointmentForm = document.querySelector('#appointment-form');
  const appointmentMessage = document.querySelector('#appointment-message');
  const openAppointment = document.querySelector('#open-appointment');
  const closeAppointment = document.querySelector('#close-appointment');

  if (supportName) supportName.textContent = customerService.contactName || 'HSC Customer Service';
  if (supportEmail) {
    const email = customerService.email || 'support@example.com';
    supportEmail.textContent = email;
    supportEmail.href = `mailto:${email}`;
  }
  if (supportPhone) {
    supportPhone.textContent = customerService.phone || '(555) 555-0100';
    supportPhone.href = `tel:${customerService.phoneLink || '+15555550100'}`;
  }
  if (supportHours) supportHours.textContent = customerService.hours || 'Mon-Fri // 9:00 AM-5:00 PM';

  if (openAppointment && appointmentForm) {
    openAppointment.addEventListener('click', () => {
      appointmentForm.hidden = false;
      appointmentForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const firstInput = appointmentForm.querySelector('input');
      if (firstInput) firstInput.focus();
    });
  }
  if (closeAppointment && appointmentForm) {
    closeAppointment.addEventListener('click', () => {
      appointmentForm.hidden = true;
      if (appointmentMessage) appointmentMessage.textContent = '';
    });
  }

  if (appointmentForm) {
    appointmentForm.addEventListener('submit', async event => {
      event.preventDefault();
      const email = String(customerService.email || '').trim();
      const formData = new FormData(appointmentForm);
      if (!email || email === 'support@example.com') {
        if (appointmentMessage) {
          appointmentMessage.textContent = 'SETUP REQUIRED // ADD THE REAL SUPPORT EMAIL IN customer-service-config.js';
          appointmentMessage.classList.add('error');
        }
        return;
      }

      const submitButton = appointmentForm.querySelector('button[type="submit"]');
      if (submitButton) submitButton.disabled = true;
      if (appointmentMessage) {
        appointmentMessage.textContent = 'TRANSMITTING APPOINTMENT REQUEST...';
        appointmentMessage.classList.remove('error', 'success');
      }

      const payload = new FormData();
      payload.append('name', String(formData.get('name') || ''));
      payload.append('email', String(formData.get('email') || ''));
      payload.append('preferred_date', String(formData.get('date') || ''));
      payload.append('preferred_time', String(formData.get('time') || ''));
      payload.append('notes', String(formData.get('notes') || ''));
      payload.append('_subject', `HSC Appointment Request - ${String(formData.get('name') || 'Customer')}`);
      payload.append('_template', 'table');
      payload.append('_captcha', 'false');

      try {
        const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(email)}`, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: payload
        });
        if (!response.ok) throw new Error('Appointment email could not be sent.');
        appointmentForm.reset();
        if (appointmentMessage) {
          appointmentMessage.textContent = 'APPOINTMENT REQUEST SENT // CUSTOMER SERVICE HAS BEEN ALERTED';
          appointmentMessage.classList.remove('error');
          appointmentMessage.classList.add('success');
        }
      } catch (error) {
        if (appointmentMessage) {
          appointmentMessage.textContent = 'EMAIL SEND FAILED // TRY AGAIN OR USE THE CONTACT EMAIL ABOVE';
          appointmentMessage.classList.remove('success');
          appointmentMessage.classList.add('error');
        }
      } finally {
        if (submitButton) submitButton.disabled = false;
      }
    });
  }

  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      sessionStorage.removeItem('hsc-authenticated');
      sessionStorage.removeItem('hsc-auth-name');
      sessionStorage.removeItem('hsc-auth-role');
      syncAuthUI();
      const list = document.querySelector('#bounty-list');
      if (list) list.innerHTML = '';
      history.replaceState({ route: 'login' }, '', '#login');
      showView('login');
      const usernameInput = document.querySelector('#login-username');
      if (usernameInput) usernameInput.focus();
    });
  }

  const clock = document.querySelector('#clock');
  if (clock) {
    const updateClock = () => {
      clock.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    };
    updateClock();
    setInterval(updateClock, 1000);
  }

  const creatorList = document.querySelector('#creator-list');
  if (creatorList && Array.isArray(window.HSC_CREATORS)) {
    creatorList.innerHTML = window.HSC_CREATORS.map((creator, index) => {
      const name = creator.name || `Creator ${index + 1}`;
      const role = creator.role || 'CREATOR';
      return `<div class="creator-entry"><span>${role}</span><strong>${name}</strong></div>`;
    }).join('');
  }

  syncAuthUI();
  if (isAuthenticated()) {
    renderBountyBoard();
    updateSubjectViews();
  } else {
    const list = document.querySelector('#bounty-list');
    if (list) list.innerHTML = '';
  }

  const initialRoute = location.hash || (isAuthenticated() ? '#home' : '#login');
  showView(initialRoute, { scroll: false });
})();
