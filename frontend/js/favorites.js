if(!localStorage.getItem("user_id")){
  window.location.replace("../../index.html")
}
const base_url = "http://127.0.0.1:8000/api";
    ///logout
   
    const logout = document.getElementById('logout')
    logout.addEventListener('click', function () {
      localStorage.removeItem("user_id")
     
      window.location.replace('../../index.html')
    })


    function displayProducts(product,favorite_id) {
      let product_list = document.getElementById("products");
    
     
      
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
                <button class="remove-to-favorites-btn bg-red"  value="${favorite_id}">Remove Favorite</button>
        </div>
        
        <div class="product-description">Description: <br>${product.description}<br> Category:<br>${product.category} </div>
      </div>
    </div>
      `;
         
      
     
      
    const addtoCart = document.getElementsByClassName("add-to-cart-btn");  
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
    const removefavorite = document.getElementsByClassName("remove-to-favorites-btn");
    for (var i = 0; i < removefavorite.length; i++) {
      removefavorite[i].addEventListener("click", function(e){
          e.preventDefault();  
          user_id= localStorage.getItem("user_id")
          favorite_id=this.value;

          let formdata2 = new FormData();
          
          
          let requestOptions2 = {
              method: 'POST',
              body: formdata2
          };
          
          try {
              fetch(base_url + "/favorite/destroy/"+favorite_id, requestOptions2)
             
                window.location.reload(true);
             
             
       
          }
          catch (e) {
              console.log("failed to fetch", e)
          }

      })}


    }

    window.onload = async function () {

      let formdata = new FormData();
     
    
      let requestOptions = {
          method: 'POST',
          body: formdata
      };
    
      try {
          const products = await fetch(base_url + "/favorite", requestOptions)
          const json = await products.json()
          console.log(json)
          for (var i = 0; i < json.length; i++) {
            const product_id=json[i].product_id;
            const favorite_id = json[i].id;
            
            try{
              fetch(base_url + "/products/show/"+product_id, requestOptions)
              .then(response => response.json())
              .then(data => {
              console.log(data)
              displayProducts(data,favorite_id)
            })
            } catch(e) {
              console.log("failed to fetch", e)
            }
            
          }
          
         
      }
      catch (e) {
          console.log("failed to fetch", e)
      }
    
      
    
 
    }

   