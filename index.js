//add eventlisteners to the forms and captureand store their data
//apartment registration form
document.addEventListener("DOMContentLoaded",()=>{
let myApartment=document.querySelector("#landlord")
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
    fetch("https://database-orcin.vercel.app/landlord",{
        method:"POST",
        body:JSON.stringify(newObj),
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then(res=>res.json())
    .then(newObj=>console.log(newObj))
    location.reload()
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
            houseNumber:e.target.hNum.value,
            rent:e.target.rentCharge.value,
            balances:0
        }
    }
    //POST the data captured into the database
    fetch("https://database-orcin.vercel.app/landlord",{
        method:"POST",
        body:JSON.stringify(tenantObj),
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then(res=>res.json())
    .then(tenantObj=>console.log(tenantObj))
    location.reload()
})



//declare document elements for use
let totalSpan=(document.querySelector("#aTotal"))
 let unitsSpan=document.querySelector("#tUnits")
 let tenantsDisplay=document.querySelector("#tenantsSec")
 //get thedata for use
fetch("https://database-orcin.vercel.app/landlord")
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
            <p>Name: ${item[i].tenant.name}<br>Phone Number: ${item[i].tenant.phoneNumber}<br>Balances:${item[i].tenant.balances}
            <br><button id='edit'>EDIT</button> <button id='delete'>DELETE</button></p>

            `
            let mydelete=newlabel.querySelector(" #delete")
            console.log(mydelete)
            let myedit=newlabel.querySelector("#edit")
            document.querySelector("#myTenants").append(newlabel)

            //an event listener that edits tenant details
            myedit.addEventListener("click",editFn)
            function editFn(){
                let editDiv=document.createElement("div")
                editDiv.innerHTML=`
                 <form><p>Tenant Name:<br><input type="text" id="tName" value=${item[i].tenant.name} required></p>
                <p>PhoneNumber: <br><input type="number" id="tPhone" value=${item[i].tenant.phoneNumber}></p>
                <p>Apartment: <br><select id='apart' required><option>${item[i].tenant.apartment}</option></select></p>
                <p>House Assigned:<br><input type="text" id="hNum" value=${item[i].tenant.houseNumber}></p>
                <p>Rent Charges:<br><input type="number" id="rentCharge" value=${item[i].tenant.rent}></p>
                <p><input type="submit"></p></form>
                `
                newlabel.append(editDiv)
              
                editDiv.querySelector("form").addEventListener("submit",(e)=>{
                    e.preventDefault()
                    let editObj={type:'tenant',
                        tenant:{
                            name:e.target.tName.value,
                            phoneNumber:e.target.tPhone.value,
                            apartment:e.target.apart.value,
                            houseNumber:e.target.hNum.value,
                            rent:e.target.rentCharge.value,
                            balances:item[i].tenant.balances
                        }}
                    editDiv.remove()
                    fetch(`https://database-orcin.vercel.app/landlord/${item[i].id}`,{
                        method:"PATCH",
                        body:JSON.stringify(editObj),
                        headers:{
                            'Content-Type':'application/json'
                        }
                    })
                    .then(res=>res.json())
                    .then(editObj=>console.log(editObj))
                })
            }
            //an event listener that deletes a tenant
            mydelete.addEventListener("click",deleteFn)
            function deleteFn(){
                fetch(`https://database-orcin.vercel.app/landlord/${item[i].id}`,{
                    method:"DELETE",
                    headers:{
                        'Content-Type':'application/json'
                    }
                })
                .then(res=>res.json())
                .then(item=>console.log(item))
            }
    }
    totalSpan.textContent=count
    unitsSpan.textContent=eachUnit
    document.querySelector("#tTenants").textContent=myIncome
}


//add an event listener that posts an invoice for all tenants
document.querySelector("#invoice").addEventListener("click",invoiceFn)
function invoiceFn(){
    let invoicediv=document.createElement("div")
    invoicediv.innerHTML=`
    <form>
    <p><label>Rent:<br><input type='number' id='rFee'></label></p>
    <p><label>Garbage: <br><input type='number' id='gFee'></label></p>
    <p><input type='submit'></p>
    <p><label>Total: <span id='total'></label></p>
    </form>
    `
    document.querySelector(".registration").append(invoicediv)
    invoicediv.querySelector("form").addEventListener("submit",(e)=>{
        e.preventDefault()
        let gfee1=parseInt(e.target.gFee.value)
        let rfee1=parseInt(e.target.rFee.value)
        let myTotal=gfee1+rfee1
        invoicediv.querySelector("#total").textContent=myTotal
        for(let i=0;i<item.length;i++){
            if(item[i].type==="tenant"){
                let myBalances=item[i].tenant.balances
                let myupdateObj={...item[i]}
                myupdateObj.tenant.balances=parseInt(myBalances)+myTotal
                console.log(myupdateObj.tenant.balances)
        fetch(`https://database-orcin.vercel.app/landlord/${item[i].id}`,{
            method:"PATCH",
            body:JSON.stringify(myupdateObj),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then(myupdateObj=>console.log(myupdateObj))
        }}
        alert("Invoice posted successfully")
        invoicediv.remove()
        location.reload()
    })
}
  //add an event listener to the payments button
  document.querySelector("#payments").addEventListener("click",()=>{
    let payDiv=document.createElement('div')
    payDiv.innerHTML=`
    <p>Add a payment:</p>
    <p>Select a tenant:<select id='tenantOption'></select></p>
    <p>Enter Amount:<input type='number' id='amountPaid'><br><button>SAVE</button></p>
    `
        for(let i=0;i<item.length;i++){
        if(item[i].type==='tenant'){
            let y=document.createElement("option")
            y.textContent=`${item[i].tenant.houseNumber}`
            payDiv.querySelector("#tenantOption").append(y)
        }}
    
    document.querySelector(".registration").append(payDiv)
    payDiv.querySelector("button").addEventListener("click",()=>{
       
        //update the amount entered in an individual tenants profiles 
        let amountPaid=payDiv.querySelector('#amountPaid').value
     for(let i=0;i<item.length;i++){
        if(item[i].type==='tenant'&& item[i].tenant.houseNumber=== payDiv.querySelector("select").value){
            let newPayment=item[i].tenant.balances+parseInt(amountPaid)
            let newerObj={...item[i]}
            let mybal=newerObj.tenant.balances
            newerObj.tenant.balance=newPayment
            fetch(`https://database-orcin.vercel.app/landlord/${item[i].id}`,{
                method:"PATCH",
                body:JSON.stringify(newerObj),
                headers:{
                    'Content-Type':'application/json'
                }
            })
            .then(res=>res.json())
            .then(newerObj=>console.log(newerObj))
            payDiv.remove()
            location.reload()
        }
     }
})

})}})