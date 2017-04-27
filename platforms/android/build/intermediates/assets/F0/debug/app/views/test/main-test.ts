import { Component, OnInit ,AfterViewChecked , AfterViewInit  } from "@angular/core";
import {Router, NavigationExtras} from "@angular/router"; 
import listViewModule = require("ui/list-view");

import { Item } from "../../models/items/item";


var Sqlite = require("nativescript-sqlite");




@Component({
    selector: "ns-app",
    templateUrl: "views/test/main-test.html",
})
export class ViewComponentTest implements OnInit , AfterViewChecked , AfterViewInit {

    private database : any;

    eng_rand ="";   //word eng Random show on layout
    thai_rand = ""; //word thai Random show on layout
    type_rand ="";  //word type Random show on layout
    word_list2 = [];    //list show on layout

    word_search ="";     //ngModule input word search
    
    word_list = [];     //list sql temp 
    word_sql = "";   //output on sql


    private viewCheck = 0; // เช็คว่า เป็นส่วนไหน 0-random , 1-Search , 2-Facvortie , 3-History

    
    

    public constructor(private router: Router ){

        
        //Code ตอนที่ไม่มีอะไรเลย เริ่มสร้างจาก 1
        (new Sqlite("dicts.db")).then(db => {
            db.execSQL("CREATE TABLE IF NOT EXISTS dict (id INTEGER PRIMARY KEY AUTOINCREMENT, engWorld TEXT, thaiWorld TEXT ,type TEXT DEFAULT 'Noun',favorite NUMBER DEFAULT 0 , sTime DATE DEFAULT Null )").then(id =>{
                this.database = db;
                console.log("CREAT TABLE ===> Success ");
                //this.insert();
                this.fetch();
                this.createHistory();
                this.btnSelectRandom();
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

    ngAfterViewChecked(){
        console.log("ng ngAfterViewChecked");
        
    }
    ngAfterViewInit(){
        console.log("ng==========> AfterViewInit");
        
    }
    

    public createHistory(){
        let self = this;
        self.database.execSQL("CREATE TABLE IF NOT EXISTS HISTORY (id INTEGER PRIMARY KEY AUTOINCREMENT,word_id INTEGER ,sTime DATE)").then(id =>{
                    self.database = self.database;
                    console.log("CREATE HISTORY Success");
                },error =>{
                    console.log("CREATE TABLE HISTORY ERROR" , error);
                })
    }
    



    public insert(){
        let self = this;
        self.database.execSQL("INSERT INTO dict (engWorld, thaiWorld) VALUES (?,?)", ["red" ,"แดง"]).then(all_word => {
                console.log("INSERT RESULT => " , all_word  );
         
                self.fetch();
            }, error => {
            console.log("INSERT ERROR => " , error);
            });
    }

    public fetch(){

        let self = this;
        console.log("Go to ===> fetch");
        self.database.all("SELECT * FROM dict").then(rows =>{
            console.log(rows);
            self.word_list = rows;
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

    private fetch2(){
        let self = this;
        self.viewCheck = 1;
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
            self.refeshList();
            self.pushList(rows);
            //self.refeshList();
            //self.pushList(rows);   
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
		//self.getItem();
        //self.pushList(self.word_list);
    }

    getItem(){
        console.log("GET ITEM ================> ");
        
        let self = this;
        var temp_list : Array<any>;
        temp_list = self.word_list;
        
        for(var row in temp_list){
            let model_item : Item = new Item();

            model_item.id = temp_list[row][0];
            model_item.wordEng = temp_list[row][1];
            model_item.wordThai = temp_list[row][2];
            model_item.wordType = temp_list[row][3];
            model_item.wordFavorite = temp_list[row][4];

            //console.log(temp_list[row][0] +" " + temp_list[row][1] +" " + temp_list[row][2] );

            self.word_list2.push(model_item);
       
        }
    }

    getItemSelect(){
        let self = this;

        self.viewCheck = 1 ;

        var search = self.word_search;
        if (search == ""){
            alert("มีช่องว่างนะไอ้โง่ .....");
        }else{
            console.log("Check ==> " , "Select ===> " + search);
            var temp = search+"%";
            
            self.database.all("SELECT * FROM dict WHERE engWorld LIKE (?) or thaiWorld LIKE (?)",[temp,temp] ).then(rows =>{
                if(rows ==""){
                    console.log("not word ===>  " + rows + "is " + search);
                    alert("ไม่มีคำว่า " + search + " ในฐานข้อมูล");
                }else{
                    self.word_search = "";
                }
                
                self.word_sql = rows;
                self.refeshList();
                self.pushList(rows);
                //self.refeshList();
                //self.pushList(rows);

                },error =>{
                    console.log("SELECT ERROR " , error);
                })
            }

    }

    getItemFavorite(){
        let self = this;
        self.viewCheck = 1;


        let strSQL = "SELECT * FROM dict WHERE favorite = 1";
        self.database.all(strSQL).then(result => {
            self.word_sql = result;
            self.refeshList();
            self.pushList(self.word_sql);
        },error =>{
            console.log("SELECT Favoirite Error => " , error);
            
        })

    }

    getItemHistory(){
        let self = this;
        self.viewCheck = 1;
        
        let strSQL = "SELECT h.word_id , d.engWorld , d.thaiWorld , d.type , d.favorite FROM HISTORY h join dict d on h.word_id = d.id ORDER BY h.id DESC";
        self.database.all(strSQL).then(result => {
            self.word_sql = result;
             self.refeshList();
             self.pushList(self.word_sql);
        },error =>{
            console.log("SELECT History Error => " , error);
            
        })
    }

    btnSelectRandom(){

        //console.log("Select Random");

        let self = this;
        self.viewCheck = 0 ;
        self.refeshList();
        self.database.all("SELECT * FROM dict ORDER BY RANDOM() LIMIT 1").then(rows =>{
            console.log(rows);
            
            console.log("eng_word ==> " , rows[0][1]); // result eng
            self.eng_rand = rows[0][1];
            console.log("thai_word ==> " , rows[0][2]); //result thai
            self.thai_rand = rows[0][2];
            console.log("type word ==> " , rows[0][3]); //result type
            self.type_rand = rows[0][3];
        

        },error =>{
            console.log("SELECT ERROR " , error);
        })

        
    }

    refeshList(){
        let self = this;
        var delPop = self.word_list2.length;
            console.log("delpop length ==>" , delPop);
            if(delPop >0 ){
                for (var i = 0 ; i < delPop ; i++){
                    self.word_list2.pop();
                }
            }
    }

    pushList(args){
        let self = this;
        let rows = args;

        for(var row in rows){
            console.log(rows[row]);
            let model_item : Item = new Item();
            model_item.id = rows[row][0];
            model_item.wordEng = rows[row][1];
            model_item.wordThai = rows[row][2];
            model_item.wordType = rows[row][3];
            model_item.wordFavorite = rows[row][4];
            //console.log(rows[row][0] +" " + rows[row][1] +" " + rows[row][2] +"" );
            self.word_list2.push(model_item);
        }

    }


    onItemTap(args) {
		let self = this;
		let word = self.word_list2[args.index];

        let navigationExtras: NavigationExtras = {
            queryParams: {
                "words": JSON.stringify(word)
            }
        };
        this.router.navigate(["list-detail"], navigationExtras);
    }
    
    

    


 }
