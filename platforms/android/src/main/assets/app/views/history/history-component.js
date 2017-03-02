"use strict";
var core_1 = require("@angular/core");
var Sqlite = require("nativescript-sqlite");
var Toast = require("nativescript-toast");
var HistoryComponent = (function () {
    function HistoryComponent() {
        var _this = this;
        new Sqlite("dicts.db").then(function (db) {
            _this.database = db;
            console.log("Open database Success");
        }, function (error) {
            console.log("Open DB ERROR", error);
        });
    }
    HistoryComponent.prototype.ngOnInit = function () {
        var self = this;
        var strSQL = "SELECT h.id, h.word_id , d.engWorld , d.thaiWorld , d.type FROM HISTORY h join dict d on h.word_id = d.id ORDER BY h.id DESC";
        self.database.all(strSQL).then(function (result) {
            self.word_sql = result;
            for (var row in result) {
                console.log("result all ===> ", result[row]); // result all
            }
        }, function (error) {
            console.log("SELECT History Error => ", error);
        });
        self.getItem();
    };
    HistoryComponent.prototype.getItem = function () {
        var self = this;
        var word_sql = self.word_sql;
        console.log(word_sql[0]);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlzdG9yeS1jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJoaXN0b3J5LWNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQW1EO0FBSW5ELElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0FBQzVDLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBTTFDLElBQWEsZ0JBQWdCO0lBU3pCO1FBQUEsaUJBU0M7UUFSRyxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxFQUFFO1lBQzFCLEtBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1lBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUV6QyxDQUFDLEVBQUMsVUFBQSxLQUFLO1lBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUcsS0FBSyxDQUFDLENBQUM7UUFDekMsQ0FBQyxDQUFDLENBQUE7SUFFTixDQUFDO0lBRUQsbUNBQVEsR0FBUjtRQUNGLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUNWLElBQUksTUFBTSxHQUFHLDhIQUE4SCxDQUFDO1FBQzVJLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLE1BQU07WUFDakMsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUM7WUFDdkIsR0FBRyxDQUFBLENBQUMsSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLENBQUEsQ0FBQztnQkFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBLGFBQWE7WUFFL0QsQ0FBQztRQUNMLENBQUMsRUFBQyxVQUFBLEtBQUs7WUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLDBCQUEwQixFQUFHLEtBQUssQ0FBQyxDQUFDO1FBRXBELENBQUMsQ0FBQyxDQUFBO1FBQ1IsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRSxrQ0FBTyxHQUFQO1FBQ0YsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ1YsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUM3QixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBR2hDLENBQUM7SUFJRix1QkFBQztBQUFELENBQUMsQUE5Q0QsSUE4Q0M7QUE5Q1ksZ0JBQWdCO0lBSjVCLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsUUFBUTtRQUNsQixXQUFXLEVBQUUsc0NBQXNDO0tBQ3RELENBQUM7O0dBQ1csZ0JBQWdCLENBOEM1QjtBQTlDWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgLCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgSXRlbSB9IGZyb20gXCIuLy4uLy4uL21vZGVscy9pdGVtcy9pdGVtXCI7XHJcblxyXG52YXIgU3FsaXRlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1zcWxpdGVcIik7XHJcbnZhciBUb2FzdCA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtdG9hc3RcIik7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcIm5nLWFwcFwiLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwidmlld3MvaGlzdG9yeS9oaXN0b3J5LWNvbXBvbmVudC5odG1sXCIsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBIaXN0b3J5Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgICBwcml2YXRlIGRhdGFiYXNlO1xyXG4gICAgcHJpdmF0ZSB3b3JkX3NxbCA6c3RyaW5nOyAvLyBvdXQgcHV0IG9uIHNxbFxyXG5cclxuXHJcbiAgICBwcml2YXRlIHNob3dfbGlzdDsgLy8gc2hvdyBsaXN0IG9uIGxheW91dFxyXG5cclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBuZXcgU3FsaXRlKFwiZGljdHMuZGJcIikudGhlbihkYiA9PntcclxuICAgICAgICAgICAgdGhpcy5kYXRhYmFzZSA9IGRiO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIk9wZW4gZGF0YWJhc2UgU3VjY2Vzc1wiKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSxlcnJvciA9PntcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJPcGVuIERCIEVSUk9SXCIgLCBlcnJvcik7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcblx0XHRsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHN0clNRTCA9IFwiU0VMRUNUIGguaWQsIGgud29yZF9pZCAsIGQuZW5nV29ybGQgLCBkLnRoYWlXb3JsZCAsIGQudHlwZSBGUk9NIEhJU1RPUlkgaCBqb2luIGRpY3QgZCBvbiBoLndvcmRfaWQgPSBkLmlkIE9SREVSIEJZIGguaWQgREVTQ1wiO1xyXG4gICAgICAgIHNlbGYuZGF0YWJhc2UuYWxsKHN0clNRTCkudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICBzZWxmLndvcmRfc3FsID0gcmVzdWx0O1xyXG4gICAgICAgICAgICBmb3IodmFyIHJvdyBpbiByZXN1bHQpe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZXN1bHQgYWxsID09PT4gXCIgLCByZXN1bHRbcm93XSk7Ly8gcmVzdWx0IGFsbFxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LGVycm9yID0+e1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNFTEVDVCBIaXN0b3J5IEVycm9yID0+IFwiICwgZXJyb3IpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9KVxyXG5cdFx0c2VsZi5nZXRJdGVtKCk7XHJcblx0fVxyXG5cclxuICAgIGdldEl0ZW0oKXtcclxuXHRcdGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgd29yZF9zcWwgPSBzZWxmLndvcmRfc3FsO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHdvcmRfc3FsWzBdKTtcclxuXHJcblxyXG5cdH1cclxuXHJcbiAgICBcclxuXHJcbn1cclxuIl19