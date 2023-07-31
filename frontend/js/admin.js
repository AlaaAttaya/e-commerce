if(!localStorage.getItem("user_id") || localStorage.getItem("user_id")!=31){
    window.location.replace("../../index.html")
  }
const base_url = "http://127.0.0.1:8000/api";
const addproduct = document.getElementById("add-product-btn");
const showaddproduct = document.getElementById("show-hide-add");

const showeditproduct = document.getElementById("show-hide-edit");
//add
addproduct.addEventListener("click", function(e){
    e.preventDefault();
    if(showaddproduct.style.display == "flex"){
        showaddproduct.style.display= "none";
    }else{
        showaddproduct.style.display="flex"; 
    }


});



//picture-add
const imagePreviewLabel = document.getElementById('imagePreviewLabel');
imagePreviewLabel.addEventListener('click', function(event) {
  event.preventDefault(); 
  document.getElementById('imageInput').click();
});

document.getElementById('imageInput').addEventListener('change', function(event) {
    const fileInput = event.target;
    const imagePreview = document.getElementById('imagePreview');
  
    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
  
        reader.onload = function(e) {
            imagePreview.style.backgroundImage = `url('${e.target.result}')`;
        };
  
        reader.readAsDataURL(fileInput.files[0]);
    }
  });


//onload display products
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
            <button class="add-to-cart-btn edit-button" value="${product.id}">Edit </button>
            <button class="delete-btn" value="${product.id}">Delete</button>
          </div>
          
          <div class="product-description">Description: <br>${product.description}<br> Category:<br>${product.category} </div>
        </div>
      </div>
    `;
       
    })
}


//edit button for every element
function editProducts(product){
    let product_id = product.id;
    let product_edit = document.getElementById("show-hide-edit");
    product_edit.innerHTML = "";
    product_edit.innerHTML = `
    <div class="add-product-image-container">
            
    <label for="imageInput-edit" id="imagePreviewLabel-edit" class="add-logo-image product-image">
      <div id="imagePreview-edit" style="background-image: url(http://127.0.0.1:8000//${product.image})"></div>
    </label>
   
    <input type="file" id="imageInput-edit" accept="image/*" style="display: none"/>
    
</div>
<div class="info-wrapper">
    <Label class="title-show">Edit</Label>
    <label for="product-name1">Name</label>
    <input type="text" placeholder="Enter product name" id="product-name1" value="${product.name}">
    <label for="product-category1">Category</label>
    <input type="text" placeholder="Enter product category" id="product-category1" value="${product.category}">
    <label for="product-description1">Description</label>
    <textarea id="product-description1"  rows="4" cols="50" placeholder="Enter product description"> ${product.description}</textarea>
    <label for="product-quantity1">Quantity</label>
    <input type="number" placeholder="Enter product quantity" value="${product.quantity}" id="product-quantity1">
    <label for="product-price1">Price</label>
    <input type="number" placeholder="Enter product price" min="0.01" step="0.01"  id="product-price1" value="${product.price}"/>
    <button class="save-btn" id="savebtn1">Save</button>
</div>
`

//picture-edit
const imagePreviewLabelEdit = document.getElementById('imagePreviewLabel-edit');
imagePreviewLabelEdit.addEventListener('click', function(event) {
  event.preventDefault(); 
  document.getElementById('imageInput-edit').click();
});

document.getElementById('imageInput-edit').addEventListener('change', function(event) {
    const fileInput2 = event.target;
    const imagePreview = document.getElementById('imagePreview-edit');
  
    if (fileInput2.files && fileInput2.files[0]) {
        const reader = new FileReader();
  
        reader.onload = function(e) {
            imagePreview.style.backgroundImage = `url('${e.target.result}')`;
        };
  
        reader.readAsDataURL(fileInput2.files[0]);
    }
  });


//save changes
let savechanges= document.getElementById("savebtn1");

savechanges.addEventListener('click', function(event){
    event.preventDefault();
    console.log("savebutton");
    const name= document.getElementById('product-name1').value
    const category= document.getElementById('product-category1').value
    const description= document.getElementById('product-description1').value
    const quantity= parseInt(document.getElementById('product-quantity1').value)
    const price= parseFloat(document.getElementById('product-price1').value)
    let imageFile = document.getElementById('imageInput-edit').files[0];
   
    const formData = new FormData()
    formData.append('name', name);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('quantity', quantity);
    formData.append('price', price);


    
    if (imageFile) {
        formData.append('image', imageFile);
    } 
   
    console.log(name);
    console.log(category);
    console.log(description);
     console.log(quantity);
     console.log(price);
     console.log(imageFile);
    let requestOptions = {
        method: 'POST',
        body: formData
    };

    try {
        fetch(base_url+"/products/update/" + product_id, requestOptions)
        .then(response => response.json())
        .then(data => {
        console.log(data)
        window.location.reload(true);
    })
    }
    catch (e) {
        console.log("failed to fetch", e)
    }

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


    const editproduct = document.getElementsByClassName("edit-button");
    //edit
for (var i = 0; i < editproduct.length; i++) {
    editproduct[i].addEventListener("click", function(e){
        e.preventDefault();
        console.log("test:");
        const product_id = this.value;
        
        if(showeditproduct.style.display == "flex"){
            showeditproduct.style.display= "none";
        }else{
            showeditproduct.style.display="flex"; 
            let formdata = new FormData();
        

            let requestOptions = {
                method: 'POST',
                body: formdata
            };

            try {
                fetch(base_url + "/products/show/"+product_id, requestOptions)
                .then(response => response.json())
                .then(data => {
                console.log(data)
                editProducts(data);
            })
            }
            catch (e) {
                console.log("failed to fetch", e)
            }
           
        }
    
    
    });
}



const deletebtn = document.getElementsByClassName("delete-btn");
for (var i = 0; i < deletebtn.length; i++) {
    deletebtn[i].addEventListener("click", function(e){
        e.preventDefault();
        const product_id = this.value;
        console.log(product_id)
        let formdata = new FormData();
        

            let requestOptions = {
                method: 'POST',
                body: formdata
            };

            try {
                fetch(base_url + "/products/destroy/"+product_id, requestOptions)
                window.location.reload(true);
            }
            catch (e) {
                console.log("failed to fetch", e)
            }
    }
    )
}
//adding product
const saveaddbtn = document.getElementById("savebtn")
    saveaddbtn.addEventListener("click",function(e){
     e.preventDefault();
     console.log("SaveAddButton");
     const name= document.getElementById('product-name').value
     const category= document.getElementById('product-category').value
     const description= document.getElementById('product-description').value
     const quantity= parseInt(document.getElementById('product-quantity').value)
     const price= parseFloat(document.getElementById('product-price').value)
     let imageFile = document.getElementById('imageInput').files[0];
    
     const formData = new FormData()
     formData.append('name', name);
     formData.append('category', category);
     formData.append('description', description);
     formData.append('quantity', quantity);
     formData.append('price', price);
 
 
     console.log(name);
     console.log(category);
     console.log(description);
      console.log(quantity);
      console.log(price);
      console.log(imageFile);
     if (imageFile) {
         formData.append('image', imageFile);
     } 

     let requestOptions = {
        method: 'POST',
        body: formData
    };

    try {
        fetch(base_url+"/products/store/", requestOptions)
        .then(response => response.json())
        .then(data => {
        console.log(data)
        window.location.reload(true);
    })
    }
    catch (e) {
        console.log("failed to fetch", e)
    }

    })



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
        const products = fetch(base_url + "/products/onkeyupcategory/"+keyupvalue, requestOptions)
       
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
        const products = fetch(base_url + "/products/onkeyupname/"+keyupvalue, requestOptions)
       
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