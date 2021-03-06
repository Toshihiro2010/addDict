"use strict";
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var item_1 = require("./../../models/items/item");
var Sqlite = require("nativescript-sqlite");
var Toast = require("nativescript-toast");
var FavoriteComponent = (function () {
    function FavoriteComponent(router) {
        this.router = router;
        this.word_sql = []; // out put on sql
        this.show_list = []; // show list on layouts
        var self = this;
        new Sqlite("dicts.db").then(function (db) {
            self.database = db;
            console.log("Open database Success");
            self.mySqlfetch();
        }, function (error) {
            console.log("Open DB ERROR", error);
        });
    }
    FavoriteComponent.prototype.mySqlfetch = function () {
        var self = this;
        var strSQL = "SELECT * FROM dict WHERE favorite = 1";
        self.database.all(strSQL).then(function (result) {
            self.word_sql = result;
        }, function (error) {
            console.log("SELECT Favoirite Error => ", error);
        });
    };
    FavoriteComponent.prototype.ngOnInit = function () {
        console.log("ngOnInit == v");
        var self = this;
        self.setList();
    };
    FavoriteComponent.prototype.setList = function () {
        var self = this;
        var word = self.word_sql;
        for (var row in word) {
            var model_item = new item_1.Item();
            console.log("word on set list ", word[row]);
            model_item.id = word[row][0];
            model_item.wordEng = word[row][1] + " ";
            model_item.wordThai = word[row][2] + " ";
            model_item.wordType = " [" + word[row][3] + "] ";
            model_item.wordFavorite = word[row][4];
            self.show_list.push(model_item);
        }
    };
    FavoriteComponent.prototype.onItemTap = function (args) {
        var self = this;
        var word = self.show_list[args.index];
        var navigationExtras = {
            queryParams: {
                "words": JSON.stringify(word)
            }
        };
        this.router.navigate(["list-detail"], navigationExtras);
    };
    return FavoriteComponent;
}());
FavoriteComponent = __decorate([
    core_1.Component({
        selector: "favorite",
        templateUrl: "views/favorite/favorite-component.html",
    }),
    __metadata("design:paramtypes", [router_1.Router])
], FavoriteComponent);
exports.FavoriteComponent = FavoriteComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmF2b3JpdGUtY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmF2b3JpdGUtY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBbUQ7QUFDbkQsMENBQTREO0FBQzVELGtEQUFpRDtBQUVqRCxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQUM1QyxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQU8xQyxJQUFhLGlCQUFpQjtJQVMxQiwyQkFBcUIsTUFBZTtRQUFmLFdBQU0sR0FBTixNQUFNLENBQVM7UUFONUIsYUFBUSxHQUFFLEVBQUUsQ0FBQyxDQUFDLGlCQUFpQjtRQUMvQixjQUFTLEdBQUcsRUFBRSxDQUFDLENBQUMsdUJBQXVCO1FBTTNDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUNoQixJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxFQUFFO1lBQzFCLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1lBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQztZQUNyQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDdEIsQ0FBQyxFQUFDLFVBQUEsS0FBSztZQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFHLEtBQUssQ0FBQyxDQUFDO1FBQ3pDLENBQUMsQ0FBQyxDQUFBO0lBSU4sQ0FBQztJQUVPLHNDQUFVLEdBQWxCO1FBQ0ksSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLElBQUksTUFBTSxHQUFHLHVDQUF1QyxDQUFDO1FBQ3JELElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLE1BQU07WUFDakMsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUM7UUFDM0IsQ0FBQyxFQUFDLFVBQUEsS0FBSztZQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLEVBQUcsS0FBSyxDQUFDLENBQUM7UUFFdEQsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRUQsb0NBQVEsR0FBUjtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7UUFFbkMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ1YsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFVSxtQ0FBTyxHQUFmO1FBQ0ksSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFFekIsR0FBRyxDQUFBLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLENBQUEsQ0FBQztZQUNqQixJQUFJLFVBQVUsR0FBVSxJQUFJLFdBQUksRUFBRSxDQUFDO1lBRW5DLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDN0MsVUFBVSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0IsVUFBVSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQ3hDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUN6QyxVQUFVLENBQUMsUUFBUSxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBQ2pELFVBQVUsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXZDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3BDLENBQUM7SUFDTCxDQUFDO0lBRUQscUNBQVMsR0FBVCxVQUFVLElBQUk7UUFDaEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRWhDLElBQUksZ0JBQWdCLEdBQXFCO1lBQ3JDLFdBQVcsRUFBRTtnQkFDVCxPQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7YUFDaEM7U0FDSixDQUFDO1FBQ0YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxhQUFhLENBQUMsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFJTCx3QkFBQztBQUFELENBQUMsQUF6RUQsSUF5RUM7QUF6RVksaUJBQWlCO0lBSjdCLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsVUFBVTtRQUNwQixXQUFXLEVBQUUsd0NBQXdDO0tBQ3hELENBQUM7cUNBVWdDLGVBQU07R0FUM0IsaUJBQWlCLENBeUU3QjtBQXpFWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgLCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXIgLCBOYXZpZ2F0aW9uRXh0cmFzIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBJdGVtIH0gZnJvbSBcIi4vLi4vLi4vbW9kZWxzL2l0ZW1zL2l0ZW1cIjtcclxuXHJcbnZhciBTcWxpdGUgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXNxbGl0ZVwiKTtcclxudmFyIFRvYXN0ID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC10b2FzdFwiKTtcclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcImZhdm9yaXRlXCIsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCJ2aWV3cy9mYXZvcml0ZS9mYXZvcml0ZS1jb21wb25lbnQuaHRtbFwiLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgRmF2b3JpdGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgXHJcbiAgICBwcml2YXRlIGRhdGFiYXNlO1xyXG4gICAgcHJpdmF0ZSB3b3JkX3NxbCA9W107IC8vIG91dCBwdXQgb24gc3FsXHJcbiAgICBwcml2YXRlIHNob3dfbGlzdCA9IFtdOyAvLyBzaG93IGxpc3Qgb24gbGF5b3V0c1xyXG4gICAgXHJcbiAgICBcclxuXHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKCBwcml2YXRlIHJvdXRlciA6IFJvdXRlcil7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIG5ldyBTcWxpdGUoXCJkaWN0cy5kYlwiKS50aGVuKGRiID0+e1xyXG4gICAgICAgICAgICBzZWxmLmRhdGFiYXNlID0gZGI7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiT3BlbiBkYXRhYmFzZSBTdWNjZXNzXCIpO1xyXG4gICAgICAgICAgICBzZWxmLm15U3FsZmV0Y2goKTtcclxuICAgICAgICB9LGVycm9yID0+e1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIk9wZW4gREIgRVJST1JcIiAsIGVycm9yKTtcclxuICAgICAgICB9KVxyXG4gICAgXHJcbiAgICAgICAgXHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbXlTcWxmZXRjaCgpe1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgc3RyU1FMID0gXCJTRUxFQ1QgKiBGUk9NIGRpY3QgV0hFUkUgZmF2b3JpdGUgPSAxXCI7XHJcbiAgICAgICAgc2VsZi5kYXRhYmFzZS5hbGwoc3RyU1FMKS50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgIHNlbGYud29yZF9zcWwgPSByZXN1bHQ7XHJcbiAgICAgICAgfSxlcnJvciA9PntcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJTRUxFQ1QgRmF2b2lyaXRlIEVycm9yID0+IFwiICwgZXJyb3IpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwibmdPbkluaXQgPT0gdlwiKTtcclxuICAgICAgICBcclxuXHRcdGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBzZWxmLnNldExpc3QoKTtcclxuXHR9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRMaXN0KCl7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCB3b3JkID0gc2VsZi53b3JkX3NxbDtcclxuICAgICAgICBcclxuICAgICAgICBmb3IodmFyIHJvdyBpbiB3b3JkKXsgXHJcbiAgICAgICAgICAgIGxldCBtb2RlbF9pdGVtIDogSXRlbSA9IG5ldyBJdGVtKCk7ICAgICAgIFxyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ3b3JkIG9uIHNldCBsaXN0IFwiICwgd29yZFtyb3ddKTtcclxuICAgICAgICAgICAgbW9kZWxfaXRlbS5pZCA9IHdvcmRbcm93XVswXTtcclxuICAgICAgICAgICAgbW9kZWxfaXRlbS53b3JkRW5nID0gd29yZFtyb3ddWzFdICsgXCIgXCI7XHJcbiAgICAgICAgICAgIG1vZGVsX2l0ZW0ud29yZFRoYWkgPSB3b3JkW3Jvd11bMl0gKyBcIiBcIjtcclxuICAgICAgICAgICAgbW9kZWxfaXRlbS53b3JkVHlwZSA9IFwiIFtcIiArIHdvcmRbcm93XVszXSArIFwiXSBcIjtcclxuICAgICAgICAgICAgbW9kZWxfaXRlbS53b3JkRmF2b3JpdGUgPSB3b3JkW3Jvd11bNF07XHJcblxyXG4gICAgICAgICAgICBzZWxmLnNob3dfbGlzdC5wdXNoKG1vZGVsX2l0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkl0ZW1UYXAoYXJncykge1xyXG5cdFx0bGV0IHNlbGYgPSB0aGlzO1xyXG5cdFx0bGV0IHdvcmQgPSBzZWxmLnNob3dfbGlzdFthcmdzLmluZGV4XTtcclxuXHJcbiAgICAgICAgbGV0IG5hdmlnYXRpb25FeHRyYXM6IE5hdmlnYXRpb25FeHRyYXMgPSB7XHJcbiAgICAgICAgICAgIHF1ZXJ5UGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICBcIndvcmRzXCI6IEpTT04uc3RyaW5naWZ5KHdvcmQpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcImxpc3QtZGV0YWlsXCJdLCBuYXZpZ2F0aW9uRXh0cmFzKTtcclxuICAgIH1cclxuXHJcbiAgICBcclxuXHJcbn1cclxuIl19