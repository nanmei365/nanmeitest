const JA_URL = "/ja-jp/";
const EN_URL = "/en-us/";

(function(){
	// メニュー作成
	const JEID = "jatoen";
	const EJID = "entoja";
	chrome.contextMenus.create({title: "ja-jp to en-us", id: JEID, contexts: ["all"]});
	chrome.contextMenus.create({title: "en-us to ja-jp", id: EJID, contexts: ["all"]});
	chrome.contextMenus.onClicked.addListener(function (info, tab) {
		if ( info.menuItemId == JEID ) {
			replaceUrl(tab, JA_URL,EN_URL);
		}
		else if ( info.menuItemId == EJID ) {
	    	replaceUrl(tab, EN_URL,JA_URL);
		}

    });
    
  // tab がアップデートされたとき
  chrome.tabs.onUpdated.addListener(function(tabId){
      // ページアクションを出す
      chrome.pageAction.show(tabId);
  })

  // ページアクションアイコンをクリックしたときの挙動
  chrome.pageAction.onClicked.addListener(function(tab){
    	replaceUrl(tab,EN_URL,JA_URL);
    });

})();

function replaceUrl(tab, oldstr, newstr) {
	var newurTmp = tab.url.replace(oldstr,newstr);
	if (newurTmp != tab.url) {
		chrome.tabs.update(tab.id, {url: newurTmp}, null);
	}
}