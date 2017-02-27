import { Component} from "@angular/core";

import { Router } from "@angular/router";

var Sqlite = require("nativescript-sqlite");



@Component({
    selector: "view_test",
    templateUrl: "views/test/main-test.html",
})
export class ViewComponentTest {

    private database : any;
    public eng_word : Array<any>;
    public thai_word : Array<any>;

    word_search ="";
    
    word_list :Array<any>;
    

    public constructor(private router: Router ){


        //Code ตอนที่ไม่มีอะไรเลย เริ่มสร้างจาก 1
        (new Sqlite("dicts.db")).then(db => {
            db.execSQL("CREATE TABLE IF NOT EXISTS dict (id INTEGER PRIMARY KEY AUTOINCREMENT, engWorld TEXT, thaiWorld TEXT)").then(id =>{
                this.database = db;
                console.log("CREAT TABLE ===> Success ");
                //this.insert();
                this.fetch();
            },error =>{
                
                console.log("CREATE TABLE ERROR" , error);
            }
        )   
        },error =>{
            console.log("OPEN DB ERROR" , error);
        })

        //เรียกใช้ database ที่มีอยู่แล้วชื่อ dicts.db
        /*new Sqlite("dicts.db").then(db =>{
            this.database = db;
            console.log("Open database Success")
            
        },error =>{
            console.log("Open DB ERROR" , error);
        })
        */

        
    }
    



    public insert(){
        this.database.execSQL("INSERT INTO dict (engWorld, thaiWorld) VALUES (?,?)", ["red" ,"แดง"]).then(all_word => {
                console.log("INSERT RESULT => " , all_word  );
                console.log(this.eng_word + " " + this.eng_word);
                
                this.fetch();
            }, error => {
            console.log("INSERT ERROR => " , error);
            });
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

    btnInsert(){
        console.log("click btnInsert");
        this.router.navigate(["insert"]),{
            transition: {
                name : "flip" ,
                dutation: 2000,
                curve: "linear"
            }
        }
        
    }

    btnSelect(){
        var search = this.word_search;
        if (search == ""){
            alert("มีช่องว่างนะไอ้โง่ .....");
        }else{
            console.log("Check ==> " , "Select ===> " + search);
             var temp = "%"+search+"%";
            
            this.database.all("SELECT * FROM dict WHERE engWorld LIKE (?) or thaiWorld LIKE (?)",[temp,temp] ).then(rows =>{
                if(rows ==""){
                    console.log("not word ===>  " + rows + "is " + search);
                    alert("ไม่มีคำว่า " + search + " ในฐานข้อมูล");
                }
                this.word_list = rows;
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
    btnDelete(){
        console.log("Check == > " , " Delete");
        this.router.navigate(["delete"]),{
            transition :{
                name : "flip" ,
                dutation: 2000,
                curve: "linear"
            }
        }
         
    }

    


 }
