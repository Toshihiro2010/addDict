import { Component, OnInit  , AfterViewInit  } from "@angular/core";
import { Router, NavigationExtras } from "@angular/router"; 
import listViewModule = require("ui/list-view");

import { Item } from "../models/items/item";
import { WordItem } from "../models/items/items_word";
import { MyDatabase } from "../models/myDb/myDB"

import { RouterExtensions } from "nativescript-angular";
import * as application from "application";
import { AndroidApplication, AndroidActivityBackPressedEventData } from "application";
import { isAndroid } from "platform";

var Sqlite = require("nativescript-sqlite");
var fs = require("file-system");
    
@Component({
    selector: "ns-app",
    templateUrl: "views/main.html",
})
export class ViewComponent implements OnInit , AfterViewInit {

    private database : any;
    private db_word = [] ;  //เก็บไฟล์ ในรูปของ object ในโฟลเดอร์ file/database 
    private my_db;  //เก็บ path file Database
    private my_db_path;  //เก็บ path file Database
    private file_length ; //เก็บเพื่อทราบ row file
    private temp_sql = ""; //เก็บ คำสั่ง sql เพื่อใช้ refesh ใหม่
 


    word_rand ="";   //word eng Random show on layout
    mean_rand = ""; //word thai Random show on layout
    type_rand ="";  //word type Random show on layout
    word_list2 = [];    //list show on layout

    word_search ="";     //ngModule input word search-
    
    word_list = [];     //list sql temp 
    word_sql = "";   //output on sql
    private db_file_check = 0;


    private viewCheck = 0; // เช็คว่า เป็นส่วนไหน 0-random , 1-listview 

    
    

    public constructor(private router: Router ){
        let self = this;

        //Code ตอนที่ไม่มีอะไรเลย เริ่มสร้างจาก 1
        (new Sqlite("dicts.db")).then(db => {
                self.database = db;
              
                self.createHistory();
                self.createMyUser();
                self.createFavorite();
                
        },error =>{
            console.log("OPEN DB ERROR" , error);
        })

        self.myDb();

        if(self.db_file_check != 0 ){
            (new Sqlite(self.my_db_path)).then(db =>{
                self.my_db = db;
                console.log("Open database Success");
                self.btnSelectRandom();
            },error =>{
                console.log("Open DB ERROR" , error);
            })
        }

        

        
    }

    

    //  function use for listview
    ngOnInit(): void {
        let self = this;
        console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
		//self.getItem();
        //self.pushList(self.word_list);
        if (!isAndroid) {
          return;
        }
        application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
            console.log('AndroidApplication.activityBackPressedEvent');
            self.btnSelectRandom();
            self.check_DB_FILE();
        });
    }

    private check_DB_FILE(){
        console.log("***************");
        let self = this;
        self.check_file();

        if(self.file_length != self.db_word.length){
            self.file_length = self.db_word.length;

            if(self.file_length== 0){
                console.log("Not DATABASE");
            
            }else if(self.file_length == 1){
                self.db_file_check =1;

                self.my_db_path = self.db_word[0].path;
                console.log("my_db => " +  self.my_db_path);
                //self.btnSelectRandom();

            }else if(self.file_length > 1){
                self.db_file_check = 1;
                //console.log(self.file_length);
                for(let i = 0 ; i < self.file_length; i++){
                    if(self.db_word[i].name == "EngToTha.db"){
                        self.my_db_path = self.db_word[i].path;
                    }

                    if(i = self.file_length -1 ){
                        if(self.my_db_path == ""){
                            self.my_db_path = self.db_word[0].path;
                        }
                    }
                }
            }
            self.useDB_Open_File();
        }
    }

    private check_file(){
        let self = this;
        console.log("in => check_file" );
        let doc = fs.knownFolders.documents();
        let my_path = doc.getFolder("database");
        //console.log(JSON.stringify(my_path));

        let temp = my_path.getEntitiesSync();
        //console.log("temp => " , JSON.stringify(temp));
        for(let i in temp){
            let model_db : MyDatabase = new MyDatabase();

            if(temp[i].extension == ".db"){
                model_db.name = temp[i].name;
                model_db.path = temp[i].path;
                self.db_word.push(model_db);
            }  
        }
    }

    private useDB_Open_File(){
        console.log("***************");
        let self = this;
        if(self.db_file_check != 0 ){
            (new Sqlite(self.my_db_path)).then(db =>{
                self.my_db = db;
                console.log("Open database Success");
                
            },error =>{
                console.log("Open DB ERROR" , error);
            })
        }
    }

    myDb(){
        let self = this;
        console.log("in => self.mydb" );
        let doc = fs.knownFolders.documents();
        let my_path = doc.getFolder("database");
        //console.log(JSON.stringify(my_path));

        let temp = my_path.getEntitiesSync();
        //console.log("temp => " , JSON.stringify(temp));
        for(let i in temp){
            //console.log("i" , JSON.stringify(temp[i]));
            let model_db : MyDatabase = new MyDatabase();
            if(temp[i].extension == ".db"){
                //let temp2 = [temp[i].name , temp[i].path];
                model_db.name = temp[i].name;
                model_db.path = temp[i].path;
                //let temp2 = [1][1];;
                self.db_word.push(model_db);
            }  
        }
        if(self.file_length != self.db_word.length){
            self.file_length = self.db_word.length;
        }

        if(self.file_length== 0){
            console.log("Not DATABASE");
          
        }else if(self.file_length == 1){
            self.db_file_check =1;

            self.my_db_path = self.db_word[0].path;
            console.log("my_db => " +  self.my_db_path);
            //self.btnSelectRandom();

        }else if(self.file_length > 1){
            self.db_file_check = 1;
            //console.log(self.file_length);
            for(let i = 0 ; i < self.file_length; i++){
                if(self.db_word[i].name == "EngToTha.db"){
                    self.my_db_path = self.db_word[i].path;
                }

                if(i = self.file_length -1 ){
                    if(self.my_db_path == ""){
                        self.my_db_path = self.db_word[0].path;
                    }
                }
            }
        }

    }


    ngAfterViewInit(){
        console.log("ng==========> AfterViewInit");
        
    }
    

    private createHistory(){
        let self = this;
        self.database.execSQL("CREATE TABLE IF NOT EXISTS HISTORY (id INTEGER PRIMARY KEY AUTOINCREMENT,word_id INTEGER ,dict_search TEXT , dict_meaning TEXT)").then(id =>{
            self.database = self.database;
            console.log("CREATE HISTORY Success");
        },error =>{
            console.log("CREATE TABLE HISTORY ERROR" , error);
        })
    }

    private createFavorite(){   
        let self = this;
        self.database.execSQL("CREATE TABLE IF NOT EXISTS FAVORITE (id INTEGER PRIMARY KEY AUTOINCREMENT,word_id INTEGER )").then(id =>{
            self.database = self.database;
            console.log("CREATE FAVORITE Success");
        },error =>{
             console.log("CREATE TABLE FAVORITE ERROR" , error);
        })
    }

    private createMyUser(){
        let self = this;
        self.database.execSQL("CREATE TABLE IF NOT EXISTS USERS (id INTEGER PRIMARY KEY AUTOINCREMENT,username TEXT , name TEXT , status INTEGER , login INTEGER DEFAULT 0 )").then(id =>{
            self.database = self.database;
            console.log("CREATE USERS Success");
        },error =>{
             console.log("CREATE TABLE USERS ERROR" , error);
        });
    }
    


    private fetch2(){
        let self = this;
        self.viewCheck = 1;
     
        if(self.db_file_check != 0 ){
            self.my_db.all("SELECT dict_no , dict_search , dict_meaning FROM words WHERE dict_no > 400 LIMit 10").then(rows =>{
                //console.log(rows);
                self.word_list = rows;
                self.refeshList();
                self.pushList(rows);
                
            },error =>{
                console.log("SELECT ERROR " , error);
            })
        }else{
            console.log("No DATABASE");
            
        }
        
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
        let self = this;
        var search = self.word_search;
        if (search == ""){
            alert("มีช่องว่างนะไอ้โง่ .....");
        }else{
            console.log("Check ==> " , "Select ===> " + search);
            var temp = "%"+search+"%";
            let strSQL = "SELECT dict_no , dict_search , dict_meaning FROM words WHERE dict_search LIKE " + temp;
            
            self.my_db.all(strSQL).then(rows =>{
                if(rows ==""){
                    console.log("not word ===>  " + rows + "is " + search);
                    alert("ไม่มีคำว่า " + search + " ในฐานข้อมูล");
                }
                self.temp_sql = strSQL;
                self.word_list = rows;
                for(var row in rows){
                    console.log("Result ==v");
                    console.log("result all ==> " , rows[row]);//result all
                    console.log("eng_word ==> " , rows[row][1]); // result eng
                    console.log("thai_word ==> " , rows[row][2]); 
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
    }


    getItem(){
        console.log("GET ITEM ================> ");
        
        let self = this;
        var temp_list : Array<any>;
        temp_list = self.word_list;
    
         for(var row in temp_list){
            let model_word : WordItem = new WordItem();

            model_word.id = temp_list[row][0];
            model_word.dict_search = temp_list[row][1];
            model_word.dict_meaning = temp_list[row][2];

            self.word_list2.push(model_word);
       
        }
    }

    getItemSelect(){
        let self = this;

        self.viewCheck = 1 ;
        if(self.db_file_check != 0 ){
            var search = self.word_search;
            if (search == ""){
                
                alert("มีช่องว่างนะไอ้โง่ .....");
            }else{
                console.log("Check ==> " , "Select ===> " + search);
                var temp = search+'%';
              
                self.my_db.all("SELECT dict_no , dict_search , dict_meaning FROM words WHERE dict_search LIKE (?)",[temp] ).then(rows =>{
                    if(rows ==""){
                        console.log("not word ===>  " + rows + "is " + search);
                        alert("ไม่มีคำว่า " + search + " ในฐานข้อมูล");
                    }else{
                        self.word_search = "";
                    }
                    
                    self.word_sql = rows;
                    self.refeshList();
                    self.pushList(rows);
                   
                    },error =>{
                        console.log("SELECT ERROR " , error);
                    })
            }
        }else{
            alert("NO Databse .....");
        }
        

    }
    // FAVORiTE AND HISTORY NO USE
    getItemFavorite(){
        let self = this;
        self.viewCheck = 1;


        let strSQL = "SELECT word_id FROM FAVORITE";
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
        
        let strSQL = "SELECT dict_no , dict_search , dict_meaning FROM HISTORY ORDER BY id DESC";
        self.database.all(strSQL).then(result => {
            self.word_sql = result;
             self.refeshList();
             self.pushList(self.word_sql);
        },error =>{
            console.log("SELECT History Error => " , error);
            
        })
    }

    btnSelectRandom(){
        let self = this;

        if(self.db_file_check != 0 ){
            self.viewCheck = 0 ;
            self.refeshList();
            self.my_db.all("SELECT dict_no , dict_search , dict_meaning FROM words WHERE dict_no > 400 ORDER BY RANDOM() LIMIT 1").then(rows =>{
                console.log(rows);
                
                console.log("eng_word ==> " , rows[0][1]); // result word
                self.word_rand = rows[0][1];
                console.log("thai_word ==> " , rows[0][2]); //result mean word
                self.mean_rand = rows[0][2];

            
            },error =>{
                console.log("SELECT ERROR " , error);
            })
        }else{
            alert("กรุณาโหลด Dicttionnary ในหน้า setting");
        }
        

        
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
            let model_word : WordItem = new WordItem();
            model_word.id = rows[row][0];
            model_word.dict_search = rows[row][1];
            model_word.dict_meaning = rows[row][2];

            self.word_list2.push(model_word);
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

    onSetting(){
        console.log("Check == > " , " onSetting");
        this.router.navigate(["setting"]),{
            
        }
    
    }

    myOnResume(){
        let self = this;
        if (self.viewCheck == 1 ) {
            self.refeshList();
        }
        
    }
    
 }
