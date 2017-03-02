import { Component, OnInit } from "@angular/core";
import { PageRoute } from "nativescript-angular/router"; 
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { Item } from "../../models/items/item";

var dialogs = require("ui/dialogs");
var Sqlite = require("nativescript-sqlite");

@Component({
    selector: "ns-app",
    templateUrl: "views/list-detail/detail.html",
})
export class ListDetailComponent implements OnInit {
 
    word:Item;      //word ที่ได้รับเข้ามาจาก lsit main
    favorite : any ;    // button output show on layout



    private database; // ตัวแปร Database

     public constructor(private route: ActivatedRoute) {

        let self = this;


        this.route.queryParams.subscribe(params => {
        console.log(JSON.stringify(params) );
        self.word = JSON.parse(params["words"]); // ให้ตัวแปร self.word รับค่าจาก list main ด้วยรูป json โดยส่งมาในชื่อ words ด้วยคำสั่ง params["words"]

        console.log(self.word.id);
        console.log(self.word.wordEng);
        console.log(self.word.wordThai);
        console.log(self.word.wordType);
        console.log(self.word.wordFavorite);
        
        self.favorite = self.word.wordFavorite; // ให้ favorite = 
    
        self.word.wordType = "[" + self.word.wordType + "]";


        new Sqlite("dicts.db").then(db =>{
            this.database = db;
            console.log("Open database Success");
            
        },error =>{
            console.log("Open DB ERROR" , error);
        })

        
        });
    }

    ngOnInit(){
        let self = this;
        self.myHistory();
    }

    myFavorite(){
        console.log("click Favorite");
        let self = this;
        if(self.favorite == 0 ){
            self.favorite = 1;
            self.database.execSQL("UPDATE dict SET favorite = (?) WHERE id = (?) " ,[self.favorite , self.word.id] , function(err , db ){
            if(err){
                console.log("error is == > " , err);
            }else{
                console.log("Update Success");
                
            }
        });

        }else if(self.favorite == 1){
            self.favorite = 0 ;
            self.database.execSQL("UPDATE dict SET favorite = (?) WHERE id = (?)" ,[self.favorite , self.word.id] , function(err , db ){
                if(err){
                    console.log("error is == > " , err);
                }else{
                    console.log("Update Success");
                
                }
            });
        }
        
    }

    private myHistory(){
        let self = this;
        let word_id = self.word.id;
        self.myCheckHistory(word_id);
        
        

    }

    private myCheckHistory(word_id){
        let self = this;

        self.database.all("SELECT * FROM HISTORY WHERE word_id = (?)",[word_id]).then(rows =>{
            if(rows ==""){
                self.myInsertHistory(word_id);
            }else{
                self.myDeleteHistory(word_id);
            }
        },error =>{
            console.log("SELECT ERROR " , error);
        })


        

    }

    private myDeleteHistory(word_id){
        let self = this;

        self.database.execSQL("DELETE FROM HISTORY WHERE word_id = (?)", [word_id]).then(word_delete => {
            console.log("DELETE RESULT => " , word_delete  );
            self.myInsertHistory(word_id);
            }, error => {
                console.log("DELETE ERROR => " , error);
            }
        );



    }

    private myInsertHistory(word_id){
        let self = this;
        self.database.execSQL("INSERT INTO HISTORY (word_id) VALUES (?)", [word_id]).then(word_insert => {
                console.log("INSERT RESULT => " , word_insert  );
                }, error => {
                    console.log("INSERT ERROR => " , error);
                }
        );

    }

    private fetchJoin(){
        let self = this;
        console.log("go to fetch Join ==== > ");

        self.database.all("SELECT h.id, h.word_id , d.engWorld , d.thaiWorld , d.type FROM dict d join HISTORY h on d.id = h.word_id ORDER BY h.id DESC").then(rows =>{
            for(var row in rows){
                console.log("Result ==v");
                
                /*for(var i=0 ; i <= rows.length ; i++ ){
                    console.log("result ==>" , rows[row][i]); 
                }*/
                console.log("result all ==> " , rows[row]);//result all
                /*console.log("id_History ==> " , rows[row][0]); // result eng
                console.log("word_id ==> " , rows[row][1]); // result eng
                console.log("eng_word ==> " , rows[row][2]); // result eng
                console.log("thai_word ==> " , rows[row][3]); //result thai
                console.log("word_type ==> " , rows[row][4]); //result thai*/
            }
        },error =>{
            console.log("SELECT ERROR " , error);
        })

        
        
    }

   
	  
    
 }