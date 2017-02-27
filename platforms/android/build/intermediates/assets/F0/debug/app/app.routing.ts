import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";


import { AppComponent } from "./app.component";
import { ViewComponent } from "./views/main";
import { Inserts } from "./views/inserts/insert-component";
import { DeleteComponent } from "./views/deletes/delete-component";
import { ViewComponentTest } from "./views/test/main-test";
import { LoginComponent } from "./views/setting/login/login-component";


const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "insert" , component : Inserts },
    { path: "main" , component : ViewComponent},
    { path: "sample" , component : AppComponent},
    { path: "delete" , component : DeleteComponent},
    { path: "view_test" , component : ViewComponentTest},
    { path: "login" , component : LoginComponent}
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})

export class AppRoutingModule { }