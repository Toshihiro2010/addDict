import { Component } from "@angular/core";
import { Users } from "../../../models/users/users";


@Component({
    selector: "Login",
    templateUrl: "views/setting/login/login-component.html",
})
export class LoginComponent {

    private username : string = "";
    private password : string = "";
    
    btnLogin(){
        let self = this;
        
        console.log("username ===> " , self.username );
        console.log("password ===> " , self.password);
        
        
    }

}
