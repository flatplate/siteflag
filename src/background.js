flagDB.open(function() {});

function onGetMessage(message, sender, sendResponse) {
    if (message.type === "get") {
        flagDB.getSiteNote(message.url, function(comment) {
            if (comment) {
                sendResponse({url: message.url, comment: comment});
            } else {
                sendResponse({url: message.url, comment: ""});
                // Returning an empty string rather than undefined makes it easier for frontend
            } 
        });
        return true; // Needed for sendResponse to work properly
    }
}

function onUpdateMessage(message, sender, sendResponse) {
    if (message.type == "update") {
        flagDB.updateSiteNote(message.url, message.comment, function(success) {
            if (!success) {
               sendResponse("Error when handling update");  
            }
            sendResponse({"url": message.url, "comment": message.comment});
        });
        return true;
    }
}


browser.runtime.onMessage.addListener(onGetMessage);
browser.runtime.onMessage.addListener(onUpdateMessage);