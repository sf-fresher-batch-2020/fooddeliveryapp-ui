// main row element to show the hotel list
let mainRow = document.getElementById("MenuList");
// error message element to show the message likr no search, no favourite etc
let errorMessageElement = document.getElementById("notificationMessage");
// select dropdown for sort using event delegation
let selectSorting = document.getElementById("dropdown-sort");
// select dropdown for filter using event delegation
let selectFilter = document.getElementById("dropdown-filter");

// to copy the hotels once my page is loaded
let allMenuDataCopy = [];

// getting data using fetch form API folder
let getData = () => fetch("menu.json").then(data => data.json());

// returns single hotel card
let getMenuCard = singleMenuData => {
    // check on loading the view whether the hotel already in local storage then change class to show favourite icon red already
    let a = JSON.parse(localStorage.getItem('fav'));
    if (a !== null) {
        var favIconClass = (!a.find(menu => menu.id == singleMenuData.id)) ? "fa-heart" : "fa-heart-red";
    } else {
        var favIconClass = "fa-heart"
    }

    return `<div class="col-md-3">
      <div class="card">
        <img class="card-img-top" src="https://thumbs.dreamstime.com/b/hakka-noodles-popular-indo-chinese-recipes-schezwan-vegetables-plate-top-view-151601502.jpg" alt="Card image">
        <div class="card-body">
          <h6 class="card-title">${singleMenuData.name}</h6>
          <p class="card-text tags" >${singleMenuData.tags}</p>
          <a onclick="markFavourite(this, ${singleMenuData.id})" id="${favIconClass}"><i class="fa fa-heart" ></i><a>
          <div>
            <div class="rating">
                <span class="fa fa-star checked" > ${singleMenuData.rating} </span>
            </div>
             <span class="price"> ${singleMenuData.price} INR </span>
             <button onclick="addItemToCart(${singleMenuData.id})">Add To Cart </button>             
        </div>
      </div>
</div>`;

}

// generate view
let generateView = data => data.map(menu => getMenuCard(menu));

// display all the hotels  
let displayAllMenu = () => {
    getData()
        .then(data => {
            allMenuDataCopy = JSON.parse(JSON.stringify(data));
            mainRow.innerHTML = generateView(data).join('')
        })
        .catch(error => errorMessageElement.innerText = "Something Happend!! We are Working on it")
}

displayAllMenu();

// display searched hotels as per entered text and showing result by tags
function searchResult() {
       console.log("called!!")
       let d = document.getElementById("myInput");
       let searchMatchingMenu = allMenuDataCopy.filter(menu => menu.tags.toString().toUpperCase().indexOf(d.value.toUpperCase()) > -1)
       mainRow.innerHTML = generateView(searchMatchingMenu).join('')
       errorMessageElement.innerText = (searchMatchingMenu == 0) ? `No hotels Found for ${d.value}` : '';
}

// debounce function which takes search function and delay
let debounce = (fn, delay) => {
    let timeout;
    return function () {
       clearTimeout(timeout)
       timeout = setTimeout(()=> fn(), delay)
    }
}
let search = debounce(searchResult, 400);

// sorting all the hotels
selectSorting.addEventListener("click", e => {
 if (e.target.innerText === "Sort by ETA") {
        let sortByEta = allMenuDataCopy.sort((menu1, menu2) => menu.eta - menu2.eta);
        mainRow.innerHTML = generateView(sortByEta).join('');
    } else if (e.target.innerText === "Sort by Rating") {
        let sortByRating = allMenuDataCopy.sort((menu1, menu2) => menu2.rating - menu1.rating);
        mainRow.innerHTML = generateView(sortByRating).join('');
    }
})

// filter the hotels as per tags
selectFilter.addEventListener("click", e => {
    let filteredMenu = allMenuDataCopy.filter(menu => menu.tags.toString().toUpperCase().indexOf(e.target.innerText.toUpperCase()) > -1);
    mainRow.innerHTML = generateView(filteredMenu).join('');
    errorMessageElement.innerText = (filteredMenu.length == 0)? `No Restro belong to ${e.target.innerText}` : '';
})

//mark favourite - add red color if item is pushed into the localstorage or mark white if item is removed form the local storage
function markFavourite(abc, id) {
    if (!localStorage.getItem("fav")) {
         var a = [];
         localStorage.setItem('fav', JSON.stringify(a));
    }
    var a = [];
    a = JSON.parse(localStorage.getItem('fav'));
    let markedMenu = allMenuDataCopy.filter(menu => menu.id == id);
    if (!a.find(menu => menu.id == id)) {
        a.push(...markedMenu);
        abc.setAttribute("style", "color: red !important;");
    } else {
        let indexOfExistingMenu = a.indexOf(a.find(menu => menu.id == id));
        a.splice(indexOfExistingMenu, 1);
        abc.setAttribute("style", "color: white !important;");
    }
    localStorage.setItem('fav', JSON.stringify(a));
}

// see all favourite resetro
function seeAllFavouriteRestro() {
    let allFavourite = JSON.parse(localStorage.getItem("fav"));
    mainRow.innerHTML = generateView(allFavourite).join('');
    errorMessageElement.innerText = (allFavourite.length == 0)? "No Favourite Selected Yet!!" : '';
} 
function addItemToCart(itemId){
    alert("ItemId" + itemId);
    }
    function addToCart(itemId){
        console.log("ItemId:" , itemId);
        let cartItems = JSON.parse(localStorage.getItem("CART_ITEMS")) || [];
        //If already the selected item is available in cart, I should increase qty
        let index = cartItems.findIndex(obj=>obj.itemId == itemId);
        console.log(index);
        let cartItemObj = null;
        if(index == -1){ // If Item not selected previously, then index = -1
            cartItemObj= { itemId: itemId, qty: 1};
            cartItems.push(cartItemObj); // Add the new item in array
        }
        else{
            cartItemObj = cartItems[index];
            //Get the existing qty and increment the qty by 1
            cartItemObj["qty"] = cartItemObj["qty"] + 1;
            cartItems[index] = cartItemObj; // Update the item 
        }
        localStorage.setItem("CART_ITEMS", JSON.stringify(cartItems));
    }
