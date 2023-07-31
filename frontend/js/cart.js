if(!localStorage.getItem("user_id")){
  window.location.replace("../../index.html")
}
    ///logout

    const logout = document.getElementById('logout')
    logout.addEventListener('click', function () {
      localStorage.removeItem("user_id")
   
      window.location.replace('../../index.html')
    })


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
                    
                    <button class="Remove-btn" value="${product.id}>Remove</button>
            </div>
            
            <div class="product-description">Description: <br>${product.description}<br> Category:<br>${product.category} </div>
          </div>
        </div>
      `;
         
      })
    }