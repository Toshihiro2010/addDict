"use strict";
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var items_word_1 = require("../models/items/items_word");
var myDB_1 = require("../models/myDb/myDB");
var application = require("application");
var application_1 = require("application");
var platform_1 = require("platform");
var Sqlite = require("nativescript-sqlite");
var fs = require("file-system");
var ViewComponent = (function () {
    function ViewComponent(router) {
        this.router = router;
        this.db_word = []; //เก็บไฟล์ ในรูปของ object ในโฟลเดอร์ file/database 
        this.temp_sql = ""; //เก็บ คำสั่ง sql เพื่อใช้ refesh ใหม่
        this.word_rand = ""; //word eng Random show on layout
        this.mean_rand = ""; //word thai Random show on layout
        this.type_rand = ""; //word type Random show on layout
        this.word_list2 = []; //list show on layout
        this.word_search = ""; //ngModule input word search-
        this.word_list = []; //list sql temp 
        this.word_sql = ""; //output on sql
        this.db_file_check = 0;
        this.viewCheck = 0; // เช็คว่า เป็นส่วนไหน 0-random , 1-listview 
        var self = this;
        //Code ตอนที่ไม่มีอะไรเลย เริ่มสร้างจาก 1
        (new Sqlite("dicts.db")).then(function (db) {
            self.database = db;
            self.createHistory();
            self.createMyUser();
            self.createFavorite();
        }, function (error) {
            console.log("OPEN DB ERROR", error);
        });
        self.myDb();
        if (self.db_file_check != 0) {
            (new Sqlite(self.my_db_path)).then(function (db) {
                self.my_db = db;
                console.log("Open database Success");
                self.btnSelectRandom();
            }, function (error) {
                console.log("Open DB ERROR", error);
            });
        }
    }
    //  function use for listview
    ViewComponent.prototype.ngOnInit = function () {
        var self = this;
        console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
        //self.getItem();
        //self.pushList(self.word_list);
        if (!platform_1.isAndroid) {
            return;
        }
        application.android.on(application_1.AndroidApplication.activityBackPressedEvent, function (data) {
            console.log('AndroidApplication.activityBackPressedEvent');
            self.btnSelectRandom();
            self.check_DB_FILE();
        });
    };
    ViewComponent.prototype.check_DB_FILE = function () {
        console.log("***************");
        var self = this;
        self.check_file();
        if (self.file_length != self.db_word.length) {
            self.file_length = self.db_word.length;
            if (self.file_length == 0) {
                console.log("Not DATABASE");
            }
            else if (self.file_length == 1) {
                self.db_file_check = 1;
                self.my_db_path = self.db_word[0].path;
                console.log("my_db => " + self.my_db_path);
            }
            else if (self.file_length > 1) {
                self.db_file_check = 1;
                //console.log(self.file_length);
                for (var i = 0; i < self.file_length; i++) {
                    if (self.db_word[i].name == "EngToTha.db") {
                        self.my_db_path = self.db_word[i].path;
                    }
                    if (i = self.file_length - 1) {
                        if (self.my_db_path == "") {
                            self.my_db_path = self.db_word[0].path;
                        }
                    }
                }
            }
            self.useDB_Open_File();
        }
    };
    ViewComponent.prototype.check_file = function () {
        var self = this;
        console.log("in => check_file");
        var doc = fs.knownFolders.documents();
        var my_path = doc.getFolder("database");
        //console.log(JSON.stringify(my_path));
        var temp = my_path.getEntitiesSync();
        //console.log("temp => " , JSON.stringify(temp));
        for (var i in temp) {
            var model_db = new myDB_1.MyDatabase();
            if (temp[i].extension == ".db") {
                model_db.name = temp[i].name;
                model_db.path = temp[i].path;
                self.db_word.push(model_db);
            }
        }
    };
    ViewComponent.prototype.useDB_Open_File = function () {
        console.log("***************");
        var self = this;
        if (self.db_file_check != 0) {
            (new Sqlite(self.my_db_path)).then(function (db) {
                self.my_db = db;
                console.log("Open database Success");
            }, function (error) {
                console.log("Open DB ERROR", error);
            });
        }
    };
    ViewComponent.prototype.myDb = function () {
        var self = this;
        console.log("in => self.mydb");
        var doc = fs.knownFolders.documents();
        var my_path = doc.getFolder("database");
        //console.log(JSON.stringify(my_path));
        var temp = my_path.getEntitiesSync();
        //console.log("temp => " , JSON.stringify(temp));
        for (var i in temp) {
            //console.log("i" , JSON.stringify(temp[i]));
            var model_db = new myDB_1.MyDatabase();
            if (temp[i].extension == ".db") {
                //let temp2 = [temp[i].name , temp[i].path];
                model_db.name = temp[i].name;
                model_db.path = temp[i].path;
                //let temp2 = [1][1];;
                self.db_word.push(model_db);
            }
        }
        if (self.file_length != self.db_word.length) {
            self.file_length = self.db_word.length;
        }
        if (self.file_length == 0) {
            console.log("Not DATABASE");
        }
        else if (self.file_length == 1) {
            self.db_file_check = 1;
            self.my_db_path = self.db_word[0].path;
            console.log("my_db => " + self.my_db_path);
        }
        else if (self.file_length > 1) {
            self.db_file_check = 1;
            //console.log(self.file_length);
            for (var i = 0; i < self.file_length; i++) {
                if (self.db_word[i].name == "EngToTha.db") {
                    self.my_db_path = self.db_word[i].path;
                }
                if (i = self.file_length - 1) {
                    if (self.my_db_path == "") {
                        self.my_db_path = self.db_word[0].path;
                    }
                }
            }
        }
    };
    ViewComponent.prototype.ngAfterViewInit = function () {
        console.log("ng==========> AfterViewInit");
    };
    ViewComponent.prototype.createHistory = function () {
        var self = this;
        self.database.execSQL("CREATE TABLE IF NOT EXISTS HISTORY (id INTEGER PRIMARY KEY AUTOINCREMENT,dict_no INTEGER ,dict_search TEXT , dict_meaning TEXT)").then(function (id) {
            self.database = self.database;
            console.log("CREATE HISTORY Success");
        }, function (error) {
            console.log("CREATE TABLE HISTORY ERROR", error);
        });
    };
    ViewComponent.prototype.createFavorite = function () {
        var self = this;
        self.database.execSQL("CREATE TABLE IF NOT EXISTS FAVORITE (id INTEGER PRIMARY KEY AUTOINCREMENT,dict_no INTEGER )").then(function (id) {
            self.database = self.database;
            console.log("CREATE FAVORITE Success");
        }, function (error) {
            console.log("CREATE TABLE FAVORITE ERROR", error);
        });
    };
    ViewComponent.prototype.createMyUser = function () {
        var self = this;
        self.database.execSQL("CREATE TABLE IF NOT EXISTS USERS (id INTEGER PRIMARY KEY AUTOINCREMENT,username TEXT , name TEXT , status INTEGER , login INTEGER DEFAULT 0 )").then(function (id) {
            self.database = self.database;
            console.log("CREATE USERS Success");
        }, function (error) {
            console.log("CREATE TABLE USERS ERROR", error);
        });
    };
    ViewComponent.prototype.fetch2 = function () {
        var self = this;
        self.viewCheck = 1;
        if (self.db_file_check != 0) {
            self.my_db.all("SELECT dict_no , dict_search , dict_meaning FROM words WHERE dict_no > 400 LIMit 10").then(function (rows) {
                //console.log(rows)
                self.word_list = rows;
                self.refeshList();
                self.pushList(rows);
            }, function (error) {
                console.log("SELECT ERROR ", error);
            });
        }
        else {
            console.log("No DATABASE");
        }
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
        var self = this;
        var search = self.word_search;
        if (search == "") {
            alert("มีช่องว่างนะไอ้โง่ .....");
        }
        else {
            console.log("Check ==> ", "Select ===> " + search);
            var temp = "%" + search + "%";
            var strSQL_1 = "SELECT dict_no , dict_search , dict_meaning FROM words WHERE dict_search LIKE " + temp;
            self.my_db.all(strSQL_1).then(function (rows) {
                if (rows == "") {
                    console.log("not word ===>  " + rows + "is " + search);
                    alert("ไม่มีคำว่า " + search + " ในฐานข้อมูล");
                }
                self.temp_sql = strSQL_1;
                self.word_list = rows;
                for (var row in rows) {
                    console.log("Result ==v");
                    console.log("result all ==> ", rows[row]); //result all
                    console.log("eng_word ==> ", rows[row][1]); // result eng
                    console.log("thai_word ==> ", rows[row][2]);
                }
            }, function (error) {
                console.log("SELECT ERROR ", error);
            });
        }
    };
    ViewComponent.prototype.btnDelete = function () {
        console.log("Check == > ", " Delete");
        this.router.navigate(["delete"]), {};
    };
    ViewComponent.prototype.getItem = function () {
        console.log("GET ITEM ================> ");
        var self = this;
        var temp_list;
        temp_list = self.word_list;
        for (var row in temp_list) {
            var model_word = new items_word_1.WordItem();
            model_word.id = temp_list[row][0];
            model_word.dict_search = temp_list[row][1];
            model_word.dict_meaning = temp_list[row][2];
            self.word_list2.push(model_word);
        }
    };
    ViewComponent.prototype.getItemSelect = function () {
        var self = this;
        self.viewCheck = 1;
        if (self.db_file_check != 0) {
            var search = self.word_search;
            if (search == "") {
                alert("มีช่องว่างนะไอ้โง่ .....");
            }
            else {
                console.log("Check ==> ", "Select ===> " + search);
                var temp = search + '%';
                self.my_db.all("SELECT dict_no , dict_search , dict_meaning FROM words WHERE dict_search LIKE (?)", [temp]).then(function (rows) {
                    if (rows == "") {
                        console.log("not word ===>  " + rows + "is " + search);
                        alert("ไม่มีคำว่า " + search + " ในฐานข้อมูล");
                    }
                    else {
                        self.word_search = "";
                    }
                    self.word_sql = rows;
                    self.refeshList();
                    self.pushList(rows);
                }, function (error) {
                    console.log("SELECT ERROR ", error);
                });
            }
        }
        else {
            alert("NO Databse .....");
        }
    };
    // FAVORiTE AND HISTORY NO USE
    ViewComponent.prototype.getItemFavorite = function () {
        var self = this;
        self.viewCheck = 1;
        var strSQL = "SELECT word_id FROM FAVORITE";
        self.database.all(strSQL).then(function (result) {
            self.word_sql = result;
            self.refeshList();
            self.pushList(self.word_sql);
        }, function (error) {
            console.log("SELECT Favoirite Error => ", error);
        });
    };
    ViewComponent.prototype.getItemHistory = function () {
        var self = this;
        self.viewCheck = 1;
        var strSQL = "SELECT dict_no , dict_search , dict_meaning FROM HISTORY ORDER BY id DESC";
        self.database.all(strSQL).then(function (result) {
            self.word_sql = result;
            self.refeshList();
            self.pushList(self.word_sql);
        }, function (error) {
            console.log("SELECT History Error => ", error);
        });
    };
    ViewComponent.prototype.btnSelectRandom = function () {
        var self = this;
        if (self.db_file_check != 0) {
            self.viewCheck = 0;
            self.refeshList();
            self.my_db.all("SELECT dict_no , dict_search , dict_meaning FROM words WHERE dict_no > 400 ORDER BY RANDOM() LIMIT 1").then(function (rows) {
                console.log(rows);
                console.log("eng_word ==> ", rows[0][1]); // result word
                self.word_rand = rows[0][1];
                console.log("thai_word ==> ", rows[0][2]); //result mean word
                self.mean_rand = rows[0][2];
            }, function (error) {
                console.log("SELECT ERROR ", error);
            });
        }
        else {
            alert("กรุณาโหลด Dicttionnary ในหน้า setting");
        }
    };
    ViewComponent.prototype.refeshList = function () {
        var self = this;
        var delPop = self.word_list2.length;
        console.log("delpop length ==>", delPop);
        if (delPop > 0) {
            for (var i = 0; i < delPop; i++) {
                self.word_list2.pop();
            }
        }
    };
    ViewComponent.prototype.pushList = function (args) {
        var self = this;
        var rows = args;
        for (var row in rows) {
            var model_word = new items_word_1.WordItem();
            model_word.id = rows[row][0];
            model_word.dict_search = rows[row][1];
            model_word.dict_meaning = rows[row][2];
            self.word_list2.push(model_word);
        }
    };
    ViewComponent.prototype.onItemTap = function (args) {
        var self = this;
        var word = self.word_list2[args.index];
        var navigationExtras = {
            queryParams: {
                "words": JSON.stringify(word)
            }
        };
        this.router.navigate(["list-detail"], navigationExtras);
    };
    ViewComponent.prototype.onSetting = function () {
        console.log("Check == > ", " onSetting");
        this.router.navigate(["setting"]), {};
    };
    ViewComponent.prototype.myOnResume = function () {
        var self = this;
        if (self.viewCheck == 1) {
            self.refeshList();
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUFvRTtBQUNwRSwwQ0FBMkQ7QUFJM0QseURBQXNEO0FBQ3RELDRDQUFnRDtBQUdoRCx5Q0FBMkM7QUFDM0MsMkNBQXNGO0FBQ3RGLHFDQUFxQztBQUVyQyxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQUM1QyxJQUFJLEVBQUUsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFNaEMsSUFBYSxhQUFhO0lBNEJ0Qix1QkFBMkIsTUFBYztRQUFkLFdBQU0sR0FBTixNQUFNLENBQVE7UUF6QmpDLFlBQU8sR0FBRyxFQUFFLENBQUUsQ0FBRSxvREFBb0Q7UUFJcEUsYUFBUSxHQUFHLEVBQUUsQ0FBQyxDQUFDLHNDQUFzQztRQUk3RCxjQUFTLEdBQUUsRUFBRSxDQUFDLENBQUcsZ0NBQWdDO1FBQ2pELGNBQVMsR0FBRyxFQUFFLENBQUMsQ0FBQyxpQ0FBaUM7UUFDakQsY0FBUyxHQUFFLEVBQUUsQ0FBQyxDQUFFLGlDQUFpQztRQUNqRCxlQUFVLEdBQUcsRUFBRSxDQUFDLENBQUkscUJBQXFCO1FBRXpDLGdCQUFXLEdBQUUsRUFBRSxDQUFDLENBQUssNkJBQTZCO1FBRWxELGNBQVMsR0FBRyxFQUFFLENBQUMsQ0FBSyxnQkFBZ0I7UUFDcEMsYUFBUSxHQUFHLEVBQUUsQ0FBQyxDQUFHLGVBQWU7UUFDeEIsa0JBQWEsR0FBRyxDQUFDLENBQUM7UUFHbEIsY0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDLDZDQUE2QztRQU1oRSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFFaEIseUNBQXlDO1FBQ3pDLENBQUMsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1lBRW5CLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUNyQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDcEIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBRTlCLENBQUMsRUFBQyxVQUFBLEtBQUs7WUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRyxLQUFLLENBQUMsQ0FBQztRQUN6QyxDQUFDLENBQUMsQ0FBQTtRQUVGLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUVaLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxhQUFhLElBQUksQ0FBRSxDQUFDLENBQUEsQ0FBQztZQUN6QixDQUFDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLEVBQUU7Z0JBQ2pDLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO2dCQUNoQixPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUM7Z0JBQ3JDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUMzQixDQUFDLEVBQUMsVUFBQSxLQUFLO2dCQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFHLEtBQUssQ0FBQyxDQUFDO1lBQ3pDLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQztJQUtMLENBQUM7SUFJRCw2QkFBNkI7SUFDN0IsZ0NBQVEsR0FBUjtRQUNJLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUNoQixPQUFPLENBQUMsR0FBRyxDQUFDLHdEQUF3RCxDQUFDLENBQUM7UUFDNUUsaUJBQWlCO1FBQ1gsZ0NBQWdDO1FBQ2hDLEVBQUUsQ0FBQyxDQUFDLENBQUMsb0JBQVMsQ0FBQyxDQUFDLENBQUM7WUFDZixNQUFNLENBQUM7UUFDVCxDQUFDO1FBQ0QsV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsZ0NBQWtCLENBQUMsd0JBQXdCLEVBQUUsVUFBQyxJQUF5QztZQUMxRyxPQUFPLENBQUMsR0FBRyxDQUFDLDZDQUE2QyxDQUFDLENBQUM7WUFDM0QsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN6QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTyxxQ0FBYSxHQUFyQjtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUMvQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBRWxCLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQSxDQUFDO1lBQ3hDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7WUFFdkMsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBRyxDQUFDLENBQUMsQ0FBQSxDQUFDO2dCQUNyQixPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBRWhDLENBQUM7WUFBQSxJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUMsQ0FBQSxDQUFDO2dCQUM1QixJQUFJLENBQUMsYUFBYSxHQUFFLENBQUMsQ0FBQztnQkFFdEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEdBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBR2hELENBQUM7WUFBQSxJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQSxDQUFDO2dCQUMzQixJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztnQkFDdkIsZ0NBQWdDO2dCQUNoQyxHQUFHLENBQUEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxFQUFFLEVBQUMsQ0FBQztvQkFDdkMsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksYUFBYSxDQUFDLENBQUEsQ0FBQzt3QkFDdEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztvQkFDM0MsQ0FBQztvQkFFRCxFQUFFLENBQUEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsR0FBRSxDQUFFLENBQUMsQ0FBQSxDQUFDO3dCQUN6QixFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQyxDQUFBLENBQUM7NEJBQ3RCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7d0JBQzNDLENBQUM7b0JBQ0wsQ0FBQztnQkFDTCxDQUFDO1lBQ0wsQ0FBQztZQUNELElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUMzQixDQUFDO0lBQ0wsQ0FBQztJQUVPLGtDQUFVLEdBQWxCO1FBQ0ksSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUUsQ0FBQztRQUNqQyxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3RDLElBQUksT0FBTyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDeEMsdUNBQXVDO1FBRXZDLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUNyQyxpREFBaUQ7UUFDakQsR0FBRyxDQUFBLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUEsQ0FBQztZQUNmLElBQUksUUFBUSxHQUFnQixJQUFJLGlCQUFVLEVBQUUsQ0FBQztZQUU3QyxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxJQUFJLEtBQUssQ0FBQyxDQUFBLENBQUM7Z0JBQzNCLFFBQVEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDN0IsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUM3QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNoQyxDQUFDO1FBQ0wsQ0FBQztJQUNMLENBQUM7SUFFTyx1Q0FBZSxHQUF2QjtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUMvQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLGFBQWEsSUFBSSxDQUFFLENBQUMsQ0FBQSxDQUFDO1lBQ3pCLENBQUMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsRUFBRTtnQkFDakMsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7Z0JBQ2hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQztZQUV6QyxDQUFDLEVBQUMsVUFBQSxLQUFLO2dCQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFHLEtBQUssQ0FBQyxDQUFDO1lBQ3pDLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQztJQUNMLENBQUM7SUFFRCw0QkFBSSxHQUFKO1FBQ0ksSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUUsQ0FBQztRQUNoQyxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3RDLElBQUksT0FBTyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDeEMsdUNBQXVDO1FBRXZDLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUNyQyxpREFBaUQ7UUFDakQsR0FBRyxDQUFBLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUEsQ0FBQztZQUNmLDZDQUE2QztZQUM3QyxJQUFJLFFBQVEsR0FBZ0IsSUFBSSxpQkFBVSxFQUFFLENBQUM7WUFDN0MsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsSUFBSSxLQUFLLENBQUMsQ0FBQSxDQUFDO2dCQUMzQiw0Q0FBNEM7Z0JBQzVDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDN0IsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUM3QixzQkFBc0I7Z0JBQ3RCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2hDLENBQUM7UUFDTCxDQUFDO1FBQ0QsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFBLENBQUM7WUFDeEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUMzQyxDQUFDO1FBRUQsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBRyxDQUFDLENBQUMsQ0FBQSxDQUFDO1lBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7UUFFaEMsQ0FBQztRQUFBLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7WUFDNUIsSUFBSSxDQUFDLGFBQWEsR0FBRSxDQUFDLENBQUM7WUFFdEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUN2QyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsR0FBSSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFHaEQsQ0FBQztRQUFBLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxDQUFBLENBQUM7WUFDM0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7WUFDdkIsZ0NBQWdDO1lBQ2hDLEdBQUcsQ0FBQSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLEVBQUUsRUFBQyxDQUFDO2dCQUN2QyxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxhQUFhLENBQUMsQ0FBQSxDQUFDO29CQUN0QyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUMzQyxDQUFDO2dCQUVELEVBQUUsQ0FBQSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxHQUFFLENBQUUsQ0FBQyxDQUFBLENBQUM7b0JBQ3pCLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksRUFBRSxDQUFDLENBQUEsQ0FBQzt3QkFDdEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztvQkFDM0MsQ0FBQztnQkFDTCxDQUFDO1lBQ0wsQ0FBQztRQUNMLENBQUM7SUFFTCxDQUFDO0lBR0QsdUNBQWUsR0FBZjtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsNkJBQTZCLENBQUMsQ0FBQztJQUUvQyxDQUFDO0lBR08scUNBQWEsR0FBckI7UUFDSSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsaUlBQWlJLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxFQUFFO1lBQzVKLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUM5QixPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFDMUMsQ0FBQyxFQUFDLFVBQUEsS0FBSztZQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLEVBQUcsS0FBSyxDQUFDLENBQUM7UUFDdEQsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRU8sc0NBQWMsR0FBdEI7UUFDSSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsNkZBQTZGLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxFQUFFO1lBQ3hILElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUM5QixPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQUM7UUFDM0MsQ0FBQyxFQUFDLFVBQUEsS0FBSztZQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsNkJBQTZCLEVBQUcsS0FBSyxDQUFDLENBQUM7UUFDeEQsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRU8sb0NBQVksR0FBcEI7UUFDSSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsK0lBQStJLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxFQUFFO1lBQzFLLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUM5QixPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDeEMsQ0FBQyxFQUFDLFVBQUEsS0FBSztZQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLEVBQUcsS0FBSyxDQUFDLENBQUM7UUFDckQsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBSU8sOEJBQU0sR0FBZDtRQUNJLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUNoQixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztRQUVuQixFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsYUFBYSxJQUFJLENBQUUsQ0FBQyxDQUFBLENBQUM7WUFDekIsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMscUZBQXFGLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxJQUFJO2dCQUMzRyxtQkFBbUI7Z0JBQ25CLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO2dCQUN0QixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQ2xCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFeEIsQ0FBQyxFQUFDLFVBQUEsS0FBSztnQkFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRyxLQUFLLENBQUMsQ0FBQztZQUN6QyxDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUM7UUFBQSxJQUFJLENBQUEsQ0FBQztZQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFL0IsQ0FBQztJQUVMLENBQUM7SUFHRCxpQ0FBUyxHQUFUO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBQztZQUM3QixVQUFVLEVBQUU7Z0JBQ1IsSUFBSSxFQUFHLE1BQU07Z0JBQ2IsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsS0FBSyxFQUFFLFFBQVE7YUFDbEI7U0FDSixDQUFBO0lBR0wsQ0FBQztJQUVELGlDQUFTLEdBQVQ7UUFDSSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUM5QixFQUFFLENBQUMsQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDLENBQUEsQ0FBQztZQUNkLEtBQUssQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1FBQ3RDLENBQUM7UUFBQSxJQUFJLENBQUEsQ0FBQztZQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFHLGNBQWMsR0FBRyxNQUFNLENBQUMsQ0FBQztZQUNwRCxJQUFJLElBQUksR0FBRyxHQUFHLEdBQUMsTUFBTSxHQUFDLEdBQUcsQ0FBQztZQUMxQixJQUFJLFFBQU0sR0FBRyxnRkFBZ0YsR0FBRyxJQUFJLENBQUM7WUFFckcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsSUFBSTtnQkFDNUIsRUFBRSxDQUFBLENBQUMsSUFBSSxJQUFHLEVBQUUsQ0FBQyxDQUFBLENBQUM7b0JBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLEdBQUcsS0FBSyxHQUFHLE1BQU0sQ0FBQyxDQUFDO29CQUN2RCxLQUFLLENBQUMsYUFBYSxHQUFHLE1BQU0sR0FBRyxjQUFjLENBQUMsQ0FBQztnQkFDbkQsQ0FBQztnQkFDRCxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQU0sQ0FBQztnQkFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7Z0JBQ3RCLEdBQUcsQ0FBQSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFBLENBQUM7b0JBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7b0JBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQSxZQUFZO29CQUN2RCxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWE7b0JBQzFELE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdDLENBQUM7WUFDTCxDQUFDLEVBQUMsVUFBQSxLQUFLO2dCQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFHLEtBQUssQ0FBQyxDQUFDO1lBQ3pDLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQztJQUNULENBQUM7SUFFRCxpQ0FBUyxHQUFUO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUcsU0FBUyxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFDLEVBQ2hDLENBQUE7SUFDTCxDQUFDO0lBR0QsK0JBQU8sR0FBUDtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsNkJBQTZCLENBQUMsQ0FBQztRQUUzQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsSUFBSSxTQUFzQixDQUFDO1FBQzNCLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBRTFCLEdBQUcsQ0FBQSxDQUFDLElBQUksR0FBRyxJQUFJLFNBQVMsQ0FBQyxDQUFBLENBQUM7WUFDdkIsSUFBSSxVQUFVLEdBQWMsSUFBSSxxQkFBUSxFQUFFLENBQUM7WUFFM0MsVUFBVSxDQUFDLEVBQUUsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEMsVUFBVSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0MsVUFBVSxDQUFDLFlBQVksR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFNUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFckMsQ0FBQztJQUNMLENBQUM7SUFFRCxxQ0FBYSxHQUFiO1FBQ0ksSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBRWhCLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFFO1FBQ3BCLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxhQUFhLElBQUksQ0FBRSxDQUFDLENBQUEsQ0FBQztZQUN6QixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1lBQzlCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUMsQ0FBQSxDQUFDO2dCQUVkLEtBQUssQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1lBQ3RDLENBQUM7WUFBQSxJQUFJLENBQUEsQ0FBQztnQkFDRixPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRyxjQUFjLEdBQUcsTUFBTSxDQUFDLENBQUM7Z0JBQ3BELElBQUksSUFBSSxHQUFHLE1BQU0sR0FBQyxHQUFHLENBQUM7Z0JBRXRCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLG1GQUFtRixFQUFDLENBQUMsSUFBSSxDQUFDLENBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQSxJQUFJO29CQUNqSCxFQUFFLENBQUEsQ0FBQyxJQUFJLElBQUcsRUFBRSxDQUFDLENBQUEsQ0FBQzt3QkFDVixPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixHQUFHLElBQUksR0FBRyxLQUFLLEdBQUcsTUFBTSxDQUFDLENBQUM7d0JBQ3ZELEtBQUssQ0FBQyxhQUFhLEdBQUcsTUFBTSxHQUFHLGNBQWMsQ0FBQyxDQUFDO29CQUNuRCxDQUFDO29CQUFBLElBQUksQ0FBQSxDQUFDO3dCQUNGLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO29CQUMxQixDQUFDO29CQUVELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO29CQUNyQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7b0JBQ2xCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRXBCLENBQUMsRUFBQyxVQUFBLEtBQUs7b0JBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUcsS0FBSyxDQUFDLENBQUM7Z0JBQ3pDLENBQUMsQ0FBQyxDQUFBO1lBQ1YsQ0FBQztRQUNMLENBQUM7UUFBQSxJQUFJLENBQUEsQ0FBQztZQUNGLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQzlCLENBQUM7SUFHTCxDQUFDO0lBQ0QsOEJBQThCO0lBQzlCLHVDQUFlLEdBQWY7UUFDSSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFHbkIsSUFBSSxNQUFNLEdBQUcsOEJBQThCLENBQUM7UUFDNUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsTUFBTTtZQUNqQyxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQztZQUN2QixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDbEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDakMsQ0FBQyxFQUFDLFVBQUEsS0FBSztZQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLEVBQUcsS0FBSyxDQUFDLENBQUM7UUFFdEQsQ0FBQyxDQUFDLENBQUE7SUFFTixDQUFDO0lBRUQsc0NBQWMsR0FBZDtRQUNJLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUNoQixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztRQUVuQixJQUFJLE1BQU0sR0FBRywyRUFBMkUsQ0FBQztRQUN6RixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxNQUFNO1lBQ2pDLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNsQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNsQyxDQUFDLEVBQUMsVUFBQSxLQUFLO1lBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsRUFBRyxLQUFLLENBQUMsQ0FBQztRQUVwRCxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRCx1Q0FBZSxHQUFmO1FBQ0ksSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBRWhCLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxhQUFhLElBQUksQ0FBRSxDQUFDLENBQUEsQ0FBQztZQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBRTtZQUNwQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDbEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsc0dBQXNHLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxJQUFJO2dCQUM1SCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUVsQixPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWM7Z0JBQ3pELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM1QixPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsa0JBQWtCO2dCQUM5RCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUdoQyxDQUFDLEVBQUMsVUFBQSxLQUFLO2dCQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFHLEtBQUssQ0FBQyxDQUFDO1lBQ3pDLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQztRQUFBLElBQUksQ0FBQSxDQUFDO1lBQ0YsS0FBSyxDQUFDLHVDQUF1QyxDQUFDLENBQUM7UUFDbkQsQ0FBQztJQUlMLENBQUM7SUFFRCxrQ0FBVSxHQUFWO1FBQ0ksSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO1FBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUcsTUFBTSxDQUFDLENBQUM7UUFDMUMsRUFBRSxDQUFBLENBQUMsTUFBTSxHQUFFLENBQUUsQ0FBQyxDQUFBLENBQUM7WUFDWCxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUcsQ0FBQyxHQUFHLE1BQU0sRUFBRyxDQUFDLEVBQUUsRUFBQyxDQUFDO2dCQUMvQixJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQzFCLENBQUM7UUFDTCxDQUFDO0lBQ1QsQ0FBQztJQUVELGdDQUFRLEdBQVIsVUFBUyxJQUFJO1FBQ1QsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUVoQixHQUFHLENBQUEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQSxDQUFDO1lBQ2pCLElBQUksVUFBVSxHQUFjLElBQUkscUJBQVEsRUFBRSxDQUFDO1lBQzNDLFVBQVUsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdCLFVBQVUsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RDLFVBQVUsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXZDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3JDLENBQUM7SUFFTCxDQUFDO0lBR0QsaUNBQVMsR0FBVCxVQUFVLElBQUk7UUFDaEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRWpDLElBQUksZ0JBQWdCLEdBQXFCO1lBQ3JDLFdBQVcsRUFBRTtnQkFDVCxPQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7YUFDaEM7U0FDSixDQUFDO1FBQ0YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxhQUFhLENBQUMsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFRCxpQ0FBUyxHQUFUO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUcsWUFBWSxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFDLEVBRWpDLENBQUE7SUFFTCxDQUFDO0lBRUQsa0NBQVUsR0FBVjtRQUNJLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUNoQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUUsQ0FBQyxDQUFDLENBQUM7WUFDdkIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3RCLENBQUM7SUFFTCxDQUFDO0lBRUosb0JBQUM7QUFBRCxDQUFDLEFBL2RGLElBK2RFO0FBL2RXLGFBQWE7SUFKekIsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxRQUFRO1FBQ2xCLFdBQVcsRUFBRSxpQkFBaUI7S0FDakMsQ0FBQztxQ0E2QnFDLGVBQU07R0E1QmhDLGFBQWEsQ0ErZHhCO0FBL2RXLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgICwgQWZ0ZXJWaWV3SW5pdCAgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXIsIE5hdmlnYXRpb25FeHRyYXMgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7IFxyXG5pbXBvcnQgbGlzdFZpZXdNb2R1bGUgPSByZXF1aXJlKFwidWkvbGlzdC12aWV3XCIpO1xyXG5cclxuaW1wb3J0IHsgSXRlbSB9IGZyb20gXCIuLi9tb2RlbHMvaXRlbXMvaXRlbVwiO1xyXG5pbXBvcnQgeyBXb3JkSXRlbSB9IGZyb20gXCIuLi9tb2RlbHMvaXRlbXMvaXRlbXNfd29yZFwiO1xyXG5pbXBvcnQgeyBNeURhdGFiYXNlIH0gZnJvbSBcIi4uL21vZGVscy9teURiL215REJcIlxyXG5cclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhclwiO1xyXG5pbXBvcnQgKiBhcyBhcHBsaWNhdGlvbiBmcm9tIFwiYXBwbGljYXRpb25cIjtcclxuaW1wb3J0IHsgQW5kcm9pZEFwcGxpY2F0aW9uLCBBbmRyb2lkQWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50RGF0YSB9IGZyb20gXCJhcHBsaWNhdGlvblwiO1xyXG5pbXBvcnQgeyBpc0FuZHJvaWQgfSBmcm9tIFwicGxhdGZvcm1cIjtcclxuXHJcbnZhciBTcWxpdGUgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXNxbGl0ZVwiKTtcclxudmFyIGZzID0gcmVxdWlyZShcImZpbGUtc3lzdGVtXCIpO1xyXG4gICAgXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwibnMtYXBwXCIsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCJ2aWV3cy9tYWluLmh0bWxcIixcclxufSlcclxuZXhwb3J0IGNsYXNzIFZpZXdDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQgLCBBZnRlclZpZXdJbml0IHtcclxuXHJcbiAgICBwcml2YXRlIGRhdGFiYXNlIDogYW55O1xyXG4gICAgcHJpdmF0ZSBkYl93b3JkID0gW10gOyAgLy/guYDguIHguYfguJrguYTguJ/guKXguYwg4LmD4LiZ4Lij4Li54Lib4LiC4Lit4LiHIG9iamVjdCDguYPguJnguYLguJ/guKXguYDguJTguK3guKPguYwgZmlsZS9kYXRhYmFzZSBcclxuICAgIHByaXZhdGUgbXlfZGI7ICAvL+C5gOC4geC5h+C4miBwYXRoIGZpbGUgRGF0YWJhc2VcclxuICAgIHByaXZhdGUgbXlfZGJfcGF0aDsgIC8v4LmA4LiB4LmH4LiaIHBhdGggZmlsZSBEYXRhYmFzZVxyXG4gICAgcHJpdmF0ZSBmaWxlX2xlbmd0aCA7IC8v4LmA4LiB4LmH4Lia4LmA4Lie4Li34LmI4Lit4LiX4Lij4Liy4LiaIHJvdyBmaWxlXHJcbiAgICBwcml2YXRlIHRlbXBfc3FsID0gXCJcIjsgLy/guYDguIHguYfguJog4LiE4Liz4Liq4Lix4LmI4LiHIHNxbCDguYDguJ7guLfguYjguK3guYPguIrguYkgcmVmZXNoIOC5g+C4q+C4oeC5iFxyXG4gXHJcblxyXG5cclxuICAgIHdvcmRfcmFuZCA9XCJcIjsgICAvL3dvcmQgZW5nIFJhbmRvbSBzaG93IG9uIGxheW91dFxyXG4gICAgbWVhbl9yYW5kID0gXCJcIjsgLy93b3JkIHRoYWkgUmFuZG9tIHNob3cgb24gbGF5b3V0XHJcbiAgICB0eXBlX3JhbmQgPVwiXCI7ICAvL3dvcmQgdHlwZSBSYW5kb20gc2hvdyBvbiBsYXlvdXRcclxuICAgIHdvcmRfbGlzdDIgPSBbXTsgICAgLy9saXN0IHNob3cgb24gbGF5b3V0XHJcblxyXG4gICAgd29yZF9zZWFyY2ggPVwiXCI7ICAgICAvL25nTW9kdWxlIGlucHV0IHdvcmQgc2VhcmNoLVxyXG4gICAgXHJcbiAgICB3b3JkX2xpc3QgPSBbXTsgICAgIC8vbGlzdCBzcWwgdGVtcCBcclxuICAgIHdvcmRfc3FsID0gXCJcIjsgICAvL291dHB1dCBvbiBzcWxcclxuICAgIHByaXZhdGUgZGJfZmlsZV9jaGVjayA9IDA7XHJcblxyXG5cclxuICAgIHByaXZhdGUgdmlld0NoZWNrID0gMDsgLy8g4LmA4LiK4LmH4LiE4Lin4LmI4LiyIOC5gOC4m+C5h+C4meC4quC5iOC4p+C4meC5hOC4q+C4mSAwLXJhbmRvbSAsIDEtbGlzdHZpZXcgXHJcblxyXG4gICAgXHJcbiAgICBcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlciApe1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgLy9Db2RlIOC4leC4reC4meC4l+C4teC5iOC5hOC4oeC5iOC4oeC4teC4reC4sOC5hOC4o+C5gOC4peC4oiDguYDguKPguLTguYjguKHguKrguKPguYnguLLguIfguIjguLLguIEgMVxyXG4gICAgICAgIChuZXcgU3FsaXRlKFwiZGljdHMuZGJcIikpLnRoZW4oZGIgPT4ge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5kYXRhYmFzZSA9IGRiO1xyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgc2VsZi5jcmVhdGVIaXN0b3J5KCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmNyZWF0ZU15VXNlcigpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5jcmVhdGVGYXZvcml0ZSgpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgfSxlcnJvciA9PntcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJPUEVOIERCIEVSUk9SXCIgLCBlcnJvcik7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgc2VsZi5teURiKCk7XHJcblxyXG4gICAgICAgIGlmKHNlbGYuZGJfZmlsZV9jaGVjayAhPSAwICl7XHJcbiAgICAgICAgICAgIChuZXcgU3FsaXRlKHNlbGYubXlfZGJfcGF0aCkpLnRoZW4oZGIgPT57XHJcbiAgICAgICAgICAgICAgICBzZWxmLm15X2RiID0gZGI7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIk9wZW4gZGF0YWJhc2UgU3VjY2Vzc1wiKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuYnRuU2VsZWN0UmFuZG9tKCk7XHJcbiAgICAgICAgICAgIH0sZXJyb3IgPT57XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIk9wZW4gREIgRVJST1JcIiAsIGVycm9yKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFxyXG5cclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICAvLyAgZnVuY3Rpb24gdXNlIGZvciBsaXN0dmlld1xyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWEnKTtcclxuXHRcdC8vc2VsZi5nZXRJdGVtKCk7XHJcbiAgICAgICAgLy9zZWxmLnB1c2hMaXN0KHNlbGYud29yZF9saXN0KTtcclxuICAgICAgICBpZiAoIWlzQW5kcm9pZCkge1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBhcHBsaWNhdGlvbi5hbmRyb2lkLm9uKEFuZHJvaWRBcHBsaWNhdGlvbi5hY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnQsIChkYXRhOiBBbmRyb2lkQWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50RGF0YSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnQW5kcm9pZEFwcGxpY2F0aW9uLmFjdGl2aXR5QmFja1ByZXNzZWRFdmVudCcpO1xyXG4gICAgICAgICAgICBzZWxmLmJ0blNlbGVjdFJhbmRvbSgpO1xyXG4gICAgICAgICAgICBzZWxmLmNoZWNrX0RCX0ZJTEUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNoZWNrX0RCX0ZJTEUoKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIioqKioqKioqKioqKioqKlwiKTtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgc2VsZi5jaGVja19maWxlKCk7XHJcblxyXG4gICAgICAgIGlmKHNlbGYuZmlsZV9sZW5ndGggIT0gc2VsZi5kYl93b3JkLmxlbmd0aCl7XHJcbiAgICAgICAgICAgIHNlbGYuZmlsZV9sZW5ndGggPSBzZWxmLmRiX3dvcmQubGVuZ3RoO1xyXG5cclxuICAgICAgICAgICAgaWYoc2VsZi5maWxlX2xlbmd0aD09IDApe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJOb3QgREFUQUJBU0VcIik7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9ZWxzZSBpZihzZWxmLmZpbGVfbGVuZ3RoID09IDEpe1xyXG4gICAgICAgICAgICAgICAgc2VsZi5kYl9maWxlX2NoZWNrID0xO1xyXG5cclxuICAgICAgICAgICAgICAgIHNlbGYubXlfZGJfcGF0aCA9IHNlbGYuZGJfd29yZFswXS5wYXRoO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJteV9kYiA9PiBcIiArICBzZWxmLm15X2RiX3BhdGgpO1xyXG4gICAgICAgICAgICAgICAgLy9zZWxmLmJ0blNlbGVjdFJhbmRvbSgpO1xyXG5cclxuICAgICAgICAgICAgfWVsc2UgaWYoc2VsZi5maWxlX2xlbmd0aCA+IDEpe1xyXG4gICAgICAgICAgICAgICAgc2VsZi5kYl9maWxlX2NoZWNrID0gMTtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coc2VsZi5maWxlX2xlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAwIDsgaSA8IHNlbGYuZmlsZV9sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5kYl93b3JkW2ldLm5hbWUgPT0gXCJFbmdUb1RoYS5kYlwiKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5teV9kYl9wYXRoID0gc2VsZi5kYl93b3JkW2ldLnBhdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihpID0gc2VsZi5maWxlX2xlbmd0aCAtMSApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm15X2RiX3BhdGggPT0gXCJcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLm15X2RiX3BhdGggPSBzZWxmLmRiX3dvcmRbMF0ucGF0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZWxmLnVzZURCX09wZW5fRmlsZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNoZWNrX2ZpbGUoKXtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJpbiA9PiBjaGVja19maWxlXCIgKTtcclxuICAgICAgICBsZXQgZG9jID0gZnMua25vd25Gb2xkZXJzLmRvY3VtZW50cygpO1xyXG4gICAgICAgIGxldCBteV9wYXRoID0gZG9jLmdldEZvbGRlcihcImRhdGFiYXNlXCIpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkobXlfcGF0aCkpO1xyXG5cclxuICAgICAgICBsZXQgdGVtcCA9IG15X3BhdGguZ2V0RW50aXRpZXNTeW5jKCk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcInRlbXAgPT4gXCIgLCBKU09OLnN0cmluZ2lmeSh0ZW1wKSk7XHJcbiAgICAgICAgZm9yKGxldCBpIGluIHRlbXApe1xyXG4gICAgICAgICAgICBsZXQgbW9kZWxfZGIgOiBNeURhdGFiYXNlID0gbmV3IE15RGF0YWJhc2UoKTtcclxuXHJcbiAgICAgICAgICAgIGlmKHRlbXBbaV0uZXh0ZW5zaW9uID09IFwiLmRiXCIpe1xyXG4gICAgICAgICAgICAgICAgbW9kZWxfZGIubmFtZSA9IHRlbXBbaV0ubmFtZTtcclxuICAgICAgICAgICAgICAgIG1vZGVsX2RiLnBhdGggPSB0ZW1wW2ldLnBhdGg7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmRiX3dvcmQucHVzaChtb2RlbF9kYik7XHJcbiAgICAgICAgICAgIH0gIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVzZURCX09wZW5fRmlsZSgpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiKioqKioqKioqKioqKioqXCIpO1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBpZihzZWxmLmRiX2ZpbGVfY2hlY2sgIT0gMCApe1xyXG4gICAgICAgICAgICAobmV3IFNxbGl0ZShzZWxmLm15X2RiX3BhdGgpKS50aGVuKGRiID0+e1xyXG4gICAgICAgICAgICAgICAgc2VsZi5teV9kYiA9IGRiO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJPcGVuIGRhdGFiYXNlIFN1Y2Nlc3NcIik7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSxlcnJvciA9PntcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiT3BlbiBEQiBFUlJPUlwiICwgZXJyb3IpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBteURiKCl7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiaW4gPT4gc2VsZi5teWRiXCIgKTtcclxuICAgICAgICBsZXQgZG9jID0gZnMua25vd25Gb2xkZXJzLmRvY3VtZW50cygpO1xyXG4gICAgICAgIGxldCBteV9wYXRoID0gZG9jLmdldEZvbGRlcihcImRhdGFiYXNlXCIpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkobXlfcGF0aCkpO1xyXG5cclxuICAgICAgICBsZXQgdGVtcCA9IG15X3BhdGguZ2V0RW50aXRpZXNTeW5jKCk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcInRlbXAgPT4gXCIgLCBKU09OLnN0cmluZ2lmeSh0ZW1wKSk7XHJcbiAgICAgICAgZm9yKGxldCBpIGluIHRlbXApe1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiaVwiICwgSlNPTi5zdHJpbmdpZnkodGVtcFtpXSkpO1xyXG4gICAgICAgICAgICBsZXQgbW9kZWxfZGIgOiBNeURhdGFiYXNlID0gbmV3IE15RGF0YWJhc2UoKTtcclxuICAgICAgICAgICAgaWYodGVtcFtpXS5leHRlbnNpb24gPT0gXCIuZGJcIil7XHJcbiAgICAgICAgICAgICAgICAvL2xldCB0ZW1wMiA9IFt0ZW1wW2ldLm5hbWUgLCB0ZW1wW2ldLnBhdGhdO1xyXG4gICAgICAgICAgICAgICAgbW9kZWxfZGIubmFtZSA9IHRlbXBbaV0ubmFtZTtcclxuICAgICAgICAgICAgICAgIG1vZGVsX2RiLnBhdGggPSB0ZW1wW2ldLnBhdGg7XHJcbiAgICAgICAgICAgICAgICAvL2xldCB0ZW1wMiA9IFsxXVsxXTs7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmRiX3dvcmQucHVzaChtb2RlbF9kYik7XHJcbiAgICAgICAgICAgIH0gIFxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihzZWxmLmZpbGVfbGVuZ3RoICE9IHNlbGYuZGJfd29yZC5sZW5ndGgpe1xyXG4gICAgICAgICAgICBzZWxmLmZpbGVfbGVuZ3RoID0gc2VsZi5kYl93b3JkLmxlbmd0aDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHNlbGYuZmlsZV9sZW5ndGg9PSAwKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJOb3QgREFUQUJBU0VcIik7XHJcbiAgICAgICAgICBcclxuICAgICAgICB9ZWxzZSBpZihzZWxmLmZpbGVfbGVuZ3RoID09IDEpe1xyXG4gICAgICAgICAgICBzZWxmLmRiX2ZpbGVfY2hlY2sgPTE7XHJcblxyXG4gICAgICAgICAgICBzZWxmLm15X2RiX3BhdGggPSBzZWxmLmRiX3dvcmRbMF0ucGF0aDtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJteV9kYiA9PiBcIiArICBzZWxmLm15X2RiX3BhdGgpO1xyXG4gICAgICAgICAgICAvL3NlbGYuYnRuU2VsZWN0UmFuZG9tKCk7XHJcblxyXG4gICAgICAgIH1lbHNlIGlmKHNlbGYuZmlsZV9sZW5ndGggPiAxKXtcclxuICAgICAgICAgICAgc2VsZi5kYl9maWxlX2NoZWNrID0gMTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhzZWxmLmZpbGVfbGVuZ3RoKTtcclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMCA7IGkgPCBzZWxmLmZpbGVfbGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgaWYoc2VsZi5kYl93b3JkW2ldLm5hbWUgPT0gXCJFbmdUb1RoYS5kYlwiKXtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLm15X2RiX3BhdGggPSBzZWxmLmRiX3dvcmRbaV0ucGF0aDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZihpID0gc2VsZi5maWxlX2xlbmd0aCAtMSApe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYubXlfZGJfcGF0aCA9PSBcIlwiKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5teV9kYl9wYXRoID0gc2VsZi5kYl93b3JkWzBdLnBhdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgbmdBZnRlclZpZXdJbml0KCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJuZz09PT09PT09PT0+IEFmdGVyVmlld0luaXRcIik7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxuXHJcbiAgICBwcml2YXRlIGNyZWF0ZUhpc3RvcnkoKXtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgc2VsZi5kYXRhYmFzZS5leGVjU1FMKFwiQ1JFQVRFIFRBQkxFIElGIE5PVCBFWElTVFMgSElTVE9SWSAoaWQgSU5URUdFUiBQUklNQVJZIEtFWSBBVVRPSU5DUkVNRU5ULGRpY3Rfbm8gSU5URUdFUiAsZGljdF9zZWFyY2ggVEVYVCAsIGRpY3RfbWVhbmluZyBURVhUKVwiKS50aGVuKGlkID0+e1xyXG4gICAgICAgICAgICBzZWxmLmRhdGFiYXNlID0gc2VsZi5kYXRhYmFzZTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJDUkVBVEUgSElTVE9SWSBTdWNjZXNzXCIpO1xyXG4gICAgICAgIH0sZXJyb3IgPT57XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ1JFQVRFIFRBQkxFIEhJU1RPUlkgRVJST1JcIiAsIGVycm9yKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY3JlYXRlRmF2b3JpdGUoKXsgICBcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgc2VsZi5kYXRhYmFzZS5leGVjU1FMKFwiQ1JFQVRFIFRBQkxFIElGIE5PVCBFWElTVFMgRkFWT1JJVEUgKGlkIElOVEVHRVIgUFJJTUFSWSBLRVkgQVVUT0lOQ1JFTUVOVCxkaWN0X25vIElOVEVHRVIgKVwiKS50aGVuKGlkID0+e1xyXG4gICAgICAgICAgICBzZWxmLmRhdGFiYXNlID0gc2VsZi5kYXRhYmFzZTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJDUkVBVEUgRkFWT1JJVEUgU3VjY2Vzc1wiKTtcclxuICAgICAgICB9LGVycm9yID0+e1xyXG4gICAgICAgICAgICAgY29uc29sZS5sb2coXCJDUkVBVEUgVEFCTEUgRkFWT1JJVEUgRVJST1JcIiAsIGVycm9yKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY3JlYXRlTXlVc2VyKCl7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHNlbGYuZGF0YWJhc2UuZXhlY1NRTChcIkNSRUFURSBUQUJMRSBJRiBOT1QgRVhJU1RTIFVTRVJTIChpZCBJTlRFR0VSIFBSSU1BUlkgS0VZIEFVVE9JTkNSRU1FTlQsdXNlcm5hbWUgVEVYVCAsIG5hbWUgVEVYVCAsIHN0YXR1cyBJTlRFR0VSICwgbG9naW4gSU5URUdFUiBERUZBVUxUIDAgKVwiKS50aGVuKGlkID0+e1xyXG4gICAgICAgICAgICBzZWxmLmRhdGFiYXNlID0gc2VsZi5kYXRhYmFzZTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJDUkVBVEUgVVNFUlMgU3VjY2Vzc1wiKTtcclxuICAgICAgICB9LGVycm9yID0+e1xyXG4gICAgICAgICAgICAgY29uc29sZS5sb2coXCJDUkVBVEUgVEFCTEUgVVNFUlMgRVJST1JcIiAsIGVycm9yKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIFxyXG5cclxuXHJcbiAgICBwcml2YXRlIGZldGNoMigpe1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBzZWxmLnZpZXdDaGVjayA9IDE7XHJcbiAgICAgXHJcbiAgICAgICAgaWYoc2VsZi5kYl9maWxlX2NoZWNrICE9IDAgKXtcclxuICAgICAgICAgICAgc2VsZi5teV9kYi5hbGwoXCJTRUxFQ1QgZGljdF9ubyAsIGRpY3Rfc2VhcmNoICwgZGljdF9tZWFuaW5nIEZST00gd29yZHMgV0hFUkUgZGljdF9ubyA+IDQwMCBMSU1pdCAxMFwiKS50aGVuKHJvd3MgPT57XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHJvd3MpXHJcbiAgICAgICAgICAgICAgICBzZWxmLndvcmRfbGlzdCA9IHJvd3M7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnJlZmVzaExpc3QoKTtcclxuICAgICAgICAgICAgICAgIHNlbGYucHVzaExpc3Qocm93cyk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSxlcnJvciA9PntcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU0VMRUNUIEVSUk9SIFwiICwgZXJyb3IpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIk5vIERBVEFCQVNFXCIpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG5cclxuICAgIGJ0bkluc2VydCgpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiY2xpY2sgYnRuSW5zZXJ0XCIpO1xyXG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcImluc2VydFwiXSkse1xyXG4gICAgICAgICAgICB0cmFuc2l0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBuYW1lIDogXCJmbGlwXCIgLFxyXG4gICAgICAgICAgICAgICAgZHV0YXRpb246IDIwMDAsXHJcbiAgICAgICAgICAgICAgICBjdXJ2ZTogXCJsaW5lYXJcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGJ0blNlbGVjdCgpe1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICB2YXIgc2VhcmNoID0gc2VsZi53b3JkX3NlYXJjaDtcclxuICAgICAgICBpZiAoc2VhcmNoID09IFwiXCIpe1xyXG4gICAgICAgICAgICBhbGVydChcIuC4oeC4teC4iuC5iOC4reC4h+C4p+C5iOC4suC4h+C4meC4sOC5hOC4reC5ieC5guC4h+C5iCAuLi4uLlwiKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJDaGVjayA9PT4gXCIgLCBcIlNlbGVjdCA9PT0+IFwiICsgc2VhcmNoKTtcclxuICAgICAgICAgICAgdmFyIHRlbXAgPSBcIiVcIitzZWFyY2grXCIlXCI7XHJcbiAgICAgICAgICAgIGxldCBzdHJTUUwgPSBcIlNFTEVDVCBkaWN0X25vICwgZGljdF9zZWFyY2ggLCBkaWN0X21lYW5pbmcgRlJPTSB3b3JkcyBXSEVSRSBkaWN0X3NlYXJjaCBMSUtFIFwiICsgdGVtcDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHNlbGYubXlfZGIuYWxsKHN0clNRTCkudGhlbihyb3dzID0+e1xyXG4gICAgICAgICAgICAgICAgaWYocm93cyA9PVwiXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibm90IHdvcmQgPT09PiAgXCIgKyByb3dzICsgXCJpcyBcIiArIHNlYXJjaCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCLguYTguKHguYjguKHguLXguITguLPguKfguYjguLIgXCIgKyBzZWFyY2ggKyBcIiDguYPguJnguJDguLLguJnguILguYnguK3guKHguLnguKVcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzZWxmLnRlbXBfc3FsID0gc3RyU1FMO1xyXG4gICAgICAgICAgICAgICAgc2VsZi53b3JkX2xpc3QgPSByb3dzO1xyXG4gICAgICAgICAgICAgICAgZm9yKHZhciByb3cgaW4gcm93cyl7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJSZXN1bHQgPT12XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVzdWx0IGFsbCA9PT4gXCIgLCByb3dzW3Jvd10pOy8vcmVzdWx0IGFsbFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZW5nX3dvcmQgPT0+IFwiICwgcm93c1tyb3ddWzFdKTsgLy8gcmVzdWx0IGVuZ1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidGhhaV93b3JkID09PiBcIiAsIHJvd3Nbcm93XVsyXSk7IFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sZXJyb3IgPT57XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTRUxFQ1QgRVJST1IgXCIgLCBlcnJvcik7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYnRuRGVsZXRlKCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJDaGVjayA9PSA+IFwiICwgXCIgRGVsZXRlXCIpO1xyXG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcImRlbGV0ZVwiXSkseyBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGdldEl0ZW0oKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkdFVCBJVEVNID09PT09PT09PT09PT09PT0+IFwiKTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdmFyIHRlbXBfbGlzdCA6IEFycmF5PGFueT47XHJcbiAgICAgICAgdGVtcF9saXN0ID0gc2VsZi53b3JkX2xpc3Q7XHJcbiAgICBcclxuICAgICAgICAgZm9yKHZhciByb3cgaW4gdGVtcF9saXN0KXtcclxuICAgICAgICAgICAgbGV0IG1vZGVsX3dvcmQgOiBXb3JkSXRlbSA9IG5ldyBXb3JkSXRlbSgpO1xyXG5cclxuICAgICAgICAgICAgbW9kZWxfd29yZC5pZCA9IHRlbXBfbGlzdFtyb3ddWzBdO1xyXG4gICAgICAgICAgICBtb2RlbF93b3JkLmRpY3Rfc2VhcmNoID0gdGVtcF9saXN0W3Jvd11bMV07XHJcbiAgICAgICAgICAgIG1vZGVsX3dvcmQuZGljdF9tZWFuaW5nID0gdGVtcF9saXN0W3Jvd11bMl07XHJcblxyXG4gICAgICAgICAgICBzZWxmLndvcmRfbGlzdDIucHVzaChtb2RlbF93b3JkKTtcclxuICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRJdGVtU2VsZWN0KCl7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICBzZWxmLnZpZXdDaGVjayA9IDEgO1xyXG4gICAgICAgIGlmKHNlbGYuZGJfZmlsZV9jaGVjayAhPSAwICl7XHJcbiAgICAgICAgICAgIHZhciBzZWFyY2ggPSBzZWxmLndvcmRfc2VhcmNoO1xyXG4gICAgICAgICAgICBpZiAoc2VhcmNoID09IFwiXCIpe1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBhbGVydChcIuC4oeC4teC4iuC5iOC4reC4h+C4p+C5iOC4suC4h+C4meC4sOC5hOC4reC5ieC5guC4h+C5iCAuLi4uLlwiKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNoZWNrID09PiBcIiAsIFwiU2VsZWN0ID09PT4gXCIgKyBzZWFyY2gpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHRlbXAgPSBzZWFyY2grJyUnO1xyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgc2VsZi5teV9kYi5hbGwoXCJTRUxFQ1QgZGljdF9ubyAsIGRpY3Rfc2VhcmNoICwgZGljdF9tZWFuaW5nIEZST00gd29yZHMgV0hFUkUgZGljdF9zZWFyY2ggTElLRSAoPylcIixbdGVtcF0gKS50aGVuKHJvd3MgPT57XHJcbiAgICAgICAgICAgICAgICAgICAgaWYocm93cyA9PVwiXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm5vdCB3b3JkID09PT4gIFwiICsgcm93cyArIFwiaXMgXCIgKyBzZWFyY2gpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydChcIuC5hOC4oeC5iOC4oeC4teC4hOC4s+C4p+C5iOC4siBcIiArIHNlYXJjaCArIFwiIOC5g+C4meC4kOC4suC4meC4guC5ieC4reC4oeC4ueC4pVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi53b3JkX3NlYXJjaCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYud29yZF9zcWwgPSByb3dzO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYucmVmZXNoTGlzdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYucHVzaExpc3Qocm93cyk7XHJcbiAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9LGVycm9yID0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNFTEVDVCBFUlJPUiBcIiAsIGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiTk8gRGF0YWJzZSAuLi4uLlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcblxyXG4gICAgfVxyXG4gICAgLy8gRkFWT1JpVEUgQU5EIEhJU1RPUlkgTk8gVVNFXHJcbiAgICBnZXRJdGVtRmF2b3JpdGUoKXtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgc2VsZi52aWV3Q2hlY2sgPSAxO1xyXG5cclxuXHJcbiAgICAgICAgbGV0IHN0clNRTCA9IFwiU0VMRUNUIHdvcmRfaWQgRlJPTSBGQVZPUklURVwiO1xyXG4gICAgICAgIHNlbGYuZGF0YWJhc2UuYWxsKHN0clNRTCkudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICBzZWxmLndvcmRfc3FsID0gcmVzdWx0O1xyXG4gICAgICAgICAgICBzZWxmLnJlZmVzaExpc3QoKTtcclxuICAgICAgICAgICAgc2VsZi5wdXNoTGlzdChzZWxmLndvcmRfc3FsKTtcclxuICAgICAgICB9LGVycm9yID0+e1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNFTEVDVCBGYXZvaXJpdGUgRXJyb3IgPT4gXCIgLCBlcnJvcik7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdldEl0ZW1IaXN0b3J5KCl7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHNlbGYudmlld0NoZWNrID0gMTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgc3RyU1FMID0gXCJTRUxFQ1QgZGljdF9ubyAsIGRpY3Rfc2VhcmNoICwgZGljdF9tZWFuaW5nIEZST00gSElTVE9SWSBPUkRFUiBCWSBpZCBERVNDXCI7XHJcbiAgICAgICAgc2VsZi5kYXRhYmFzZS5hbGwoc3RyU1FMKS50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgIHNlbGYud29yZF9zcWwgPSByZXN1bHQ7XHJcbiAgICAgICAgICAgICBzZWxmLnJlZmVzaExpc3QoKTtcclxuICAgICAgICAgICAgIHNlbGYucHVzaExpc3Qoc2VsZi53b3JkX3NxbCk7XHJcbiAgICAgICAgfSxlcnJvciA9PntcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJTRUxFQ1QgSGlzdG9yeSBFcnJvciA9PiBcIiAsIGVycm9yKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBidG5TZWxlY3RSYW5kb20oKXtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIGlmKHNlbGYuZGJfZmlsZV9jaGVjayAhPSAwICl7XHJcbiAgICAgICAgICAgIHNlbGYudmlld0NoZWNrID0gMCA7XHJcbiAgICAgICAgICAgIHNlbGYucmVmZXNoTGlzdCgpO1xyXG4gICAgICAgICAgICBzZWxmLm15X2RiLmFsbChcIlNFTEVDVCBkaWN0X25vICwgZGljdF9zZWFyY2ggLCBkaWN0X21lYW5pbmcgRlJPTSB3b3JkcyBXSEVSRSBkaWN0X25vID4gNDAwIE9SREVSIEJZIFJBTkRPTSgpIExJTUlUIDFcIikudGhlbihyb3dzID0+e1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocm93cyk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZW5nX3dvcmQgPT0+IFwiICwgcm93c1swXVsxXSk7IC8vIHJlc3VsdCB3b3JkXHJcbiAgICAgICAgICAgICAgICBzZWxmLndvcmRfcmFuZCA9IHJvd3NbMF1bMV07XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInRoYWlfd29yZCA9PT4gXCIgLCByb3dzWzBdWzJdKTsgLy9yZXN1bHQgbWVhbiB3b3JkXHJcbiAgICAgICAgICAgICAgICBzZWxmLm1lYW5fcmFuZCA9IHJvd3NbMF1bMl07XHJcblxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgfSxlcnJvciA9PntcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU0VMRUNUIEVSUk9SIFwiICwgZXJyb3IpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBhbGVydChcIuC4geC4o+C4uOC4k+C4suC5guC4q+C4peC4lCBEaWN0dGlvbm5hcnkg4LmD4LiZ4Lir4LiZ4LmJ4LiyIHNldHRpbmdcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG5cclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICByZWZlc2hMaXN0KCl7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHZhciBkZWxQb3AgPSBzZWxmLndvcmRfbGlzdDIubGVuZ3RoO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImRlbHBvcCBsZW5ndGggPT0+XCIgLCBkZWxQb3ApO1xyXG4gICAgICAgICAgICBpZihkZWxQb3AgPjAgKXtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwIDsgaSA8IGRlbFBvcCA7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi53b3JkX2xpc3QyLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVzaExpc3QoYXJncyl7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCByb3dzID0gYXJncztcclxuXHJcbiAgICAgICAgZm9yKHZhciByb3cgaW4gcm93cyl7XHJcbiAgICAgICAgICAgIGxldCBtb2RlbF93b3JkIDogV29yZEl0ZW0gPSBuZXcgV29yZEl0ZW0oKTtcclxuICAgICAgICAgICAgbW9kZWxfd29yZC5pZCA9IHJvd3Nbcm93XVswXTtcclxuICAgICAgICAgICAgbW9kZWxfd29yZC5kaWN0X3NlYXJjaCA9IHJvd3Nbcm93XVsxXTtcclxuICAgICAgICAgICAgbW9kZWxfd29yZC5kaWN0X21lYW5pbmcgPSByb3dzW3Jvd11bMl07XHJcblxyXG4gICAgICAgICAgICBzZWxmLndvcmRfbGlzdDIucHVzaChtb2RlbF93b3JkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBvbkl0ZW1UYXAoYXJncykge1xyXG5cdFx0bGV0IHNlbGYgPSB0aGlzO1xyXG5cdFx0bGV0IHdvcmQgPSBzZWxmLndvcmRfbGlzdDJbYXJncy5pbmRleF07XHJcblxyXG4gICAgICAgIGxldCBuYXZpZ2F0aW9uRXh0cmFzOiBOYXZpZ2F0aW9uRXh0cmFzID0ge1xyXG4gICAgICAgICAgICBxdWVyeVBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgXCJ3b3Jkc1wiOiBKU09OLnN0cmluZ2lmeSh3b3JkKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCJsaXN0LWRldGFpbFwiXSwgbmF2aWdhdGlvbkV4dHJhcyk7XHJcbiAgICB9XHJcblxyXG4gICAgb25TZXR0aW5nKCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJDaGVjayA9PSA+IFwiICwgXCIgb25TZXR0aW5nXCIpO1xyXG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcInNldHRpbmdcIl0pLHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICB9XHJcblxyXG4gICAgbXlPblJlc3VtZSgpe1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBpZiAoc2VsZi52aWV3Q2hlY2sgPT0gMSApIHtcclxuICAgICAgICAgICAgc2VsZi5yZWZlc2hMaXN0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiB9XHJcbiJdfQ==