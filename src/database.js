var flagDB = (function() {
    var fDB = {};
    var datastore = null;
  
    flagDB.open = function(callback) {
        var version = 1;

        var request = indexedDB.open('siteflag', version);

        request.onupgradeneeded = function(e) {
            var db = e.target.result;

            e.target.transaction.onerror = tDB.onerror;

            // Delete the old datastore.
            if (db.objectStoreNames.contains('sitecomments')) {
                db.deleteObjectStore('sitecomments');
            }

            // Create a new datastore.
            var store = db.createObjectStore('sitecomments', {
                keyPath: 'site'
            });
        };

        request.onsuccess = function() {
            datastore = e.target.result;

            callback();
        };

        request.onerror = fDB.onerror;
    };

    fDB.getSiteNote = function(site, callback) {
        var db = datastore;
        var transaction = db.transaction(["sitecomments"]);
        var objectStore = transaction.objectStore("sitecomments");
        
        var request = objectStore.get(site);
        request.onsuccess = function(event) {
            callback(request.result.comment);
        }
    };

    fDB.updateSiteNote = function(site, note, callback) {
        var objectStore = db.transaction(["sitecomments"], "readwrite").objectStore("sitecomments");

        var data = {
            site: site,
            note: note
        };

        var requestUpdate = objectStore.put(data);
        requestUpdate.onerror = function(event) {
            console.log("Error updating data");
            callback(false);
        }

        requestUpdate.onsuccess = function(event) {
            console.log("Updated data");
            callback(true);
        }
    }

    return fDB;
}());
  