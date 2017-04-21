import { Component } from "@angular/core";
import { Router, NavigationExtras } from "@angular/router"; 



var http = require("http");
var Toast = require("nativescript-toast");

@Component({
    selector: "setting",
    templateUrl: "views/setting/setting-component.html",
})
export class SettingComponent {
    private status = 0 ;

    constructor(private router : Router){

    }   

    private signIn(){
        let self = this;
        console.log("click = >" , "signIn")
        self.router.navigate(["./login"]),{
            transition: {
                name : "flip" ,
                dutation: 2000,
                curve: "linear"
            }
        }

    }

    //***************************************************************************************************

    private btnCheck(){
        let self = this;

    }
    private btnEngToEng(){
        console.log("Button => EngToEng");
        let self = this;
        
    }

    
     

}
