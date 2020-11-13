var user = JSON.parse(localStorage.getItem("LOGGED_IN_USER"));
console.log("LOGGED_IN_USER", user);
if(user){
    console.log("User is logged in");
    // Hide menus which has data-loggedin=false
    // Show menus which has data-loggedin=true
    document.querySelectorAll(".nav-link[data-loggedin=false] , .nav-item[data-loggedin=false] , .dropdown-item[data-loggedin=false]").forEach(obj => obj.style.display= "none" );
    document.querySelectorAll(".nav-link[data-loggedin=true] , .nav-item[data-loggedin=true] , .dropdown-item[data-loggedin=true]").forEach(obj => obj.style.display= "block" );
}
else{
    
    console.log("User is not logged in");
    // Hide menus which has data-loggedin=true
    // Show menus which has data-loggedin=false
    document.querySelectorAll(".nav-link[data-loggedin=true] , .nav-item[data-loggedin=true] , .dropdown-item[data-loggedin=true]").forEach(obj => obj.style.display= "none" );
    document.querySelectorAll(".nav-link[data-loggedin=false] , .nav-item[data-loggedin=false] , .dropdown-item[data-loggedin=false]").forEach(obj => obj.style.display= "block" );

}

function logout(){
   localStorage.clear();
    localStorage.removeItem("LOGGED_IN_USER");
    window.location.href = "login.html";
}

