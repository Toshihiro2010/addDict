import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms"
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";



import { ViewComponent } from "./views/main";
import { Inserts } from "./views/inserts/insert-component";
import { DeleteComponent } from "./views/deletes/delete-component";
import { ViewComponentTest } from "./views/test/main-test"
import { LoginComponent } from "./views/setting/login/login-component";


//import { AppComponent } from "./app.component";


@NgModule({
    bootstrap: [
        AppComponent,
        
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptFormsModule,
        
        
    ],
    declarations: [
        AppComponent,
        ViewComponent,
        Inserts,
        DeleteComponent,
        ViewComponentTest,
        LoginComponent
        
    ],
    providers: [
   
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
