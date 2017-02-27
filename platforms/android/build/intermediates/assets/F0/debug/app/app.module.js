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
            login_component_1.LoginComponent
        ],
        providers: [],
        schemas: [
            core_1.NO_ERRORS_SCHEMA
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUEyRDtBQUUzRCxnRkFBOEU7QUFDOUUsb0RBQW9FO0FBQ3BFLDZDQUFpRDtBQUNqRCxpREFBK0M7QUFJL0MscUNBQTZDO0FBQzdDLHFFQUEyRDtBQUMzRCxxRUFBbUU7QUFDbkUsb0RBQTBEO0FBQzFELHlFQUF1RTtBQUd2RSxpREFBaUQ7QUErQmpELElBQWEsU0FBUztJQUF0QjtJQUF5QixDQUFDO0lBQUQsZ0JBQUM7QUFBRCxDQUFDLEFBQTFCLElBQTBCO0FBQWIsU0FBUztJQTVCckIsZUFBUSxDQUFDO1FBQ04sU0FBUyxFQUFFO1lBQ1AsNEJBQVk7U0FFZjtRQUNELE9BQU8sRUFBRTtZQUNMLHdDQUFrQjtZQUNsQiw4QkFBZ0I7WUFDaEIsK0JBQXVCO1NBRzFCO1FBQ0QsWUFBWSxFQUFFO1lBQ1YsNEJBQVk7WUFDWixvQkFBYTtZQUNiLDBCQUFPO1lBQ1Asa0NBQWU7WUFDZiw2QkFBaUI7WUFDakIsZ0NBQWM7U0FFakI7UUFDRCxTQUFTLEVBQUUsRUFFVjtRQUNELE9BQU8sRUFBRTtZQUNMLHVCQUFnQjtTQUNuQjtLQUNKLENBQUM7R0FDVyxTQUFTLENBQUk7QUFBYiw4QkFBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9uYXRpdmVzY3JpcHQubW9kdWxlXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9mb3Jtc1wiXG5pbXBvcnQgeyBBcHBSb3V0aW5nTW9kdWxlIH0gZnJvbSBcIi4vYXBwLnJvdXRpbmdcIjtcbmltcG9ydCB7IEFwcENvbXBvbmVudCB9IGZyb20gXCIuL2FwcC5jb21wb25lbnRcIjtcblxuXG5cbmltcG9ydCB7IFZpZXdDb21wb25lbnQgfSBmcm9tIFwiLi92aWV3cy9tYWluXCI7XG5pbXBvcnQgeyBJbnNlcnRzIH0gZnJvbSBcIi4vdmlld3MvaW5zZXJ0cy9pbnNlcnQtY29tcG9uZW50XCI7XG5pbXBvcnQgeyBEZWxldGVDb21wb25lbnQgfSBmcm9tIFwiLi92aWV3cy9kZWxldGVzL2RlbGV0ZS1jb21wb25lbnRcIjtcbmltcG9ydCB7IFZpZXdDb21wb25lbnRUZXN0IH0gZnJvbSBcIi4vdmlld3MvdGVzdC9tYWluLXRlc3RcIlxuaW1wb3J0IHsgTG9naW5Db21wb25lbnQgfSBmcm9tIFwiLi92aWV3cy9zZXR0aW5nL2xvZ2luL2xvZ2luLWNvbXBvbmVudFwiO1xuXG5cbi8vaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gZnJvbSBcIi4vYXBwLmNvbXBvbmVudFwiO1xuXG5cbkBOZ01vZHVsZSh7XG4gICAgYm9vdHN0cmFwOiBbXG4gICAgICAgIEFwcENvbXBvbmVudCxcbiAgICAgICAgXG4gICAgXSxcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIE5hdGl2ZVNjcmlwdE1vZHVsZSxcbiAgICAgICAgQXBwUm91dGluZ01vZHVsZSxcbiAgICAgICAgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUsXG4gICAgICAgIFxuICAgICAgICBcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBBcHBDb21wb25lbnQsXG4gICAgICAgIFZpZXdDb21wb25lbnQsXG4gICAgICAgIEluc2VydHMsXG4gICAgICAgIERlbGV0ZUNvbXBvbmVudCxcbiAgICAgICAgVmlld0NvbXBvbmVudFRlc3QsXG4gICAgICAgIExvZ2luQ29tcG9uZW50XG4gICAgICAgIFxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICBcbiAgICBdLFxuICAgIHNjaGVtYXM6IFtcbiAgICAgICAgTk9fRVJST1JTX1NDSEVNQVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgQXBwTW9kdWxlIHsgfVxuIl19