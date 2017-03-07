"use strict";
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var dialogs = require("ui/dialogs");
var Sqlite = require("nativescript-sqlite");
var ListDetailComponent = (function () {
    function ListDetailComponent(route) {
        var _this = this;
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
            var temp = self.word.wordType;
            self.word.wordType = self.changWordType(temp);
            console.log(self.word.wordType);
            new Sqlite("dicts.db").then(function (db) {
                _this.database = db;
                console.log("Open database Success");
            }, function (error) {
                console.log("Open DB ERROR", error);
            });
        });
    }
    ListDetailComponent.prototype.ngOnInit = function () {
        var self = this;
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
        self.myCheckHistory(word_id);
    };
    ListDetailComponent.prototype.myCheckHistory = function (word_id) {
        var self = this;
        self.database.all("SELECT * FROM HISTORY WHERE word_id = (?)", [word_id]).then(function (rows) {
            if (rows == "") {
                self.myInsertHistory(word_id);
            }
            else {
                self.myDeleteHistory(word_id);
            }
        }, function (error) {
            console.log("SELECT ERROR ", error);
        });
    };
    ListDetailComponent.prototype.myDeleteHistory = function (word_id) {
        var self = this;
        self.database.execSQL("DELETE FROM HISTORY WHERE word_id = (?)", [word_id]).then(function (word_delete) {
            console.log("DELETE RESULT => ", word_delete);
            self.myInsertHistory(word_id);
        }, function (error) {
            console.log("DELETE ERROR => ", error);
        });
    };
    ListDetailComponent.prototype.myInsertHistory = function (word_id) {
        var self = this;
        self.database.execSQL("INSERT INTO HISTORY (word_id) VALUES (?)", [word_id]).then(function (word_insert) {
            console.log("INSERT RESULT => ", word_insert);
        }, function (error) {
            console.log("INSERT ERROR => ", error);
        });
    };
    ListDetailComponent.prototype.fetchJoin = function () {
        var self = this;
        console.log("go to fetch Join ");
        self.database.all("SELECT h.id, h.word_id , d.engWorld , d.thaiWorld , d.type FROM dict d join HISTORY h on d.id = h.word_id ORDER BY h.id DESC").then(function (rows) {
            for (var row in rows) {
                console.log("Result ==v");
                /*for(var i=0 ; i <= rows.length ; i++ ){
                    console.log("result ==>" , rows[row][i]);
                }*/
                console.log("result all ==> ", rows[row]); //result all
            }
        }, function (error) {
            console.log("SELECT ERROR ", error);
        });
    };
    ListDetailComponent.prototype.changWordType = function (arg) {
        console.log("changWordType == v");
        var word = arg;
        var wordIndexOf = word.indexOf("[");
        var wordLastIndexOf = word.lastIndexOf("]");
        console.log("word arg === > ", word);
        console.log("index of ===== > ", wordIndexOf);
        console.log("last Indexof ===== > ", wordLastIndexOf);
        if (wordIndexOf == 1 && wordLastIndexOf != -1) {
            console.log(" true v");
            return word;
        }
        else {
            console.log(" else v ");
            word = "[" + word + "]";
            return word;
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV0YWlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGV0YWlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBa0Q7QUFHbEQsMENBQWlEO0FBR2pELElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUNwQyxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQU01QyxJQUFhLG1CQUFtQjtJQVMzQiw2QkFBMkIsS0FBcUI7UUFBaEQsaUJBa0NBO1FBbEMyQixVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUU3QyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFHaEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLFVBQUEsTUFBTTtZQUN2QyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUUsQ0FBQztZQUNyQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyx1R0FBdUc7WUFFaEosT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUVwQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMs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LEVBQUcsZUFBZSxDQUFDLENBQUM7UUFHdkQsRUFBRSxDQUFBLENBQUMsV0FBVyxJQUFJLENBQUMsSUFBSSxlQUFlLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDO1lBQzFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDdkIsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDO1FBQUEsSUFBSSxDQUFBLENBQUM7WUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRXhCLElBQUksR0FBRyxHQUFHLEdBQUcsSUFBSSxHQUFHLEdBQUcsQ0FBQztZQUN4QixNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2hCLENBQUM7SUFFTCxDQUFDO0lBS0osMEJBQUM7QUFBRCxDQUFDLEFBeExGLElBd0xFO0FBeExXLG1CQUFtQjtJQUovQixnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLFFBQVE7UUFDbEIsV0FBVyxFQUFFLCtCQUErQjtLQUMvQyxDQUFDO3FDQVVxQyx1QkFBYztHQVR4QyxtQkFBbUIsQ0F3TDlCO0FBeExXLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUGFnZVJvdXRlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiOyBcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgSXRlbSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvaXRlbXMvaXRlbVwiO1xyXG5cclxudmFyIGRpYWxvZ3MgPSByZXF1aXJlKFwidWkvZGlhbG9nc1wiKTtcclxudmFyIFNxbGl0ZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtc3FsaXRlXCIpO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJucy1hcHBcIixcclxuICAgIHRlbXBsYXRlVXJsOiBcInZpZXdzL2xpc3QtZGV0YWlsL2RldGFpbC5odG1sXCIsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMaXN0RGV0YWlsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuIFxyXG4gICAgd29yZDpJdGVtOyAgICAgIC8vd29yZCDguJfguLXguYjguYTguJTguYnguKPguLHguJrguYDguILguYnguLLguKHguLLguIjguLLguIEgbHNpdCBtYWluXHJcbiAgICBmYXZvcml0ZSA6IGFueSA7ICAgIC8vIGJ1dHRvbiBvdXRwdXQgc2hvdyBvbiBsYXlvdXRcclxuXHJcblxyXG5cclxuICAgIHByaXZhdGUgZGF0YWJhc2U7IC8vIOC4leC4seC4p+C5geC4m+C4oyBEYXRhYmFzZVxyXG5cclxuICAgICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUpIHtcclxuXHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5yb3V0ZS5xdWVyeVBhcmFtcy5zdWJzY3JpYmUocGFyYW1zID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShwYXJhbXMpICk7XHJcbiAgICAgICAgc2VsZi53b3JkID0gSlNPTi5wYXJzZShwYXJhbXNbXCJ3b3Jkc1wiXSk7IC8vIOC5g+C4q+C5ieC4leC4seC4p+C5geC4m+C4oyBzZWxmLndvcmQg4Lij4Lix4Lia4LiE4LmI4Liy4LiI4Liy4LiBIGxpc3QgbWFpbiDguJTguYnguKfguKLguKPguLnguJsganNvbiDguYLguJTguKLguKrguYjguIfguKHguLLguYPguJnguIrguLfguYjguK0gd29yZHMg4LiU4LmJ4Lin4Lii4LiE4Liz4Liq4Lix4LmI4LiHIHBhcmFtc1tcIndvcmRzXCJdXHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKHNlbGYud29yZC5pZCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coc2VsZi53b3JkLndvcmRFbmcpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHNlbGYud29yZC53b3JkVGhhaSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coc2VsZi53b3JkLndvcmRUeXBlKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhzZWxmLndvcmQud29yZEZhdm9yaXRlKTtcclxuICAgICAgICBcclxuICAgICAgICBzZWxmLmZhdm9yaXRlID0gc2VsZi53b3JkLndvcmRGYXZvcml0ZTsgLy8g4LmD4Lir4LmJIGZhdm9yaXRlID0gXHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHRlbXAgPSBzZWxmLndvcmQud29yZFR5cGU7XHJcbiAgICAgICAgc2VsZi53b3JkLndvcmRUeXBlID0gc2VsZi5jaGFuZ1dvcmRUeXBlKHRlbXApO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHNlbGYud29yZC53b3JkVHlwZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcblxyXG5cclxuICAgICAgICBuZXcgU3FsaXRlKFwiZGljdHMuZGJcIikudGhlbihkYiA9PntcclxuICAgICAgICAgICAgdGhpcy5kYXRhYmFzZSA9IGRiO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIk9wZW4gZGF0YWJhc2UgU3VjY2Vzc1wiKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSxlcnJvciA9PntcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJPcGVuIERCIEVSUk9SXCIgLCBlcnJvcik7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKXtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgc2VsZi5teUhpc3RvcnkoKTtcclxuICAgIH1cclxuXHJcbiAgICBteUZhdm9yaXRlKCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJjbGljayBGYXZvcml0ZVwiKTtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgaWYoc2VsZi5mYXZvcml0ZSA9PSAwICl7XHJcbiAgICAgICAgICAgIHNlbGYuZmF2b3JpdGUgPSAxO1xyXG4gICAgICAgICAgICBzZWxmLmRhdGFiYXNlLmV4ZWNTUUwoXCJVUERBVEUgZGljdCBTRVQgZmF2b3JpdGUgPSAoPykgV0hFUkUgaWQgPSAoPykgXCIgLFtzZWxmLmZhdm9yaXRlICwgc2VsZi53b3JkLmlkXSAsIGZ1bmN0aW9uKGVyciAsIGRiICl7XHJcbiAgICAgICAgICAgIGlmKGVycil7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImVycm9yIGlzID09ID4gXCIgLCBlcnIpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVXBkYXRlIFN1Y2Nlc3NcIik7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9ZWxzZSBpZihzZWxmLmZhdm9yaXRlID09IDEpe1xyXG4gICAgICAgICAgICBzZWxmLmZhdm9yaXRlID0gMCA7XHJcbiAgICAgICAgICAgIHNlbGYuZGF0YWJhc2UuZXhlY1NRTChcIlVQREFURSBkaWN0IFNFVCBmYXZvcml0ZSA9ICg/KSBXSEVSRSBpZCA9ICg/KVwiICxbc2VsZi5mYXZvcml0ZSAsIHNlbGYud29yZC5pZF0gLCBmdW5jdGlvbihlcnIgLCBkYiApe1xyXG4gICAgICAgICAgICAgICAgaWYoZXJyKXtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImVycm9yIGlzID09ID4gXCIgLCBlcnIpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJVcGRhdGUgU3VjY2Vzc1wiKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBteUhpc3RvcnkoKXtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHdvcmRfaWQgPSBzZWxmLndvcmQuaWQ7XHJcbiAgICAgICAgc2VsZi5teUNoZWNrSGlzdG9yeSh3b3JkX2lkKTtcclxuICAgICAgICBcclxuICAgICAgICBcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBteUNoZWNrSGlzdG9yeSh3b3JkX2lkKXtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIHNlbGYuZGF0YWJhc2UuYWxsKFwiU0VMRUNUICogRlJPTSBISVNUT1JZIFdIRVJFIHdvcmRfaWQgPSAoPylcIixbd29yZF9pZF0pLnRoZW4ocm93cyA9PntcclxuICAgICAgICAgICAgaWYocm93cyA9PVwiXCIpe1xyXG4gICAgICAgICAgICAgICAgc2VsZi5teUluc2VydEhpc3Rvcnkod29yZF9pZCk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgc2VsZi5teURlbGV0ZUhpc3Rvcnkod29yZF9pZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LGVycm9yID0+e1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNFTEVDVCBFUlJPUiBcIiAsIGVycm9yKTtcclxuICAgICAgICB9KVxyXG5cclxuXHJcbiAgICAgICAgXHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbXlEZWxldGVIaXN0b3J5KHdvcmRfaWQpe1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgc2VsZi5kYXRhYmFzZS5leGVjU1FMKFwiREVMRVRFIEZST00gSElTVE9SWSBXSEVSRSB3b3JkX2lkID0gKD8pXCIsIFt3b3JkX2lkXSkudGhlbih3b3JkX2RlbGV0ZSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiREVMRVRFIFJFU1VMVCA9PiBcIiAsIHdvcmRfZGVsZXRlICApO1xyXG4gICAgICAgICAgICBzZWxmLm15SW5zZXJ0SGlzdG9yeSh3b3JkX2lkKTtcclxuICAgICAgICAgICAgfSwgZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJERUxFVEUgRVJST1IgPT4gXCIgLCBlcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG5cclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbXlJbnNlcnRIaXN0b3J5KHdvcmRfaWQpe1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBzZWxmLmRhdGFiYXNlLmV4ZWNTUUwoXCJJTlNFUlQgSU5UTyBISVNUT1JZICh3b3JkX2lkKSBWQUxVRVMgKD8pXCIsIFt3b3JkX2lkXSkudGhlbih3b3JkX2luc2VydCA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIklOU0VSVCBSRVNVTFQgPT4gXCIgLCB3b3JkX2luc2VydCAgKTtcclxuICAgICAgICAgICAgICAgIH0sIGVycm9yID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIklOU0VSVCBFUlJPUiA9PiBcIiAsIGVycm9yKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGZldGNoSm9pbigpe1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBjb25zb2xlLmxvZyhcImdvIHRvIGZldGNoIEpvaW4gXCIpO1xyXG5cclxuICAgICAgICBzZWxmLmRhdGFiYXNlLmFsbChcIlNFTEVDVCBoLmlkLCBoLndvcmRfaWQgLCBkLmVuZ1dvcmxkICwgZC50aGFpV29ybGQgLCBkLnR5cGUgRlJPTSBkaWN0IGQgam9pbiBISVNUT1JZIGggb24gZC5pZCA9IGgud29yZF9pZCBPUkRFUiBCWSBoLmlkIERFU0NcIikudGhlbihyb3dzID0+e1xyXG4gICAgICAgICAgICBmb3IodmFyIHJvdyBpbiByb3dzKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUmVzdWx0ID09dlwiKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLypmb3IodmFyIGk9MCA7IGkgPD0gcm93cy5sZW5ndGggOyBpKysgKXtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlc3VsdCA9PT5cIiAsIHJvd3Nbcm93XVtpXSk7IFxyXG4gICAgICAgICAgICAgICAgfSovXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlc3VsdCBhbGwgPT0+IFwiICwgcm93c1tyb3ddKTsvL3Jlc3VsdCBhbGxcclxuICAgICAgICAgICAgICAgIC8qY29uc29sZS5sb2coXCJpZF9IaXN0b3J5ID09PiBcIiAsIHJvd3Nbcm93XVswXSk7IC8vIHJlc3VsdCBlbmdcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwid29yZF9pZCA9PT4gXCIgLCByb3dzW3Jvd11bMV0pOyAvLyByZXN1bHQgZW5nXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImVuZ193b3JkID09PiBcIiAsIHJvd3Nbcm93XVsyXSk7IC8vIHJlc3VsdCBlbmdcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidGhhaV93b3JkID09PiBcIiAsIHJvd3Nbcm93XVszXSk7IC8vcmVzdWx0IHRoYWlcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwid29yZF90eXBlID09PiBcIiAsIHJvd3Nbcm93XVs0XSk7IC8vcmVzdWx0IHRoYWkqL1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxlcnJvciA9PntcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJTRUxFQ1QgRVJST1IgXCIgLCBlcnJvcik7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjaGFuZ1dvcmRUeXBlKGFyZyl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJjaGFuZ1dvcmRUeXBlID09IHZcIik7XHJcbiAgICAgICAgbGV0IHdvcmQgPSBhcmc7XHJcblxyXG4gICAgICAgIGxldCB3b3JkSW5kZXhPZiA9IHdvcmQuaW5kZXhPZihcIltcIik7XHJcbiAgICAgICAgbGV0IHdvcmRMYXN0SW5kZXhPZiA9IHdvcmQubGFzdEluZGV4T2YoXCJdXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwid29yZCBhcmcgPT09ID4gXCIgLCB3b3JkKTtcclxuICAgICAgICBcclxuICAgICAgICBjb25zb2xlLmxvZyhcImluZGV4IG9mID09PT09ID4gXCIgLCB3b3JkSW5kZXhPZik7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJsYXN0IEluZGV4b2YgPT09PT0gPiBcIiAsIHdvcmRMYXN0SW5kZXhPZik7XHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIGlmKHdvcmRJbmRleE9mID09IDEgJiYgd29yZExhc3RJbmRleE9mICE9IC0xKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCIgdHJ1ZSB2XCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gd29yZDtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCIgZWxzZSB2IFwiKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHdvcmQgPSBcIltcIiArIHdvcmQgKyBcIl1cIjtcclxuICAgICAgICAgICAgcmV0dXJuIHdvcmQ7XHJcbiAgICAgICAgfSAgICBcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgIFxyXG5cdCAgXHJcbiAgICBcclxuIH1cclxuIl19