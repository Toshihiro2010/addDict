import { Component , OnInit } from "@angular/core";
import { Router , NavigationExtras } from "@angular/router"; 
import { Item } from "./../../models/items/item";


var Sqlite = require("nativescript-sqlite");
var Toast = require("nativescript-toast");

@Component({
    selector: "ng-app",
    templateUrl: "views/history/history-component.html",
})
export class HistoryComponent implements OnInit {

    private database;
    private word_sql =[]; // out put on sqllite


    private show_list = []; // show list on layouts
    
    

    
    constructor(private router: Router){
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
        let strSQL = "SELECT h.id, h.word_id , d.engWorld , d.thaiWorld , d.type , d.favorite FROM HISTORY h join dict d on h.word_id = d.id ORDER BY h.id DESC";
        self.database.all(strSQL).then(result => {
            self.word_sql = result;
        },error =>{
            console.log("SELECT History Error => " , error);
            
        })
    }

    ngOnInit(): void {
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
            model_item.id = word[row][1];
            model_item.wordEng = word[row][2] + " ";
            model_item.wordThai = word[row][3] + " ";
            model_item.wordType = " [" + word[row][4] + "] ";
            model_item.wordFavorite = word[row][5];

            self.show_list.push(model_item);
        }
        

    }

    onItemTap(args) {
		let self = this;
		let word = self.show_list[args.index];

        let navigationExtras: NavigationExtras = {
            queryParams: {
                "words": JSON.stringify(word)
            }
        };
        this.router.navigate(["list-detail"], navigationExtras);
    }

    

}
