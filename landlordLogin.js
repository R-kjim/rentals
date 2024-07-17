//login function that allows users to login
document.querySelector("#lordlogin").addEventListener("submit",loginFn)
function loginFn(e){
    e.preventDefault()
    fetch("http://localhost:3000/landlords")
    .then(res=>res.json())
    .then(data=>logFn(data))
    function logFn(item){
        for(let i=0;i<item.length;i++){
            
         item[i].username===(e.target.Username.value) &&item[i].password===(e.target.password.value)? open("./landlordUserPage.html"): location.reload(),alert("Enter valid credentials")


            
            
           
        }
   
}}

