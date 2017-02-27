"use strict";
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var item_1 = require("../../models/items/item");
var ListComponent = (function () {
    function ListComponent(router) {
        this.router = router;
        this.words = [];
    }
    ListComponent.prototype.ngOnInit = function () {
        var self = this;
        self.getUsers();
    };
    ListComponent.prototype.getUsers = function () {
        var self = this;
        var tmpItem = new item_1.Item();
        var temp_list;
        temp_list = [[1, "red", "แดง"], [2, "blue", "ฟ้า"]];
        console.log(temp_list.length);
        for (var i = 0; i < temp_list.length; i++) {
            var model_item = new item_1.Item();
            model_item.id = temp_list[i][0];
            model_item.wordEng = temp_list[i][1];
            model_item.wordThai = temp_list[i][2];
            console.log(temp_list[i][0] + " " + temp_list[i][1] + " " + temp_list[i][2]);
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
    };
    ListComponent.prototype.onItemTap = function (args) {
        var self = this;
        var word = self.words[args.index];
        //this.router.navigate(["view-list", word.id]);
        //console.log("------------------------ ItemTapped: " + args.index);
        console.log(JSON.stringify(word));
        var navigationExtras = {
            queryParams: {
                "word": JSON.stringify(word)
            }
        };
        this.router.navigate(["view-list"], navigationExtras);
    };
    ListComponent.prototype.btnMain = function () {
        console.log("click buuton main");
        this.router.navigate(["main"]);
    };
    return ListComponent;
}());
ListComponent = __decorate([
    core_1.Component({
        selector: "ns-app",
        templateUrl: "views/list/main.html",
    }),
    __metadata("design:paramtypes", [router_1.Router])
], ListComponent);
exports.ListComponent = ListComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUFrRDtBQUNsRCwwQ0FBeUQ7QUFDekQsZ0RBQStDO0FBTS9DLElBQWEsYUFBYTtJQUl0Qix1QkFBb0IsTUFBYztRQUFkLFdBQU0sR0FBTixNQUFNLENBQVE7UUFGbEMsVUFBSyxHQUFHLEVBQUUsQ0FBQztJQUdkLENBQUM7SUFFRCxnQ0FBUSxHQUFSO1FBQ0MsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRUUsZ0NBQVEsR0FBUjtRQUNGLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUNWLElBQUksT0FBTyxHQUFRLElBQUksV0FBSSxFQUFFLENBQUM7UUFFOUIsSUFBSSxTQUFzQixDQUFDO1FBRTNCLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFDLEtBQUssRUFBQyxLQUFLLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUUvQyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM5QixHQUFHLENBQUEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUcsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUcsQ0FBQyxFQUFFLEVBQUMsQ0FBQztZQUN4QyxJQUFJLFVBQVUsR0FBVSxJQUFJLFdBQUksRUFBRSxDQUFDO1lBRW5DLFVBQVUsQ0FBQyxFQUFFLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLFVBQVUsQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXRDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFFLEdBQUcsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUUsR0FBRyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBRSxDQUFDO1lBRTVFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBR2hDLENBQUM7UUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VBa0JFO1FBQ1IsRUFBRTtJQUNILENBQUM7SUFHRCxpQ0FBUyxHQUFULFVBQVUsSUFBSTtRQUNiLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUNoQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsQywrQ0FBK0M7UUFDekMsb0VBQW9FO1FBRXBFLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBRSxDQUFDO1FBQ25DLElBQUksZ0JBQWdCLEdBQXFCO1lBQ3JDLFdBQVcsRUFBRTtnQkFDVCxNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7YUFDL0I7U0FDSixDQUFDO1FBQ0YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxXQUFXLENBQUMsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFRCwrQkFBTyxHQUFQO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBQ0osb0JBQUM7QUFBRCxDQUFDLEFBN0VGLElBNkVFO0FBN0VXLGFBQWE7SUFKekIsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxRQUFRO1FBQ2xCLFdBQVcsRUFBRSxzQkFBc0I7S0FDdEMsQ0FBQztxQ0FLOEIsZUFBTTtHQUp6QixhQUFhLENBNkV4QjtBQTdFVyxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHtSb3V0ZXIsIE5hdmlnYXRpb25FeHRyYXN9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjsgXHJcbmltcG9ydCB7IEl0ZW0gfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2l0ZW1zL2l0ZW1cIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwibnMtYXBwXCIsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCJ2aWV3cy9saXN0L21haW4uaHRtbFwiLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gICAgd29yZHMgPSBbXTtcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikge1xyXG5cdH1cclxuXHRcclxuXHRuZ09uSW5pdCgpIHtcclxuXHRcdGxldCBzZWxmID0gdGhpcztcclxuXHRcdHNlbGYuZ2V0VXNlcnMoKTtcclxuXHR9XHJcblxyXG4gICAgZ2V0VXNlcnMoKXtcclxuXHRcdGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgdG1wSXRlbTpJdGVtID0gbmV3IEl0ZW0oKTtcclxuXHJcbiAgICAgICAgdmFyIHRlbXBfbGlzdCA6IEFycmF5PGFueT47XHJcblxyXG4gICAgICAgIHRlbXBfbGlzdCA9IFtbMSxcInJlZFwiLFwi4LmB4LiU4LiHXCJdLFsyLFwiYmx1ZVwiLFwi4Lif4LmJ4LiyXCJdXTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2codGVtcF9saXN0Lmxlbmd0aCk7XHJcbiAgICAgICAgZm9yKHZhciBpID0gMCA7IGkgPCB0ZW1wX2xpc3QubGVuZ3RoIDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IG1vZGVsX2l0ZW0gOiBJdGVtID0gbmV3IEl0ZW0oKTtcclxuXHJcbiAgICAgICAgICAgIG1vZGVsX2l0ZW0uaWQgPSB0ZW1wX2xpc3RbaV1bMF07XHJcbiAgICAgICAgICAgIG1vZGVsX2l0ZW0ud29yZEVuZyA9IHRlbXBfbGlzdFtpXVsxXTtcclxuICAgICAgICAgICAgbW9kZWxfaXRlbS53b3JkVGhhaSA9IHRlbXBfbGlzdFtpXVsyXTtcclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRlbXBfbGlzdFtpXVswXSArXCIgXCIgKyB0ZW1wX2xpc3RbaV1bMV0gK1wiIFwiICsgdGVtcF9saXN0W2ldWzJdICk7XHJcblxyXG4gICAgICAgICAgICBzZWxmLndvcmRzLnB1c2gobW9kZWxfaXRlbSk7XHJcbiAgICAgICAgICAgIFxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLypcclxuICAgICAgICB0bXBJdGVtLmlkID0gMTtcclxuICAgICAgICB0bXBJdGVtLndvcmRFbmcgPSBcIlRlc3RcIjtcclxuICAgICAgICB0bXBJdGVtLndvcmRUaGFpID0gXCLguJfguJTguKrguK3guJpcIjtcclxuICAgICAgICBzZWxmLndvcmRzLnB1c2godG1wSXRlbSk7XHJcblxyXG4gICAgICAgIGxldCB0bXBJdGVtMjpJdGVtID0gbmV3IEl0ZW0oKTtcclxuICAgICAgICAgdG1wSXRlbTIuaWQgPSAyO1xyXG4gICAgICAgIHRtcEl0ZW0yLndvcmRFbmcgPSBcIlRlc3QyXCI7XHJcbiAgICAgICAgdG1wSXRlbTIud29yZFRoYWkgPSBcIuC4l+C4lOC4quC4reC4mjJcIjtcclxuICAgICAgICBzZWxmLndvcmRzLnB1c2godG1wSXRlbTIpO1xyXG5cclxuXHJcbiAgICAgICAgbGV0IHRtcEl0ZW0zOkl0ZW0gPSBuZXcgSXRlbSgpO1xyXG4gICAgICAgICB0bXBJdGVtMy5pZCA9IDM7XHJcbiAgICAgICAgdG1wSXRlbTMud29yZEVuZyA9IFwiVGVzdDNcIjtcclxuICAgICAgICB0bXBJdGVtMy53b3JkVGhhaSA9IFwi4LiX4LiU4Liq4Lit4LiaM1wiO1xyXG4gICAgICAgIHNlbGYud29yZHMucHVzaCh0bXBJdGVtMyk7XHJcbiAgICAgICAgKi9cclxuXHRcdC8vXHJcblx0fVxyXG5cclxuXHJcblx0b25JdGVtVGFwKGFyZ3MpIHtcclxuXHRcdGxldCBzZWxmID0gdGhpcztcclxuXHRcdGxldCB3b3JkID0gc2VsZi53b3Jkc1thcmdzLmluZGV4XTtcclxuXHRcdC8vdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1widmlldy1saXN0XCIsIHdvcmQuaWRdKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIEl0ZW1UYXBwZWQ6IFwiICsgYXJncy5pbmRleCk7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHdvcmQpICk7XHJcbiAgICAgICAgbGV0IG5hdmlnYXRpb25FeHRyYXM6IE5hdmlnYXRpb25FeHRyYXMgPSB7XHJcbiAgICAgICAgICAgIHF1ZXJ5UGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICBcIndvcmRcIjogSlNPTi5zdHJpbmdpZnkod29yZClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1widmlldy1saXN0XCJdLCBuYXZpZ2F0aW9uRXh0cmFzKTtcclxuICAgIH1cclxuXHJcbiAgICBidG5NYWluKCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJjbGljayBidXV0b24gbWFpblwiKTtcclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCJtYWluXCJdKTtcclxuICAgIH1cclxuIH1cclxuIl19