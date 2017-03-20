"use strict";
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var router_2 = require("nativescript-angular/router");
var users_1 = require("../../../models/users/users");
var http = require("http");
var Toast = require("nativescript-toast");
var Sqlite = require("nativescript-sqlite");
var LoginComponent = (function () {
    function LoginComponent(router, routerExtensions) {
        this.router = router;
        this.routerExtensions = routerExtensions;
        this.username = "";
        this.password = "";
        this.status_login = 0;
        this.user = [];
        this.strURL = "http://192.9.9.112:30";
        var self = this;
        new Sqlite("dicts.db").then(function (db) {
            self.database = db;
            console.log("Open database Success");
        }, function (error) {
            console.log("Open DB ERROR", error);
        });
    }
    LoginComponent.prototype.btnLogin = function () {
        var self = this;
        var checkEmpty = self.checkEmpty();
        console.log("empty word  ==>", checkEmpty);
        if (checkEmpty == true) {
            http.request({
                url: self.strURL + "/login/" + self.username + "/" + self.password,
                method: "GET"
            }).then(function (response) {
                var statusCode = response.statusCode;
                console.log("status code => ", statusCode);
                if (statusCode != 200) {
                    var toast = Toast.makeText("ไม่มี user และ password นี้ในระบบ");
                    toast.show();
                }
                else {
                    var obj = response.content.toJSON();
                    //obj = JSON.stringify(obj);
                    //self.rejectList();
                    self.objToDatabase(obj);
                } //end else statusCode
            }, function (e) {
                console.log("error is ", e);
            });
        } // End if checkEmpty
    };
    LoginComponent.prototype.rejectList = function () {
        var self = this;
        var temp = self.user.length;
        for (var i = 0; i < temp; i++) {
            self.user.pop();
        }
    };
    LoginComponent.prototype.objToDatabase = function (objUSer) {
        var self = this;
        self.status_login = 1;
        console.log(objUSer);
        var model_user = new users_1.Users();
        model_user.id = objUSer[0].id;
        model_user.username = objUSer[0].username;
        model_user.name = objUSer[0].name;
        model_user.status = objUSer[0].status;
        var temp_id = model_user.id;
        var temp_username = model_user.username;
        var temp_name = model_user.name;
        var temp_status = model_user.status;
        console.log("object user stringdify => ", JSON.stringify(model_user));
        self.database.all("SELECT * FROM USERS WHERE username = (?)", [temp_username]).then(function (rows) {
            if (rows == "") {
                self.myInsertUser(model_user);
            }
            else {
                self.myChangUser(temp_username);
            }
        }, function (error) {
            console.log("SELECT ERROR ", error);
        });
    };
    LoginComponent.prototype.btnLogout = function () {
        var self = this;
        console.log("botton Logout => ");
        self.status_login = 0;
    };
    LoginComponent.prototype.myInsertUser = function (model_user) {
        var self = this;
        console.log("My inert user =>");
        self.database.execSQL("INSERT INTO USERS (id , username , name , status , login ) VALUES (? , ? , ? , ? , ?)", [model_user.id, model_user.username, model_user.name, model_user.status, 1]).then(function (word_insert) {
            console.log("INSERT RESULT => ", word_insert);
        }, function (error) {
            console.log("INSERT ERROR => ", error);
        });
    };
    LoginComponent.prototype.myChangUser = function (arg) {
        console.log("My chang User => ", arg);
        var self = this;
        self.database.execSQL("UPDATE USERS SET login = 1 WHERE id = (?) ", [arg], function (err, db) {
            if (err) {
                console.log("error is == > ", err);
            }
            else {
                console.log("Update Success");
            }
        });
    };
    LoginComponent.prototype.btnCheck = function () {
        var self = this;
        var result;
        http.request({
            url: self.strURL + "/users/1",
            method: "GET"
        }).then(function (response) {
            var obj = response.content.toJSON();
            var statusCode = response.statusCode;
            console.log("status code => ", statusCode);
            console.log(JSON.stringify(obj));
        }, function (e) {
            console.log("error is ", e);
        });
    };
    LoginComponent.prototype.httpLogin = function () {
        console.log("on => http Login");
        var self = this;
    };
    LoginComponent.prototype.checkEmpty = function () {
        var self = this;
        console.log("username ===> ", self.username);
        console.log("password ===> ", self.password);
        if (self.username.trim() == "" || self.password.trim() == "") {
            var toast = Toast.makeText("มีช่องว่างนะไอ้โง่");
            toast.show();
            return false;
        }
        else {
            return true;
        }
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        selector: "Login",
        templateUrl: "views/setting/login/login-component.html",
    }),
    __metadata("design:paramtypes", [router_1.Router, router_2.RouterExtensions])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4tY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4tY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBMEM7QUFFMUMsMENBQW1FO0FBQ25FLHNEQUErRDtBQUMvRCxxREFBb0Q7QUFHcEQsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzNCLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBQzFDLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0FBTzVDLElBQWEsY0FBYztJQVl2Qix3QkFBb0IsTUFBYyxFQUFXLGdCQUFtQztRQUE1RCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVcscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFtQjtRQVZ4RSxhQUFRLEdBQVksRUFBRSxDQUFFO1FBQ3hCLGFBQVEsR0FBWSxFQUFFLENBQUU7UUFFeEIsaUJBQVksR0FBRyxDQUFDLENBQUM7UUFHakIsU0FBSSxHQUFHLEVBQUUsQ0FBRTtRQUVYLFdBQU0sR0FBWSx1QkFBdUIsQ0FBQztRQUc5QyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsRUFBRTtZQUMxQixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztZQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFDekMsQ0FBQyxFQUFDLFVBQUEsS0FBSztZQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFHLEtBQUssQ0FBQyxDQUFDO1FBQ3pDLENBQUMsQ0FBQyxDQUFBO0lBRU4sQ0FBQztJQUVPLGlDQUFRLEdBQWhCO1FBQ0ksSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLEVB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Q0FBQyxDQUFDO0lBRVAsQ0FBQztJQUVPLGtDQUFTLEdBQWpCO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ2hDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztJQUVwQixDQUFDO0lBRU8sbUNBQVUsR0FBbEI7UUFDSSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRyxJQUFJLENBQUMsUUFBUSxDQUFFLENBQUM7UUFDL0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFOUMsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBRyxFQUFFLENBQUMsQ0FBQSxDQUFDO1lBRXhELElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUNqRCxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDYixNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2pCLENBQUM7UUFBQSxJQUFJLENBQUEsQ0FBQztZQUNGLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQztJQUVMLENBQUM7SUFJTCxxQkFBQztBQUFELENBQUMsQUEzS0QsSUEyS0M7QUEzS1ksY0FBYztJQUoxQixnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLE9BQU87UUFDakIsV0FBVyxFQUFFLDBDQUEwQztLQUMxRCxDQUFDO3FDQWE4QixlQUFNLEVBQThCLHlCQUFnQjtHQVp2RSxjQUFjLENBMksxQjtBQTNLWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vLi4vLi4vc2hhcmVkL215RnVuY3Rpb24xXCI7XHJcbmltcG9ydCB7IFJvdXRlciwgTmF2aWdhdGlvbkV4dHJhcyAsIFJvdXRlIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiOyBcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgVXNlcnMgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzL3VzZXJzL3VzZXJzXCI7XHJcblxyXG5cclxudmFyIGh0dHAgPSByZXF1aXJlKFwiaHR0cFwiKTtcclxudmFyIFRvYXN0ID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC10b2FzdFwiKTtcclxudmFyIFNxbGl0ZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtc3FsaXRlXCIpO1xyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwiTG9naW5cIixcclxuICAgIHRlbXBsYXRlVXJsOiBcInZpZXdzL3NldHRpbmcvbG9naW4vbG9naW4tY29tcG9uZW50Lmh0bWxcIixcclxufSlcclxuZXhwb3J0IGNsYXNzIExvZ2luQ29tcG9uZW50IHtcclxuXHJcbiAgICBwcml2YXRlIHVzZXJuYW1lIDogc3RyaW5nID0gXCJcIiA7XHJcbiAgICBwcml2YXRlIHBhc3N3b3JkIDogc3RyaW5nID0gXCJcIiA7XHJcbiAgICBwcml2YXRlIGRhdGFiYXNlIDogYW55O1xyXG4gICAgcHJpdmF0ZSBzdGF0dXNfbG9naW4gPSAwO1xyXG5cclxuXHJcbiAgICBwcml2YXRlIHVzZXIgPSBbXSA7XHJcblxyXG4gICAgcHJpdmF0ZSBzdHJVUkwgOiBzdHJpbmcgPSBcImh0dHA6Ly8xOTIuOS45LjExMjozMFwiO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIgLCBwcml2YXRlIHJvdXRlckV4dGVuc2lvbnMgOiBSb3V0ZXJFeHRlbnNpb25zICl7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIG5ldyBTcWxpdGUoXCJkaWN0cy5kYlwiKS50aGVuKGRiID0+e1xyXG4gICAgICAgICAgICBzZWxmLmRhdGFiYXNlID0gZGI7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiT3BlbiBkYXRhYmFzZSBTdWNjZXNzXCIpO1xyXG4gICAgICAgIH0sZXJyb3IgPT57XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiT3BlbiBEQiBFUlJPUlwiICwgZXJyb3IpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBidG5Mb2dpbigpe1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICB2YXIgY2hlY2tFbXB0eSA9IHNlbGYuY2hlY2tFbXB0eSgpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZW1wdHkgd29yZCAgPT0+XCIgLCBjaGVja0VtcHR5KTtcclxuICAgICAgICBpZiggY2hlY2tFbXB0eSA9PSB0cnVlKXtcclxuXHJcbiAgICAgICAgICAgIGh0dHAucmVxdWVzdCh7IFxyXG4gICAgICAgICAgICAgICAgdXJsOiBzZWxmLnN0clVSTCArXCIvbG9naW4vXCIrIHNlbGYudXNlcm5hbWUgKyBcIi9cIitzZWxmLnBhc3N3b3JkLCBcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogXCJHRVRcIiBcclxuICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgc3RhdHVzQ29kZSA9IHJlc3BvbnNlLnN0YXR1c0NvZGU7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInN0YXR1cyBjb2RlID0+IFwiICwgc3RhdHVzQ29kZSk7XHJcbiAgICAgICAgICAgICAgICBpZihzdGF0dXNDb2RlICE9IDIwMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRvYXN0ID0gVG9hc3QubWFrZVRleHQoXCLguYTguKHguYjguKHguLUgdXNlciDguYHguKXguLAgcGFzc3dvcmQg4LiZ4Li14LmJ4LmD4LiZ4Lij4Liw4Lia4LiaXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRvYXN0LnNob3coKTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBvYmogPSByZXNwb25zZS5jb250ZW50LnRvSlNPTigpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vb2JqID0gSlNPTi5zdHJpbmdpZnkob2JqKTtcclxuICAgICAgICAgICAgICAgICAgICAvL3NlbGYucmVqZWN0TGlzdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYub2JqVG9EYXRhYmFzZShvYmopO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vc2VsZi5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi4vbWFpblwiXSwgeyBjbGVhckhpc3Rvcnk6IHRydWUgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9zZWxmLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1widXNlci9saXN0XCJdLCB7IGNsZWFySGlzdG9yeTogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgIH0vL2VuZCBlbHNlIHN0YXR1c0NvZGVcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoZSkgey8vLy8gQXJndW1lbnQgKGUpIGlzIEVycm9yIVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJlcnJvciBpcyBcIiAsIGUpOyAgXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0vLyBFbmQgaWYgY2hlY2tFbXB0eVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcml2YXRlIHJlamVjdExpc3QoKXtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHRlbXAgPSBzZWxmLnVzZXIubGVuZ3RoO1xyXG4gICAgICAgIGZvcih2YXIgaSA9IDAgOyBpIDwgdGVtcDsgaSsrKXtcclxuICAgICAgICAgICAgc2VsZi51c2VyLnBvcCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9ialRvRGF0YWJhc2Uob2JqVVNlcil7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHNlbGYuc3RhdHVzX2xvZ2luID0gMTtcclxuICAgICAgICBjb25zb2xlLmxvZyhvYmpVU2VyKTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgbW9kZWxfdXNlciA9IG5ldyBVc2VycygpO1xyXG4gICAgICAgIG1vZGVsX3VzZXIuaWQgPSBvYmpVU2VyWzBdLmlkO1xyXG4gICAgICAgIG1vZGVsX3VzZXIudXNlcm5hbWUgPSBvYmpVU2VyWzBdLnVzZXJuYW1lO1xyXG4gICAgICAgIG1vZGVsX3VzZXIubmFtZSA9IG9ialVTZXJbMF0ubmFtZTtcclxuICAgICAgICBtb2RlbF91c2VyLnN0YXR1cyA9IG9ialVTZXJbMF0uc3RhdHVzO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCB0ZW1wX2lkID0gbW9kZWxfdXNlci5pZDtcclxuICAgICAgICBsZXQgdGVtcF91c2VybmFtZSA9IG1vZGVsX3VzZXIudXNlcm5hbWU7XHJcbiAgICAgICAgbGV0IHRlbXBfbmFtZSA9IG1vZGVsX3VzZXIubmFtZTtcclxuICAgICAgICBsZXQgdGVtcF9zdGF0dXMgPSBtb2RlbF91c2VyLnN0YXR1cztcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJvYmplY3QgdXNlciBzdHJpbmdkaWZ5ID0+IFwiICwgSlNPTi5zdHJpbmdpZnkobW9kZWxfdXNlcikpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHNlbGYuZGF0YWJhc2UuYWxsKFwiU0VMRUNUICogRlJPTSBVU0VSUyBXSEVSRSB1c2VybmFtZSA9ICg/KVwiLFt0ZW1wX3VzZXJuYW1lXSkudGhlbihyb3dzID0+e1xyXG4gICAgICAgICAgICBpZihyb3dzID09XCJcIil7XHJcbiAgICAgICAgICAgICAgICBzZWxmLm15SW5zZXJ0VXNlcihtb2RlbF91c2VyKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBzZWxmLm15Q2hhbmdVc2VyKHRlbXBfdXNlcm5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxlcnJvciA9PntcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJTRUxFQ1QgRVJST1IgXCIgLCBlcnJvcik7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGJ0bkxvZ291dCgpe1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBjb25zb2xlLmxvZyhcImJvdHRvbiBMb2dvdXQgPT4gXCIpO1xyXG4gICAgICAgIHNlbGYuc3RhdHVzX2xvZ2luID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG15SW5zZXJ0VXNlcihtb2RlbF91c2VyKXtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJNeSBpbmVydCB1c2VyID0+XCIpO1xyXG4gICAgICAgIHNlbGYuZGF0YWJhc2UuZXhlY1NRTChcIklOU0VSVCBJTlRPIFVTRVJTIChpZCAsIHVzZXJuYW1lICwgbmFtZSAsIHN0YXR1cyAsIGxvZ2luICkgVkFMVUVTICg/ICwgPyAsID8gLCA/ICwgPylcIiwgXHJcbiAgICAgICAgW21vZGVsX3VzZXIuaWQgLG1vZGVsX3VzZXIudXNlcm5hbWUgLCBtb2RlbF91c2VyLm5hbWUgLCBtb2RlbF91c2VyLnN0YXR1cyAsIDEgXSkudGhlbih3b3JkX2luc2VydCA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIklOU0VSVCBSRVNVTFQgPT4gXCIgLCB3b3JkX2luc2VydCAgKTtcclxuICAgICAgICAgICAgICAgIH0sIGVycm9yID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIklOU0VSVCBFUlJPUiA9PiBcIiAsIGVycm9yKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbXlDaGFuZ1VzZXIoYXJnKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIk15IGNoYW5nIFVzZXIgPT4gXCIgLCBhcmcpO1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgc2VsZi5kYXRhYmFzZS5leGVjU1FMKFwiVVBEQVRFIFVTRVJTIFNFVCBsb2dpbiA9IDEgV0hFUkUgaWQgPSAoPykgXCIgLFthcmddICwgZnVuY3Rpb24oZXJyICwgZGIgKXtcclxuICAgICAgICAgICAgaWYoZXJyKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3IgaXMgPT0gPiBcIiAsIGVycik7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJVcGRhdGUgU3VjY2Vzc1wiKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgYnRuQ2hlY2soKXtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdmFyIHJlc3VsdDtcclxuICAgICAgICBodHRwLnJlcXVlc3QoeyBcclxuICAgICAgICAgICAgICAgIHVybDogc2VsZi5zdHJVUkwgK1wiL3VzZXJzLzFcIiAsIFxyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiBcIkdFVFwiIFxyXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIHZhciBvYmogPSByZXNwb25zZS5jb250ZW50LnRvSlNPTigpO1xyXG4gICAgICAgICAgICB2YXIgc3RhdHVzQ29kZSA9IHJlc3BvbnNlLnN0YXR1c0NvZGU7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInN0YXR1cyBjb2RlID0+IFwiICwgc3RhdHVzQ29kZSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KG9iaikpO1xyXG5cclxuICAgICAgICB9LCBmdW5jdGlvbiAoZSkgey8vLy8gQXJndW1lbnQgKGUpIGlzIEVycm9yIVxyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJlcnJvciBpcyBcIiAsIGUpOyAgXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaHR0cExvZ2luKCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJvbiA9PiBodHRwIExvZ2luXCIpO1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjaGVja0VtcHR5KCl7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwidXNlcm5hbWUgPT09PiBcIiAsIHNlbGYudXNlcm5hbWUgKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInBhc3N3b3JkID09PT4gXCIgLCBzZWxmLnBhc3N3b3JkKTtcclxuXHJcbiAgICAgICAgaWYoc2VsZi51c2VybmFtZS50cmltKCkgPT0gXCJcIiB8fCBzZWxmLnBhc3N3b3JkLnRyaW0oKSA9PVwiXCIpe1xyXG4gICAgICAgICBcclxuICAgICAgICAgICAgdmFyIHRvYXN0ID0gVG9hc3QubWFrZVRleHQoXCLguKHguLXguIrguYjguK3guIfguKfguYjguLLguIfguJnguLDguYTguK3guYnguYLguIfguYhcIik7XHJcbiAgICAgICAgICAgIHRvYXN0LnNob3coKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbn1cclxuIl19