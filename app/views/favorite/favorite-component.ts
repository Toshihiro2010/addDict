import { Component , OnInit } from "@angular/core";
import { Route } from "@angular/router";
import { Item } from "./../../models/items/item";

var Sqlite = require("nativescript-sqlite");
var Toast = require("nativescript-toast");


@Component({
    selector: "favorite",
    templateUrl: "views/favorite/favorite-component.html",
})
export class FavoriteComponent implements OnInit {
    
    private database;
    private word_sql =[]; // out put on sql
    private show_list = []; // show list on layouts
    
    

    
    constructor(){
        let self = this;
        new Sqlite("dicts.db").then(db =>{
            self.database = db;
            console.log("Open database Success");
            self.mySqlfetch();
        },error =>{
            console.log("Open DB ERROR" , error);
        })
    
        

    }

    private mySqlfetch(){
        let self = this;
        let strSQL = "SELECT * FROM dict WHERE favorite = 1";
        self.database.all(strSQL).then(result => {
            self.word_sql = result;
        },error =>{
            console.log("SELECT Favoirite Error => " , error);
            
        })
    }

    ngOnInit() {
        console.log("ngOnInit == v");
        
		let self = this;
        self.setList();
	}

    private setList(){
        let self = this;
        let word = self.word_sql;
        
        for(var row in word){ 
            let model_item : Item = new Item();       

            console.log("word on set list " , word[row]);
            model_item.id = word[row][0];
            model_item.wordEng = word[row][1] + " ";
            model_item.wordThai = word[row][2] + " ";
            model_item.wordType = " [" + word[row][3] + "] ";
            model_item.wordFavorite = word[row][4];

            self.show_list.push(model_item);
        }
        

    }

    

}
