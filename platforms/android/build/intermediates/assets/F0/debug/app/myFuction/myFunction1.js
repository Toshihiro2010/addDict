"use strict";
var Myfunction = (function () {
    function Myfunction() {
    }
    Myfunction.prototype.fetch = function () {
        console.log("Go to ===> fetch");
        this.database.all("SELECT * FROM dict").then(function (rows) {
            for (var row in rows) {
                console.log("Result ==v");
                /*for(var i=0 ; i <= rows.length ; i++ ){
                    console.log("result ==>" , rows[row][i]);
                }*/
                console.log("result all ==> ", rows[row]); //result all
                console.log("eng_word ==> ", rows[row][1]); // result eng
                console.log("thai_word ==> ", rows[row][2]); //result thai
            }
        }, function (error) {
            console.log("SELECT ERROR ", error);
        });
    };
    return Myfunction;
}());
exports.Myfunction = Myfunction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXlGdW5jdGlvbjEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJteUZ1bmN0aW9uMS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7SUFBQTtJQXVCQSxDQUFDO0lBbkJVLDBCQUFLLEdBQVo7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFFaEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxJQUFJO1lBQzdDLEdBQUcsQ0FBQSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFBLENBQUM7Z0JBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBRTFCOzttQkFFRztnQkFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUEsWUFBWTtnQkFDdkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhO2dCQUMxRCxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYTtZQUMvRCxDQUFDO1FBQ0wsQ0FBQyxFQUFDLFVBQUEsS0FBSztZQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFHLEtBQUssQ0FBQyxDQUFDO1FBQ3pDLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVMLGlCQUFDO0FBQUQsQ0FBQyxBQXZCRCxJQXVCQztBQXZCWSxnQ0FBVSIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBNeWZ1bmN0aW9uIHtcclxuXHJcbiAgICBwcml2YXRlIGRhdGFiYXNlIDogYW55O1xyXG5cclxuICAgIHB1YmxpYyBmZXRjaCgpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiR28gdG8gPT09PiBmZXRjaFwiKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmRhdGFiYXNlLmFsbChcIlNFTEVDVCAqIEZST00gZGljdFwiKS50aGVuKHJvd3MgPT57XHJcbiAgICAgICAgICAgIGZvcih2YXIgcm93IGluIHJvd3Mpe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJSZXN1bHQgPT12XCIpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvKmZvcih2YXIgaT0wIDsgaSA8PSByb3dzLmxlbmd0aCA7IGkrKyApe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVzdWx0ID09PlwiICwgcm93c1tyb3ddW2ldKTsgXHJcbiAgICAgICAgICAgICAgICB9Ki9cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVzdWx0IGFsbCA9PT4gXCIgLCByb3dzW3Jvd10pOy8vcmVzdWx0IGFsbFxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJlbmdfd29yZCA9PT4gXCIgLCByb3dzW3Jvd11bMV0pOyAvLyByZXN1bHQgZW5nXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInRoYWlfd29yZCA9PT4gXCIgLCByb3dzW3Jvd11bMl0pOyAvL3Jlc3VsdCB0aGFpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LGVycm9yID0+e1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNFTEVDVCBFUlJPUiBcIiAsIGVycm9yKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxufSJdfQ==