if(!localStorage.getItem("user_id")){
  window.location.replace("../../index.html")
}

const base_url = "http://127.0.0.1:8000/api";

function displayProducts(product_array) {
  let product_list = document.getElementById("products");

  product_list.innerHTML = "";
  product_array.forEach((product) => {
      if(product.image==""||product.image==" "){
          imagepath = "";
      }else{
          imagepath = product.image;
      }
      product_list.innerHTML += `
      <div class="product-container">
      <img src="http://127.0.0.1:8000//${imagepath}" alt="Product Image" class="product-image" >
      <div class="product-details">
      <div>
      Name: ${product.name}
      <br>
      Qty: ${product.quantity}
      <br>
      Price: ${product.price}
      </div>
        <div class="product-buttons">
                <button class="add-to-cart-btn" value="${product.id}">Add to Cart</button>
                <button class="add-to-favorites-btn"  value="${product.id}">Add to Favorites</button>
        </div>
        
        <div class="product-description">Description: <br>${product.description}<br> Category:<br>${product.category} </div>
      </div>
    </div>
  `;
     
  })
}
window.onload = async function () {

  let formdata = new FormData();
 

  let requestOptions = {
      method: 'POST',
      body: formdata
  };

  try {
      const products = await fetch(base_url + "/products", requestOptions)
      const json = await products.json()
      console.log(json)
      displayProducts(json)
  }
  catch (e) {
      console.log("failed to fetch", e)
  }

  const addtoCart = document.getElementsByClassName("add-to-cart-btn");
  //addtoCart
for (var i = 0; i < addtoCart.length; i++) {
  addtoCart[i].addEventListener("click", function(e){
      e.preventDefault();
      console.log("Adding To Cart")



      user_id= localStorage.getItem("user_id")
      product_id=this.value;
      quantity=1;
       
      let formdata2 = new FormData();
      
      formdata2.append("user_id",user_id)
      formdata2.append("product_id",product_id)
      formdata2.append("quantity",quantity)
      let requestOptions2 = {
          method: 'POST',
          body: formdata2
      };
      
      try {
          fetch(base_url + "/cart/store", requestOptions2)
          .then(response => response.json())
          .then(data => {
          console.log(data)
          
      })
      }
      catch (e) {
          console.log("failed to fetch", e)
      }
     
    

  })
}

const addtoFavorites = document.getElementsByClassName("add-to-favorites-btn");
//addtoFavorites
for (var i = 0; i < addtoFavorites.length; i++) {
addtoFavorites[i].addEventListener("click", function(e){
    e.preventDefault();
    user_id= localStorage.getItem("user_id")
    product_id=this.value;
   
  
//Fetching Role ID
    let formdata1 = new FormData();
    
    formdata1.append("user_id",user_id)
  
    let requestOptions1 = {
        method: 'POST',
        body: formdata
    };
  
    try {
        fetch(base_url + "/roles/show/"+user_id, requestOptions1)
        .then(response => response.json())
        .then(data => {
        role_id = data.id;
        
        console.log("Adding To Favorites")

        //Adding to Favorites
  
   
  
        let formdata = new FormData();
        
        formdata.append("role_id",role_id)
        formdata.append("product_id",product_id)
        let requestOptions = {
            method: 'POST',
            body: formdata
        };
    
        try {
            fetch(base_url + "/favorite/store", requestOptions)
            .then(response => response.json())
            .then(data => {
            console.log(data)
            
        })
        }
        catch (e) {
            console.log("failed to fetch", e)
        }


    })
    }
    catch (e) {
        console.log("failed to fetch", e)
    }





})

}



}

 //Search-onkeyup
  
 const myInput = document.getElementById('search-onkeyup');
 myInput.addEventListener('keyup', function() {
 let keyupvalue = myInput.value;
 const categoryradio = document.getElementById('categoryradio');
 
 let formdata = new FormData();
if(categoryradio.checked){
 if(keyupvalue == "" || keyupvalue == " "){
     let formdata = new FormData();


     let requestOptions = {
         method: 'POST',
         body: formdata
     };
 
     try {
         fetch(base_url + "/products", requestOptions)
         .then(response => response.json())
         .then(data => {
         console.log(data)
         displayProducts(data)
     })
     }
     catch (e) {
         console.log("failed to fetch", e)
     }
 }else{
     
 
 let requestOptions = {
     method: 'POST',
     body: formdata
 };

 try {
      fetch(base_url + "/products/onkeyupcategory/"+keyupvalue, requestOptions)
    
     .then(response => response.json())
     .then(data => {
     console.log(data)
     displayProducts(data)
 })
     
 }
 catch (e) {
     console.log("failed to fetch", e)
 }
 
}
}else{




 if(keyupvalue == "" || keyupvalue == " "){
     let formdata = new FormData();


     let requestOptions = {
         method: 'POST',
         body: formdata
     };
 
     try {
         fetch(base_url + "/products", requestOptions)
         .then(response => response.json())
         .then(data => {
         console.log(data)
         displayProducts(data)
     })
     }
     catch (e) {
         console.log("failed to fetch", e)
     }
 }else{
     
 
 let requestOptions = {
     method: 'POST',
     body: formdata
 };

 try {
      fetch(base_url + "/products/onkeyupname/"+keyupvalue, requestOptions)
    
     .then(response => response.json())
     .then(data => {
     console.log(data)
     displayProducts(data)
 })
     
 }
 catch (e) {
     console.log("failed to fetch", e)
 }
 
}

}

 });











    ///logout

    const logout = document.getElementById('logout')
    logout.addEventListener('click', function () {
      localStorage.removeItem("user_id")
     
      window.location.replace('../../index.html')
    })