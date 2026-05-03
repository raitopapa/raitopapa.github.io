(function () {
  var cache = {};
  var baseUrl = (function () {
    var script = document.currentScript;
    if (script && script.src) {
      return new URL('../i18n/', script.src).href;
    }
    return 'assets/i18n/';
  })();

  function readLang(lang) {
    if (cache[lang]) return cache[lang];

    var xhr = new XMLHttpRequest();
    xhr.open('GET', baseUrl + lang + '.json', false);
    xhr.send(null);

    if (xhr.status >= 200 && xhr.status < 300) {
      cache[lang] = JSON.parse(xhr.responseText);
      return cache[lang];
    }

    throw new Error('i18n load failed: ' + lang + ' (' + xhr.status + ')');
  }

  function normalize(namespace, dict) {
    if (namespace === 'checklist') {
      ['ja', 'en'].forEach(function (lang) {
        var t = dict[lang];
        if (!t || typeof t.progCount !== 'string') return;
        var template = t.progCount;
        t.progCount = function (current, total) {
          return template
            .replace('{current}', current)
            .replace('{total}', total);
        };
      });
    }
    return dict;
  }

  function loadSync(namespace) {
    var dict = {
      ja: (readLang('ja')[namespace] || {}),
      en: (readLang('en')[namespace] || {}),
    };
    return normalize(namespace, dict);
  }

  window.TreeToolsI18n = {
    loadSync: loadSync,
  };
})();
