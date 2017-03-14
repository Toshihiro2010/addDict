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
    
    private btnLogin(){
        let self = this;
        
        console.log("username ===> " , self.username );
        console.log("password ===> " , self.password);
        http.request({ url: "http://192.9.9.112:30/users", method: "GET" }).then(function (response) {
        //// Argument (response) is HttpResponse!
        //// Content property of the response is HttpContent!
        var obj = response.content.toJSON();
        console.log(JSON.stringify(obj));
        
       
        }, function (e) {
            //// Argument (e) is Error!
            console.log(e);
            
        });
        
        
    }
    private btnCheck(){
        http.getJSON("https://httpbin.org/get").then(function (r) {
            //// Argument (r) is JSON!
            console.log("Sucsess == v");
            
            console.log(JSON.stringify(r));
            
        }, function (e) {
            //// Argument (e) is Error
            console.log(e);
        });

    }

}
