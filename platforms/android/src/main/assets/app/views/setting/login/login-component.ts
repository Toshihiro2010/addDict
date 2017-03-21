import { Component } from "@angular/core";
import { User } from "../../../shared/myFunction1";
import { Router, NavigationExtras , Route } from "@angular/router"; 
import { RouterExtensions } from "nativescript-angular/router";
import { Users } from "../../../models/users/users";


var http = require("http");
var Toast = require("nativescript-toast");
var Sqlite = require("nativescript-sqlite");


@Component({
    selector: "Login",
    templateUrl: "views/setting/login/login-component.html",
})
export class LoginComponent {

    private username : string = "" ;
    private password : string = "" ;
    private database : any;
    private status_login = 0;


    private user = [] ;

    private strURL : string = "http://192.168.3.93:30";

    constructor(private router: Router , private routerExtensions : RouterExtensions ){
        let self = this;
        new Sqlite("dicts.db").then(db =>{
            self.database = db;
            console.log("Open database Success");
        },error =>{
            console.log("Open DB ERROR" , error);
        })
        
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
                    //obj = JSON.stringify(obj);
                    //self.rejectList();
                    self.objToDatabase(obj);
                    //self.routerExtensions.navigate(["./main"], { clearHistory: true });
                    //self.routerExtensions.navigate(["user/list"], { clearHistory: true });
                }//end else statusCode
              
                
            }, function (e) {//// Argument (e) is Error!
                console.log("error is " , e);  
            });
        }// End if checkEmpty
        
    }
    
    private rejectList(){
        let self = this;
        let temp = self.user.length;
        for(var i = 0 ; i < temp; i++){
            self.user.pop();
        }
    }

    private objToDatabase(objUSer){
        let self = this;
        self.status_login = 1;
        console.log(objUSer);
        
        let model_user = new Users();
        model_user.id = objUSer[0].id;
        model_user.username = objUSer[0].username;
        model_user.name = objUSer[0].name;
        model_user.status = objUSer[0].status;
        
        let temp_id = model_user.id;
        let temp_username = model_user.username;
        let temp_name = model_user.name;
        let temp_status = model_user.status;

        console.log("object user stringdify => " , JSON.stringify(model_user));
        
        self.database.all("SELECT * FROM USERS WHERE username = (?)",[temp_username]).then(rows =>{
            if(rows ==""){
                self.myInsertUser(model_user);
            }else{
                self.myChangUser(temp_username);
            }
        },error =>{
            console.log("SELECT ERROR " , error);
        })
    }

    private btnLogout(){
        let self = this;
        console.log("botton Logout => ");
        self.status_login = 0;
    }

    private myInsertUser(model_user){
        let self = this;
        console.log("My inert user =>");
        self.database.execSQL("INSERT INTO USERS (id , username , name , status , login ) VALUES (? , ? , ? , ? , ?)", 
        [model_user.id ,model_user.username , model_user.name , model_user.status , 1 ]).then(word_insert => {
                console.log("INSERT RESULT => " , word_insert  );
                }, error => {
                    console.log("INSERT ERROR => " , error);
                }
        );
    }

    private myChangUser(arg){
        console.log("My chang User => " , arg);
        let self = this;

        self.database.execSQL("UPDATE USERS SET login = 1 WHERE id = (?) " ,[arg] , function(err , db ){
            if(err){
                console.log("error is == > " , err);
            }else{
                console.log("Update Success");
                
            }
        });
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
