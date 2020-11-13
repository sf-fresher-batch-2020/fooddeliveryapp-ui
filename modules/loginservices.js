class LoginService {
    login = function(email, password,logintype){
        var usersTemp = JSON.parse(localStorage.getItem("USERS"));
        var users= usersTemp ? usersTemp: [];     
        let exists = false;   
        for(let obj of users)
        {
            if( obj.email == email  && obj.password == password && obj.logintype == logintype)
            {
                exists=true;
                localStorage.setItem("LOGGED_IN_USER",JSON.stringify(obj));
                break;
            }
        }
        return exists;
    }

  
}