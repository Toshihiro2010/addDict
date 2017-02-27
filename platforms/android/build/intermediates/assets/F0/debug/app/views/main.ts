import { Component } from "@angular/core";

import { Router } from "@angular/router";
import { Item } from "./item";
var Sqlite = require("nativescript-sqlite");



@Component({
    selector: "ns-app",
    templateUrl: "views/main.html",
})
export class ViewComponent {

    private database : any;
    public eng_word : Array<any>;
    public thai_word : Array<any>;

    items : Item[];
    word_search ="";
    
    word_list :Array<any>;
    

    public constructor(private router: Router ){


        //Code ตอนที่ไม่มีอะไรเลย เริ่มสร้างจาก 1
        (new Sqlite("dicts.db")).then(db => {
            db.execSQL("CREATE TABLE IF NOT EXISTS dict (id INTEGER PRIMARY KEY AUTOINCREMENT, engWorld TEXT, thaiWorld TEXT ,type TEXT DEFAULT 'Noun' , sTime DATE DEFAULT Null )").then(id =>{
                this.database = db;
                console.log("CREAT TABLE ===> Success ");
                //this.insert();
                this.fetch();
                db.execSQL("CREATE TABLE IF NOT EXISTS FAVORITE (id INTEGER PRIMARY KEY AUTOINCREMENT,word_id INTEGER)").then(id =>{
                    this.database = db;
                    console.log("CREATE FAVORITE Success");
                    this.createHistory();
                },error =>{
                    console.log("CREATE TABLE FAVORITE ERROR" , error);
                });
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

    public createHistory(){
        this.database.execSQL("CREATE TABLE IF NOT EXISTS HISTORY (id INTEGER PRIMARY KEY AUTOINCREMENT,word_id INTEGER ,sTime DATE)").then(id =>{
                    this.database = this.database;
                    console.log("CREATE HISTORY Success");
                },error =>{
                    console.log("CREATE TABLE HISTORY ERROR" , error);
                })
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
            console.log(rows);
            /*for(var row in rows){
                console.log("Result ==v");
            
                console.log("result all ==> " , rows[row]);//result all
                console.log("eng_word ==> " , rows[row][1]); // result eng
                console.log("thai_word ==> " , rows[row][2]); //result thai
                console.log("type word ==> " , rows[row][3]); //result thai
            }*/
            for(var i=0 ; i < rows.length ; i++ ){
                    console.log("result ==>" , rows[i]); 
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



    //  function use for listview
    /*ngOnInit(): void {
        this.items = this.word_list;
    }*/

    btnSelectRandom(){
        console.log("Select Random");
        this.database.all("SELECT * FROM dict ORDER BY RANDOM() LIMIT 1").then(rows =>{
            console.log(rows);
            /*for(var row in rows){
                console.log("Result ==v");
            
                console.log("result all ==> " , rows[row]);//result all
                console.log("eng_word ==> " , rows[row][1]); // result eng
                console.log("thai_word ==> " , rows[row][2]); //result thai
                console.log("type word ==> " , rows[row][3]); //result thai
            }*/
            for(var i=0 ; i < rows.length ; i++ ){
                    console.log("result for row ==>" , rows[i]); 
                }
        },error =>{
            console.log("SELECT ERROR " , error);
        })
    }
    

    


 }
