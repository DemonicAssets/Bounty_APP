(() => {
  'use strict';

  let map = null;
  let marker = null;
  let initialized = false;
  let fallbackActive = false;

  function initLocator() {
    const mapElement = document.getElementById('locator-map');
    if (!mapElement) return;

    // WebView2 may briefly load the page before the Leaflet CDN is ready.
    // Keep a useful futuristic coordinate map as a fallback, then upgrade to
    // the real geographic map as soon as Leaflet becomes available.
    if (!window.L) {
      if (!fallbackActive) renderFallbackMap(mapElement, window.HSC_SELECTED_SUBJECT || window.HSC_SUBJECTS?.[0]);
      setTimeout(initLocator, 350);
      return;
    }

    if (!initialized) {
      initialized = true;
      fallbackActive = false;
      mapElement.innerHTML = '';
      map = L.map(mapElement, {
        zoomControl: true,
        attributionControl: true,
        scrollWheelZoom: true,
        zoomAnimation: true,
        fadeAnimation: true
      }).setView([34.0536, -118.2455], 13);

      // Dark Carto basemap gives the locator a futuristic tactical appearance
      // while retaining real streets, blocks, labels, and geography.
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
        maxZoom: 20,
        subdomains: 'abcd',
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
      }).addTo(map);

      map.on('load', () => map.invalidateSize());
    }

    setTimeout(() => map.invalidateSize(), 50);
    updateLocator(window.HSC_SELECTED_SUBJECT || window.HSC_SUBJECTS?.[0]);
  }

  function renderFallbackMap(mapElement, subject) {
    fallbackActive = true;
    const location = subject?.lastSeen;
    if (!location) return;

    const lat = Number(location.lat).toFixed(5);
    const lng = Number(location.lng).toFixed(5);
    mapElement.innerHTML = `
      <div class="fallback-tactical-map">
        <div class="fallback-grid"></div>
        <div class="fallback-rings"></div>
        <div class="fallback-road road-a"></div>
        <div class="fallback-road road-b"></div>
        <div class="fallback-road road-c"></div>
        <div class="fallback-sector sector-a">SECTOR 07</div>
        <div class="fallback-sector sector-b">HSC GRID // ACTIVE</div>
        <div class="fallback-pin" title="Last verified sighting">
          <span class="fallback-pin-pulse"></span>
          <span class="fallback-pin-core"></span>
          <span class="fallback-pin-label">LAST VERIFIED<br>${lat}, ${lng}</span>
        </div>
        <div class="fallback-note">REAL MAP CONNECTION INITIALIZING...</div>
      </div>`;
  }

  function updateLocator(subject) {
    if (!map || !subject) return;

    const location = subject.lastSeen;
    if (!location || !Number.isFinite(location.lat) || !Number.isFinite(location.lng)) {
      document.getElementById('locatorText')?.replaceChildren(document.createTextNode('No verified coordinates are available for this subject.'));
      return;
    }

    const point = [location.lat, location.lng];

    const icon = L.divIcon({
      className: 'hsc-pin-icon',
      html: '<span class="hsc-pin-pulse"></span><span class="hsc-pin-ring"></span><span class="hsc-pin-core"></span>',
      iconSize: [44, 44],
      iconAnchor: [22, 22],
      popupAnchor: [0, -20]
    });

    if (!marker) {
      marker = L.marker(point, {
        title: `${subject.name} — Last Seen`,
        icon
      }).addTo(map);
    } else {
      marker.setLatLng(point);
      marker.setIcon(icon);
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
