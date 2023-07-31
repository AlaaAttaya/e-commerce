if(!localStorage.getItem("user_id")){
  window.location.replace("../../index.html")
}
    ///logout

    const logout = document.getElementById('logout')
    logout.addEventListener('click', function () {
      localStorage.removeItem("user_id")
     
      window.location.replace('../../index.html')
    })