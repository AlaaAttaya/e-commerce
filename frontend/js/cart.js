if(!localStorage.getItem("user_id")){
  window.location.replace("../../index.html")
}
let total=0;
const base_url = "http://127.0.0.1:8000/api";
    ///logout

    const logout = document.getElementById('logout')
    logout.addEventListener('click', function () {
      localStorage.removeItem("user_id")
   
      window.location.replace('../../index.html')
    })


    function displayProducts(product,cart_id) {
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
          Qty:&nbsp; <input type="number" placeholder="Enter product quantity" id="product-quantity" class="productquantity" value="${product.quantity}">
          <br>
          Price: <input type="number" class="productprice" id="product-price" value="${product.price}" disabled>
          </div>
            <div class="product-buttons">
                    
                    <button class="Remove-btn bg-red" value="${cart_id}">Remove</button>
            </div>
            
            <div class="product-description">Description: <br>${product.description}<br> Category:<br>${product.category} </div>
          </div>
        </div>
      `;
         
      const remove = document.getElementsByClassName("Remove-btn");
      for (var i = 0; i < remove.length; i++) {
        remove[i].addEventListener("click", function(e){
            e.preventDefault();  
            user_id= localStorage.getItem("user_id")
            cart_id=this.value;
  
            let formdata2 = new FormData();
            
            
            let requestOptions2 = {
                method: 'POST',
                body: formdata2
            };
            
            try {
                fetch(base_url + "/cart/destroy/"+cart_id, requestOptions2)
               
                  window.location.reload(true);
               
               
         
            }
            catch (e) {
                console.log("failed to fetch", e)
            }
  
        })}


       //onkeyup
    const changequantity= document.getElementsByClassName("productquantity");
    const productprice=document.getElementsByClassName("productprice");
    
    let totalnow=0;
  
    for (var i = 0; i < changequantity.length; i++) {
    changequantity[i].addEventListener('keyup', function() {
     
      totalnow = 0;
      for (let i = 0; i < changequantity.length; i++) {
        let quantity = changequantity[i].value;
        let price = productprice[i].value;
        totalnow += parseInt(quantity) * parseFloat(price);
      }
      document.getElementById("Total").innerHTML ="Total: "+ totalnow.toFixed(2); 
 
    })
    
  }  


    }


    window.onload = async function () {

      let formdata = new FormData();
     
    
      let requestOptions = {
          method: 'POST',
          body: formdata
      };
    
      try {
          const products = await fetch(base_url + "/cart", requestOptions)
          const json = await products.json()
          console.log(json)
          for (var i = 0; i < json.length; i++) {
            const product_id=json[i].product_id;
            const cart_id = json[i].id;
            
            try{
              fetch(base_url + "/products/show/"+product_id, requestOptions)
              .then(response => response.json())
              .then(data => {
              console.log(data)
              displayProducts(data,cart_id)
               total += data.price * data.quantity;
               document.getElementById("Total").innerHTML="Total: "+total;
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

   