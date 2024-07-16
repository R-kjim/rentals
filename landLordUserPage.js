let dashboard=document.querySelector("#myDashboard")
let properties=document.querySelector("#myProperties")
let tenants=document.querySelector("#myTenants")
let transaction=document.querySelector("#myTransactions")
let addApartment=document.querySelector("#adds")

//grab the div to containthe displayed data
let bodyDiv=document.querySelector(".bodyDiv")
let div1=document.createElement("div")
bodyDiv.append(div1)

div1.innerHTML=`
<p>Total Properties<br><span>2properties</span></p><p>TotalUnits</p>
<p>Total Tenants</p>
<p>Total Earnings</p>
`
div1.style.display="inline-flex"
for(element of div1.querySelectorAll("p")){element.style.margin="25px"}


//add eventlisteners tothe captured elements
//to display on the dashboard
dashboard.addEventListener("click",dashboardFn)
function dashboardFn(){
    div1.innerHTML=`
    <p>Total Properties<br><span>2properties</span></p><p>TotalUnits</p>
    <p>Total Tenants</p>
    <p>Total Earnings</p>
    `
    div1.style.display="inline-flex"
    for(element of div1.querySelectorAll("p")){element.style.margin="25px"}
    bodyDiv.replaceChildren(div1)
}





//to display for theproperties
properties.addEventListener("click",propertiesFn)
function propertiesFn(){
    console.log("i'm the properties")
}


//to display for the tenants
tenants.addEventListener("click",tenantsFn)
function tenantsFn(){
    console.log("i'm the tenants")
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
            myTable.appendChild(myrow)
        }
            div1.replaceChildren(myTable)
        
    }
        
        // bodyDiv.replaceWith(myTable)
    }
}

//add apartment eventlistener
addApartment.addEventListener("click",apartmentFn)
function apartmentFn(){
    // location.reload()
    let myform=document.createElement("form")
    myform.innerHTML="<p>Enter your username:<input type='text' id='user'></p><p>Apartment Name:<input type='text' id='name'></p><p>Number of units:<input type='number' id='anum'></p><p><input type='submit'></p>"
    div1.replaceWith(myform)
    myform.addEventListener("submit",(e)=>{
        e.preventDefault()
        let apartmentName=e.target.name.value
        let apartmentUnits=e.target.anum.value
        let myUser=e.target.user.value
        let myObj={
            apartments:[{
                name:apartmentName,
                units:apartmentUnits
            }]
        }
        fetch(`http://localhost:3000/landlords/${myUser}`,{
            method:"PATCH",
            body:JSON.stringify(myObj),
            headers:{
                'Content-Type':"application/json"
            }
        })
        .then(res=>res.json())
        .then(myObj=>console.log(myObj))

    })
}
