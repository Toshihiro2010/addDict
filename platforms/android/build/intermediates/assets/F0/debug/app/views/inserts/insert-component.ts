import { Component } from "@angular/core";
import { Route } from "@angular/router";


var Sqlite = require("nativescript-sqlite");
var Toast = require("nativescript-toast");


@Component({
    selector: "Inserts",
    templateUrl: "views/inserts/insert-component.html",
})
export class Inserts {
    
    
    private database :any;
    eng_word="";
    thai_word="";


    constructor(){
        new Sqlite("dicts.db").then(db =>{
            this.database = db;
            console.log("Open database Success");
            
        },error =>{
            console.log("Open DB ERROR" , error);
        })

    }



    btnInsert(){
        console.log("Check click ==>");
        console.log("eng_word ======> " + this.eng_word);
        console.log("thai_word ======> " + this.thai_word);
        //TODO insert Thai_word , eng_word

        if(this.eng_word =="" || this.thai_word =="" ){
            var toast = Toast.makeText("มีช่องว่างนะไอ้โง่");
            toast.show();
        }else{
            this.database.execSQL("INSERT INTO dict (engWorld, thaiWorld) VALUES (?,?)", [this.eng_word ,this.thai_word]).then(all_word => {
                console.log("INSERT RESULT => " , all_word  );
                }, error => {
                    console.log("INSERT ERROR => " , error);
                }
            );
            console.log("Not Empty");

            alert("คุณได้เพิ่ม " + this.eng_word + " เรียบร้อยแล้ว");

            this.eng_word ="";
            this.thai_word="";   
        }   
    }

  

    

}