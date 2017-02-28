"use strict";
var core_1 = require("@angular/core");
var LoginComponent = (function () {
    function LoginComponent() {
        this.username = "";
        this.password = "";
    }
    LoginComponent.prototype.btnLogin = function () {
        var self = this;
        console.log("username ===> ", self.username);
        console.log("password ===> ", self.password);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4tY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4tY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBMEM7QUFRMUMsSUFBYSxjQUFjO0lBSjNCO1FBTVksYUFBUSxHQUFZLEVBQUUsQ0FBQztRQUN2QixhQUFRLEdBQVksRUFBRSxDQUFDO0lBV25DLENBQUM7SUFURyxpQ0FBUSxHQUFSO1FBQ0ksSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBRWhCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBRSxDQUFDO1FBQy9DLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBR2xELENBQUM7SUFFTCxxQkFBQztBQUFELENBQUMsQUFkRCxJQWNDO0FBZFksY0FBYztJQUoxQixnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLE9BQU87UUFDakIsV0FBVyxFQUFFLDBDQUEwQztLQUMxRCxDQUFDO0dBQ1csY0FBYyxDQWMxQjtBQWRZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgVXNlcnMgfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxzL3VzZXJzL3VzZXJzXCI7XHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJMb2dpblwiLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwidmlld3Mvc2V0dGluZy9sb2dpbi9sb2dpbi1jb21wb25lbnQuaHRtbFwiLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTG9naW5Db21wb25lbnQge1xyXG5cclxuICAgIHByaXZhdGUgdXNlcm5hbWUgOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgcHJpdmF0ZSBwYXNzd29yZCA6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBcclxuICAgIGJ0bkxvZ2luKCl7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwidXNlcm5hbWUgPT09PiBcIiAsIHNlbGYudXNlcm5hbWUgKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInBhc3N3b3JkID09PT4gXCIgLCBzZWxmLnBhc3N3b3JkKTtcclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbn1cclxuIl19