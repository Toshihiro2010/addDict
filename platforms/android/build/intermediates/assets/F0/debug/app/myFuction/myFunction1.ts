export class Myfunction {

    private database : any;

    public fetch(){
        console.log("Go to ===> fetch");
        
        this.database.all("SELECT * FROM dict").then(rows =>{
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