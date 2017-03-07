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
        console.log("Ng ===> Ondestroy");
    };
    Inserts.prototype.btnInsert = function () {
        console.log("Check click ==>");
        console.log("eng_word ======> " + this.eng_word);
        console.log("thai_word ======> " + this.thai_word);
        //TODO insert Thai_word , eng_word
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
        this.ngOnDestroy();
    };
    return Inserts;
}());
Inserts = __decorate([
    core_1.Component({
        selector: "Inserts",
        templateUrl: "views/inserts/insert-component.html",
    }),
    __metadata("design:paramtypes", [router_1.NativeScriptRouterModule])
], Inserts);
exports.Inserts = Inserts;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zZXJ0LWNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImluc2VydC1jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUFpRTtBQUlqRSxzREFBdUU7QUFPdkUsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFDNUMsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFPMUMsSUFBYSxPQUFPO0lBUWhCLGlCQUFvQixnQkFBMEM7UUFBOUQsaUJBU0M7UUFUbUIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUEwQjtRQUo5RCxhQUFRLEdBQUMsRUFBRSxDQUFDO1FBQ1osY0FBUyxHQUFDLEVBQUUsQ0FBQztRQUlULElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLEVBQUU7WUFDMUIsS0FBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7WUFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1FBRXpDLENBQUMsRUFBQyxVQUFBLEtBQUs7WUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRyxLQUFLLENBQUMsQ0FBQztRQUN6QyxDQUFDLENBQUMsQ0FBQTtJQUVOLENBQUM7SUFFRCw2QkFBVyxHQUFYO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBRXJDLENBQUM7SUFJRCwyQkFBUyxHQUFUO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2pELE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ25ELGtDQUFrQztRQUVsQyxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFHLEVBQUUsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFHLEVBQUcsQ0FBQyxDQUFBLENBQUM7WUFDM0MsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1lBQ2pELEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNqQixDQUFDO1FBQUEsSUFBSSxDQUFBLENBQUM7WUFDRixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxxREFBcUQsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsUUFBUTtnQkFDdkgsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRyxRQUFRLENBQUcsQ0FBQztZQUM5QyxDQUFDLEVBQUUsVUFBQSxLQUFLO2dCQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUcsS0FBSyxDQUFDLENBQUM7WUFDNUMsQ0FBQyxDQUNKLENBQUM7WUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBRXpCLEtBQUssQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDO1lBRXpELElBQUksQ0FBQyxRQUFRLEdBQUUsRUFBRSxDQUFDO1lBQ2xCLElBQUksQ0FBQyxTQUFTLEdBQUMsRUFBRSxDQUFDO1FBQ3RCLENBQUM7SUFDTCxDQUFDO0lBRU0sd0JBQU0sR0FBYjtRQUNJLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBT0wsY0FBQztBQUFELENBQUMsQUE1REQsSUE0REM7QUE1RFksT0FBTztJQUpuQixnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLFNBQVM7UUFDbkIsV0FBVyxFQUFFLHFDQUFxQztLQUNyRCxDQUFDO3FDQVN3QyxpQ0FBd0I7R0FSckQsT0FBTyxDQTREbkI7QUE1RFksMEJBQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgLCBOZ01vZHVsZSAsIE9uRGVzdHJveSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFJvdXRlICwgUm91dGVyLCBOYXZpZ2F0aW9uU3RhcnQsIE5hdmlnYXRpb25FbmQgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBwbGF0Zm9ybU5hdGl2ZVNjcmlwdER5bmFtaWMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcGxhdGZvcm1cIjtcclxuXHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxudmFyIFNxbGl0ZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtc3FsaXRlXCIpO1xyXG52YXIgVG9hc3QgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXRvYXN0XCIpO1xyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwiSW5zZXJ0c1wiLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwidmlld3MvaW5zZXJ0cy9pbnNlcnQtY29tcG9uZW50Lmh0bWxcIixcclxufSlcclxuZXhwb3J0IGNsYXNzIEluc2VydHMgaW1wbGVtZW50cyBPbkRlc3Ryb3kgIHtcclxuICAgIFxyXG4gICAgXHJcbiAgICBwcml2YXRlIGRhdGFiYXNlIDphbnk7XHJcbiAgICBlbmdfd29yZD1cIlwiO1xyXG4gICAgdGhhaV93b3JkPVwiXCI7XHJcblxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlKXtcclxuICAgICAgICBuZXcgU3FsaXRlKFwiZGljdHMuZGJcIikudGhlbihkYiA9PntcclxuICAgICAgICAgICAgdGhpcy5kYXRhYmFzZSA9IGRiO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIk9wZW4gZGF0YWJhc2UgU3VjY2Vzc1wiKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSxlcnJvciA9PntcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJPcGVuIERCIEVSUk9SXCIgLCBlcnJvcik7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkRlc3Ryb3koKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIk5nID09PT4gT25kZXN0cm95XCIpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgYnRuSW5zZXJ0KCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJDaGVjayBjbGljayA9PT5cIik7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJlbmdfd29yZCA9PT09PT0+IFwiICsgdGhpcy5lbmdfd29yZCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ0aGFpX3dvcmQgPT09PT09PiBcIiArIHRoaXMudGhhaV93b3JkKTtcclxuICAgICAgICAvL1RPRE8gaW5zZXJ0IFRoYWlfd29yZCAsIGVuZ193b3JkXHJcblxyXG4gICAgICAgIGlmKHRoaXMuZW5nX3dvcmQgPT1cIlwiIHx8IHRoaXMudGhhaV93b3JkID09XCJcIiApe1xyXG4gICAgICAgICAgICB2YXIgdG9hc3QgPSBUb2FzdC5tYWtlVGV4dChcIuC4oeC4teC4iuC5iOC4reC4h+C4p+C5iOC4suC4h+C4meC4sOC5hOC4reC5ieC5guC4h+C5iFwiKTtcclxuICAgICAgICAgICAgdG9hc3Quc2hvdygpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLmRhdGFiYXNlLmV4ZWNTUUwoXCJJTlNFUlQgSU5UTyBkaWN0IChlbmdXb3JsZCwgdGhhaVdvcmxkKSBWQUxVRVMgKD8sPylcIiwgW3RoaXMuZW5nX3dvcmQgLHRoaXMudGhhaV93b3JkXSkudGhlbihhbGxfd29yZCA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIklOU0VSVCBSRVNVTFQgPT4gXCIgLCBhbGxfd29yZCAgKTtcclxuICAgICAgICAgICAgICAgIH0sIGVycm9yID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIklOU0VSVCBFUlJPUiA9PiBcIiAsIGVycm9yKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJOb3QgRW1wdHlcIik7XHJcblxyXG4gICAgICAgICAgICBhbGVydChcIuC4hOC4uOC4k+C5hOC4lOC5ieC5gOC4nuC4tOC5iOC4oSBcIiArIHRoaXMuZW5nX3dvcmQgKyBcIiDguYDguKPguLXguKLguJrguKPguYnguK3guKLguYHguKXguYnguKdcIik7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmVuZ193b3JkID1cIlwiO1xyXG4gICAgICAgICAgICB0aGlzLnRoYWlfd29yZD1cIlwiOyAgIFxyXG4gICAgICAgIH0gICBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ29CYWNrKCkge1xyXG4gICAgICAgIHRoaXMubmdPbkRlc3Ryb3koKTtcclxuICAgIH0gICBcclxuXHJcblxyXG4gIFxyXG5cclxuICAgIFxyXG5cclxufVxyXG4iXX0=