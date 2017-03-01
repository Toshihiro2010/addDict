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
 
    word:Item;
    favorite : any ;



    private database;

     public constructor(private route: ActivatedRoute) {
        let self = this;
        this.route.queryParams.subscribe(params => {
        console.log(JSON.stringify(params) );
        self.word = JSON.parse(params["words"]);  

        console.log(self.word.id);
        console.log(self.word.wordEng);
        console.log(self.word.wordThai);
        console.log(self.word.wordType);
        console.log(self.word.wordFavorite);
        
        self.favorite = self.word.wordFavorite;
    
        self.word.wordType = "[" + self.word.wordType + "]";
        });
    }

    ngOnInit(){
        new Sqlite("dicts.db").then(db =>{
            this.database = db;
            console.log("Open database Success");
            
        },error =>{
            console.log("Open DB ERROR" , error);
        })
    }

    myFavorite(){
        console.log("click Favorite");
        let self = this;
        if(self.favorite == 0 ){
            self.favorite = 1;
            self.database.execSQL("UPDATE dict SET favorite = (?) WHERE id = (?)" ,[self.favorite , self.word.id] , function(err , db ){
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
	  
    
 }
