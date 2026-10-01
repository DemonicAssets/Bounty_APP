(() => {
  'use strict';

  let map = null;
  let marker = null;
  let initialized = false;

  function initLocator() {
    const mapElement = document.getElementById('locator-map');
    if (!mapElement || !window.L) return;

    if (!initialized) {
      initialized = true;
      map = L.map(mapElement, {
        zoomControl: true,
        attributionControl: true,
        scrollWheelZoom: true
      }).setView([34.0536, -118.2455], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      map.on('load', () => map.invalidateSize());
    }

    setTimeout(() => map.invalidateSize(), 50);
    updateLocator(window.HSC_SELECTED_SUBJECT || window.HSC_SUBJECTS?.[0]);
  }

  function updateLocator(subject) {
    if (!map || !subject) return;

    const location = subject.lastSeen;
    if (!location || !Number.isFinite(location.lat) || !Number.isFinite(location.lng)) {
      document.getElementById('locatorText')?.replaceChildren(document.createTextNode('No verified coordinates are available for this subject.'));
      return;
    }

    const point = [location.lat, location.lng];

    if (!marker) {
      marker = L.marker(point, {
        title: `${subject.name} — Last Seen`
      }).addTo(map);
    } else {
      marker.setLatLng(point);
      marker.options.title = `${subject.name} — Last Seen`;
    }

    marker.bindPopup(
      `<strong>${escapeHtml(subject.name)}</strong><br>` +
      `Alias: ${escapeHtml(subject.alias)}<br>` +
      `Last seen: ${escapeHtml(location.label || subject.location)}<br>` +
      `<span>${location.lat.toFixed(5)}, ${location.lng.toFixed(5)}</span>`
    );

    map.setView(point, 15, { animate: true });

    const status = document.getElementById('locatorText');
    if (status) status.textContent = `Last verified sighting loaded for ${subject.name}.`;
  }

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, char => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
    }[char]));
  }

  window.addEventListener('hsc:subjectchange', event => {
    window.HSC_SELECTED_SUBJECT = event.detail?.subject || window.HSC_SELECTED_SUBJECT;
    if (document.body.dataset.activeView === 'model') {
      initLocator();
    }
    updateLocator(window.HSC_SELECTED_SUBJECT);
  });

  window.addEventListener('hsc:viewchange', event => {
    if (event.detail?.subject) window.HSC_SELECTED_SUBJECT = event.detail.subject;
    if (event.detail?.route === 'model') {
      initLocator();
    }
  });

  window.addEventListener('resize', () => {
    if (map) setTimeout(() => map.invalidateSize(), 50);
  });
})();
