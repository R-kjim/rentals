//capture credentials created by the landlord
function postData(){
document.querySelector("#landlordReg").addEventListener("submit",submitFn)
function submitFn(e){
    e.preventDefault()
    let loginObj={
        name:`${e.target.lordName.value} ${e.target.lordlName.value}`,
        username:e.target.lordpNumber.value,
        password:e.target.myPassword.value,
        apartments:[],
        tenants:[],
        payments:[],
        id:e.target.lordpNumber.value
}
    fetch("http://localhost:3000/landlords",{
        method:"POST",
        body: JSON.stringify(loginObj),
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then(res=>res.json())
    .then(loginObj=>console.log(loginObj))

}}
postData()

