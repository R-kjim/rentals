//add eventlisteners to the forms and captureand store their data
//apartment registration form
let myApartment=document.querySelector("#landlord")
console.log(myApartment)
myApartment.addEventListener("submit",submitFn)
function submitFn(e){
    e.preventDefault()

    let newObj={
        type:'apartment',
        apartment:{
            names:e.target.aName.value,
            units:e.target.aNum.value,
            location:e.target.aLocation.value,
            imageUrl:e.target.image.value
    }}
    fetch("http://localhost:3000/landlord",{
        method:"POST",
        body:JSON.stringify(newObj),
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then(res=>res.json())
    .then(newObj=>console.log(newObj))
}

//tenant registration form
let myTenant=document.querySelector("#client")
myTenant.addEventListener("submit",(e)=>{
    e.preventDefault()
    let tenantObj={
        type:'tenant',
        tenant:{
            name:e.target.tName.value,
            phoneNumber:e.target.tPhone.value,
            apartment:e.target.apart.value,
            rent:e.target.rentCharge.value
        }
    }
    //POST the data captured into the database
    fetch("http://localhost:3000/landlord",{
        method:"POST",
        body:JSON.stringify(tenantObj),
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then(res=>res.json())
    .then(tenantObj=>console.log(tenantObj))
})



//declare document elements for use
let totalSpan=(document.querySelector("#aTotal"))
 let unitsSpan=document.querySelector("#tUnits")
 let tenantsDisplay=document.querySelector("#tenantsSec")
 //get thedata for use
fetch("http://localhost:3000/landlord")
.then(res=>res.json())
.then(data=>useDataFn(data))

function useDataFn(item){
    //evaluate values to display on our website 
    let count=0
    let eachUnit=0
    let myIncome=0
    for(let i=0;i<item.length;i++){
        if((item[i].type)==="apartment"){
            count+=1
            eachUnit+=(parseInt(item[i].apartment.units))

            //access the database to get apartment names and display them as a dropdown in the tenant registration form
            let myOption=document.createElement("option")
            myOption.textContent=item[i].apartment.names
            let new1=document.querySelector("#myAparts")
            document.querySelector("#apart").append(myOption)
            let myLi=document.createElement("p")
            myLi.innerHTML=`
            ${item[i].apartment.names}<img src=${item[i].imageUrl}
            `
            document.querySelector("#myApartments").append(myLi)
        }else if(item[i].type==='tenant'){
            myIncome+=parseInt(item[i].tenant.rent)
            let newlabel=document.createElement("div")
            newlabel.innerHTML=`
            <p>Name: ${item[i].tenant.name}<br>Phone Number: ${item[i].tenant.phoneNumber}</p>
            `
            document.querySelector("#myTenants").append(newlabel)
        
    }
    totalSpan.textContent=count
    unitsSpan.textContent=eachUnit
    document.querySelector("#tTenants").textContent=myIncome

    



}}
