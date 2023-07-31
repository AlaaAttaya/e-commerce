if(localStorage.getItem("user_id")){
    window.location.replace("/views/home.html")
  }

const next = document.getElementById("next");
const base_url = "http://127.0.0.1:8000/api"
next.addEventListener("click",function(){
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const formData = new FormData();
    formData.append("email",email);
    formData.append("password",password);
    fetch(base_url + '/auth/login', {
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
});