flagDB.open(function() {});
var titleElement = document.getElementById("title");
var textBoxElement = document.getElementById("siteFlagTextArea");
var gettingCurrent = browser.windows.getCurrent({populate: true});

gettingCurrent.then(function(windowInfo) {
    
    var currentUrl = "";
    for (var i = 0; i < windowInfo.tabs.length; i++) {
        var tabInfo = windowInfo.tabs[i];
        if (tabInfo.active) {
            currentUrl = tabInfo.url.split("/")[2];
            titleElement.innerText = currentUrl;
        }
    }
    var sending = browser.runtime.sendMessage({url: currentUrl, type: "get"});
    sending.then(function(message) {
        textBoxElement.value = message.comment;
    }, function(error) {
        textBoxElement.value = error;
    });
}, function (error) {
    titleElement.innerText = "error" + error;
});