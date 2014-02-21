chrome.browserAction.setBadgeText({text: "yeah"});

chrome.browserAction.onClicked.addListener(function(tab){
	chrome.tabs.create({url:
		chrome.extension.getURL('countdown.html')});
});