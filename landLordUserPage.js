let dashboard=document.querySelector("#myDashboard")
let properties=document.querySelector("#myProperties")
let tenants=document.querySelector("#myTenants")
let transaction=document.querySelector("#myTransactions")
let addApartment=document.querySelector("#adds")

//add a tenant data captured appropriately
let bodyDiv=document.querySelector(".bodyDiv")
let div1=document.createElement("div")
bodyDiv.append(div1)
dashboard.addEventListener("click",addTenantFn)
function addTenantFn(){
div1.innerHTML=`
<form>
<p>Enter first name:<input type='text' id='tName'></p>
<p>Enter second name:<input type='text' id='lName'></p>
<p>Enter phone number:<input type='number' id=tNumber></p>
<p>Enter tenant's ID Number:<input type='number' id='tId'></p>
<p>House assigned:<input type='text' id='id1'></p>
<p>Create a password: <input type='password' id=tPass></p>
<input type='submit'>
</form>
`
bodyDiv.append(div1)
div1.querySelector("form").addEventListener("submit",(e)=>{
    e.preventDefault()
    let tObj={
        tenantName:`${e.target.tName.value} ${e.target.lName.value}`,
        phoneNumber:e.target.tNumber.value,
        id:e.target.id1.value,
        idNumber:e.target.tId.value,
        password:e.target.tPass.value
    }
fetch("http://localhost:3000/tenants",{
    method:'POST',
    body:JSON.stringify(tObj),
    headers:{
        'Content-Type':"application/json"
    }
})
.then(res=>res.json())
.then(tObj=>console.log(tObj))
})
}





//to display for the properties Summary
// properties.addEventListener("click",propertiesFn)
// function propertiesFn(){
//     fetch("http://localhost:3000/landlords")
//     .then(res=>res.json())
//     .then(data=>displayFn(data))
//     function displayFn(item){
//         let newTable=document.createElement("table")
//         newTable.innerHTMl="<th>Name</th><th>Type</th><th>No.of Units</th><th>Address</th><th>Occuppied Units</th>"
//         for(i=0;i<item.length;i++){
//             let row=document.createElement("tr")
//             row.innerHTML=`
//             item[i]
//             `
//         }
//     }
// }


//to display for the tenants
tenants.addEventListener("click",tenantsFn)
function tenantsFn(){
    fetch("http://localhost:3000/tenants")
    .then(res=>res.json())
    .then(data=>useFn(data))
    function useFn(newData){
        for(let i=0;i<newData.length;i++){
            let tDiv=document.createElement('div')
            tDiv.innerHTML=`
            <p>Tenant Name: ${newData[i]['tenantName']}</p>
            <p>Phone Number: ${newData[i].phoneNumber}</p>
            <p>ID Number: ${newData[i].idNumber}</p>
            <p><button id='edit'>Edit</button>  <button id='delete'>Delete Profile</button></p>
            `
           
            let mybtns=tDiv.querySelector("#edit")
            
            mybtns.addEventListener("click",()=>{
                let editDiv=document.createElement("div")
                editDiv.innerHTML=`<form>
               <p>Edit first name:<input type='text' id='tName' required></p>
                <p>Edit second name:<input type='text' id='lName' required></p>
                <p>Edit phone number:<input type='number' id=tNumber required></p>
                <p>Edit tenant's ID Number:<input type='number' id='tId' required></p>
                <p>Edit House assigned:<input type='text' id='id1' required></p>
                <input type='submit'>
                </form>
                `
                tDiv.append(editDiv)
                let mysubmit=editDiv.querySelector('form')
                mysubmit.addEventListener("submit",(e)=>{
                    e.preventDefault()
                    let updateObj={
                        id:e.target.id1.value,
                        tenantName:`${e.target.tName.value} ${e.target.lName.value}`,
                        phoneNumber:e.target.tNumber.value,
                        idNumber:e.target.tId.value
                    }
                    fetch(`http://localhost:3000/tenants/${newData[i].id}`,{
                        method:"PATCH",
                        body:JSON.stringify(updateObj),
                        headers:{
                            'Content-Type':"application/json"
                        }
                    })
                    .then(res=>res.json())
                    .then(updateObj=>console.log(updateObj))
                    editDiv.remove()
                }
                
            )
                
            })
            div1.append(tDiv)
        }
       
        bodyDiv.replaceChildren(div1)
    }
}




//to display for the transactions
transaction.addEventListener("click",transactionsFn)
function transactionsFn(){
    fetch("http://localhost:3000/payments")
    .then(res=>res.json())
    .then(data=>usedataFn(data))
    function usedataFn(arrays){
        if(arrays.length>=1){
            let myTable=document.createElement("table")
            myTable.innerHTML="<th>Date</th><th>Amount</th><th>Tenant</th>"
        
        for(i=0;i<arrays.length;i++){
            let myrow=document.createElement("tr")
            myrow.innerHTML=`
            <tr><td>${arrays[i].date}</td>
            <td>${arrays[i].amount}</td>
            <td>${arrays[i].tenant}</td></tr>
            
            `
            // for(element in myTable){element.style.marginRight='10px'}
            myTable.appendChild(myrow)
        }
            div1.replaceChildren(myTable)
        
    }
        
    }
}

//add apartment eventlistener
let apartmentArray=[]
addApartment.addEventListener("click",apartmentFn)
function apartmentFn(){
    let myform=document.createElement("form")

    myform.innerHTML="<p>Enter your username:<br><input type='text' id='user'></p><p>Building Name:<br><input type='text' id='name'></p><p>Building Type:<br><input type='text' id='bType'></p><p>Number of units:<br><input type='number' id='anum'></p><p>Location Address:<br><input type='text' id='address'></p><p><input type='submit'></p>"
    myform.style.marginLeft='20%'
    div1.replaceChildren(myform)
    div1.style.backgroundImage=''
    myform.addEventListener("submit",(e)=>{
        e.preventDefault()
        let apartmentName=e.target.name.value
        let apartmentUnits=e.target.anum.value
        let myUser=e.target.user.value
        let type=e.target.bType.value
        let address=e.target.address.value
        let myObj={
            
                apartments:[{name:apartmentName}],
                type:type,
                address:address,
                units:apartmentUnits,
                id:myUser
            }
        
        fetch(`http://localhost:3000/landlords`,{
            method:"POST",
            body:JSON.stringify(myObj),
            headers:{
                'Content-Type':"application/json"
            }
        })
        .then(res=>res.json())
        .then(myObj=>console.log(myObj))

})}

