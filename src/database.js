var datastore = null;
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
}

var db = null;
var flagDB = (function() {
    var flagDBTemp = {};
    var datastore = null;

    flagDBTemp.open = function() {
        var request = window.indexedDB.open("siteflagDatabase", 1);

        request.onsuccess = function(event) {
            datastore = event.target.result;
            console.log("Successfully connected to database.");
        }

        request.onerror = function(event) {
            console.log("There was an error with the database connection: " + event.target.errorCode);
        }

        request.onupgradeneeded = function(event) {
            console.log("Database upgrade");
            var db = event.target.result;

            var objectStore = db.createObjectStore("site", {keyPath: "url"});
            console.log("Database upgrade done");
        }
    }

    flagDBTemp.getSiteNote = function(url, callback) {
        if (datastore === null) callback(null);
        var transaction = datastore.transaction(["site"]);
        var objectStore = transaction.objectStore("site");

        var request = objectStore.get(url);

        request.onerror = function(event) {
            console.log("Error retrieving data from db for key: " + url);
        };

        request.onsuccess = function(event) {
            console.log("Successfully retrieved data from db");

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
            console.log("Successfully put data in database");
            callback(true);
        }

        request.onerror = function(event) {
            console.log("Error while putting data to database:" + event.target.errorCode);
            callback(false);
        }

    }

    return flagDBTemp;
})();