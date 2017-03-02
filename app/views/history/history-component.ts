import { Component , OnInit } from "@angular/core";
import { Route } from "@angular/router";
import { Item } from "./../../models/items/item";

var Sqlite = require("nativescript-sqlite");
var Toast = require("nativescript-toast");

@Component({
    selector: "ng-app",
    templateUrl: "views/history/history-component.html",
})
export class HistoryComponent implements OnInit {

    private database;
    private word_sql :string; // out put on sql


    private show_list; // show list on layout

    
    constructor(){
        new Sqlite("dicts.db").then(db =>{
            this.database = db;
            console.log("Open database Success");
            
        },error =>{
            console.log("Open DB ERROR" , error);
        })

    }

    ngOnInit() {
		let self = this;
        let strSQL = "SELECT h.id, h.word_id , d.engWorld , d.thaiWorld , d.type FROM HISTORY h join dict d on h.word_id = d.id ORDER BY h.id DESC";
        self.database.all(strSQL).then(result => {
            self.word_sql = result;
            for(var row in result){
                console.log("result all ===> " , result[row]);// result all
                
            }
        },error =>{
            console.log("SELECT History Error => " , error);
            
        })
		self.getItem();
	}

    getItem(){
		let self = this;
        let word_sql = self.word_sql;
        console.log(word_sql[0]);


	}

    

}
