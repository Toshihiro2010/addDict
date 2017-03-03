"use strict";
var core_1 = require("@angular/core");
var item_1 = require("./../../models/items/item");
var Sqlite = require("nativescript-sqlite");
var Toast = require("nativescript-toast");
var HistoryComponent = (function () {
    function HistoryComponent() {
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
    return HistoryComponent;
}());
HistoryComponent = __decorate([
    core_1.Component({
        selector: "ng-app",
        templateUrl: "views/history/history-component.html",
    }),
    __metadata("design:paramtypes", [])
], HistoryComponent);
exports.HistoryComponent = HistoryComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlzdG9yeS1jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJoaXN0b3J5LWNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQW1EO0FBRW5ELGtEQUFpRDtBQUVqRCxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQUM1QyxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQU0xQyxJQUFhLGdCQUFnQjtJQVd6QjtRQVJRLGFBQVEsR0FBRSxFQUFFLENBQUMsQ0FBQyxpQkFBaUI7UUFHL0IsY0FBUyxHQUFHLEVBQUUsQ0FBQyxDQUFDLHVCQUF1QjtRQU0zQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsRUFBRTtZQUMxQixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztZQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUM7WUFDckMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3RCLENBQUMsRUFBQyxVQUFBLEtBQUs7WUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRyxLQUFLLENBQUMsQ0FBQztRQUN6QyxDQUFDLENBQUMsQ0FBQTtJQUlOLENBQUM7SUFFTyxxQ0FBVSxHQUFsQjtRQUNJLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUNoQixJQUFJLE1BQU0sR0FBRywySUFBMkksQ0FBQztRQUN6SixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxNQUFNO1lBQ2pDLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDO1FBQzNCLENBQUMsRUFBQyxVQUFBLEtBQUs7WUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLDBCQUEwQixFQUFHLEtBQUssQ0FBQyxDQUFDO1FBRXBELENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVELG1DQUFRLEdBQVI7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBRW5DLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUNWLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRVUsa0NBQU8sR0FBZjtRQUNJLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUNoQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBRXpCLEdBQUcsQ0FBQSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFBLENBQUM7WUFDakIsSUFBSSxVQUFVLEdBQVUsSUFBSSxXQUFJLEVBQUUsQ0FBQztZQUVuQyxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzdDLFVBQVUsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdCLFVBQVUsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUN4QyxVQUFVLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7WUFDekMsVUFBVSxDQUFDLFFBQVEsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztZQUNqRCxVQUFVLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUV2QyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNwQyxDQUFDO0lBR0wsQ0FBQztJQUlMLHVCQUFDO0FBQUQsQ0FBQyxBQWpFRCxJQWlFQztBQWpFWSxnQkFBZ0I7SUFKNUIsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxRQUFRO1FBQ2xCLFdBQVcsRUFBRSxzQ0FBc0M7S0FDdEQsQ0FBQzs7R0FDVyxnQkFBZ0IsQ0FpRTVCO0FBakVZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCAsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFJvdXRlIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBJdGVtIH0gZnJvbSBcIi4vLi4vLi4vbW9kZWxzL2l0ZW1zL2l0ZW1cIjtcclxuXHJcbnZhciBTcWxpdGUgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXNxbGl0ZVwiKTtcclxudmFyIFRvYXN0ID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC10b2FzdFwiKTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwibmctYXBwXCIsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCJ2aWV3cy9oaXN0b3J5L2hpc3RvcnktY29tcG9uZW50Lmh0bWxcIixcclxufSlcclxuZXhwb3J0IGNsYXNzIEhpc3RvcnlDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICAgIHByaXZhdGUgZGF0YWJhc2U7XHJcbiAgICBwcml2YXRlIHdvcmRfc3FsID1bXTsgLy8gb3V0IHB1dCBvbiBzcWxcclxuXHJcblxyXG4gICAgcHJpdmF0ZSBzaG93X2xpc3QgPSBbXTsgLy8gc2hvdyBsaXN0IG9uIGxheW91dHNcclxuICAgIFxyXG4gICAgXHJcblxyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBuZXcgU3FsaXRlKFwiZGljdHMuZGJcIikudGhlbihkYiA9PntcclxuICAgICAgICAgICAgc2VsZi5kYXRhYmFzZSA9IGRiO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIk9wZW4gZGF0YWJhc2UgU3VjY2Vzc1wiKTtcclxuICAgICAgICAgICAgc2VsZi5teVNxbGZldGNoKCk7XHJcbiAgICAgICAgfSxlcnJvciA9PntcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJPcGVuIERCIEVSUk9SXCIgLCBlcnJvcik7XHJcbiAgICAgICAgfSlcclxuICAgIFxyXG4gICAgICAgIFxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG15U3FsZmV0Y2goKXtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHN0clNRTCA9IFwiU0VMRUNUIGguaWQsIGgud29yZF9pZCAsIGQuZW5nV29ybGQgLCBkLnRoYWlXb3JsZCAsIGQudHlwZSAsIGQuZmF2b3JpdGUgRlJPTSBISVNUT1JZIGggam9pbiBkaWN0IGQgb24gaC53b3JkX2lkID0gZC5pZCBPUkRFUiBCWSBoLmlkIERFU0NcIjtcclxuICAgICAgICBzZWxmLmRhdGFiYXNlLmFsbChzdHJTUUwpLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgc2VsZi53b3JkX3NxbCA9IHJlc3VsdDtcclxuICAgICAgICB9LGVycm9yID0+e1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNFTEVDVCBIaXN0b3J5IEVycm9yID0+IFwiICwgZXJyb3IpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwibmdPbkluaXQgPT0gdlwiKTtcclxuICAgICAgICBcclxuXHRcdGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBzZWxmLnNldExpc3QoKTtcclxuXHR9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRMaXN0KCl7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCB3b3JkID0gc2VsZi53b3JkX3NxbDtcclxuICAgICAgICBcclxuICAgICAgICBmb3IodmFyIHJvdyBpbiB3b3JkKXsgXHJcbiAgICAgICAgICAgIGxldCBtb2RlbF9pdGVtIDogSXRlbSA9IG5ldyBJdGVtKCk7ICAgICAgIFxyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ3b3JkIG9uIHNldCBsaXN0IFwiICwgd29yZFtyb3ddKTtcclxuICAgICAgICAgICAgbW9kZWxfaXRlbS5pZCA9IHdvcmRbcm93XVsxXTtcclxuICAgICAgICAgICAgbW9kZWxfaXRlbS53b3JkRW5nID0gd29yZFtyb3ddWzJdICsgXCIgXCI7XHJcbiAgICAgICAgICAgIG1vZGVsX2l0ZW0ud29yZFRoYWkgPSB3b3JkW3Jvd11bM10gKyBcIiBcIjtcclxuICAgICAgICAgICAgbW9kZWxfaXRlbS53b3JkVHlwZSA9IFwiIFtcIiArIHdvcmRbcm93XVs0XSArIFwiXSBcIjtcclxuICAgICAgICAgICAgbW9kZWxfaXRlbS53b3JkRmF2b3JpdGUgPSB3b3JkW3Jvd11bNV07XHJcblxyXG4gICAgICAgICAgICBzZWxmLnNob3dfbGlzdC5wdXNoKG1vZGVsX2l0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuXHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG59XHJcbiJdfQ==