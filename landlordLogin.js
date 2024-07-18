//login function that allows users to login
document.querySelector("#lordlogin").addEventListener("submit",loginFn)
function loginFn(e){
    e.preventDefault()
    fetch("http://localhost:3000/landlords")
    .then(res=>res.json())
    .then(data=>logFn(data))
    function logFn(item){
        for(let i=0;i<item.length;i++){
          //default landlord's landing page
         if(item[i].username===(e.target.Username.value) &&item[i].password===(e.target.password.value)){
            open("./landLordUserPage.html")
            var value=item[i].id
            localStorage.setItem("loginId",value)
}
else {
    for(let j=0;j<item[i].tenants.length;j++){
        if(item[i].tenants[j].phoneNumber===e.target.Username.value && item[i].tenants[j].password===e.target.password.value){
            alert("You're logged in as a tenant.")
            let valueTenant=(item[i].tenants).indexOf(item[i].tenants[j])
            let newValue=item[i].id
            console.log(newValue)
            console.log(valueTenant)
            localStorage.setItem("myLandlord",newValue)
            localStorage.setItem("loginTenant",valueTenant)
            open("./tenantUserPage.html")
        }
    }
}
}

}}