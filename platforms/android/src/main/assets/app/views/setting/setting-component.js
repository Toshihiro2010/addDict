"use strict";
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var http = require("http");
var Toast = require("nativescript-toast");
var SettingComponent = (function () {
    function SettingComponent(router) {
        this.router = router;
        this.status = 0;
    }
    SettingComponent.prototype.signIn = function () {
        var self = this;
        console.log("click = >", "signIn");
        self.router.navigate(["./login"]), {
            transition: {
                name: "flip",
                dutation: 2000,
                curve: "linear"
            }
        };
    };
    return SettingComponent;
}());
SettingComponent = __decorate([
    core_1.Component({
        selector: "setting",
        templateUrl: "views/setting/setting-component.html",
    }),
    __metadata("design:paramtypes", [router_1.Router])
], SettingComponent);
exports.SettingComponent = SettingComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZy1jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzZXR0aW5nLWNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQTBDO0FBQzFDLDBDQUEyRDtBQUkzRCxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDM0IsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFNMUMsSUFBYSxnQkFBZ0I7SUFHekIsMEJBQW9CLE1BQWU7UUFBZixXQUFNLEdBQU4sTUFBTSxDQUFTO1FBRjNCLFdBQU0sR0FBRyxDQUFDLENBQUU7SUFJcEIsQ0FBQztJQUVPLGlDQUFNLEdBQWQ7UUFDSSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUcsUUFBUSxDQUFDLENBQUE7UUFDbkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFDO1lBQzlCLFVBQVUsRUFBRTtnQkFDUixJQUFJLEVBQUcsTUFBTTtnQkFDYixRQUFRLEVBQUUsSUFBSTtnQkFDZCxLQUFLLEVBQUUsUUFBUTthQUNsQjtTQUNKLENBQUE7SUFFTCxDQUFDO0lBT0wsdUJBQUM7QUFBRCxDQUFDLEFBekJELElBeUJDO0FBekJZLGdCQUFnQjtJQUo1QixnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLFNBQVM7UUFDbkIsV0FBVyxFQUFFLHNDQUFzQztLQUN0RCxDQUFDO3FDQUkrQixlQUFNO0dBSDFCLGdCQUFnQixDQXlCNUI7QUF6QlksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUm91dGVyLCBOYXZpZ2F0aW9uRXh0cmFzIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiOyBcclxuXHJcblxyXG5cclxudmFyIGh0dHAgPSByZXF1aXJlKFwiaHR0cFwiKTtcclxudmFyIFRvYXN0ID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC10b2FzdFwiKTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwic2V0dGluZ1wiLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwidmlld3Mvc2V0dGluZy9zZXR0aW5nLWNvbXBvbmVudC5odG1sXCIsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTZXR0aW5nQ29tcG9uZW50IHtcclxuICAgIHByaXZhdGUgc3RhdHVzID0gMCA7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXIgOiBSb3V0ZXIpe1xyXG5cclxuICAgIH0gICBcclxuXHJcbiAgICBwcml2YXRlIHNpZ25Jbigpe1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBjb25zb2xlLmxvZyhcImNsaWNrID0gPlwiICwgXCJzaWduSW5cIilcclxuICAgICAgICBzZWxmLnJvdXRlci5uYXZpZ2F0ZShbXCIuL2xvZ2luXCJdKSx7XHJcbiAgICAgICAgICAgIHRyYW5zaXRpb246IHtcclxuICAgICAgICAgICAgICAgIG5hbWUgOiBcImZsaXBcIiAsXHJcbiAgICAgICAgICAgICAgICBkdXRhdGlvbjogMjAwMCxcclxuICAgICAgICAgICAgICAgIGN1cnZlOiBcImxpbmVhclwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblxyXG4gICAgXHJcbiAgICAgXHJcblxyXG59XHJcbiJdfQ==