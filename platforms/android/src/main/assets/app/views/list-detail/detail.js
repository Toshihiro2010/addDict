"use strict";
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var dialogs = require("ui/dialogs");
var Sqlite = require("nativescript-sqlite");
var ListDetailComponent = (function () {
    function ListDetailComponent(route) {
        this.route = route;
        var self = this;
        this.route.queryParams.subscribe(function (params) {
            console.log(JSON.stringify(params));
            self.word = JSON.parse(params["words"]); // ให้ตัวแปร self.word รับค่าจาก list main ด้วยรูป json โดยส่งมาในชื่อ words ด้วยคำสั่ง params["words"]
            console.log(self.word.id);
            console.log(self.word.wordEng);
            console.log(self.word.wordThai);
            console.log(self.word.wordType);
            console.log(self.word.wordFavorite);
            self.favorite = self.word.wordFavorite; // ให้ favorite = 
            self.word.wordType = "[" + self.word.wordType + "]";
        });
    }
    ListDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        var self = this;
        new Sqlite("dicts.db").then(function (db) {
            _this.database = db;
            console.log("Open database Success");
        }, function (error) {
            console.log("Open DB ERROR", error);
        });
        self.myHistory();
    };
    ListDetailComponent.prototype.myFavorite = function () {
        console.log("click Favorite");
        var self = this;
        if (self.favorite == 0) {
            self.favorite = 1;
            self.database.execSQL("UPDATE dict SET favorite = (?) WHERE id = (?) ", [self.favorite, self.word.id], function (err, db) {
                if (err) {
                    console.log("error is == > ", err);
                }
                else {
                    console.log("Update Success");
                }
            });
        }
        else if (self.favorite == 1) {
            self.favorite = 0;
            self.database.execSQL("UPDATE dict SET favorite = (?) WHERE id = (?)", [self.favorite, self.word.id], function (err, db) {
                if (err) {
                    console.log("error is == > ", err);
                }
                else {
                    console.log("Update Success");
                }
            });
        }
    };
    ListDetailComponent.prototype.myHistory = function () {
        var self = this;
        var word_id = self.word.id;
        console.log("Method === > ", "myHistory ==== > ==> ", self.word.id);
    };
    ListDetailComponent.prototype.fetchJoin = function () {
        var self = this;
        console.log("go to fetch Join ==== > ");
    };
    return ListDetailComponent;
}());
ListDetailComponent = __decorate([
    core_1.Component({
        selector: "ns-app",
        templateUrl: "views/list-detail/detail.html",
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute])
], ListDetailComponent);
exports.ListDetailComponent = ListDetailComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV0YWlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGV0YWlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBa0Q7QUFHbEQsMENBQWlEO0FBR2pELElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUNwQyxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQU01QyxJQUFhLG1CQUFtQjtJQVMzQiw2QkFBMkIsS0FBcUI7UUFBckIsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFDN0MsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxVQUFBLE1BQU07WUFDdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFFLENBQUM7WUFDckMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsdUdBQXVHO1lBRWhKLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUMxQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFFcEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLGtCQUFrQjtZQUUxRCxJ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UUFDbEIsV0FBVyxFQUFFLCtCQUErQjtLQUMvQyxDQUFDO3FDQVVxQyx1QkFBYztHQVR4QyxtQkFBbUIsQ0FxRjlCO0FBckZXLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUGFnZVJvdXRlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiOyBcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgSXRlbSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvaXRlbXMvaXRlbVwiO1xyXG5cclxudmFyIGRpYWxvZ3MgPSByZXF1aXJlKFwidWkvZGlhbG9nc1wiKTtcclxudmFyIFNxbGl0ZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtc3FsaXRlXCIpO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJucy1hcHBcIixcclxuICAgIHRlbXBsYXRlVXJsOiBcInZpZXdzL2xpc3QtZGV0YWlsL2RldGFpbC5odG1sXCIsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMaXN0RGV0YWlsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuIFxyXG4gICAgd29yZDpJdGVtOyAgICAgIC8vd29yZCDguJfguLXguYjguYTguJTguYnguKPguLHguJrguYDguILguYnguLLguKHguLLguIjguLLguIEgbHNpdCBtYWluXHJcbiAgICBmYXZvcml0ZSA6IGFueSA7ICAgIC8vIGJ1dHRvbiBvdXRwdXQgc2hvdyBvbiBsYXlvdXRcclxuXHJcblxyXG5cclxuICAgIHByaXZhdGUgZGF0YWJhc2U7XHJcblxyXG4gICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICB0aGlzLnJvdXRlLnF1ZXJ5UGFyYW1zLnN1YnNjcmliZShwYXJhbXMgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHBhcmFtcykgKTtcclxuICAgICAgICBzZWxmLndvcmQgPSBKU09OLnBhcnNlKHBhcmFtc1tcIndvcmRzXCJdKTsgLy8g4LmD4Lir4LmJ4LiV4Lix4Lin4LmB4Lib4LijIHNlbGYud29yZCDguKPguLHguJrguITguYjguLLguIjguLLguIEgbGlzdCBtYWluIOC4lOC5ieC4p+C4ouC4o+C4ueC4myBqc29uIOC5guC4lOC4ouC4quC5iOC4h+C4oeC4suC5g+C4meC4iuC4t+C5iOC4rSB3b3JkcyDguJTguYnguKfguKLguITguLPguKrguLHguYjguIcgcGFyYW1zW1wid29yZHNcIl1cclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coc2VsZi53b3JkLmlkKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhzZWxmLndvcmQud29yZEVuZyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coc2VsZi53b3JkLndvcmRUaGFpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhzZWxmLndvcmQud29yZFR5cGUpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHNlbGYud29yZC53b3JkRmF2b3JpdGUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHNlbGYuZmF2b3JpdGUgPSBzZWxmLndvcmQud29yZEZhdm9yaXRlOyAvLyDguYPguKvguYkgZmF2b3JpdGUgPSBcclxuICAgIFxyXG4gICAgICAgIHNlbGYud29yZC53b3JkVHlwZSA9IFwiW1wiICsgc2VsZi53b3JkLndvcmRUeXBlICsgXCJdXCI7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKXtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbmV3IFNxbGl0ZShcImRpY3RzLmRiXCIpLnRoZW4oZGIgPT57XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YWJhc2UgPSBkYjtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJPcGVuIGRhdGFiYXNlIFN1Y2Nlc3NcIik7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0sZXJyb3IgPT57XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiT3BlbiBEQiBFUlJPUlwiICwgZXJyb3IpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHNlbGYubXlIaXN0b3J5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbXlGYXZvcml0ZSgpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiY2xpY2sgRmF2b3JpdGVcIik7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGlmKHNlbGYuZmF2b3JpdGUgPT0gMCApe1xyXG4gICAgICAgICAgICBzZWxmLmZhdm9yaXRlID0gMTtcclxuICAgICAgICAgICAgc2VsZi5kYXRhYmFzZS5leGVjU1FMKFwiVVBEQVRFIGRpY3QgU0VUIGZhdm9yaXRlID0gKD8pIFdIRVJFIGlkID0gKD8pIFwiICxbc2VsZi5mYXZvcml0ZSAsIHNlbGYud29yZC5pZF0gLCBmdW5jdGlvbihlcnIgLCBkYiApe1xyXG4gICAgICAgICAgICBpZihlcnIpe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJlcnJvciBpcyA9PSA+IFwiICwgZXJyKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVwZGF0ZSBTdWNjZXNzXCIpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfWVsc2UgaWYoc2VsZi5mYXZvcml0ZSA9PSAxKXtcclxuICAgICAgICAgICAgc2VsZi5mYXZvcml0ZSA9IDAgO1xyXG4gICAgICAgICAgICBzZWxmLmRhdGFiYXNlLmV4ZWNTUUwoXCJVUERBVEUgZGljdCBTRVQgZmF2b3JpdGUgPSAoPykgV0hFUkUgaWQgPSAoPylcIiAsW3NlbGYuZmF2b3JpdGUgLCBzZWxmLndvcmQuaWRdICwgZnVuY3Rpb24oZXJyICwgZGIgKXtcclxuICAgICAgICAgICAgICAgIGlmKGVycil7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJlcnJvciBpcyA9PSA+IFwiICwgZXJyKTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVXBkYXRlIFN1Y2Nlc3NcIik7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbXlIaXN0b3J5KCl7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCB3b3JkX2lkID0gc2VsZi53b3JkLmlkO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTWV0aG9kID09PSA+IFwiICwgXCJteUhpc3RvcnkgPT09PSA+ID09PiBcIiAsIHNlbGYud29yZC5pZCk7XHJcbiAgICAgICAgXHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZmV0Y2hKb2luKCl7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZ28gdG8gZmV0Y2ggSm9pbiA9PT09ID4gXCIpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgXHJcblx0ICBcclxuICAgIFxyXG4gfVxyXG4iXX0=