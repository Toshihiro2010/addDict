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



    private database;

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
        });
    }

    ngOnInit(){
        let self = this;
        new Sqlite("dicts.db").then(db =>{
            this.database = db;
            console.log("Open database Success");
            
        },error =>{
            console.log("Open DB ERROR" , error);
        })

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
        console.log("Method === > " , "myHistory ==== > ==> " , self.word.id);
        

    }

    private fetchJoin(){
        let self = this;
        console.log("go to fetch Join ==== > ");
        
    }

   
	  
    
 }
