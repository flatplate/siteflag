var datastore = null;
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB. Most features will not be available.");
}

var db = null;
var flagDB = (function() {
    var flagDBTemp = {};
    var datastore = null;

    flagDBTemp.open = function() {
        var request = window.indexedDB.open("siteflagDatabase", 1);

        request.onsuccess = function(event) {
            datastore = event.target.result;
        }


        request.onupgradeneeded = function(event) {
            var db = event.target.result;

            var objectStore = db.createObjectStore("site", {keyPath: "url"});
        }
    }

    flagDBTemp.getSiteNote = function(url, callback) {
        console.log(url);
        if (datastore === null || url === null || !url) {
            callback(null);
            return;
        }
        var transaction = datastore.transaction(["site"]);
        var objectStore = transaction.objectStore("site");

        var request = objectStore.get(url);


        request.onsuccess = function(event) {
            console.log(request.result.comment);
            callback(request.result.comment);
        };
    }

    flagDBTemp.updateSiteNote = function(url, comment, callback) {
        if (datastore === null) callback(false);
        var transaction = datastore.transaction(["site"], "readwrite");
        var objectStore = transaction.objectStore("site");

        var siteComment = {
            url: url,
            comment: comment
        };

        var request = objectStore.put(siteComment);

        request.onsuccess = function(event) {
            callback(true);
        }

        request.onerror = function(event) {
            callback(false);
        }

    }

    return flagDBTemp;
})();