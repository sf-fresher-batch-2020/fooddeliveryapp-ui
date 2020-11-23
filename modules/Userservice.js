class UserService {
    login(email, password, role) {
        let loggedInUser = null;
        var usersTemp = JSON.parse(localStorage.getItem("USERS"));
        var users = usersTemp ? usersTemp : [];
        let exists = false;
        for (let obj of users) {
            if (obj.email == email && obj.password == password && obj.role == role) {
                exists = true;
                loggedInUser = obj;
                localStorage.setItem("LOGGED_IN_USER", JSON.stringify(obj));
                break;
            }
        }
        // return exists;
        return loggedInUser;
    }


    register(userObj) {
        let generateUserId = Math.floor(100 + Math.random() * 900);
        userObj["id"] = generateUserId;
        var usersTemp = JSON.parse(localStorage.getItem("USERS"));
        var users = usersTemp ? usersTemp : [];
        users.push(userObj);
        localStorage.setItem("USERS", JSON.stringify(users));
        let result = "success";
        return result;
    }

    getAllUsers() {
        let users = JSON.parse(localStorage.getItem("USERS")) || [];
        return users;
    }

    isEmailExists(email) {
        let users = this.getAllUsers();
        let exists = false;
        for (let obj of users) {
            if (obj.email == email) {
                exists = true;
                break;
            }
        }
        return exists;
    }
}