/* ==========================================================================
   Bayside Church - Sardius Live Injected Script
   Handles: CSS/font injection, Merlin giving, campus detection,
            dynamic service times, social icons, campus switcher
   ========================================================================== */

(function () {
  'use strict';

  /* ------------------------------------------------------------------
     Configuration
     ------------------------------------------------------------------ */

  var CAMPUS_CONFIG = {
    'Bayside Granite Bay':     { code: 'GB',  slug: 'granitebaylive',   label: 'Granite Bay',     onDemand: 'https://granitebay.baysideonline.com/services/' },
    'Bayside Blue Oaks':       { code: 'BO',  slug: 'blueoakslive',     label: 'Blue Oaks',       onDemand: 'https://blueoaks.baysideonline.com/services/' },
    'Bayside Folsom':          { code: 'FO',  slug: 'folsomlive',       label: 'Folsom',          onDemand: 'https://folsom.baysideonline.com/services/' },
    'Bayside El Dorado Hills': { code: 'EDH', slug: 'eldoradohillslive', label: 'El Dorado Hills', onDemand: 'https://eldoradohills.baysideonline.com/services/' },
    'Bayside Adventure':       { code: 'AD',  slug: 'adventurelive',    label: 'Adventure',       onDemand: 'https://adventure.baysideonline.com/services/' },
    'Bayside Santa Rosa':      { code: 'SR',  slug: 'santarosalive',    label: 'Santa Rosa',      onDemand: 'https://santarosa.baysideonline.com/services/' },
    'Bayside Orange County':   { code: 'OC',  slug: 'orangecountylive', label: 'Orange County',   onDemand: 'https://orangecounty.baysideonline.com/services/' },
    'Bayside Auburn':          { code: 'AB',  slug: 'auburnlive',       label: 'Auburn',          onDemand: 'https://auburn.baysideonline.com/services/' },
    'Test Bayside Livestream':  { code: 'BO',  slug: 'testbaysidelivestream', label: 'Test (Blue Oaks)', onDemand: 'https://blueoaks.baysideonline.com/services/' }
  };

  var CALENDAR_API = 'https://api.prod-api.sardius.media/calendars/005aD180855507C/all/sites';
  var CSS_URL = 'https://cdn.jsdelivr.net/gh/bayside-church/bayside-sardius-live@main/css/bayside-sardius.css';
  var FONT_URL = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';

  /* ------------------------------------------------------------------
     SVG Icons (inline for social links)
     ------------------------------------------------------------------ */

  var SVG_ICONS = {
    facebook: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
    twitter: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
    website: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>'
  };

  var MAP_PIN_SVG = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>';

  /* ------------------------------------------------------------------
     Head Injections (CSS, Fonts, Meta)
     ------------------------------------------------------------------ */

  var head = document.head;

  // Stylesheet
  var cssLink = document.createElement('link');
  cssLink.rel = 'stylesheet';
  cssLink.href = CSS_URL;
  head.appendChild(cssLink);

  // Google Font
  var fontLink = document.createElement('link');
  fontLink.rel = 'stylesheet';
  fontLink.href = FONT_URL;
  head.appendChild(fontLink);

  // Apple iTunes app meta
  var appMeta = document.createElement('meta');
  appMeta.name = 'apple-itunes-app';
  appMeta.content = 'app-id=385207098';
  head.appendChild(appMeta);

  /* ------------------------------------------------------------------
     Campus Detection
     ------------------------------------------------------------------ */

  var currentSiteName = (window.sardiusLive_site && window.sardiusLive_site.name) || '';
  var currentCampus = CAMPUS_CONFIG[currentSiteName] || null;

  /* ------------------------------------------------------------------
     Merlin / Giving Widget + "Give" Nav Link
     ------------------------------------------------------------------ */

  function injectGiving() {
    var merlin = document.createElement('script');
    merlin.type = 'text/javascript';
    merlin.src = 'https://merlin.simpledonation.com/js/installScript.js?key=01DGEGJB5ZZ9AVVHNMJ11RQNDP';

    var give = document.createElement('li');
    give.className = 'nav-item';
    give.innerHTML = '<a class="open-merlin nav-link">Give</a>';

    var firstNav = document.querySelector('.navbar-nav:first-child');
    if (firstNav) {
      firstNav.insertAdjacentElement('afterbegin', give);
    }
    document.body.appendChild(merlin);
  }

  /* ------------------------------------------------------------------
     Dynamic Service Times (Sardius Calendar API)
     ------------------------------------------------------------------ */

  function fetchServiceTimes() {
    if (!currentCampus) return;

    var listEl = document.getElementById('baysideServiceList');
    if (!listEl) return;

    var now = new Date();
    var end = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    var params = '?start=' + now.toISOString() +
                 '&end=' + end.toISOString() +
                 '&experience=access_default' +
                 '&ver=' + Date.now();

    fetch(CALENDAR_API + params)
      .then(function (res) { return res.json(); })
      .then(function (data) {
        var events = filterEventsByCampus(data, currentCampus.code);
        if (events.length === 0) return; // keep fallback text

        var grouped = groupByDay(events);
        renderServiceTimes(listEl, grouped);
      })
      .catch(function () {
        // Silently fail — fallback text stays visible
      });
  }

  function filterEventsByCampus(data, campusCode) {
    var events = [];
    if (!Array.isArray(data)) return events;

    var codeRegex = new RegExp('\\b' + campusCode + '\\b', 'i');

    data.forEach(function (site) {
      if (!site.events || !Array.isArray(site.events)) return;
      site.events.forEach(function (evt) {
        var videoTitle = '';
        try {
          videoTitle = evt.settings.experience.video.title || '';
        } catch (e) { /* ignore */ }

        if (codeRegex.test(videoTitle)) {
          events.push(evt);
        }
      });
    });

    return events;
  }

  function groupByDay(events) {
    var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var groups = {};

    events.forEach(function (evt) {
      var start = new Date(evt.start);
      // Convert to Pacific time for display
      var pacificStr = start.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });
      var pacificDate = new Date(pacificStr);
      var dayName = dayNames[pacificDate.getDay()];

      var timeStr = pacificDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone: 'America/Los_Angeles'
      }).replace(' ', '').toLowerCase();

      if (!groups[dayName]) {
        groups[dayName] = { order: pacificDate.getDay(), times: [] };
      }
      if (groups[dayName].times.indexOf(timeStr) === -1) {
        groups[dayName].times.push(timeStr);
      }
    });

    return groups;
  }

  function renderServiceTimes(container, grouped) {
    var days = Object.keys(grouped).sort(function (a, b) {
      return grouped[a].order - grouped[b].order;
    });

    var html = '';
    days.forEach(function (day) {
      var times = grouped[day].times.join(' & ');
      html += '<div><span class="baysideServiceDay">' + day + 's</span> ' + times + '</div>';
    });

    container.innerHTML = html;
  }

  /* ------------------------------------------------------------------
     Watch On Demand URL
     ------------------------------------------------------------------ */

  function setOnDemandUrl() {
    if (!currentCampus) return;
    var btn = document.getElementById('baysideOnDemandBtn');
    if (btn) {
      btn.href = currentCampus.onDemand;
    }
  }

  /* ------------------------------------------------------------------
     Social Icons (built from sardiusLive_layout.social)
     ------------------------------------------------------------------ */

  function buildSocialIcons() {
    var container = document.getElementById('baysideSocialGroup');
    if (!container) return;

    var social = {};
    try {
      social = window.sardiusLive_layout.social || {};
    } catch (e) { return; }

    var order = ['facebook', 'instagram', 'youtube', 'twitter', 'website'];
    var html = '';

    order.forEach(function (platform) {
      var url = social[platform];
      if (!url || url.trim() === '') return;
      var icon = SVG_ICONS[platform] || '';
      if (!icon) return;

      html += '<a class="preSocialItem" href="' + url + '" target="_blank" rel="noopener" aria-label="' + platform + '">' + icon + '</a>';
    });

    // Also add website link if available from navigation config
    if (!social.website) {
      try {
        var logoLink = window.sardiusLive_layout.navigation.logoLink;
        if (logoLink && logoLink.trim() !== '') {
          html += '<a class="preSocialItem" href="' + logoLink + '" target="_blank" rel="noopener" aria-label="website">' + SVG_ICONS.website + '</a>';
        }
      } catch (e) { /* ignore */ }
    }

    container.innerHTML = html;
  }

  /* ------------------------------------------------------------------
     Campus Switcher (Desktop dropdown + Mobile bottom-sheet)
     ------------------------------------------------------------------ */

  function buildCampusSwitcher() {
    var container = document.getElementById('baysideCampusSwitcher');
    if (!container) return;

    // Build campus links HTML
    var linksHtml = '';
    var campusNames = Object.keys(CAMPUS_CONFIG);

    campusNames.forEach(function (name) {
      var campus = CAMPUS_CONFIG[name];
      var url = 'https://' + campus.slug + '.baysideonline.com';
      var isCurrent = (currentCampus && currentCampus.code === campus.code) ? ' is-current' : '';
      linksHtml += '<a href="' + url + '" class="' + isCurrent + '">' + campus.label + '</a>';
    });

    // Desktop dropdown
    var currentLabel = currentCampus ? currentCampus.label : 'Campuses';
    container.innerHTML =
      '<button class="campus-switcher-btn">' + currentLabel + '</button>' +
      '<div class="campus-switcher-content">' + linksHtml + '</div>';

    // Mobile FAB + bottom sheet
    buildMobileCampusSheet(linksHtml, currentLabel);
  }

  function buildMobileCampusSheet(linksHtml, currentLabel) {
    // Floating action button
    var fab = document.createElement('button');
    fab.className = 'bs-mobile-campus-fab';
    fab.innerHTML = MAP_PIN_SVG + '<span>' + currentLabel + '</span>';

    // Bottom sheet overlay
    var overlay = document.createElement('div');
    overlay.className = 'bs-campus-sheet-overlay';
    overlay.innerHTML =
      '<div class="bs-campus-sheet">' +
        '<div class="bs-campus-sheet-header">' +
          '<h3>Choose a Campus</h3>' +
          '<button class="bs-campus-sheet-close" aria-label="Close">&times;</button>' +
        '</div>' +
        linksHtml +
      '</div>';

    // Events
    fab.addEventListener('click', function () {
      overlay.classList.add('is-open');
    });

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) {
        overlay.classList.remove('is-open');
      }
    });

    var closeBtn = overlay.querySelector('.bs-campus-sheet-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        overlay.classList.remove('is-open');
      });
    }

    document.body.appendChild(fab);
    document.body.appendChild(overlay);
  }

  /* ------------------------------------------------------------------
     Init — runs on DOMContentLoaded / window.onload
     ------------------------------------------------------------------ */

  function initDynamic() {
    fetchServiceTimes();
    setOnDemandUrl();
    buildSocialIcons();
    buildCampusSwitcher();
  }

  // Merlin needs to be injected on window.load (existing behavior)
  window.addEventListener('load', function () {
    injectGiving();
  });

  // Dynamic content can init earlier
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDynamic);
  } else {
    initDynamic();
  }

})();
