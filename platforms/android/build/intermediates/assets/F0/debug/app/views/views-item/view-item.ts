import { Component, OnInit } from "@angular/core";
import { PageRoute } from "nativescript-angular/router"; 
import { Router } from "@angular/router";
import {ActivatedRoute} from "@angular/router";
import { Item } from "../../models/items/item";
var dialogs = require("ui/dialogs");

@Component({
    selector: "ns-app",
    templateUrl: "views/views-item/view-item.html",
})
export class ViewItem  {
 
    word:Item;
     public constructor(private route: ActivatedRoute) {
         let self = this;
        this.route.queryParams.subscribe(params => {
            console.log(JSON.stringify(params) );
           self.word = JSON.parse(params["word"]);  
        });
    }
	  
 }
