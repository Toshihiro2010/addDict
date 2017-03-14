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
        http.request({ url: "http://192.9.9.112:30/users", method: "GET" }).then(function (response) {
            //// Argument (response) is HttpResponse!
            //// Content property of the response is HttpContent!
            var obj = response.content.toJSON();
            console.log(JSON.stringify(obj));
        }, function (e) {
            //// Argument (e) is Error!
            console.log(e);
        });
    };
    LoginComponent.prototype.btnCheck = function () {
        http.getJSON("https://httpbin.org/get").then(function (r) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4tY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4tY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBMEM7QUFJMUMsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBTTNCLElBQWEsY0FBYztJQUozQjtRQU1ZLGFBQVEsR0FBWSxFQUFFLENBQUM7UUFDdkIsYUFBUSxHQUFZLEVBQUUsQ0FBQztJQW9DbkMsQ0FBQztJQWxDVyxpQ0FBUSxHQUFoQjtRQUNJLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUVoQixPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFHLElBQUksQ0FBQyxRQUFRLENBQUUsQ0FBQztRQUMvQyxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLFFBQVE7WUFDM0YseUNBQXlDO1lBQ3pDLHFEQUFxRDtZQUNyRCxJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3BDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBR2pDLENBQUMsRUFBRSxVQUFVLENBQUM7WUFDViwyQkFBMkI7WUFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVuQixDQUFDLENBQUMsQ0FBQztJQUdQLENBQUM7SUFDTyxpQ0FBUSxHQUFoQjtRQUNJLElBQUksQ0FBQyxPQUFPLENBQUMseUJBQXlCLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQ3BELDBCQUEwQjtZQUMxQixPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBRTVCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRW5DLENBQUMsRUFBRSxVQUFVLENBQUM7WUFDViwwQkFBMEI7WUFDMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuQixDQUFDLENBQUMsQ0FBQztJQUVQLENBQUM7SUFFTCxxQkFBQztBQUFELENBQUMsQUF2Q0QsSUF1Q0M7QUF2Q1ksY0FBYztJQUoxQixnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLE9BQU87UUFDakIsV0FBVyxFQUFFLDBDQUEwQztLQUMxRCxDQUFDO0dBQ1csY0FBYyxDQXVDMUI7QUF2Q1ksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBVc2VycyB9IGZyb20gXCIuLi8uLi8uLi9tb2RlbHMvdXNlcnMvdXNlcnNcIjtcclxuXHJcblxyXG52YXIgaHR0cCA9IHJlcXVpcmUoXCJodHRwXCIpO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJMb2dpblwiLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwidmlld3Mvc2V0dGluZy9sb2dpbi9sb2dpbi1jb21wb25lbnQuaHRtbFwiLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTG9naW5Db21wb25lbnQge1xyXG5cclxuICAgIHByaXZhdGUgdXNlcm5hbWUgOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgcHJpdmF0ZSBwYXNzd29yZCA6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBcclxuICAgIHByaXZhdGUgYnRuTG9naW4oKXtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ1c2VybmFtZSA9PT0+IFwiICwgc2VsZi51c2VybmFtZSApO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwicGFzc3dvcmQgPT09PiBcIiAsIHNlbGYucGFzc3dvcmQpO1xyXG4gICAgICAgIGh0dHAucmVxdWVzdCh7IHVybDogXCJodHRwOi8vMTkyLjkuOS4xMTI6MzAvdXNlcnNcIiwgbWV0aG9kOiBcIkdFVFwiIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgLy8vLyBBcmd1bWVudCAocmVzcG9uc2UpIGlzIEh0dHBSZXNwb25zZSFcclxuICAgICAgICAvLy8vIENvbnRlbnQgcHJvcGVydHkgb2YgdGhlIHJlc3BvbnNlIGlzIEh0dHBDb250ZW50IVxyXG4gICAgICAgIHZhciBvYmogPSByZXNwb25zZS5jb250ZW50LnRvSlNPTigpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KG9iaikpO1xyXG4gICAgICAgIFxyXG4gICAgICAgXHJcbiAgICAgICAgfSwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgLy8vLyBBcmd1bWVudCAoZSkgaXMgRXJyb3IhXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgIH1cclxuICAgIHByaXZhdGUgYnRuQ2hlY2soKXtcclxuICAgICAgICBodHRwLmdldEpTT04oXCJodHRwczovL2h0dHBiaW4ub3JnL2dldFwiKS50aGVuKGZ1bmN0aW9uIChyKSB7XHJcbiAgICAgICAgICAgIC8vLy8gQXJndW1lbnQgKHIpIGlzIEpTT04hXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU3Vjc2VzcyA9PSB2XCIpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocikpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9LCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAvLy8vIEFyZ3VtZW50IChlKSBpcyBFcnJvclxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==