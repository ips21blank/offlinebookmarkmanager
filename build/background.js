chrome.runtime.onInstalled.addListener(function () {
  const dataKeys = [
    // 'tag', // Just display a notice. Ask if its reqd.
    // 'tgC',
    'folL',
    'p_fav',
    'settings',
    'homepage',
    'homePage'
  ];
  const storeageItems = { flowDirection: 1 };

  chrome.storage.local.get(dataKeys.concat(['tag', 'tgC']), function (db) {
    if (db.folL) {
      storeageItems.pins = db.folL;
    }
    if (db.p_fav) {
      let icons = {};
      for (let ico of db.p_fav) {
        if (!ico || !ico.id || !ico.title) continue;
        icons[ico.id] = ico.title;
      }
      storeageItems.icons = icons;
    }
    if (db.homePage) {
      storeageItems.homePin = db.homePage;
    }
    if (db.tag && db.tgC) {
      // Note: <br> is manually parsed.
      storeageItems.notice =
        'Version Updated.<br><br>' +
        "The new version does not use tags. I don't think anyone uses them, " +
        'since they just help in searching somewhat. Their data however is not ' +
        'being removed.<br><br><br>' +
        'If you were using them, please send me an email on my id given on ' +
        'webstore. I will either restore it for everyone or get back to you ' +
        'via email.';
    }
    chrome.storage.local.remove(dataKeys);
    chrome.storage.local.set(storeageItems);
  });
});

chrome.browserAction.onClicked.addListener((e) => {
  window.open(chrome.runtime.getURL('index.html'));
});
