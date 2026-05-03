(function () {
  var BASE = '/assets/partials/';

  var langbarP = fetch(BASE + 'langbar.html').then(function (r) { return r.ok ? r.text() : ''; });
  var navbarP  = fetch(BASE + 'navbar.html').then(function (r)  { return r.ok ? r.text() : ''; });

  function inject(id, html) {
    if (!html) return;
    var el = document.getElementById(id);
    if (!el) return;
    var tmp = document.createElement('div');
    tmp.innerHTML = html.trim();
    el.parentNode.replaceChild(tmp.firstElementChild, el);
  }

  function apply() {
    langbarP.then(function (h) { inject('langbar-ph', h); });
    navbarP.then(function (h)  { inject('navbar-ph',  h); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply);
  } else {
    apply();
  }
})();
