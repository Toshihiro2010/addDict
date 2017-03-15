import { Component } from "@angular/core";
import { Users } from "../../../models/users/users";


var http = require("http");
var Toast = require("nativescript-toast");

@Component({
    selector: "Login",
    templateUrl: "views/setting/login/login-component.html",
})
export class LoginComponent {

    private username : string = "";
    private password : string = "";

    private strURL : string = "http://192.9.9.112:30";

    private btnLogin(){
        let self = this;
        var checkEmpty = self.checkEmpty();
        console.log("empty word  ==>" , checkEmpty);
        if( checkEmpty == true){
            http.request({ 
                url: self.strURL +"/users/"+self.username , 
                method: "GET" 
            }).then(function (response) {
                var statusCode = response.statusCode;
                if(statusCode != 200){
                    
                }else{
                    var obj = response.content.toJSON();
                    console.log(JSON.stringify(obj));
                }
                console.log("status code => " , statusCode);
                
            }, function (e) {//// Argument (e) is Error!
                console.log("error is " , e);  
            });
        }
        
    }
    private btnCheck(){
        let self = this;
        var result;
        http.request({ 
                url: self.strURL +"/users/1" , 
                method: "GET" 
        }).then(function (response) {
            var obj = response.content.toJSON();
            var statusCode = response.statusCode;

            console.log("status code => " , statusCode);
            console.log(JSON.stringify(obj));

        }, function (e) {//// Argument (e) is Error!

            console.log("error is " , e);  
        });

    }

    private httpLogin(){
        console.log("on => http Login");
        let self = this;

    }

    private checkEmpty(){
        let self = this;
        console.log("username ===> " , self.username );
        console.log("password ===> " , self.password);

        if(self.username.trim() == "" || self.password.trim() ==""){
         
            var toast = Toast.makeText("มีช่องว่างนะไอ้โง่");
            toast.show();
            return false;
        }else{
            return true;
        }
        
    }



}
