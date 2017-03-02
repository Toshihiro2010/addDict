"use strict";
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var Sqlite = require("nativescript-sqlite");
var ViewComponent = (function () {
    function ViewComponent(router) {
        var _this = this;
        this.router = router;
        this.word_search = "";
        //Code ตอนที่ไม่มีอะไรเลย เริ่มสร้างจาก 1
        (new Sqlite("dicts.db")).then(function (db) {
            db.execSQL("CREATE TABLE IF NOT EXISTS dict (id INTEGER PRIMARY KEY AUTOINCREMENT, engWorld TEXT, thaiWorld TEXT ,type TEXT DEFAULT 'Noun' , sTime DATE DEFAULT Null )").then(function (id) {
                _this.database = db;
                console.log("CREAT TABLE ===> Success ");
                //this.insert();
                _this.fetch();
                db.execSQL("CREATE TABLE IF NOT EXISTS FAVORITE (id INTEGER PRIMARY KEY AUTOINCREMENT,word_id INTEGER)").then(function (id) {
                    _this.database = db;
                    console.log("CREATE FAVORITE Success");
                    _this.createHistory();
                }, function (error) {
                    console.log("CREATE TABLE FAVORITE ERROR", error);
                });
            }, function (error) {
                console.log("CREATE TABLE ERROR", error);
            });
        }, function (error) {
            console.log("OPEN DB ERROR", error);
        });
        //เรียกใช้ database ที่มีอยู่แล้วชื่อ dicts.db
        /*new Sqlite("dicts.db").then(db =>{
            this.database = db;
            console.log("Open database Success")
            
        },error =>{
            console.log("Open DB ERROR" , error);
        })
        */
    }
    ViewComponent.prototype.createHistory = function () {
        var _this = this;
        this.database.execSQL("CREATE TABLE IF NOT EXISTS HISTORY (id INTEGER PRIMARY KEY AUTOINCREMENT,word_id INTEGER ,sTime DATE)").then(function (id) {
            _this.database = _this.database;
            console.log("CREATE HISTORY Success");
        }, function (error) {
            console.log("CREATE TABLE HISTORY ERROR", error);
        });
    };
    ViewComponent.prototype.insert = function () {
        var _this = this;
        this.database.execSQL("INSERT INTO dict (engWorld, thaiWorld) VALUES (?,?)", ["red", "แดง"]).then(function (all_word) {
            console.log("INSERT RESULT => ", all_word);
            console.log(_this.eng_word + " " + _this.eng_word);
            _this.fetch();
        }, function (error) {
            console.log("INSERT ERROR => ", error);
        });
    };
    ViewComponent.prototype.fetch = function () {
        console.log("Go to ===> fetch");
        this.database.all("SELECT * FROM dict").then(function (rows) {
            console.log(rows);
            /*for(var row in rows){
                console.log("Result ==v");
            
                console.log("result all ==> " , rows[row]);//result all
                console.log("eng_word ==> " , rows[row][1]); // result eng
                console.log("thai_word ==> " , rows[row][2]); //result thai
                console.log("type word ==> " , rows[row][3]); //result thai
            }*/
            for (var i = 0; i < rows.length; i++) {
                console.log("result ==>", rows[i]);
            }
        }, function (error) {
            console.log("SELECT ERROR ", error);
        });
    };
    ViewComponent.prototype.btnInsert = function () {
        console.log("click btnInsert");
        this.router.navigate(["insert"]), {
            transition: {
                name: "flip",
                dutation: 2000,
                curve: "linear"
            }
        };
    };
    ViewComponent.prototype.btnSelect = function () {
        var _this = this;
        var search = this.word_search;
        if (search == "") {
            alert("มีช่องว่างนะไอ้โง่ .....");
        }
        else {
            console.log("Check ==> ", "Select ===> " + search);
            var temp = "%" + search + "%";
            this.database.all("SELECT * FROM dict WHERE engWorld LIKE (?) or thaiWorld LIKE (?)", [temp, temp]).then(function (rows) {
                if (rows == "") {
                    console.log("not word ===>  " + rows + "is " + search);
                    alert("ไม่มีคำว่า " + search + " ในฐานข้อมูล");
                }
                _this.word_list = rows;
                for (var row in rows) {
                    console.log("Result ==v");
                    /*for(var i=0 ; i <= rows.length ; i++ ){
                     console.log("result ==>" , rows[row][i]);
                    }*/
                    console.log("result all ==> ", rows[row]); //result all
                    console.log("eng_word ==> ", rows[row][1]); // result eng
                    console.log("thai_word ==> ", rows[row][2]); //result thai
                }
            }, function (error) {
                console.log("SELECT ERROR ", error);
            });
        }
    };
    ViewComponent.prototype.btnDelete = function () {
        console.log("Check == > ", " Delete");
        this.router.navigate(["delete"]), {
            transition: {
                name: "flip",
                dutation: 2000,
                curve: "linear"
            }
        };
    };
    //  function use for listview
    /*ngOnInit(): void {
        this.items = this.word_list;
    }*/
    ViewComponent.prototype.btnSelectRandom = function () {
        console.log("Select Random");
        this.database.all("SELECT * FROM dict ORDER BY RANDOM() LIMIT 1").then(function (rows) {
            console.log(rows);
            /*for(var row in rows){
                console.log("Result ==v");
            
                console.log("result all ==> " , rows[row]);//result all
                console.log("eng_word ==> " , rows[row][1]); // result eng
                console.log("thai_word ==> " , rows[row][2]); //result thai
                console.log("type word ==> " , rows[row][3]); //result thai
            }*/
            for (var i = 0; i < rows.length; i++) {
                console.log("result for row ==>", rows[i]);
            }
        }, function (error) {
            console.log("SELECT ERROR ", error);
        });
    };
    return ViewComponent;
}());
ViewComponent = __decorate([
    core_1.Component({
        selector: "ns-app",
        templateUrl: "views/main.html",
    }),
    __metadata("design:paramtypes", [router_1.Router])
], ViewComponent);
exports.ViewComponent = ViewComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUEwQztBQUUxQywwQ0FBeUM7QUFFekMsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFRNUMsSUFBYSxhQUFhO0lBWXRCLHVCQUEyQixNQUFjO1FBQXpDLGlCQXFDQztRQXJDMEIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUx6QyxnQkFBVyxHQUFFLEVBQUUsQ0FBQztRQVFaLHlDQUF5QztRQUN6QyxDQUFDLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsRUFBRTtZQUM1QixFQUFFLENBQUMsT0FBTyxDQUFDLDRKQUE0SixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsRUFBRTtnQkFDNUssS0FBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7Z0JBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUMsQ0FBQztnQkFDekMsZ0JBQWdCO2dCQUNoQixLQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ2IsRUFBRSxDQUFDLE9BQU8sQ0FBQyw0RkFBNEYsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLEVBQUU7b0JBQzVHLEtBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO29CQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQUM7b0JBQ3ZDLEtBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFDekIsQ0FBQyxFQUFDLFVBQUEsS0FBSztvQkFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLDZCQUE2QixFQUFHLEtBQUssQ0FBQyxDQUFDO2dCQUN2RCxDQUFDLENBQUMsQ0FBQztZQUNQLENBQUMsRUFBQyxVQUFBLEtBQUs7Z0JBRUgsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsRUFBRyxLQUFLLENBQUMsQ0FBQztZQUM5QyxDQUFD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dWxhci9jb3JlXCI7XHJcblxyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IEl0ZW0gfSBmcm9tIFwiLi9pdGVtXCI7XHJcbnZhciBTcWxpdGUgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXNxbGl0ZVwiKTtcclxuXHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJucy1hcHBcIixcclxuICAgIHRlbXBsYXRlVXJsOiBcInZpZXdzL21haW4uaHRtbFwiLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgVmlld0NvbXBvbmVudCB7XHJcblxyXG4gICAgcHJpdmF0ZSBkYXRhYmFzZSA6IGFueTtcclxuICAgIHB1YmxpYyBlbmdfd29yZCA6IEFycmF5PGFueT47XHJcbiAgICBwdWJsaWMgdGhhaV93b3JkIDogQXJyYXk8YW55PjtcclxuXHJcbiAgICBpdGVtcyA6IEl0ZW1bXTtcclxuICAgIHdvcmRfc2VhcmNoID1cIlwiO1xyXG4gICAgXHJcbiAgICB3b3JkX2xpc3QgOkFycmF5PGFueT47XHJcbiAgICBcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciApe1xyXG5cclxuXHJcbiAgICAgICAgLy9Db2RlIOC4leC4reC4meC4l+C4teC5iOC5hOC4oeC5iOC4oeC4teC4reC4sOC5hOC4o+C5gOC4peC4oiDguYDguKPguLTguYjguKHguKrguKPguYnguLLguIfguIjguLLguIEgMVxyXG4gICAgICAgIChuZXcgU3FsaXRlKFwiZGljdHMuZGJcIikpLnRoZW4oZGIgPT4ge1xyXG4gICAgICAgICAgICBkYi5leGVjU1FMKFwiQ1JFQVRFIFRBQkxFIElGIE5PVCBFWElTVFMgZGljdCAoaWQgSU5URUdFUiBQUklNQVJZIEtFWSBBVVRPSU5DUkVNRU5ULCBlbmdXb3JsZCBURVhULCB0aGFpV29ybGQgVEVYVCAsdHlwZSBURVhUIERFRkFVTFQgJ05vdW4nICwgc1RpbWUgREFURSBERUZBVUxUIE51bGwgKVwiKS50aGVuKGlkID0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhYmFzZSA9IGRiO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDUkVBVCBUQUJMRSA9PT0+IFN1Y2Nlc3MgXCIpO1xyXG4gICAgICAgICAgICAgICAgLy90aGlzLmluc2VydCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mZXRjaCgpO1xyXG4gICAgICAgICAgICAgICAgZGIuZXhlY1NRTChcIkNSRUFURSBUQUJMRSBJRiBOT1QgRVhJU1RTIEZBVk9SSVRFIChpZCBJTlRFR0VSIFBSSU1BUlkgS0VZIEFVVE9JTkNSRU1FTlQsd29yZF9pZCBJTlRFR0VSKVwiKS50aGVuKGlkID0+e1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YWJhc2UgPSBkYjtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNSRUFURSBGQVZPUklURSBTdWNjZXNzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlSGlzdG9yeSgpO1xyXG4gICAgICAgICAgICAgICAgfSxlcnJvciA9PntcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNSRUFURSBUQUJMRSBGQVZPUklURSBFUlJPUlwiICwgZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0sZXJyb3IgPT57XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ1JFQVRFIFRBQkxFIEVSUk9SXCIgLCBlcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApICAgXHJcbiAgICAgICAgfSxlcnJvciA9PntcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJPUEVOIERCIEVSUk9SXCIgLCBlcnJvcik7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLy/guYDguKPguLXguKLguIHguYPguIrguYkgZGF0YWJhc2Ug4LiX4Li14LmI4Lih4Li14Lit4Lii4Li54LmI4LmB4Lil4LmJ4Lin4LiK4Li34LmI4LitIGRpY3RzLmRiXHJcbiAgICAgICAgLypuZXcgU3FsaXRlKFwiZGljdHMuZGJcIikudGhlbihkYiA9PntcclxuICAgICAgICAgICAgdGhpcy5kYXRhYmFzZSA9IGRiO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIk9wZW4gZGF0YWJhc2UgU3VjY2Vzc1wiKVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9LGVycm9yID0+e1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIk9wZW4gREIgRVJST1JcIiAsIGVycm9yKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgICovXHJcblxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjcmVhdGVIaXN0b3J5KCl7XHJcbiAgICAgICAgdGhpcy5kYXRhYmFzZS5leGVjU1FMKFwiQ1JFQVRFIFRBQkxFIElGIE5PVCBFWElTVFMgSElTVE9SWSAoaWQgSU5URUdFUiBQUklNQVJZIEtFWSBBVVRPSU5DUkVNRU5ULHdvcmRfaWQgSU5URUdFUiAsc1RpbWUgREFURSlcIikudGhlbihpZCA9PntcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFiYXNlID0gdGhpcy5kYXRhYmFzZTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNSRUFURSBISVNUT1JZIFN1Y2Nlc3NcIik7XHJcbiAgICAgICAgICAgICAgICB9LGVycm9yID0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ1JFQVRFIFRBQkxFIEhJU1RPUlkgRVJST1JcIiAsIGVycm9yKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBcclxuXHJcblxyXG5cclxuICAgIHB1YmxpYyBpbnNlcnQoKXtcclxuICAgICAgICB0aGlzLmRhdGFiYXNlLmV4ZWNTUUwoXCJJTlNFUlQgSU5UTyBkaWN0IChlbmdXb3JsZCwgdGhhaVdvcmxkKSBWQUxVRVMgKD8sPylcIiwgW1wicmVkXCIgLFwi4LmB4LiU4LiHXCJdKS50aGVuKGFsbF93b3JkID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiSU5TRVJUIFJFU1VMVCA9PiBcIiAsIGFsbF93b3JkICApO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5lbmdfd29yZCArIFwiIFwiICsgdGhpcy5lbmdfd29yZCk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMuZmV0Y2goKTtcclxuICAgICAgICAgICAgfSwgZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIklOU0VSVCBFUlJPUiA9PiBcIiAsIGVycm9yKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGZldGNoKCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJHbyB0byA9PT0+IGZldGNoXCIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuZGF0YWJhc2UuYWxsKFwiU0VMRUNUICogRlJPTSBkaWN0XCIpLnRoZW4ocm93cyA9PntcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocm93cyk7XHJcbiAgICAgICAgICAgIC8qZm9yKHZhciByb3cgaW4gcm93cyl7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJlc3VsdCA9PXZcIik7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZXN1bHQgYWxsID09PiBcIiAsIHJvd3Nbcm93XSk7Ly9yZXN1bHQgYWxsXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImVuZ193b3JkID09PiBcIiAsIHJvd3Nbcm93XVsxXSk7IC8vIHJlc3VsdCBlbmdcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidGhhaV93b3JkID09PiBcIiAsIHJvd3Nbcm93XVsyXSk7IC8vcmVzdWx0IHRoYWlcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidHlwZSB3b3JkID09PiBcIiAsIHJvd3Nbcm93XVszXSk7IC8vcmVzdWx0IHRoYWlcclxuICAgICAgICAgICAgfSovXHJcbiAgICAgICAgICAgIGZvcih2YXIgaT0wIDsgaSA8IHJvd3MubGVuZ3RoIDsgaSsrICl7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZXN1bHQgPT0+XCIgLCByb3dzW2ldKTsgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgfSxlcnJvciA9PntcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJTRUxFQ1QgRVJST1IgXCIgLCBlcnJvcik7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBidG5JbnNlcnQoKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImNsaWNrIGJ0bkluc2VydFwiKTtcclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCJpbnNlcnRcIl0pLHtcclxuICAgICAgICAgICAgdHJhbnNpdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgbmFtZSA6IFwiZmxpcFwiICxcclxuICAgICAgICAgICAgICAgIGR1dGF0aW9uOiAyMDAwLFxyXG4gICAgICAgICAgICAgICAgY3VydmU6IFwibGluZWFyXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBidG5TZWxlY3QoKXtcclxuICAgICAgICB2YXIgc2VhcmNoID0gdGhpcy53b3JkX3NlYXJjaDtcclxuICAgICAgICBpZiAoc2VhcmNoID09IFwiXCIpe1xyXG4gICAgICAgICAgICBhbGVydChcIuC4oeC4teC4iuC5iOC4reC4h+C4p+C5iOC4suC4h+C4meC4sOC5hOC4reC5ieC5guC4h+C5iCAuLi4uLlwiKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJDaGVjayA9PT4gXCIgLCBcIlNlbGVjdCA9PT0+IFwiICsgc2VhcmNoKTtcclxuICAgICAgICAgICAgIHZhciB0ZW1wID0gXCIlXCIrc2VhcmNoK1wiJVwiO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5kYXRhYmFzZS5hbGwoXCJTRUxFQ1QgKiBGUk9NIGRpY3QgV0hFUkUgZW5nV29ybGQgTElLRSAoPykgb3IgdGhhaVdvcmxkIExJS0UgKD8pXCIsW3RlbXAsdGVtcF0gKS50aGVuKHJvd3MgPT57XHJcbiAgICAgICAgICAgICAgICBpZihyb3dzID09XCJcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJub3Qgd29yZCA9PT0+ICBcIiArIHJvd3MgKyBcImlzIFwiICsgc2VhcmNoKTtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydChcIuC5hOC4oeC5iOC4oeC4teC4hOC4s+C4p+C5iOC4siBcIiArIHNlYXJjaCArIFwiIOC5g+C4meC4kOC4suC4meC4guC5ieC4reC4oeC4ueC4pVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMud29yZF9saXN0ID0gcm93cztcclxuICAgICAgICAgICAgICAgIGZvcih2YXIgcm93IGluIHJvd3Mpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUmVzdWx0ID09dlwiKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvKmZvcih2YXIgaT0wIDsgaSA8PSByb3dzLmxlbmd0aCA7IGkrKyApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZXN1bHQgPT0+XCIgLCByb3dzW3Jvd11baV0pOyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSovXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZXN1bHQgYWxsID09PiBcIiAsIHJvd3Nbcm93XSk7Ly9yZXN1bHQgYWxsXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJlbmdfd29yZCA9PT4gXCIgLCByb3dzW3Jvd11bMV0pOyAvLyByZXN1bHQgZW5nXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0aGFpX3dvcmQgPT0+IFwiICwgcm93c1tyb3ddWzJdKTsgLy9yZXN1bHQgdGhhaVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sZXJyb3IgPT57XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTRUxFQ1QgRVJST1IgXCIgLCBlcnJvcik7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG5cclxuICAgIGJ0bkRlbGV0ZSgpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ2hlY2sgPT0gPiBcIiAsIFwiIERlbGV0ZVwiKTtcclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCJkZWxldGVcIl0pLHtcclxuICAgICAgICAgICAgdHJhbnNpdGlvbiA6e1xyXG4gICAgICAgICAgICAgICAgbmFtZSA6IFwiZmxpcFwiICxcclxuICAgICAgICAgICAgICAgIGR1dGF0aW9uOiAyMDAwLFxyXG4gICAgICAgICAgICAgICAgY3VydmU6IFwibGluZWFyXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAgXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvLyAgZnVuY3Rpb24gdXNlIGZvciBsaXN0dmlld1xyXG4gICAgLypuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLml0ZW1zID0gdGhpcy53b3JkX2xpc3Q7XHJcbiAgICB9Ki9cclxuXHJcbiAgICBidG5TZWxlY3RSYW5kb20oKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlNlbGVjdCBSYW5kb21cIik7XHJcbiAgICAgICAgdGhpcy5kYXRhYmFzZS5hbGwoXCJTRUxFQ1QgKiBGUk9NIGRpY3QgT1JERVIgQlkgUkFORE9NKCkgTElNSVQgMVwiKS50aGVuKHJvd3MgPT57XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJvd3MpO1xyXG4gICAgICAgICAgICAvKmZvcih2YXIgcm93IGluIHJvd3Mpe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJSZXN1bHQgPT12XCIpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVzdWx0IGFsbCA9PT4gXCIgLCByb3dzW3Jvd10pOy8vcmVzdWx0IGFsbFxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJlbmdfd29yZCA9PT4gXCIgLCByb3dzW3Jvd11bMV0pOyAvLyByZXN1bHQgZW5nXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInRoYWlfd29yZCA9PT4gXCIgLCByb3dzW3Jvd11bMl0pOyAvL3Jlc3VsdCB0aGFpXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInR5cGUgd29yZCA9PT4gXCIgLCByb3dzW3Jvd11bM10pOyAvL3Jlc3VsdCB0aGFpXHJcbiAgICAgICAgICAgIH0qL1xyXG4gICAgICAgICAgICBmb3IodmFyIGk9MCA7IGkgPCByb3dzLmxlbmd0aCA7IGkrKyApe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVzdWx0IGZvciByb3cgPT0+XCIgLCByb3dzW2ldKTsgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgfSxlcnJvciA9PntcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJTRUxFQ1QgRVJST1IgXCIgLCBlcnJvcik7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIFxyXG5cclxuICAgIFxyXG5cclxuXHJcbiB9XHJcbiJdfQ==