import { Component, OnInit } from "@angular/core";
import {Router, NavigationExtras} from "@angular/router"; 

import { Item } from "../models/items/item";


var Sqlite = require("nativescript-sqlite");




@Component({
    selector: "ns-app",
    templateUrl: "views/main.html",
})
export class ViewComponent implements OnInit {

    private database : any;

    eng_rand ="";
    thai_rand = "";
    type_rand ="";

    word_search ="";
    
    word_list = [];
    word_list2 = [];

    
    

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
                    this.btnSelectRandom();
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

        //this.btnSelectRandom();
        //this.items = new Item();
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
         
                this.fetch();
            }, error => {
            console.log("INSERT ERROR => " , error);
            });
    }

    public fetch(){
        console.log("Go to ===> fetch");
        this.database.all("SELECT * FROM dict").then(rows =>{
            console.log(rows);
            this.word_list = rows;
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
        this.btnSelectRandom();
        
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
            
        }
        this.btnSelectRandom();
         
    }



    //  function use for listview
    ngOnInit(): void {
        let self = this;
		self.getItem();
    }

    onItemTap(args) {
		let self = this;
		let word = self.word_list2[args.index];
		//this.router.navigate(["view-list", word.id]);
        //console.log("------------------------ ItemTapped: " + args.index);

        console.log(JSON.stringify(word) );
        let navigationExtras: NavigationExtras = {
            queryParams: {
                "word": JSON.stringify(word)
            }
        };
        this.router.navigate(["list-detail"], navigationExtras);
    }

    getItem(){
        console.log("GET ITEM ================> ");
        
        let self = this;
        var temp_list : Array<any>;
        temp_list = self.word_list;


        console.log("temp_list ===== > ",temp_list);
        console.log("temp_list ===== > ",temp_list.length);
        
        for(var row in temp_list){
            console.log(temp_list[row]);

            let model_item : Item = new Item();

            model_item.id = temp_list[row][0];
            model_item.wordEng = temp_list[row][1];
            model_item.wordThai = temp_list[row][2];

            console.log(temp_list[row][0] +" " + temp_list[row][1] +" " + temp_list[row][2] );

            self.word_list2.push(model_item);
            
        }
        
       

    }

    btnSelectRandom(){
        //console.log("Select Random");

        this.database.all("SELECT * FROM dict ORDER BY RANDOM() LIMIT 1").then(rows =>{
            console.log(rows);
            
            console.log("eng_word ==> " , rows[0][1]); // result eng
            this.eng_rand = rows[0][1];
            //this.items.wordEng = rows[0][1];
            //console.log("eng_word ITEM ==> " , this.items.wordEng); // result eng
            
            console.log("thai_word ==> " , rows[0][2]); //result thai
            this.thai_rand = rows[0][2];
            //this.items.wordThai = rows[0][2];
            //console.log("eng_thai ITEM ==> " , this.items.wordThai); // result eng


            console.log("type word ==> " , rows[0][3]); //result type
            this.type_rand = rows[0][3];
            //this.items.wordType = rows[0][3];
            //console.log("eng_type ITEM ==> " , this.items.wordType); // result eng

            /*for(var row in rows){
                console.log("Result ==v");
            
                console.log("result all ==> " , rows[0][0]);//result all

                console.log("eng_word ==> " , rows[row][1]); // result eng
                this.eng_rand = rows[row][1];
            
                console.log("thai_word ==> " , rows[row][2]); //result thai
                this.thai_rand = rows[row][2];


                console.log("type word ==> " , rows[row][3]); //result type
                this.type_rand = rows[row][3];
            }*/
            /*for(var i=0 ; i < rows.length ; i++ ){
                    console.log("result for row ==>" , rows[i]); 
                }*/


            //this.eng_rand = rows[1];

        },error =>{
            console.log("SELECT ERROR " , error);
        })

        
    }
    

    


 }
