"use strict";
var core_1 = require("@angular/core");
var UserService = (function () {
    function UserService() {
    }
    UserService.prototype.register = function (user) {
        alert("About to register: " + user.email);
    };
    return UserService;
}());
UserService = __decorate([
    core_1.Injectable()
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidXNlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBMkM7QUFJM0MsSUFBYSxXQUFXO0lBQXhCO0lBSUEsQ0FBQztJQUhDLDhCQUFRLEdBQVIsVUFBUyxJQUFVO1FBQ2pCLEtBQUssQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUNILGtCQUFDO0FBQUQsQ0FBQyxBQUpELElBSUM7QUFKWSxXQUFXO0lBRHZCLGlCQUFVLEVBQUU7R0FDQSxXQUFXLENBSXZCO0FBSlksa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuL215RnVuY3Rpb24xXCI7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBVc2VyU2VydmljZSB7XHJcbiAgcmVnaXN0ZXIodXNlcjogVXNlcikge1xyXG4gICAgYWxlcnQoXCJBYm91dCB0byByZWdpc3RlcjogXCIgKyB1c2VyLmVtYWlsKTtcclxuICB9XHJcbn0iXX0=