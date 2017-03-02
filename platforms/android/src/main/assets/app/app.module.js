"use strict";
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var forms_1 = require("nativescript-angular/forms");
var app_routing_1 = require("./app.routing");
var app_component_1 = require("./app.component");
var main_1 = require("./views/main");
var insert_component_1 = require("./views/inserts/insert-component");
var delete_component_1 = require("./views/deletes/delete-component");
var main_test_1 = require("./views/test/main-test");
var login_component_1 = require("./views/setting/login/login-component");
var main_2 = require("./views/list/main");
var view_item_1 = require("./views/views-item/view-item");
var detail_1 = require("./views/list-detail/detail");
//import { AppComponent } from "./app.component";
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        bootstrap: [
            app_component_1.AppComponent,
        ],
        imports: [
            nativescript_module_1.NativeScriptModule,
            app_routing_1.AppRoutingModule,
            forms_1.NativeScriptFormsModule,
        ],
        declarations: [
            app_component_1.AppComponent,
            main_1.ViewComponent,
            insert_component_1.Inserts,
            delete_component_1.DeleteComponent,
            main_test_1.ViewComponentTest,
            login_component_1.LoginComponent,
            main_2.ListComponent,
            view_item_1.ViewItem,
            detail_1.ListDetailComponent
        ],
        providers: [],
        schemas: [
            core_1.NO_ERRORS_SCHEMA
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUEyRDtBQUUzRCxnRkFBOEU7QUFDOUUsb0RBQW9FO0FBQ3BFLDZDQUFpRDtBQUNqRCxpREFBK0M7QUFJL0MscUNBQTZDO0FBQzdDLHFFQUEyRDtBQUMzRCxxRUFBbUU7QUFDbkUsb0RBQTBEO0FBQzFELHlFQUF1RTtBQUN2RSwwQ0FBa0Q7QUFDbEQsMERBQXdEO0FBQ3hELHFEQUFpRTtBQUtqRSxpREFBaUQ7QUFrQ2pELElBQWEsU0FBUztJQUF0QjtJQUF5QixDQUFDO0lBQUQsZ0JBQUM7QUFBRCxDQUFDLEFBQTFCLElBQTBCO0FBQWIsU0FBUztJQS9CckIsZUFBUSxDQUFDO1FBQ04sU0FBUyxFQUFFO1lBQ1AsNEJBQVk7U0FFZjtRQUNELE9BQU8sRUFBRTtZQUNMLHdDQUFrQjtZQUNsQiw4QkFBZ0I7WUFDaEIsK0JBQXVCO1NBRzFCO1FBQ0QsWUFBWSxFQUFFO1lBQ1YsNEJBQVk7WUFDWixvQkFBYTtZQUNiLDBCQUFPO1lBQ1Asa0NBQWU7WUFDZiw2QkFBaUI7WUFDakIsZ0NBQWM7WUFDZCxvQkFBYTtZQUNiLG9CQUFRO1lBQ1IsNEJBQW1CO1NBRXRCO1FBQ0QsU0FBUyxFQUFFLEVBRVY7UUFDRCxPQUFPLEVBQUU7WUFDTCx1QkFBZ0I7U0FDbkI7S0FDSixDQUFDO0dBQ1csU0FBUyxDQUFJO0FBQWIsOEJBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbmF0aXZlc2NyaXB0Lm1vZHVsZVwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZm9ybXNcIlxuaW1wb3J0IHsgQXBwUm91dGluZ01vZHVsZSB9IGZyb20gXCIuL2FwcC5yb3V0aW5nXCI7XG5pbXBvcnQgeyBBcHBDb21wb25lbnQgfSBmcm9tIFwiLi9hcHAuY29tcG9uZW50XCI7XG5cblxuXG5pbXBvcnQgeyBWaWV3Q29tcG9uZW50IH0gZnJvbSBcIi4vdmlld3MvbWFpblwiO1xuaW1wb3J0IHsgSW5zZXJ0cyB9IGZyb20gXCIuL3ZpZXdzL2luc2VydHMvaW5zZXJ0LWNvbXBvbmVudFwiO1xuaW1wb3J0IHsgRGVsZXRlQ29tcG9uZW50IH0gZnJvbSBcIi4vdmlld3MvZGVsZXRlcy9kZWxldGUtY29tcG9uZW50XCI7XG5pbXBvcnQgeyBWaWV3Q29tcG9uZW50VGVzdCB9IGZyb20gXCIuL3ZpZXdzL3Rlc3QvbWFpbi10ZXN0XCJcbmltcG9ydCB7IExvZ2luQ29tcG9uZW50IH0gZnJvbSBcIi4vdmlld3Mvc2V0dGluZy9sb2dpbi9sb2dpbi1jb21wb25lbnRcIjtcbmltcG9ydCB7IExpc3RDb21wb25lbnQgfSBmcm9tIFwiLi92aWV3cy9saXN0L21haW5cIjtcbmltcG9ydCB7IFZpZXdJdGVtIH0gZnJvbSBcIi4vdmlld3Mvdmlld3MtaXRlbS92aWV3LWl0ZW1cIjtcbmltcG9ydCB7IExpc3REZXRhaWxDb21wb25lbnQgfSBmcm9tIFwiLi92aWV3cy9saXN0LWRldGFpbC9kZXRhaWxcIjtcblxuXG5cblxuLy9pbXBvcnQgeyBBcHBDb21wb25lbnQgfSBmcm9tIFwiLi9hcHAuY29tcG9uZW50XCI7XG5cblxuQE5nTW9kdWxlKHtcbiAgICBib290c3RyYXA6IFtcbiAgICAgICAgQXBwQ29tcG9uZW50LFxuICAgICAgICBcbiAgICBdLFxuICAgIGltcG9ydHM6IFtcbiAgICAgICAgTmF0aXZlU2NyaXB0TW9kdWxlLFxuICAgICAgICBBcHBSb3V0aW5nTW9kdWxlLFxuICAgICAgICBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSxcbiAgICAgICAgXG4gICAgICAgIFxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIEFwcENvbXBvbmVudCxcbiAgICAgICAgVmlld0NvbXBvbmVudCxcbiAgICAgICAgSW5zZXJ0cyxcbiAgICAgICAgRGVsZXRlQ29tcG9uZW50LFxuICAgICAgICBWaWV3Q29tcG9uZW50VGVzdCxcbiAgICAgICAgTG9naW5Db21wb25lbnQsXG4gICAgICAgIExpc3RDb21wb25lbnQsXG4gICAgICAgIFZpZXdJdGVtLFxuICAgICAgICBMaXN0RGV0YWlsQ29tcG9uZW50XG4gICAgICAgIFxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICBcbiAgICBdLFxuICAgIHNjaGVtYXM6IFtcbiAgICAgICAgTk9fRVJST1JTX1NDSEVNQVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgQXBwTW9kdWxlIHsgfVxuIl19