"use strict";
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var nativescript_downloadmanager_1 = require("nativescript-downloadmanager");
var fs = require("file-system");
var http = require("http");
var Toast = require("nativescript-toast");
var SettingComponent = (function () {
    function SettingComponent(router) {
        this.router = router;
        this.status = 0;
        this.url_EngToThai = "http://self.enconcept.com:8090/addict_databases/EngToTha.db";
        this.url_EngToEng = "http://self.enconcept.com:8090/addict_databases/EngToEng.db";
    }
    SettingComponent.prototype.signIn = function () {
        var self = this;
        console.log("click = >", "signIn");
        self.router.navigate(["./login"]), {
            transition: {
                name: "flip",
                dutation: 2000,
                curve: "linear"
            }
        };
    };
    //***************************************************************************************************
    SettingComponent.prototype.btnCheck = function () {
        var self = this;
    };
    SettingComponent.prototype.btnEngToThai = function () {
        console.log("Button => EngToThai");
        var self = this;
        var dm = new nativescript_downloadmanager_1.DownloadManager();
        dm.downloadFile(self.url_EngToThai, function (result, file_path) {
            console.log("result => ", result);
            console.log("uri => ", file_path);
            var p = file_path;
            var error;
            var sourceFile = fs.File.fromPath(p.replace('file://', ''));
            console.log(sourceFile.path);
            console.log(sourceFile.name);
            console.log('Exist ' + fs.File.exists(sourceFile.path));
            console.log('Locked' + sourceFile.isLocked);
            // console.log('Rename'+ documents1.rename('E2E.db'));
            //  var documents2 = fs.File.fromPath('/data/org.nativescript.test6/files/EngToEng.db');
            var source = sourceFile.readSync(function (e) {
                error = e;
            });
            var doc = fs.knownFolders.documents();
            var path_d = doc.getFolder("database");
            var destinationFile = path_d.getFile(sourceFile.name);
            destinationFile.writeSync(source, function (e) { error = e; });
            dm.unregisterBroadcast();
            alert("กรุณาปิด application แล้วเปิดใหม่");
        });
    };
    SettingComponent.prototype.btnEngToEng = function () {
        console.log("Button => EngToEng");
        var self = this;
        var dm = new nativescript_downloadmanager_1.DownloadManager();
        dm.downloadFile(self.url_EngToEng, function (result, file_path) {
            console.log("result => ", result);
            console.log("uri => ", file_path);
            var p = file_path;
            var error;
            var sourceFile = fs.File.fromPath(p.replace('file://', ''));
            console.log(sourceFile.path);
            console.log(sourceFile.name);
            console.log('Exist ' + fs.File.exists(sourceFile.path));
            console.log('Locked' + sourceFile.isLocked);
            // console.log('Rename'+ documents1.rename('E2E.db'));
            //  var documents2 = fs.File.fromPath('/data/org.nativescript.test6/files/EngToEng.db');
            var source = sourceFile.readSync(function (e) {
                error = e;
            });
            var doc = fs.knownFolders.documents();
            var path_d = doc.getFolder("database");
            var destinationFile = path_d.getFile(sourceFile.name);
            destinationFile.writeSync(source, function (e) { error = e; });
            dm.unregisterBroadcast();
            alert("กรุณาปิด application แล้วเปิดใหม่");
        });
    };
    return SettingComponent;
}());
SettingComponent = __decorate([
    core_1.Component({
        selector: "setting",
        templateUrl: "views/setting/setting-component.html",
    }),
    __metadata("design:paramtypes", [router_1.Router])
], SettingComponent);
exports.SettingComponent = SettingComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZy1jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzZXR0aW5nLWNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQTBDO0FBQzFDLDBDQUEyRDtBQUMzRCw2RUFBK0Q7QUFHL0QsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQ2hDLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMzQixJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQU0xQyxJQUFhLGdCQUFnQjtJQU16QiwwQkFBb0IsTUFBZTtRQUFmLFdBQU0sR0FBTixNQUFNLENBQVM7UUFKM0IsV0FBTSxHQUFHLENBQUMsQ0FBRTtRQUNaLGtCQUFhLEdBQUcsNkRBQTZELENBQUE7UUFDN0UsaUJBQVksR0FBRyw2REFBNkQsQ0FBQztJQUlyRixDQUFDO0lBRU8saUNBQU0sR0FBZDtRQUNJLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUNoQixPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRyxRQUFRLENBQUMsQ0FBQTtRQUNuQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUM7WUFDOUIsVUFBVSxFQUFFO2dCQUNSLElBQUksRUFBRyxNQUFNO2dCQUNiLFFBQVEsRUFBRSxJQUFJO2dCQUNkLEtBQUssRUFBRSxRQUFRO2FBQ2xCO1NBQ0osQ0FBQTtJQUVMLENBQUM7SUFFRCxxR0FBcUc7SUFFN0YsbUNBQVEsR0FBaEI7UUFDSSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7SUFFcEIsQ0FBQztJQUNPLHVDQUFZLEdBQXBCO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ25DLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUVoQixJQUFJLEVBQUUsR0FBRyxJQUFJ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QyxzREFBc0Q7WUFDdEQsd0ZBQXdGO1lBRXhGLElBQUksTUFBTSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUMsVUFBQSxDQUFDO2dCQUM5QixLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBQ2QsQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBRXRDLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7WUFFdkMsSUFBSSxlQUFlLEdBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkQsZUFBZSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsVUFBQSxDQUFDLElBQUssS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBSXRELEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1lBQ3pCLEtBQUssQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO1FBQy9DLENBQUMsQ0FBQyxDQUFDO0lBRVAsQ0FBQztJQUtMLHVCQUFDO0FBQUQsQ0FBQyxBQTVHRCxJQTRHQztBQTVHWSxnQkFBZ0I7SUFKNUIsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxTQUFTO1FBQ25CLFdBQVcsRUFBRSxzQ0FBc0M7S0FDdEQsQ0FBQztxQ0FPK0IsZUFBTTtHQU4xQixnQkFBZ0IsQ0E0RzVCO0FBNUdZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFJvdXRlciwgTmF2aWdhdGlvbkV4dHJhcyB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjsgXHJcbmltcG9ydCB7IERvd25sb2FkTWFuYWdlciB9IGZyb20gJ25hdGl2ZXNjcmlwdC1kb3dubG9hZG1hbmFnZXInO1xyXG5cclxuXHJcbnZhciBmcyA9IHJlcXVpcmUoXCJmaWxlLXN5c3RlbVwiKTtcclxudmFyIGh0dHAgPSByZXF1aXJlKFwiaHR0cFwiKTtcclxudmFyIFRvYXN0ID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC10b2FzdFwiKTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwic2V0dGluZ1wiLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwidmlld3Mvc2V0dGluZy9zZXR0aW5nLWNvbXBvbmVudC5odG1sXCIsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTZXR0aW5nQ29tcG9uZW50IHtcclxuXHJcbiAgICBwcml2YXRlIHN0YXR1cyA9IDAgO1xyXG4gICAgcHJpdmF0ZSB1cmxfRW5nVG9UaGFpID0gXCJodHRwOi8vc2VsZi5lbmNvbmNlcHQuY29tOjgwOTAvYWRkaWN0X2RhdGFiYXNlcy9FbmdUb1RoYS5kYlwiXHJcbiAgICBwcml2YXRlIHVybF9FbmdUb0VuZyA9IFwiaHR0cDovL3NlbGYuZW5jb25jZXB0LmNvbTo4MDkwL2FkZGljdF9kYXRhYmFzZXMvRW5nVG9FbmcuZGJcIjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlciA6IFJvdXRlcil7XHJcblxyXG4gICAgfSAgIFxyXG5cclxuICAgIHByaXZhdGUgc2lnbkluKCl7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiY2xpY2sgPSA+XCIgLCBcInNpZ25JblwiKVxyXG4gICAgICAgIHNlbGYucm91dGVyLm5hdmlnYXRlKFtcIi4vbG9naW5cIl0pLHtcclxuICAgICAgICAgICAgdHJhbnNpdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgbmFtZSA6IFwiZmxpcFwiICxcclxuICAgICAgICAgICAgICAgIGR1dGF0aW9uOiAyMDAwLFxyXG4gICAgICAgICAgICAgICAgY3VydmU6IFwibGluZWFyXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuXHJcbiAgICBwcml2YXRlIGJ0bkNoZWNrKCl7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgIH1cclxuICAgIHByaXZhdGUgYnRuRW5nVG9UaGFpKCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJCdXR0b24gPT4gRW5nVG9UaGFpXCIpO1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgbGV0IGRtID0gbmV3IERvd25sb2FkTWFuYWdlcigpO1xyXG4gICAgICAgIGRtLmRvd25sb2FkRmlsZShzZWxmLnVybF9FbmdUb1RoYWkgLGZ1bmN0aW9uKHJlc3VsdCAsIGZpbGVfcGF0aCl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVzdWx0ID0+IFwiICwgcmVzdWx0KTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ1cmkgPT4gXCIgLCBmaWxlX3BhdGgpO1xyXG5cclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IHA6c3RyaW5nID0gZmlsZV9wYXRoO1xyXG4gICAgICAgICAgICB2YXIgZXJyb3I7XHJcbiAgICAgICAgICAgIHZhciBzb3VyY2VGaWxlID0gZnMuRmlsZS5mcm9tUGF0aChwLnJlcGxhY2UoJ2ZpbGU6Ly8nLCcnKSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHNvdXJjZUZpbGUucGF0aCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHNvdXJjZUZpbGUubmFtZSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFeGlzdCAnK2ZzLkZpbGUuZXhpc3RzKHNvdXJjZUZpbGUucGF0aCkpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnTG9ja2VkJysgc291cmNlRmlsZS5pc0xvY2tlZCk7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdSZW5hbWUnKyBkb2N1bWVudHMxLnJlbmFtZSgnRTJFLmRiJykpO1xyXG4gICAgICAgICAgICAvLyAgdmFyIGRvY3VtZW50czIgPSBmcy5GaWxlLmZyb21QYXRoKCcvZGF0YS9vcmcubmF0aXZlc2NyaXB0LnRlc3Q2L2ZpbGVzL0VuZ1RvRW5nLmRiJyk7XHJcblxyXG4gICAgICAgICAgICB2YXIgc291cmNlID0gc291cmNlRmlsZS5yZWFkU3luYyhlPT4geyBcclxuICAgICAgICAgICAgICAgIGVycm9yID0gZTsgXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBsZXQgZG9jID0gZnMua25vd25Gb2xkZXJzLmRvY3VtZW50cygpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHBhdGhfZCA9IGRvYy5nZXRGb2xkZXIoXCJkYXRhYmFzZVwiKTtcclxuICAgIFxyXG4gICAgICAgICAgICBsZXQgZGVzdGluYXRpb25GaWxlID0gIHBhdGhfZC5nZXRGaWxlKHNvdXJjZUZpbGUubmFtZSk7XHJcbiAgICAgICAgICAgIGRlc3RpbmF0aW9uRmlsZS53cml0ZVN5bmMoc291cmNlLCBlPT4geyBlcnJvciA9IGU7IH0pO1xyXG4gICAgICAgICAgICBcclxuIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZG0udW5yZWdpc3RlckJyb2FkY2FzdCgpO1xyXG4gICAgICAgICAgICBhbGVydChcIuC4geC4o+C4uOC4k+C4suC4m+C4tOC4lCBhcHBsaWNhdGlvbiDguYHguKXguYnguKfguYDguJvguLTguJTguYPguKvguKHguYhcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBidG5FbmdUb0VuZygpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQnV0dG9uID0+IEVuZ1RvRW5nXCIpO1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgbGV0IGRtID0gbmV3IERvd25sb2FkTWFuYWdlcigpO1xyXG4gICAgICAgIGRtLmRvd25sb2FkRmlsZShzZWxmLnVybF9FbmdUb0VuZyAsZnVuY3Rpb24ocmVzdWx0ICwgZmlsZV9wYXRoKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZXN1bHQgPT4gXCIgLCByZXN1bHQpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInVyaSA9PiBcIiAsIGZpbGVfcGF0aCk7XHJcblxyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgcDpzdHJpbmcgPSBmaWxlX3BhdGg7XHJcbiAgICAgICAgICAgIHZhciBlcnJvcjtcclxuICAgICAgICAgICAgdmFyIHNvdXJjZUZpbGUgPSBmcy5GaWxlLmZyb21QYXRoKHAucmVwbGFjZSgnZmlsZTovLycsJycpKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coc291cmNlRmlsZS5wYXRoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coc291cmNlRmlsZS5uYW1lKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0V4aXN0ICcrZnMuRmlsZS5leGlzdHMoc291cmNlRmlsZS5wYXRoKSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdMb2NrZWQnKyBzb3VyY2VGaWxlLmlzTG9ja2VkKTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ1JlbmFtZScrIGRvY3VtZW50czEucmVuYW1lKCdFMkUuZGInKSk7XHJcbiAgICAgICAgICAgIC8vICB2YXIgZG9jdW1lbnRzMiA9IGZzLkZpbGUuZnJvbVBhdGgoJy9kYXRhL29yZy5uYXRpdmVzY3JpcHQudGVzdDYvZmlsZXMvRW5nVG9FbmcuZGInKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBzb3VyY2UgPSBzb3VyY2VGaWxlLnJlYWRTeW5jKGU9PiB7IFxyXG4gICAgICAgICAgICAgICAgZXJyb3IgPSBlOyBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGxldCBkb2MgPSBmcy5rbm93bkZvbGRlcnMuZG9jdW1lbnRzKCk7XHJcblxyXG4gICAgICAgICAgICBsZXQgcGF0aF9kID0gZG9jLmdldEZvbGRlcihcImRhdGFiYXNlXCIpO1xyXG4gICAgXHJcbiAgICAgICAgICAgIGxldCBkZXN0aW5hdGlvbkZpbGUgPSAgcGF0aF9kLmdldEZpbGUoc291cmNlRmlsZS5uYW1lKTtcclxuICAgICAgICAgICAgZGVzdGluYXRpb25GaWxlLndyaXRlU3luYyhzb3VyY2UsIGU9PiB7IGVycm9yID0gZTsgfSk7XHJcbiAgICAgICAgICAgIFxyXG4gXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBkbS51bnJlZ2lzdGVyQnJvYWRjYXN0KCk7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwi4LiB4Lij4Li44LiT4Liy4Lib4Li04LiUIGFwcGxpY2F0aW9uIOC5geC4peC5ieC4p+C5gOC4m+C4tOC4lOC5g+C4q+C4oeC5iFwiKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgICBcclxuXHJcbn1cclxuIl19