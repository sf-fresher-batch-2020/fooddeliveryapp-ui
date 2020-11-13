class CheckOutDetail
{
    checkout(userObj){
       var checkoutTemp = JSON.parse(localStorage.getItem("CHECKOUT"));
       var checkoutdetail= checkoutTemp ? checkoutTemp:[];
       checkoutdetail.push(userObj);
       localStorage.setItem("CHECKOUT",JSON.stringify(checkoutdetail));
       let result="success";
       return result;
        }
        list()
        {
          let checkoutTemp = JSON.parse(localStorage.getItem("CHECKOUT"));
            let checkoutdetail  = checkoutTemp ? checkoutTemp : [];
           return checkoutdetail;
        }
}

