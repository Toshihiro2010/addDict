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
var history_component_1 = require("./views/history/history-component");
var favorite_component_1 = require("./views/favorite/favorite-component");
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
            detail_1.ListDetailComponent,
            history_component_1.HistoryComponent,
            favorite_component_1.FavoriteComponent
        ],
        providers: [],
        schemas: [
            core_1.NO_ERRORS_SCHEMA
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUEyRDtBQUUzRCxnRkFBOEU7QUFDOUUsb0RBQW9FO0FBQ3BFLDZDQUFpRDtBQUNqRCxpREFBK0M7QUFJL0MscUNBQTZDO0FBQzdDLHFFQUEyRDtBQUMzRCxxRUFBbUU7QUFDbkUsb0RBQTBEO0FBQzFELHlFQUF1RTtBQUN2RSwwQ0FBa0Q7QUFDbEQsMERBQXdEO0FBQ3hELHFEQUFpRTtBQUNqRSx1RUFBcUU7QUFDckUsMEVBQXdFO0FBSXhFLGlEQUFpRDtBQW9DakQsSUFBYSxTQUFTO0lBQXRCO0lBQXlCLENBQUM7SUFBRCxnQkFBQztBQUFELENBQUMsQUFBMUIsSUFBMEI7QUFBYixTQUFTO0lBakNyQixlQUFRLENBQUM7UUFDTixTQUFTLEVBQUU7WUFDUCw0QkFBWTtTQUVmO1FBQ0QsT0FBTyxFQUFFO1lBQ0wsd0NBQWtCO1lBQ2xCLDhCQUFnQjtZQUNoQiwrQkFBdUI7U0FHMUI7UUFDRCxZQUFZLEVBQUU7WUFDViw0QkFBWTtZQUNaLG9CQUFhO1lBQ2IsMEJBQU87WUFDUCxrQ0FBZTtZQUNmLDZCQUFpQjtZQUNqQixnQ0FBYztZQUNkLG9CQUFhO1lBQ2Isb0JBQVE7WUFDUiw0QkFBbUI7WUFDbkIsb0NBQWdCO1lBQ2hCLHNDQUFpQjtTQUVwQjtRQUNELFNBQVMsRUFBRSxFQUVWO1FBQ0QsT0FBTyxFQUFFO1lBQ0wsdUJBQWdCO1NBQ25CO0tBQ0osQ0FBQztHQUNXLFNBQVMsQ0FBSTtBQUFiLDhCQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL25hdGl2ZXNjcmlwdC5tb2R1bGVcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2Zvcm1zXCJcbmltcG9ydCB7IEFwcFJvdXRpbmdNb2R1bGUgfSBmcm9tIFwiLi9hcHAucm91dGluZ1wiO1xuaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gZnJvbSBcIi4vYXBwLmNvbXBvbmVudFwiO1xuXG5cblxuaW1wb3J0IHsgVmlld0NvbXBvbmVudCB9IGZyb20gXCIuL3ZpZXdzL21haW5cIjtcbmltcG9ydCB7IEluc2VydHMgfSBmcm9tIFwiLi92aWV3cy9pbnNlcnRzL2luc2VydC1jb21wb25lbnRcIjtcbmltcG9ydCB7IERlbGV0ZUNvbXBvbmVudCB9IGZyb20gXCIuL3ZpZXdzL2RlbGV0ZXMvZGVsZXRlLWNvbXBvbmVudFwiO1xuaW1wb3J0IHsgVmlld0NvbXBvbmVudFRlc3QgfSBmcm9tIFwiLi92aWV3cy90ZXN0L21haW4tdGVzdFwiXG5pbXBvcnQgeyBMb2dpbkNvbXBvbmVudCB9IGZyb20gXCIuL3ZpZXdzL3NldHRpbmcvbG9naW4vbG9naW4tY29tcG9uZW50XCI7XG5pbXBvcnQgeyBMaXN0Q29tcG9uZW50IH0gZnJvbSBcIi4vdmlld3MvbGlzdC9tYWluXCI7XG5pbXBvcnQgeyBWaWV3SXRlbSB9IGZyb20gXCIuL3ZpZXdzL3ZpZXdzLWl0ZW0vdmlldy1pdGVtXCI7XG5pbXBvcnQgeyBMaXN0RGV0YWlsQ29tcG9uZW50IH0gZnJvbSBcIi4vdmlld3MvbGlzdC1kZXRhaWwvZGV0YWlsXCI7XG5pbXBvcnQgeyBIaXN0b3J5Q29tcG9uZW50IH0gZnJvbSBcIi4vdmlld3MvaGlzdG9yeS9oaXN0b3J5LWNvbXBvbmVudFwiO1xuaW1wb3J0IHsgRmF2b3JpdGVDb21wb25lbnQgfSBmcm9tIFwiLi92aWV3cy9mYXZvcml0ZS9mYXZvcml0ZS1jb21wb25lbnRcIjtcblxuXG5cbi8vaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gZnJvbSBcIi4vYXBwLmNvbXBvbmVudFwiO1xuXG5cbkBOZ01vZHVsZSh7XG4gICAgYm9vdHN0cmFwOiBbXG4gICAgICAgIEFwcENvbXBvbmVudCxcbiAgICAgICAgXG4gICAgXSxcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIE5hdGl2ZVNjcmlwdE1vZHVsZSxcbiAgICAgICAgQXBwUm91dGluZ01vZHVsZSxcbiAgICAgICAgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUsXG4gICAgICAgIFxuICAgICAgICBcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBBcHBDb21wb25lbnQsXG4gICAgICAgIFZpZXdDb21wb25lbnQsXG4gICAgICAgIEluc2VydHMsXG4gICAgICAgIERlbGV0ZUNvbXBvbmVudCxcbiAgICAgICAgVmlld0NvbXBvbmVudFRlc3QsXG4gICAgICAgIExvZ2luQ29tcG9uZW50LFxuICAgICAgICBMaXN0Q29tcG9uZW50LFxuICAgICAgICBWaWV3SXRlbSxcbiAgICAgICAgTGlzdERldGFpbENvbXBvbmVudCxcbiAgICAgICAgSGlzdG9yeUNvbXBvbmVudCxcbiAgICAgICAgRmF2b3JpdGVDb21wb25lbnRcbiAgICAgICAgXG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgIFxuICAgIF0sXG4gICAgc2NoZW1hczogW1xuICAgICAgICBOT19FUlJPUlNfU0NIRU1BXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBBcHBNb2R1bGUgeyB9XG4iXX0=