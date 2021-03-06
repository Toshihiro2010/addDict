"use strict";
var Application = require("application");
var DownloadManager = (function () {
    function DownloadManager() {
        this.manager = Application.android.context.getSystemService(android.content.Context.DOWNLOAD_SERVICE);
        this.downloads = new Map();
        this.registerBroadcast();
    }
    DownloadManager.prototype.downloadFile = function (url, cb, directory, filename, title, description) {
        if (directory === void 0) { directory = "downloads"; }
        if (!filename) {
            filename = url.substring(url.lastIndexOf('/') + 1);
        }
        if (!title) {
            title = filename;
        }
        var uri = android.net.Uri.parse(url);
        var req = new android.app.DownloadManager.Request(uri);
        req.setDestinationInExternalFilesDir(Application.android.context, directory, filename);
        req.setTitle(title);
        req.setDescription(description);
        var id = this.manager.enqueue(req);
        this.downloads.set(id, cb);
    };
    DownloadManager.prototype.registerBroadcast = function () {
        Application.android.registerBroadcastReceiver(android.app.DownloadManager.ACTION_DOWNLOAD_COMPLETE, this.handleDownloadEvent.bind(this));
    };
    DownloadManager.prototype.handleDownloadEvent = function (context, intent) {
        var query = new android.app.DownloadManager.Query();
        var id = intent.getExtras().getLong(android.app.DownloadManager.EXTRA_DOWNLOAD_ID);
        var c = this.manager.query(query);
        while (c.moveToNext()) {
            if (c.getLong(c.getColumnIndex(android.app.DownloadManager.COLUMN_ID)) == id) {
                var success;
                switch (c.getInt(c.getColumnIndex(android.app.DownloadManager.COLUMN_STATUS))) {
                    case android.app.DownloadManager.STATUS_SUCCESSFUL:
                        success = true;
                        break;
                    case android.app.DownloadManager.STATUS_FAILED:
                        success = false;
                        break;
                }
                if (this.downloads.has(id)) {
                    var uri = c.getString(c.getColumnIndex(android.app.DownloadManager.COLUMN_LOCAL_URI));
                    var cb = this.downloads.get(id);
                    cb(success, uri);
                }
                break;
            }
        }
        c.close();
    };
    DownloadManager.prototype.unregisterBroadcast = function () {
        Application.android.unregisterBroadcastReceiver(android.app.DownloadManager.ACTION_DOWNLOAD_COMPLETE);
    };
    return DownloadManager;
}());
exports.DownloadManager = DownloadManager;
//# sourceMappingURL=downloadmanager.js.map