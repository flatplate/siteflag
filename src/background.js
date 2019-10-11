flagDB.open(function() {});
console.log("beginning");


function onGetMessage(message, sender, sendResponse) {
    console.log(message);
    if (message.type === "get") {
        console.log("get message");
        flagDB.getSiteNote(message.url, function(comment) {
            console.log("callback: " + comment);
            if (comment) {
                sendResponse({url: message.url, comment: comment});
                console.log('sksksksks');
            }
            else 
                sendResponse({url: message.url, comment: ""});
        });
        return true;
    }
}

function onUpdateMessage(message, sender, sendResponse) {
    if (message.type == "update") {
        flagDB.updateSiteNote(message.url, message.comment, function(success) {
            if (!success) {
                console.log("Error Updating ");
                sendResponse("Error when handling update");  
            }
            sendResponse({"url": message.url, "comment": message.comment});
        });
        return true;
    }
}


browser.runtime.onMessage.addListener(onGetMessage);
browser.runtime.onMessage.addListener(onUpdateMessage);