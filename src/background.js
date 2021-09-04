
chrome.runtime.onInstalled.addListener((object) => {
    if (object.reason === 'install') {
        chrome.runtime.openOptionsPage();
    }
});
