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
            //alert("กรุณาปิด application แล้วเปิดใหม่");
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
            //alert("กรุณาปิด application แล้วเปิดใหม่");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZy1jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzZXR0aW5nLWNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQTBDO0FBQzFDLDBDQUEyRDtBQUMzRCw2RUFBK0Q7QUFHL0QsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQ2hDLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMzQixJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQU0xQyxJQUFhLGdCQUFnQjtJQU16QiwwQkFBb0IsTUFBZTtRQUFmLFdBQU0sR0FBTixNQUFNLENBQVM7UUFKM0IsV0FBTSxHQUFHLENBQUMsQ0FBRTtRQUNaLGtCQUFhLEdBQUcsNkRBQTZELENBQUE7UUFDN0UsaUJBQVksR0FBRyw2REFBNkQsQ0FBQztJQUlyRixDQUFDO0lBRU8saUNBQU0sR0FBZDtRQUNJLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUNoQixPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRyxRQUFRLENBQUMsQ0FBQTtRQUNuQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUM7WUFDOUIsVUFBVSxFQUFFO2dCQUNSLElBQUksRUFBRyxNQUFNO2dCQUNiLFFBQVEsRUFBRSxJQUFJO2dCQUNkLEtBQUssRUFBRSxRQUFRO2FBQ2xCO1NBQ0osQ0FBQTtJQUVMLENBQUM7SUFFRCxxR0FBcUc7SUFFN0YsbUNBQVEsR0FBaEI7UUFDSSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7SUFFcEIsQ0FBQztJQUNPLHVDQUFZLEdBQXBCO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ25DLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUVoQixJQUFJLEVBQUUsR0FBRyxJQUFJ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RjtZQUV4RixJQUFJLE1BQU0sR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLFVBQUEsQ0FBQztnQkFDOUIsS0FBSyxHQUFHLENBQUMsQ0FBQztZQUNkLENBQUMsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUV0QyxJQUFJLE1BQU0sR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRXZDLElBQUksZUFBZSxHQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3ZELGVBQWUsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLFVBQUEsQ0FBQyxJQUFLLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUl0RCxFQUFFLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztZQUN6Qiw2Q0FBNkM7UUFDakQsQ0FBQyxDQUFDLENBQUM7SUFFUCxDQUFDO0lBS0wsdUJBQUM7QUFBRCxDQUFDLEFBNUdELElBNEdDO0FBNUdZLGdCQUFnQjtJQUo1QixnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLFNBQVM7UUFDbkIsV0FBVyxFQUFFLHNDQUFzQztLQUN0RCxDQUFDO3FDQU8rQixlQUFNO0dBTjFCLGdCQUFnQixDQTRHNUI7QUE1R1ksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUm91dGVyLCBOYXZpZ2F0aW9uRXh0cmFzIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiOyBcclxuaW1wb3J0IHsgRG93bmxvYWRNYW5hZ2VyIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWRvd25sb2FkbWFuYWdlcic7XHJcblxyXG5cclxudmFyIGZzID0gcmVxdWlyZShcImZpbGUtc3lzdGVtXCIpO1xyXG52YXIgaHR0cCA9IHJlcXVpcmUoXCJodHRwXCIpO1xyXG52YXIgVG9hc3QgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXRvYXN0XCIpO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJzZXR0aW5nXCIsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCJ2aWV3cy9zZXR0aW5nL3NldHRpbmctY29tcG9uZW50Lmh0bWxcIixcclxufSlcclxuZXhwb3J0IGNsYXNzIFNldHRpbmdDb21wb25lbnQge1xyXG5cclxuICAgIHByaXZhdGUgc3RhdHVzID0gMCA7XHJcbiAgICBwcml2YXRlIHVybF9FbmdUb1RoYWkgPSBcImh0dHA6Ly9zZWxmLmVuY29uY2VwdC5jb206ODA5MC9hZGRpY3RfZGF0YWJhc2VzL0VuZ1RvVGhhLmRiXCJcclxuICAgIHByaXZhdGUgdXJsX0VuZ1RvRW5nID0gXCJodHRwOi8vc2VsZi5lbmNvbmNlcHQuY29tOjgwOTAvYWRkaWN0X2RhdGFiYXNlcy9FbmdUb0VuZy5kYlwiO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyIDogUm91dGVyKXtcclxuXHJcbiAgICB9ICAgXHJcblxyXG4gICAgcHJpdmF0ZSBzaWduSW4oKXtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJjbGljayA9ID5cIiAsIFwic2lnbkluXCIpXHJcbiAgICAgICAgc2VsZi5yb3V0ZXIubmF2aWdhdGUoW1wiLi9sb2dpblwiXSkse1xyXG4gICAgICAgICAgICB0cmFuc2l0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBuYW1lIDogXCJmbGlwXCIgLFxyXG4gICAgICAgICAgICAgICAgZHV0YXRpb246IDIwMDAsXHJcbiAgICAgICAgICAgICAgICBjdXJ2ZTogXCJsaW5lYXJcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cclxuICAgIHByaXZhdGUgYnRuQ2hlY2soKXtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBidG5FbmdUb1RoYWkoKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkJ1dHRvbiA9PiBFbmdUb1RoYWlcIik7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICBsZXQgZG0gPSBuZXcgRG93bmxvYWRNYW5hZ2VyKCk7XHJcbiAgICAgICAgZG0uZG93bmxvYWRGaWxlKHNlbGYudXJsX0VuZ1RvVGhhaSAsZnVuY3Rpb24ocmVzdWx0ICwgZmlsZV9wYXRoKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZXN1bHQgPT4gXCIgLCByZXN1bHQpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInVyaSA9PiBcIiAsIGZpbGVfcGF0aCk7XHJcblxyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgcDpzdHJpbmcgPSBmaWxlX3BhdGg7XHJcbiAgICAgICAgICAgIHZhciBlcnJvcjtcclxuICAgICAgICAgICAgdmFyIHNvdXJjZUZpbGUgPSBmcy5GaWxlLmZyb21QYXRoKHAucmVwbGFjZSgnZmlsZTovLycsJycpKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coc291cmNlRmlsZS5wYXRoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coc291cmNlRmlsZS5uYW1lKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0V4aXN0ICcrZnMuRmlsZS5leGlzdHMoc291cmNlRmlsZS5wYXRoKSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdMb2NrZWQnKyBzb3VyY2VGaWxlLmlzTG9ja2VkKTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ1JlbmFtZScrIGRvY3VtZW50czEucmVuYW1lKCdFMkUuZGInKSk7XHJcbiAgICAgICAgICAgIC8vICB2YXIgZG9jdW1lbnRzMiA9IGZzLkZpbGUuZnJvbVBhdGgoJy9kYXRhL29yZy5uYXRpdmVzY3JpcHQudGVzdDYvZmlsZXMvRW5nVG9FbmcuZGInKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBzb3VyY2UgPSBzb3VyY2VGaWxlLnJlYWRTeW5jKGU9PiB7IFxyXG4gICAgICAgICAgICAgICAgZXJyb3IgPSBlOyBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGxldCBkb2MgPSBmcy5rbm93bkZvbGRlcnMuZG9jdW1lbnRzKCk7XHJcblxyXG4gICAgICAgICAgICBsZXQgcGF0aF9kID0gZG9jLmdldEZvbGRlcihcImRhdGFiYXNlXCIpO1xyXG4gICAgXHJcbiAgICAgICAgICAgIGxldCBkZXN0aW5hdGlvbkZpbGUgPSAgcGF0aF9kLmdldEZpbGUoc291cmNlRmlsZS5uYW1lKTtcclxuICAgICAgICAgICAgZGVzdGluYXRpb25GaWxlLndyaXRlU3luYyhzb3VyY2UsIGU9PiB7IGVycm9yID0gZTsgfSk7XHJcbiAgICAgICAgICAgIFxyXG4gXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBkbS51bnJlZ2lzdGVyQnJvYWRjYXN0KCk7XHJcbiAgICAgICAgICAgIC8vYWxlcnQoXCLguIHguKPguLjguJPguLLguJvguLTguJQgYXBwbGljYXRpb24g4LmB4Lil4LmJ4Lin4LmA4Lib4Li04LiU4LmD4Lir4Lih4LmIXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYnRuRW5nVG9FbmcoKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkJ1dHRvbiA9PiBFbmdUb0VuZ1wiKTtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIGxldCBkbSA9IG5ldyBEb3dubG9hZE1hbmFnZXIoKTtcclxuICAgICAgICBkbS5kb3dubG9hZEZpbGUoc2VsZi51cmxfRW5nVG9FbmcgLGZ1bmN0aW9uKHJlc3VsdCAsIGZpbGVfcGF0aCl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVzdWx0ID0+IFwiICwgcmVzdWx0KTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ1cmkgPT4gXCIgLCBmaWxlX3BhdGgpO1xyXG5cclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IHA6c3RyaW5nID0gZmlsZV9wYXRoO1xyXG4gICAgICAgICAgICB2YXIgZXJyb3I7XHJcbiAgICAgICAgICAgIHZhciBzb3VyY2VGaWxlID0gZnMuRmlsZS5mcm9tUGF0aChwLnJlcGxhY2UoJ2ZpbGU6Ly8nLCcnKSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHNvdXJjZUZpbGUucGF0aCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHNvdXJjZUZpbGUubmFtZSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFeGlzdCAnK2ZzLkZpbGUuZXhpc3RzKHNvdXJjZUZpbGUucGF0aCkpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnTG9ja2VkJysgc291cmNlRmlsZS5pc0xvY2tlZCk7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdSZW5hbWUnKyBkb2N1bWVudHMxLnJlbmFtZSgnRTJFLmRiJykpO1xyXG4gICAgICAgICAgICAvLyAgdmFyIGRvY3VtZW50czIgPSBmcy5GaWxlLmZyb21QYXRoKCcvZGF0YS9vcmcubmF0aXZlc2NyaXB0LnRlc3Q2L2ZpbGVzL0VuZ1RvRW5nLmRiJyk7XHJcblxyXG4gICAgICAgICAgICB2YXIgc291cmNlID0gc291cmNlRmlsZS5yZWFkU3luYyhlPT4geyBcclxuICAgICAgICAgICAgICAgIGVycm9yID0gZTsgXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBsZXQgZG9jID0gZnMua25vd25Gb2xkZXJzLmRvY3VtZW50cygpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHBhdGhfZCA9IGRvYy5nZXRGb2xkZXIoXCJkYXRhYmFzZVwiKTtcclxuICAgIFxyXG4gICAgICAgICAgICBsZXQgZGVzdGluYXRpb25GaWxlID0gIHBhdGhfZC5nZXRGaWxlKHNvdXJjZUZpbGUubmFtZSk7XHJcbiAgICAgICAgICAgIGRlc3RpbmF0aW9uRmlsZS53cml0ZVN5bmMoc291cmNlLCBlPT4geyBlcnJvciA9IGU7IH0pO1xyXG4gICAgICAgICAgICBcclxuIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZG0udW5yZWdpc3RlckJyb2FkY2FzdCgpO1xyXG4gICAgICAgICAgICAvL2FsZXJ0KFwi4LiB4Lij4Li44LiT4Liy4Lib4Li04LiUIGFwcGxpY2F0aW9uIOC5geC4peC5ieC4p+C5gOC4m+C4tOC4lOC5g+C4q+C4oeC5iFwiKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgICBcclxuXHJcbn1cclxuIl19