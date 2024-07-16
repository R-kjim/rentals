//capture credentials created by the landlord
function postData(){
document.querySelector("#landlordReg").addEventListener("submit",submitFn)
function submitFn(e){
    e.preventDefault()
    let loginObj={
        name:e.target.lordName.value+" "+e.target.lordlName.value,
        username:e.target.lordpNumber.value,
        password:e.target.myPassword.value,
    }
    fetch("http://localhost:3000/credentials",{
        method:"POST",
        body: JSON.stringify(loginObj),
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then(res=>res.json())
    .then(loginObj=>console.log(loginObj))

    //GET data from the saved credentials to be used in the landlords dataset
    let myName={
        id:e.target.lordpNumber.value,
        name:e.target.lordName.value+" "+e.target.lordlName.value
    }
    fetch("http://localhost:3000/landlords",{
        method:"POST",
        body:JSON.stringify(myName),
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then(res=>res.json())
    .then(myName=>console.log(myName))
}
// document.querySelector("#landlordReg").reset()


}
postData()

