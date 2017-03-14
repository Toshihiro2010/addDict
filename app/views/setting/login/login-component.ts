import { Component } from "@angular/core";
import { Users } from "../../../models/users/users";


var http = require("http");

@Component({
    selector: "Login",
    templateUrl: "views/setting/login/login-component.html",
})
export class LoginComponent {

    private username : string = "";
    private password : string = "";
    
    btnLogin(){
        let self = this;
        
        console.log("username ===> " , self.username );
        console.log("password ===> " , self.password);
        http.getJSON("http://192.9.9.252:7080/users").then(function (r) {
            //// Argument (r) is JSON!
            console.log("Sucsess == v");
            
            console.log(JSON.stringify(r));
            
        }, function (e) {
            //// Argument (e) is Error
            console.log(e);
        });
        
        
    }

}
