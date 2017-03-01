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
    ListComponent.prototype.ngDoCheck = function () {
        console.log("ngDoCheck ========= > Do =====>", this.words);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUFtRDtBQUNuRCwwQ0FBeUQ7QUFDekQsZ0RBQStDO0FBUS9DLElBQWEsYUFBYTtJQVF0Qix1QkFBb0IsTUFBYztRQUFkLFdBQU0sR0FBTixNQUFNLENBQVE7UUFObEMsVUFBSyxHQUFHLEVBQUUsQ0FBQztJQU9kLENBQUM7SUFFRCxnQ0FBUSxHQUFSO1FBQ0MsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRUUsaUNBQVMsR0FBVDtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUNBQWlDLEVBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRWhFLENBQUM7SUFFRCxnQ0FBUSxHQUFSO1FBQ0YsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ1YsSUFBSSxPQUFPLEdBQVEsSUFBSSxXQUFJLEVBQUUsQ0FBQztRQUU5QixJQUFJLFNBQXNCLENBQUM7UUFFM0IsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUMsS0FBSyxFQUFDLEtBQUssQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBRS9DLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzlCLEdBQUcsQ0FBQSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRyxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRyxDQUFDLEVBQUUsRUFBQyxDQUFDO1lBQ3hDLElBQUksVUFBVSxHQUFVLElBQUksV0FBSSxFQUFFLENBQUM7WUFFbkMsVUFBVSxDQUFDLEVBQUUsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEMsVUFBVSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckMsVUFBVSxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUUsR0FBRyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRSxHQUFHLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFFLENBQUM7WUFFNUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFHaEMsQ0FBQztRQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7VUFrQkU7SUFFVCxDQUFDO0lBR0QsaUNBQVMsR0FBVCxVQUFVLElBQUk7UUFDYixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEMsK0NBQStDO1FBQ3pDLG9FQUFvRTtRQUVwRSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUUsQ0FBQztRQUNuQyxJQUFJLGdCQUFnQixHQUFxQjtZQUNyQyxXQUFXLEVBQUU7Z0JBQ1QsTUFBTSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO2FBQy9CO1NBQ0osQ0FBQztRQUNGLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsV0FBVyxDQUFDLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztJQUcxRCxDQUFDO0lBRUQsK0JBQU8sR0FBUDtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUdKLG9CQUFDO0FBQUQsQ0FBQyxBQTFGRixJQTBGRTtBQTFGVyxhQUFhO0lBSnpCLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsUUFBUTtRQUNsQixXQUFXLEVBQUUsc0JBQXNCO0tBQ3RDLENBQUM7cUNBUzhCLGVBQU07R0FSekIsYUFBYSxDQTBGeEI7QUExRlcsc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCAgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQge1JvdXRlciwgTmF2aWdhdGlvbkV4dHJhc30gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiOyBcclxuaW1wb3J0IHsgSXRlbSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvaXRlbXMvaXRlbVwiO1xyXG5pbXBvcnQgYXBwbGljYXRpb24gPSByZXF1aXJlKFwiYXBwbGljYXRpb25cIik7XHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJucy1hcHBcIixcclxuICAgIHRlbXBsYXRlVXJsOiBcInZpZXdzL2xpc3QvbWFpbi5odG1sXCIsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgICB3b3JkcyA9IFtdO1xyXG4gICAgXHJcbiAgXHJcblxyXG4gICAgXHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHtcclxuXHR9XHJcblx0XHJcblx0bmdPbkluaXQoKSB7XHJcblx0XHRsZXQgc2VsZiA9IHRoaXM7XHJcblx0XHRzZWxmLmdldFVzZXJzKCk7XHJcblx0fVxyXG5cclxuICAgIG5nRG9DaGVjaygpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwibmdEb0NoZWNrID09PT09PT09PSA+IERvID09PT09PlwiICwgdGhpcy53b3Jkcyk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VXNlcnMoKXtcclxuXHRcdGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgdG1wSXRlbTpJdGVtID0gbmV3IEl0ZW0oKTtcclxuXHJcbiAgICAgICAgdmFyIHRlbXBfbGlzdCA6IEFycmF5PGFueT47XHJcblxyXG4gICAgICAgIHRlbXBfbGlzdCA9IFtbMSxcInJlZFwiLFwi4LmB4LiU4LiHXCJdLFsyLFwiYmx1ZVwiLFwi4Lif4LmJ4LiyXCJdXTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2codGVtcF9saXN0Lmxlbmd0aCk7XHJcbiAgICAgICAgZm9yKHZhciBpID0gMCA7IGkgPCB0ZW1wX2xpc3QubGVuZ3RoIDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IG1vZGVsX2l0ZW0gOiBJdGVtID0gbmV3IEl0ZW0oKTtcclxuXHJcbiAgICAgICAgICAgIG1vZGVsX2l0ZW0uaWQgPSB0ZW1wX2xpc3RbaV1bMF07XHJcbiAgICAgICAgICAgIG1vZGVsX2l0ZW0ud29yZEVuZyA9IHRlbXBfbGlzdFtpXVsxXTtcclxuICAgICAgICAgICAgbW9kZWxfaXRlbS53b3JkVGhhaSA9IHRlbXBfbGlzdFtpXVsyXTtcclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRlbXBfbGlzdFtpXVswXSArXCIgXCIgKyB0ZW1wX2xpc3RbaV1bMV0gK1wiIFwiICsgdGVtcF9saXN0W2ldWzJdICk7XHJcblxyXG4gICAgICAgICAgICBzZWxmLndvcmRzLnB1c2gobW9kZWxfaXRlbSk7XHJcbiAgICAgICAgICAgIFxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLypcclxuICAgICAgICB0bXBJdGVtLmlkID0gMTtcclxuICAgICAgICB0bXBJdGVtLndvcmRFbmcgPSBcIlRlc3RcIjtcclxuICAgICAgICB0bXBJdGVtLndvcmRUaGFpID0gXCLguJfguJTguKrguK3guJpcIjtcclxuICAgICAgICBzZWxmLndvcmRzLnB1c2godG1wSXRlbSk7XHJcblxyXG4gICAgICAgIGxldCB0bXBJdGVtMjpJdGVtID0gbmV3IEl0ZW0oKTtcclxuICAgICAgICAgdG1wSXRlbTIuaWQgPSAyO1xyXG4gICAgICAgIHRtcEl0ZW0yLndvcmRFbmcgPSBcIlRlc3QyXCI7XHJcbiAgICAgICAgdG1wSXRlbTIud29yZFRoYWkgPSBcIuC4l+C4lOC4quC4reC4mjJcIjtcclxuICAgICAgICBzZWxmLndvcmRzLnB1c2godG1wSXRlbTIpO1xyXG5cclxuXHJcbiAgICAgICAgbGV0IHRtcEl0ZW0zOkl0ZW0gPSBuZXcgSXRlbSgpO1xyXG4gICAgICAgICB0bXBJdGVtMy5pZCA9IDM7XHJcbiAgICAgICAgdG1wSXRlbTMud29yZEVuZyA9IFwiVGVzdDNcIjtcclxuICAgICAgICB0bXBJdGVtMy53b3JkVGhhaSA9IFwi4LiX4LiU4Liq4Lit4LiaM1wiO1xyXG4gICAgICAgIHNlbGYud29yZHMucHVzaCh0bXBJdGVtMyk7XHJcbiAgICAgICAgKi9cclxuXHRcdFxyXG5cdH1cclxuXHJcblxyXG5cdG9uSXRlbVRhcChhcmdzKSB7XHJcblx0XHRsZXQgc2VsZiA9IHRoaXM7XHJcblx0XHRsZXQgd29yZCA9IHNlbGYud29yZHNbYXJncy5pbmRleF07XHJcblx0XHQvL3RoaXMucm91dGVyLm5hdmlnYXRlKFtcInZpZXctbGlzdFwiLCB3b3JkLmlkXSk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBJdGVtVGFwcGVkOiBcIiArIGFyZ3MuaW5kZXgpO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh3b3JkKSApO1xyXG4gICAgICAgIGxldCBuYXZpZ2F0aW9uRXh0cmFzOiBOYXZpZ2F0aW9uRXh0cmFzID0ge1xyXG4gICAgICAgICAgICBxdWVyeVBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgXCJ3b3JkXCI6IEpTT04uc3RyaW5naWZ5KHdvcmQpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcInZpZXctbGlzdFwiXSwgbmF2aWdhdGlvbkV4dHJhcyk7XHJcblxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGJ0bk1haW4oKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImNsaWNrIGJ1dXRvbiBtYWluXCIpO1xyXG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIm1haW5cIl0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBcclxuIH1cclxuIl19