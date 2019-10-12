var dirty = false;
var titleElement = document.getElementById("title");
var textBoxElement = document.getElementById("siteFlagTextArea");
var gettingCurrent = browser.windows.getCurrent({populate: true});
var currentUrl = "";

gettingCurrent.then(function(windowInfo) {
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

textBoxElement.oninput = function() {
    dirty = true;
}

window.onunload = function() {
    save(currentUrl, textBoxElement.value);
} 

function save(url, comment) {
    if (dirty) {
        var sending = browser.runtime.sendMessage({url: url, comment:comment, type: "update"});
        sending.then(function(message) {
            // TODO maybe show a "saving" label or smt
        }, function(error) {
            // TODO maybe some label here or alert the user the changes couldn't be saved
        });
    }
}