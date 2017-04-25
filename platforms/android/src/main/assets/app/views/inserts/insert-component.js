"use strict";
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var Sqlite = require("nativescript-sqlite");
var Toast = require("nativescript-toast");
var Inserts = (function () {
    function Inserts(routerExtensions) {
        var _this = this;
        this.routerExtensions = routerExtensions;
        this.eng_word = "";
        this.thai_word = "";
        new Sqlite("dicts.db").then(function (db) {
            _this.database = db;
            console.log("Open database Success");
        }, function (error) {
            console.log("Open DB ERROR", error);
        });
    }
    Inserts.prototype.ngOnDestroy = function () {
        console.log("Ng-insert ===> Ondestroy");
    };
    Inserts.prototype.btnInsert = function () {
        console.log("Check click ==>");
        console.log("eng_word ======> " + this.eng_word);
        console.log("thai_word ======> " + this.thai_word);
        //TODO insert Thai_word , eng_wor
        if (this.eng_word == "" || this.thai_word == "") {
            var toast = Toast.makeText("มีช่องว่างนะไอ้โง่");
            toast.show();
        }
        else {
            this.database.execSQL("INSERT INTO dict (engWorld, thaiWorld) VALUES (?,?)", [this.eng_word, this.thai_word]).then(function (all_word) {
                console.log("INSERT RESULT => ", all_word);
            }, function (error) {
                console.log("INSERT ERROR => ", error);
            });
            console.log("Not Empty");
            alert("คุณได้เพิ่ม " + this.eng_word + " เรียบร้อยแล้ว");
            this.eng_word = "";
            this.thai_word = "";
        }
    };
    Inserts.prototype.goBack = function () {
        this.routerExtensions.back();
    };
    return Inserts;
}());
Inserts = __decorate([
    core_1.Component({
        selector: "Inserts",
        templateUrl: "views/inserts/insert-component.html",
    }),
    __metadata("design:paramtypes", [router_1.RouterExtensions])
], Inserts);
exports.Inserts = Inserts;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zZXJ0LWNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImluc2VydC1jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUFpRTtBQUdqRSxzREFBK0Q7QUFTL0QsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFDNUMsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFPMUMsSUFBYSxPQUFPO0lBUWhCLGlCQUFvQixnQkFBa0M7UUFBdEQsaUJBU0M7UUFUbUIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUp0RCxhQUFRLEdBQUMsRUFBRSxDQUFDO1FBQ1osY0FBUyxHQUFDLEVBQUUsQ0FBQztRQUlULElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLEVBQUU7WUFDMUIsS0FBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7WUFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1FBRXpDLENBQUMsRUFBQyxVQUFBLEtBQUs7WUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRyxLQUFLLENBQUMsQ0FBQztRQUN6QyxDQUFDLENBQUMsQ0FBQTtJQUVOLENBQUM7SUFFRCw2QkFBVyxHQUFYO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0lBRTVDLENBQUM7SUFJRCwyQkFBUyxHQUFUO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2pELE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ25ELGlDQUFpQztRQUVqQyxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFHLEVBQUUsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFHLEVBQUcsQ0FBQyxDQUFBLENBQUM7WUFDM0MsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1lBQ2pELEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNqQixDQUFDO1FBQUEsSUFBSSxDQUFBLENBQUM7WUFDRixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxxREFBcUQsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsUUFBUTtnQkFDdkgsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRyxRQUFRLENBQUcsQ0FBQztZQUM5QyxDQUFDLEVBQUUsVUFBQSxLQUFLO2dCQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUcsS0FBSyxDQUFDLENBQUM7WUFDNUMsQ0FBQyxDQUNKLENBQUM7WUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBRXpCLEtBQUssQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDO1lBRXpELElBQUksQ0FBQyxRQUFRLEdBQUUsRUFBRSxDQUFDO1lBQ2xCLElBQUksQ0FBQyxTQUFTLEdBQUMsRUFBRSxDQUFDO1FBQ3RCLENBQUM7SUFDTCxDQUFDO0lBRU0sd0JBQU0sR0FBYjtRQUNJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBT0wsY0FBQztBQUFELENBQUMsQUE1REQsSUE0REM7QUE1RFksT0FBTztJQUpuQixnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLFNBQVM7UUFDbkIsV0FBVyxFQUFFLHFDQUFxQztLQUNyRCxDQUFDO3FDQVN3Qyx5QkFBZ0I7R0FSN0MsT0FBTyxDQTREbkI7QUE1RFksMEJBQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgLCBOZ01vZHVsZSAsIE9uRGVzdHJveSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFJvdXRlICwgUm91dGVyLCBOYXZpZ2F0aW9uU3RhcnQsIE5hdmlnYXRpb25FbmQgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBwbGF0Zm9ybU5hdGl2ZVNjcmlwdER5bmFtaWMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcGxhdGZvcm1cIjtcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuXHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxudmFyIFNxbGl0ZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtc3FsaXRlXCIpO1xyXG52YXIgVG9hc3QgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXRvYXN0XCIpO1xyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwiSW5zZXJ0c1wiLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwidmlld3MvaW5zZXJ0cy9pbnNlcnQtY29tcG9uZW50Lmh0bWxcIixcclxufSlcclxuZXhwb3J0IGNsYXNzIEluc2VydHMgaW1wbGVtZW50cyBPbkRlc3Ryb3kgIHtcclxuICAgIFxyXG4gICAgXHJcbiAgICBwcml2YXRlIGRhdGFiYXNlIDphbnk7XHJcbiAgICBlbmdfd29yZD1cIlwiO1xyXG4gICAgdGhhaV93b3JkPVwiXCI7XHJcblxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyl7XHJcbiAgICAgICAgbmV3IFNxbGl0ZShcImRpY3RzLmRiXCIpLnRoZW4oZGIgPT57XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YWJhc2UgPSBkYjtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJPcGVuIGRhdGFiYXNlIFN1Y2Nlc3NcIik7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0sZXJyb3IgPT57XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiT3BlbiBEQiBFUlJPUlwiICwgZXJyb3IpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfVxyXG5cclxuICAgIG5nT25EZXN0cm95KCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJOZy1pbnNlcnQgPT09PiBPbmRlc3Ryb3lcIik7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBidG5JbnNlcnQoKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkNoZWNrIGNsaWNrID09PlwiKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImVuZ193b3JkID09PT09PT4gXCIgKyB0aGlzLmVuZ193b3JkKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInRoYWlfd29yZCA9PT09PT0+IFwiICsgdGhpcy50aGFpX3dvcmQpO1xyXG4gICAgICAgIC8vVE9ETyBpbnNlcnQgVGhhaV93b3JkICwgZW5nX3dvclxyXG5cclxuICAgICAgICBpZih0aGlzLmVuZ193b3JkID09XCJcIiB8fCB0aGlzLnRoYWlfd29yZCA9PVwiXCIgKXtcclxuICAgICAgICAgICAgdmFyIHRvYXN0ID0gVG9hc3QubWFrZVRleHQoXCLguKHguLXguIrguYjguK3guIfguKfguYjguLLguIfguJnguLDguYTguK3guYnguYLguIfguYhcIik7XHJcbiAgICAgICAgICAgIHRvYXN0LnNob3coKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5kYXRhYmFzZS5leGVjU1FMKFwiSU5TRVJUIElOVE8gZGljdCAoZW5nV29ybGQsIHRoYWlXb3JsZCkgVkFMVUVTICg/LD8pXCIsIFt0aGlzLmVuZ193b3JkICx0aGlzLnRoYWlfd29yZF0pLnRoZW4oYWxsX3dvcmQgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJJTlNFUlQgUkVTVUxUID0+IFwiICwgYWxsX3dvcmQgICk7XHJcbiAgICAgICAgICAgICAgICB9LCBlcnJvciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJJTlNFUlQgRVJST1IgPT4gXCIgLCBlcnJvcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm90IEVtcHR5XCIpO1xyXG5cclxuICAgICAgICAgICAgYWxlcnQoXCLguITguLjguJPguYTguJTguYnguYDguJ7guLTguYjguKEgXCIgKyB0aGlzLmVuZ193b3JkICsgXCIg4LmA4Lij4Li14Lii4Lia4Lij4LmJ4Lit4Lii4LmB4Lil4LmJ4LinXCIpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5lbmdfd29yZCA9XCJcIjtcclxuICAgICAgICAgICAgdGhpcy50aGFpX3dvcmQ9XCJcIjsgICBcclxuICAgICAgICB9ICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdvQmFjaygpIHtcclxuICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMuYmFjaygpO1xyXG4gICAgfSAgIFxyXG5cclxuXHJcbiAgXHJcblxyXG4gICAgXHJcblxyXG59XHJcbiJdfQ==