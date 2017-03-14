"use strict";
var core_1 = require("@angular/core");
var http = require("http");
var LoginComponent = (function () {
    function LoginComponent() {
        this.username = "";
        this.password = "";
    }
    LoginComponent.prototype.btnLogin = function () {
        var self = this;
        console.log("username ===> ", self.username);
        console.log("password ===> ", self.password);
        http.getJSON("http://192.9.9.252:7080/users").then(function (r) {
            //// Argument (r) is JSON!
            console.log("Sucsess == v");
            console.log(JSON.stringify(r));
        }, function (e) {
            //// Argument (e) is Error
            console.log(e);
        });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        selector: "Login",
        templateUrl: "views/setting/login/login-component.html",
    })
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4tY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4tY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBMEM7QUFJMUMsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBTTNCLElBQWEsY0FBYztJQUozQjtRQU1ZLGFBQVEsR0FBWSxFQUFFLENBQUM7UUFDdkIsYUFBUSxHQUFZLEVBQUUsQ0FBQztJQXFCbkMsQ0FBQztJQW5CRyxpQ0FBUSxHQUFSO1FBQ0ksSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBRWhCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBRSxDQUFDO1FBQy9DLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxPQUFPLENBQUMsK0JBQStCLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQzFELDBCQUEwQjtZQUMxQixPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBRTVCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRW5DLENBQUMsRUFBRSxVQUFVLENBQUM7WUFDViwwQkFBMEI7WUFDMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuQixDQUFDLENBQUMsQ0FBQztJQUdQLENBQUM7SUFFTCxxQkFBQztBQUFELENBQUMsQUF4QkQsSUF3QkM7QUF4QlksY0FBYztJQUoxQixnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLE9BQU87UUFDakIsV0FBVyxFQUFFLDBDQUEwQztLQUMxRCxDQUFDO0dBQ1csY0FBYyxDQXdCMUI7QUF4Qlksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBVc2VycyB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvdXNlcnMvdXNlcnNcIjtcclxuXHJcblxyXG52YXIgaHR0cCA9IHJlcXVpcmUoXCJodHRwXCIpO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJMb2dpblwiLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwidmlld3Mvc2V0dGluZy9sb2dpbi9sb2dpbi1jb21wb25lbnQuaHRtbFwiLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTG9naW5Db21wb25lbnQge1xyXG5cclxuICAgIHByaXZhdGUgdXNlcm5hbWUgOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgcHJpdmF0ZSBwYXNzd29yZCA6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBcclxuICAgIGJ0bkxvZ2luKCl7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwidXNlcm5hbWUgPT09PiBcIiAsIHNlbGYudXNlcm5hbWUgKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInBhc3N3b3JkID09PT4gXCIgLCBzZWxmLnBhc3N3b3JkKTtcclxuICAgICAgICBodHRwLmdldEpTT04oXCJodHRwOi8vMTkyLjkuOS4yNTI6NzA4MC91c2Vyc1wiKS50aGVuKGZ1bmN0aW9uIChyKSB7XHJcbiAgICAgICAgICAgIC8vLy8gQXJndW1lbnQgKHIpIGlzIEpTT04hXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU3Vjc2VzcyA9PSB2XCIpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocikpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9LCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAvLy8vIEFyZ3VtZW50IChlKSBpcyBFcnJvclxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbn1cclxuIl19