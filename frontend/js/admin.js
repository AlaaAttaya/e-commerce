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
