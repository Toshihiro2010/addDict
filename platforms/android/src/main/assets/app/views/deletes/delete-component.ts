import { Component } from "@angular/core";

import { Route } from "@angular/router";


var Sqlite = require("nativescript-sqlite");
var Toast = require("nativescript-toast");


@Component({
    selector: "Delete",
    templateUrl: "views/deletes/delete-component.html",
})
export class DeleteComponent {
    
    
    private database :any;
    eng_word="";
    


    constructor(){
        new Sqlite("dicts.db").then(db =>{
            this.database = db;
            console.log("Open database Success");
            
        },error =>{
            console.log("Open DB ERROR" , error);
        })

    }

    btnDelete(){
        //console.log("check click == > Deltes eng_word ==> " + this.eng_word);
        if( this.eng_word ==""){
            alert("มึงมีช่องว่างนะไอ้โง่");
        }else{
            this.processDelete();
        }
        
    }

    processDelete(){
        //console.log(this.eng_word + " kuy");
        this.database.execSQL("DELETE FROM dict WHERE engWorld =(?)" , [this.eng_word]).then(id => {
                console.log("Delte RESULT => " , id  );
                if(id == 0){
                    alert("ไม่มีคำศัพท์ " + this.eng_word + "อยู่ในระบบ")
                }else{
                    alert("คุณได้ลบคำศัพท์ " + this.eng_word + " เรียบร้อยแล้ว");
                    
                }
                }, error => {
                    console.log("Delte ERROR => " , error);
                }
            );
        
    }
    

    public fetch(){
        console.log("Go to ===> fetch");
        
        this.database.all("SELECT * FROM dict").then(rows =>{
            for(var row in rows){
                console.log("Result ==v");
                
                /*for(var i=0 ; i <= rows.length ; i++ ){
                    console.log("result ==>" , rows[row][i]); 
                }*/
                console.log("result all ==> " , rows[row]);//result all
                console.log("eng_word ==> " , rows[row][1]); // result eng
                console.log("thai_word ==> " , rows[row][2]); //result thai
            }
        },error =>{
            console.log("SELECT ERROR " , error);
        })
    }
    
    
    
    

}
