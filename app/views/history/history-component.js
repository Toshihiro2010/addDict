"use strict";
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var item_1 = require("./../../models/items/item");
var Sqlite = require("nativescript-sqlite");
var Toast = require("nativescript-toast");
var HistoryComponent = (function () {
    function HistoryComponent(router) {
        this.router = router;
        this.word_sql = []; // out put on sqllite
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
    HistoryComponent.prototype.mySqlfetch = function () {
        var self = this;
        var strSQL = "SELECT h.id, h.word_id , d.engWorld , d.thaiWorld , d.type , d.favorite FROM HISTORY h join dict d on h.word_id = d.id ORDER BY h.id DESC";
        self.database.all(strSQL).then(function (result) {
            self.word_sql = result;
        }, function (error) {
            console.log("SELECT History Error => ", error);
        });
    };
    HistoryComponent.prototype.ngOnInit = function () {
        console.log("ngOnInit == v");
        var self = this;
        self.setList();
    };
    HistoryComponent.prototype.setList = function () {
        var self = this;
        var word = self.word_sql;
        for (var row in word) {
            var model_item = new item_1.Item();
            console.log("word on set list ", word[row]);
            model_item.id = word[row][1];
            model_item.wordEng = word[row][2] + " ";
            model_item.wordThai = word[row][3] + " ";
            model_item.wordType = " [" + word[row][4] + "] ";
            model_item.wordFavorite = word[row][5];
            self.show_list.push(model_item);
        }
    };
    HistoryComponent.prototype.onItemTap = function (args) {
        var self = this;
        var word = self.show_list[args.index];
        var navigationExtras = {
            queryParams: {
                "words": JSON.stringify(word)
            }
        };
        this.router.navigate(["list-detail"], navigationExtras);
    };
    return HistoryComponent;
}());
HistoryComponent = __decorate([
    core_1.Component({
        selector: "ng-app",
        templateUrl: "views/history/history-component.html",
    }),
    __metadata("design:paramtypes", [router_1.Router])
], HistoryComponent);
exports.HistoryComponent = HistoryComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlzdG9yeS1jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJoaXN0b3J5LWNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQW1EO0FBQ25ELDBDQUE0RDtBQUM1RCxrREFBaUQ7QUFHakQsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFDNUMsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFNMUMsSUFBYSxnQkFBZ0I7SUFXekIsMEJBQW9CLE1BQWM7UUFBZCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBUjFCLGFBQVEsR0FBRSxFQUFFLENBQUMsQ0FBQyxxQkFBcUI7UUFHbkMsY0FBUyxHQUFHLEVBQUUsQ0FBQyxDQUFDLHVCQUF1QjtRQU0zQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsRUFBRTtZQUMxQixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztZQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUM7WUFDckMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3RCLENBQUMsRUFBQyxVQUFBLEtBQUs7WUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRyxLQUFLLENBQUMsQ0FBQztRQUN6QyxDQUFDLENBQUMsQ0FBQTtJQUlOLENBQUM7SUFFTyxxQ0FBVSxHQUFsQjtRQUNJLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUNoQixJQUFJLE1BQU0sR0FBRywySUFBMkksQ0FBQztRQUN6SixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxNQUFNO1lBQ2pDLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDO1FBQzNCLENBQUMsRUFBQyxVQUFBLEtBQUs7WUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLDBCQUEwQixFQUFHLEtBQUssQ0FBQyxDQUFDO1FBRXBELENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVELG1DQUFRLEdBQVI7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBRW5DLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUNWLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRVUsa0NBQU8sR0FBZjtRQUNJLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUNoQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBRXpCLEdBQUcsQ0FBQSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFBLENBQUM7WUFDakIsSUFBSSxVQUFVLEdBQVUsSUFBSSxXQUFJLEVBQUUsQ0FBQztZQUVuQyxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzdDLFVBQVUsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdCLFVBQVUsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUN4QyxVQUFVLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7WUFDekMsVUFBVSxDQUFDLFFBQVEsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztZQUNqRCxVQUFVLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUV2QyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNwQyxDQUFDO0lBR0wsQ0FBQztJQUVELG9DQUFTLEdBQVQsVUFBVSxJQUFJO1FBQ2hCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUNoQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVoQyxJQUFJLGdCQUFnQixHQUFxQjtZQUNyQyxXQUFXLEVBQUU7Z0JBQ1QsT0FBTyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO2FBQ2hDO1NBQ0osQ0FBQztRQUNGLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsYUFBYSxDQUFDLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBSUwsdUJBQUM7QUFBRCxDQUFDLEFBN0VELElBNkVDO0FBN0VZLGdCQUFnQjtJQUo1QixnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLFFBQVE7UUFDbEIsV0FBVyxFQUFFLHNDQUFzQztLQUN0RCxDQUFDO3FDQVk4QixlQUFNO0dBWHpCLGdCQUFnQixDQTZFNUI7QUE3RVksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50ICwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUm91dGVyICwgTmF2aWdhdGlvbkV4dHJhcyB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjsgXHJcbmltcG9ydCB7IEl0ZW0gfSBmcm9tIFwiLi8uLi8uLi9tb2RlbHMvaXRlbXMvaXRlbVwiO1xyXG5cclxuXHJcbnZhciBTcWxpdGUgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXNxbGl0ZVwiKTtcclxudmFyIFRvYXN0ID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC10b2FzdFwiKTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwibmctYXBwXCIsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCJ2aWV3cy9oaXN0b3J5L2hpc3RvcnktY29tcG9uZW50Lmh0bWxcIixcclxufSlcclxuZXhwb3J0IGNsYXNzIEhpc3RvcnlDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICAgIHByaXZhdGUgZGF0YWJhc2U7XHJcbiAgICBwcml2YXRlIHdvcmRfc3FsID1bXTsgLy8gb3V0IHB1dCBvbiBzcWxsaXRlXHJcblxyXG5cclxuICAgIHByaXZhdGUgc2hvd19saXN0ID0gW107IC8vIHNob3cgbGlzdCBvbiBsYXlvdXRzXHJcbiAgICBcclxuICAgIFxyXG5cclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlcil7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIG5ldyBTcWxpdGUoXCJkaWN0cy5kYlwiKS50aGVuKGRiID0+e1xyXG4gICAgICAgICAgICBzZWxmLmRhdGFiYXNlID0gZGI7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiT3BlbiBkYXRhYmFzZSBTdWNjZXNzXCIpO1xyXG4gICAgICAgICAgICBzZWxmLm15U3FsZmV0Y2goKTtcclxuICAgICAgICB9LGVycm9yID0+e1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIk9wZW4gREIgRVJST1JcIiAsIGVycm9yKTtcclxuICAgICAgICB9KVxyXG4gICAgXHJcbiAgICAgICAgXHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbXlTcWxmZXRjaCgpe1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgc3RyU1FMID0gXCJTRUxFQ1QgaC5pZCwgaC53b3JkX2lkICwgZC5lbmdXb3JsZCAsIGQudGhhaVdvcmxkICwgZC50eXBlICwgZC5mYXZvcml0ZSBGUk9NIEhJU1RPUlkgaCBqb2luIGRpY3QgZCBvbiBoLndvcmRfaWQgPSBkLmlkIE9SREVSIEJZIGguaWQgREVTQ1wiO1xyXG4gICAgICAgIHNlbGYuZGF0YWJhc2UuYWxsKHN0clNRTCkudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICBzZWxmLndvcmRfc3FsID0gcmVzdWx0O1xyXG4gICAgICAgIH0sZXJyb3IgPT57XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU0VMRUNUIEhpc3RvcnkgRXJyb3IgPT4gXCIgLCBlcnJvcik7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJuZ09uSW5pdCA9PSB2XCIpO1xyXG4gICAgICAgIFxyXG5cdFx0bGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHNlbGYuc2V0TGlzdCgpO1xyXG5cdH1cclxuXHJcbiAgICBwcml2YXRlIHNldExpc3QoKXtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHdvcmQgPSBzZWxmLndvcmRfc3FsO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGZvcih2YXIgcm93IGluIHdvcmQpeyBcclxuICAgICAgICAgICAgbGV0IG1vZGVsX2l0ZW0gOiBJdGVtID0gbmV3IEl0ZW0oKTsgICAgICAgXHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIndvcmQgb24gc2V0IGxpc3QgXCIgLCB3b3JkW3Jvd10pO1xyXG4gICAgICAgICAgICBtb2RlbF9pdGVtLmlkID0gd29yZFtyb3ddWzFdO1xyXG4gICAgICAgICAgICBtb2RlbF9pdGVtLndvcmRFbmcgPSB3b3JkW3Jvd11bMl0gKyBcIiBcIjtcclxuICAgICAgICAgICAgbW9kZWxfaXRlbS53b3JkVGhhaSA9IHdvcmRbcm93XVszXSArIFwiIFwiO1xyXG4gICAgICAgICAgICBtb2RlbF9pdGVtLndvcmRUeXBlID0gXCIgW1wiICsgd29yZFtyb3ddWzRdICsgXCJdIFwiO1xyXG4gICAgICAgICAgICBtb2RlbF9pdGVtLndvcmRGYXZvcml0ZSA9IHdvcmRbcm93XVs1XTtcclxuXHJcbiAgICAgICAgICAgIHNlbGYuc2hvd19saXN0LnB1c2gobW9kZWxfaXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG5cclxuICAgIH1cclxuXHJcbiAgICBvbkl0ZW1UYXAoYXJncykge1xyXG5cdFx0bGV0IHNlbGYgPSB0aGlzO1xyXG5cdFx0bGV0IHdvcmQgPSBzZWxmLnNob3dfbGlzdFthcmdzLmluZGV4XTtcclxuXHJcbiAgICAgICAgbGV0IG5hdmlnYXRpb25FeHRyYXM6IE5hdmlnYXRpb25FeHRyYXMgPSB7XHJcbiAgICAgICAgICAgIHF1ZXJ5UGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICBcIndvcmRzXCI6IEpTT04uc3RyaW5naWZ5KHdvcmQpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcImxpc3QtZGV0YWlsXCJdLCBuYXZpZ2F0aW9uRXh0cmFzKTtcclxuICAgIH1cclxuXHJcbiAgICBcclxuXHJcbn1cclxuIl19