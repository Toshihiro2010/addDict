"use strict";
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var dialogs = require("ui/dialogs");
var ViewItem = (function () {
    function ViewItem(route) {
        this.route = route;
        var self = this;
        this.route.queryParams.subscribe(function (params) {
            console.log(JSON.stringify(params));
            self.word = JSON.parse(params["word"]);
        });
    }
    return ViewItem;
}());
ViewItem = __decorate([
    core_1.Component({
        selector: "ns-app",
        templateUrl: "views/views-item/view-item.html",
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute])
], ViewItem);
exports.ViewItem = ViewItem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy1pdGVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidmlldy1pdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBa0Q7QUFHbEQsMENBQStDO0FBRS9DLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQU1wQyxJQUFhLFFBQVE7SUFHaEIsa0JBQTJCLEtBQXFCO1FBQXJCLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQzVDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsVUFBQSxNQUFNO1lBQ25DLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBRSxDQUFDO1lBQ3RDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUMxQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFSixlQUFDO0FBQUQsQ0FBQyxBQVhGLElBV0U7QUFYVyxRQUFRO0lBSnBCLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsUUFBUTtRQUNsQixXQUFXLEVBQUUsaUNBQWlDO0tBQ2pELENBQUM7cUNBSXFDLHVCQUFjO0dBSHhDLFFBQVEsQ0FXbkI7QUFYVyw0QkFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUGFnZVJvdXRlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiOyBcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQge0FjdGl2YXRlZFJvdXRlfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IEl0ZW0gfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2l0ZW1zL2l0ZW1cIjtcclxudmFyIGRpYWxvZ3MgPSByZXF1aXJlKFwidWkvZGlhbG9nc1wiKTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwibnMtYXBwXCIsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCJ2aWV3cy92aWV3cy1pdGVtL3ZpZXctaXRlbS5odG1sXCIsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBWaWV3SXRlbSAge1xyXG4gXHJcbiAgICB3b3JkOkl0ZW07XHJcbiAgICAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlKSB7XHJcbiAgICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICB0aGlzLnJvdXRlLnF1ZXJ5UGFyYW1zLnN1YnNjcmliZShwYXJhbXMgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShwYXJhbXMpICk7XHJcbiAgICAgICAgICAgc2VsZi53b3JkID0gSlNPTi5wYXJzZShwYXJhbXNbXCJ3b3JkXCJdKTsgIFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cdCAgXHJcbiB9XHJcbiJdfQ==