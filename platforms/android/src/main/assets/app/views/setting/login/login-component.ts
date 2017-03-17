import { Component } from "@angular/core";
import { User } from "../../../shared/myFunction1";
import { Router, NavigationExtras , Route } from "@angular/router"; 



var http = require("http");
var Toast = require("nativescript-toast");

@Component({
    selector: "Login",
    templateUrl: "views/setting/login/login-component.html",
})
export class LoginComponent {

    private username : string = "" ;
    private password : string = "" ;
  

    private strURL : string = "http://192.9.9.112:30";

    constructor(private router: Router ){
        let self = this;
        
    }

    private btnLogin(){
        let self = this;
        var checkEmpty = self.checkEmpty();
        console.log("empty word  ==>" , checkEmpty);
        if( checkEmpty == true){

            http.request({ 
                url: self.strURL +"/login/"+ self.username + "/"+self.password, 
                method: "GET" 
            }).then(function (response) {

                var statusCode = response.statusCode;
                console.log("status code => " , statusCode);
                if(statusCode != 200){
                    var toast = Toast.makeText("ไม่มี user และ password นี้ในระบบ");
                    toast.show();

                }else{
                    var obj = response.content.toJSON();
                    console.log(JSON.stringify(obj));
                    self.router.navigate(["./main"]);
                    //self.routerExtensions.navigate(["user/list"], { clearHistory: true });
                }//end else statusCode
              
                
            }, function (e) {//// Argument (e) is Error!
                console.log("error is " , e);  
            });
        }// End if checkEmpty
        
    }

    private myResultReturn(){

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
