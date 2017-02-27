import { Component, OnInit } from "@angular/core";
import {Router, NavigationExtras} from "@angular/router"; 
import { Item } from "../../models/items/item";

@Component({
    selector: "ns-app",
    templateUrl: "views/list/main.html",
})
export class ListComponent implements OnInit {

    words = [];
    
    constructor(private router: Router) {
	}
	
	ngOnInit() {
		let self = this;
		self.getUsers();
	}

    getUsers(){
		let self = this;
        let tmpItem:Item = new Item();

        var temp_list : Array<any>;

        temp_list = [[1,"red","แดง"],[2,"blue","ฟ้า"]];

        console.log(temp_list.length);
        for(var i = 0 ; i < temp_list.length ; i++){
            let model_item : Item = new Item();

            model_item.id = temp_list[i][0];
            model_item.wordEng = temp_list[i][1];
            model_item.wordThai = temp_list[i][2];

            console.log(temp_list[i][0] +" " + temp_list[i][1] +" " + temp_list[i][2] );

            self.words.push(model_item);
            

        }
        
        /*
        tmpItem.id = 1;
        tmpItem.wordEng = "Test";
        tmpItem.wordThai = "ทดสอบ";
        self.words.push(tmpItem);

        let tmpItem2:Item = new Item();
         tmpItem2.id = 2;
        tmpItem2.wordEng = "Test2";
        tmpItem2.wordThai = "ทดสอบ2";
        self.words.push(tmpItem2);


        let tmpItem3:Item = new Item();
         tmpItem3.id = 3;
        tmpItem3.wordEng = "Test3";
        tmpItem3.wordThai = "ทดสอบ3";
        self.words.push(tmpItem3);
        */
		//
	}


	onItemTap(args) {
		let self = this;
		let word = self.words[args.index];
		//this.router.navigate(["view-list", word.id]);
        //console.log("------------------------ ItemTapped: " + args.index);

        console.log(JSON.stringify(word) );
        let navigationExtras: NavigationExtras = {
            queryParams: {
                "word": JSON.stringify(word)
            }
        };
        this.router.navigate(["view-list"], navigationExtras);
    }

    btnMain(){
        console.log("click buuton main");
        this.router.navigate(["main"]);
    }
 }
