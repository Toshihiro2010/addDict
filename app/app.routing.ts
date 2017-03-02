import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";


import { AppComponent } from "./app.component";
import { ViewComponent } from "./views/main";
import { Inserts } from "./views/inserts/insert-component";
import { DeleteComponent } from "./views/deletes/delete-component";
import { ViewComponentTest } from "./views/test/main-test";
import { LoginComponent } from "./views/setting/login/login-component";
import { ListComponent } from "./views/list/main";
import { ViewItem } from "./views/views-item/view-item";
import { ListDetailComponent } from "./views/list-detail/detail";


const routes: Routes = [
    { path: "", redirectTo: "/main", pathMatch: "full" },
    { path: "insert" , component : Inserts },
    { path: "main" , component : ViewComponent},
    { path: "sample" , component : AppComponent},
    { path: "delete" , component : DeleteComponent},
    { path: "view_test" , component : ViewComponentTest},
    { path: "login" , component : LoginComponent},
    { path: "list" , component: ListComponent },
    { path: "view-list" , component: ViewItem },
    { path: "list-detail" , component:ListDetailComponent}
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})

export class AppRoutingModule { }