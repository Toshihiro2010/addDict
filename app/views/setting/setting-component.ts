import { Component } from "@angular/core";
import { Router, NavigationExtras } from "@angular/router"; 
import { DownloadManager } from 'nativescript-downloadmanager';


var fs = require("file-system");
var http = require("http");
var Toast = require("nativescript-toast");

@Component({
    selector: "setting",
    templateUrl: "views/setting/setting-component.html",
})
export class SettingComponent {

    private status = 0 ;
    private url_EngToThai = "http://self.enconcept.com:8090/addict_databases/EngToTha.db"
    private url_EngToEng = "http://self.enconcept.com:8090/addict_databases/EngToEng.db";

    constructor(private router : Router){

    }   

    private signIn(){
        let self = this;
        console.log("click = >" , "signIn")
        self.router.navigate(["./login"]),{
            transition: {
                name : "flip" ,
                dutation: 2000,
                curve: "linear"
            }
        }

    }

    //***************************************************************************************************

    private btnCheck(){
        let self = this;

    }
    private btnEngToThai(){
        console.log("Button => EngToThai");
        let self = this;

        let dm = new DownloadManager();
        dm.downloadFile(self.url_EngToThai ,function(result , file_path){
            console.log("result => " , result);
            console.log("uri => " , file_path);

           
            let p:string = file_path;
            var error;
            var sourceFile = fs.File.fromPath(p.replace('file://',''));
            console.log(sourceFile.path);
            console.log(sourceFile.name);
            console.log('Exist '+fs.File.exists(sourceFile.path));
            console.log('Locked'+ sourceFile.isLocked);
            // console.log('Rename'+ documents1.rename('E2E.db'));
            //  var documents2 = fs.File.fromPath('/data/org.nativescript.test6/files/EngToEng.db');

            var source = sourceFile.readSync(e=> { 
                error = e; 
            });
            let doc = fs.knownFolders.documents();

            let path_d = doc.getFolder("database");
    
            let destinationFile =  path_d.getFile(sourceFile.name);
            destinationFile.writeSync(source, e=> { error = e; });
            
 
            
            dm.unregisterBroadcast();
            //alert("กรุณาปิด application แล้วเปิดใหม่");
        });
        
    }

    private btnEngToEng(){
        console.log("Button => EngToEng");
        let self = this;

        let dm = new DownloadManager();
        dm.downloadFile(self.url_EngToEng ,function(result , file_path){
            console.log("result => " , result);
            console.log("uri => " , file_path);

           
            let p:string = file_path;
            var error;
            var sourceFile = fs.File.fromPath(p.replace('file://',''));
            console.log(sourceFile.path);
            console.log(sourceFile.name);
            console.log('Exist '+fs.File.exists(sourceFile.path));
            console.log('Locked'+ sourceFile.isLocked);
            // console.log('Rename'+ documents1.rename('E2E.db'));
            //  var documents2 = fs.File.fromPath('/data/org.nativescript.test6/files/EngToEng.db');

            var source = sourceFile.readSync(e=> { 
                error = e; 
            });
            let doc = fs.knownFolders.documents();

            let path_d = doc.getFolder("database");
    
            let destinationFile =  path_d.getFile(sourceFile.name);
            destinationFile.writeSync(source, e=> { error = e; });
            
 
            
            dm.unregisterBroadcast();
            //alert("กรุณาปิด application แล้วเปิดใหม่");
        });
        
    }

    
     

}
