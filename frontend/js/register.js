const base_url = "http://127.0.0.1:8000/api"

if(localStorage.getItem("user_id")){
  const user_id = localStorage.getItem("user_id")
  const formData1= new FormData();
  fetch(base_url + '/roles/show/'+user_id, {
    method: "POST",
    body: formData1
  })
  .then(response1 => response1.json())
  .then(data2 => {
    check_title = data2.title;
    if(check_title == "admin"){
    window.location.replace("../views/admin.html")
  }else{
    window.location.replace("../views/home.html")
  }
    
  })}
const register = document.getElementById("next");




register.addEventListener("click", function(e) {
  e.preventDefault();


  const first_name = document.getElementById("first_name").value;
  const last_name = document.getElementById("last_name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirm_password = document.getElementById("confirm_password").value;
if(first_name =="" || last_name =="" || email =="" || password =="" || confirm_password == " " || first_name == " " || last_name == " " || email == " " || password == " " || confirm_password == " " ){
    document.getElementById("suggestions").innerHTML="Please Fill the Form.";
}
else{

    
  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);
  formData.append("first_name", first_name);
  formData.append("last_name", last_name);
  formData.append("password_confirmation", confirm_password);

  fetch(base_url + '/auth/register', {
    method: "POST",
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    console.log(data.message);
    if(data.message=="success"){
        console.log("success");
        const formData = new FormData();
        formData.append("title","customer");
        formData.append("user_id", data.user);
        fetch(base_url + '/roles/store', {
            method: "POST",
            body: formData
          })
          .then(response => response.json())
          .then(data => {
            console.log(data);
          })
          .catch(error => {
            console.error("Error:", error);
          });
          localStorage.setItem("user_id",data.user);
          window.location.replace("../views/home.html")
    }else{
        console.log(data);
        document.getElementById("suggestions").innerHTML="Email Exists";
    }

   
  })
  .catch(error => {
    console.error("Error:", error);
  });


}

});
