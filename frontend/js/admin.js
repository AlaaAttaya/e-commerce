if(!localStorage.getItem("user_id") || localStorage.getItem("user_id")!=31){
    window.location.replace("../../index.html")
  }

const addproduct = document.getElementById("add-product-btn");
const showaddproduct = document.getElementById("show-hide-add");
const editproduct = document.getElementsByClassName("edit-button");
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

//edit
for (var i = 0; i < editproduct.length; i++) {
    editproduct[i].addEventListener("click", function(e){
        e.preventDefault();
        if(showeditproduct.style.display == "flex"){
            showeditproduct.style.display= "none";
        }else{
            showeditproduct.style.display="flex"; 
        }
    
    
    });
}


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



  //ADD an item//
  //const fileInput = document.getElementById("imageInput");
    // if (fileInput.files.length > 0) {
    // const file = fileInput.files[0]; 

    // console.log("File name:", file.name);
    // console.log("File type:", file.type);
    // console.log("File size (in bytes):", file.size);

    

      
    //   if (fileInput.files.length === 0) {
       
    //     return;
    //   }
    
      
    //   const formData = new FormData();
    
      
    //   formData.append("file", fileInput.files[0]);








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







  //Search-onkeyup
  
    const myInput = document.getElementById('search-onkeyup');
    myInput.addEventListener('keyup', function() {
    let keyupvalue = myInput.value;
    console.log(keyupvalue);
    

   
   
    });



    ///logout

const logout = document.getElementById('logout')
logout.addEventListener('click', function () {
  localStorage.removeItem("user_id")

  window.location.replace('../../index.html')
})