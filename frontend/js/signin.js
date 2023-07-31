if(localStorage.getItem("user_id")){
    window.location.replace("./frontend/views/home.html")
  }
//signin
const next = document.getElementById("next");
const base_url = "http://127.0.0.1:8000/api"
next.addEventListener("click",function(event){
  event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    if(!email == "" || !password == "" || !email == " " || !password == " "){
      const formData = new FormData();
      formData.append("email",email);
      formData.append("password",password);
      fetch(base_url + '/auth/login', {
          method: "POST",
          body: formData
        })
        .then(response => response.json())
        .then(data => {
          let user_id = data.user.id;
          
          const formData1 = new FormData();
        
        fetch(base_url + '/roles/show/'+user_id, {
            method: "POST",
            body: formData1
          })
          .then(response1 => response1.json())
          .then(data2 => {
            check_title = data2.title;
            if(check_title == "admin"){

              localStorage.setItem("user_id",user_id);
           
              window.location.replace("./frontend/views/admin.html")
            }else{

              localStorage.setItem("user_id",user_id);

              window.location.replace("./frontend/views/home.html")
            }
          })
          .catch(error => {
            console.error("Error:", error);
          });



        
        })
        .catch(error => {
          console.error("Error:", error);
        });
      
    }else{
      document.getElementById("suggestions").innerHTML="Please Fill the Form.";

    }

});