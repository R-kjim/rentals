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
            let userDiv=document.createElement("div")
            userDiv.innerHTML=`<ul id="myHeader">
                        <li id="myProperties">Summary</li>
                        <li id="myTenants">Tenants</li>
                        <li id="myTransactions">Transactions</li>
                        <li id="adds">Add an apartment</li>
                        <li id="myDashboard">Add a tenant</li>
                    </ul>`
            let div1=document.createElement("div")
            userDiv.append(div1)
            document.querySelector(".loginDiv").replaceWith(userDiv)
            let subDiv=document.querySelector(".subDiv")
            let dashboard=document.querySelector("#myDashboard")
            let properties=document.querySelector("#myProperties")
            let tenants=document.querySelector("#myTenants")
            let transaction=document.querySelector("#myTransactions")
            let addApartment=document.querySelector("#adds")
            
            //summary section which is the landlords default page
            let topDiv=document.createElement("section")
            topDiv.innerHTML=`
            <div><p>Total Properties<strong><br>${item[i].apartments.length}</strong></p></div>
            <div><p>Total Units<br></p></div>
            <div><p>Estimated Monthly Income</p></div>
            <div><p>Last month's Income</p></div>
            `
            let divDesign=topDiv.querySelectorAll("div")
            for(element of divDesign){
                element.style.display='inlineBlock'
            }
            document.querySelector(".subDiv").append(topDiv)
            let overviewDiv=document.createElement("section")






            //add event listeners to each of the landing page elements
            //add a tenant data captured appropriately
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
            div1.querySelector("form").addEventListener("submit",(e)=>{
                e.preventDefault()
                let tObj={
                    tenants:[{
                    tenantName:`${e.target.tName.value} ${e.target.lName.value}`,
                    phoneNumber:e.target.tNumber.value,
                    id:e.target.id1.value,
                    idNumber:e.target.tId.value,
                    password:e.target.tPass.value,
                    monthlyBills:[
                        {
                            rent:10000,
                            garbage:400
                        }
                    ],
                    payments:[]
                }]
                }
            fetch(`http://localhost:3000/landlords/${item[i].id}`,{
                method:'PATCH',
                body:JSON.stringify(tObj),
                headers:{
                    'Content-Type':"application/json"
                }
            })
            .then(res=>res.json())
            .then(tObj=>console.log(tObj))
            })}
            

            //display tenants on the dashboard
            tenants.addEventListener("click",tenantsFn)
            function tenantsFn(){
                for(let j=0;j<item[i].tenants.length;j++){
                    let tDiv=document.createElement('div')
                    tDiv.innerHTML=`
                    <p>Tenant Name: ${item[i].tenants[j]['tenantName']}</p>
                    <p>Phone Number: ${item[i].tenants[j].phoneNumber}</p>
                    <p>ID Number: ${item[i].tenants[j].idNumber}</p>
                    <p><button id='edit'>Edit</button>  <button id='delete'>Delete Profile</button></p>
                    `
                    subDiv.replaceChildren(tDiv)
                    console.log(subDiv)

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
                })
                
                })}
            }

            //add an apartment function
            addApartment.addEventListener("click",apartmentFn)
            function apartmentFn(){
                let myform=document.createElement("form")
                myform.innerHTML="<p>Enter your username:<br><input type='text' id='user'></p><p>Building Name:<br><input type='text' id='name'></p><p>Building Type:<br><input type='text' id='bType'></p><p>Number of units:<br><input type='number' id='anum'></p><p>Location Address:<br><input type='text' id='address'></p><p><input type='submit'></p>"
                myform.style.marginLeft='20%'
                subDiv.replaceChildren(myform)
                myform.addEventListener("submit",(e)=>{
                    e.preventDefault()
                    let apartmentName=e.target.name.value
                    let apartmentUnits=e.target.anum.value
                    let myUser=e.target.user.value
                    let type1=e.target.bType.value
                    let address=e.target.address.value
                    let myObj={
                            apartments:[{name:apartmentName,
                            type:type1,
                            address:address,
                            units:apartmentUnits,
                            occupied:0
                             }]
                        }
                    fetch(`http://localhost:3000/landlords/${item[i].id}`,{
                        method:"PATCH",
                        body:JSON.stringify(myObj),
                        headers:{
                            'Content-Type':"application/json"
                        }
                    })
                    .then(res=>res.json())
                    .then(myObj=>console.log(myObj))

            })}


   
}
else{
    for(let j=0;j<item[i].tenants.length;j++){
        if(item[i].tenants[j].phoneNumber===e.target.Username.value && item[i].tenants[j].password===e.target.password.value){
            alert("You're logged in as a tenant.")
            let tenantDiv=document.createElement("div")
            tenantDiv.innerHTML=`
            <h1>Billing</h1>
            <h3>Hi ${item[i].name}, below is your outstanding bill as of ${Date()}</h3>
            <h4>Current Due Payments</h4>
            <p>Total Amount Due <span class='amountDue'></span></p>
            <section class='summary'>
            <div id='billLeft'>
            <h3>Bill Summary</h3>
            <p>Previous Balances: <span class='amountDue'></span></p>
            <p><span id='month'></span> Rent: <span class='amountDue></span></p>
            <p>Garbage Fee: <span class='amountDue></span></p>
            <p><strong>Total Amount Due: </strong><span class='amountDue'></span></p>
            <button>Make Payment</button>
            </div>
            <div id='billRight'>
            <h3>Bill history</h3>
            </div>
            </section>
            `
            let divLeft=tenantDiv.querySelector('#billLeft')
            divLeft.style.width='100px'
            let subSection=tenantDiv.querySelector("section")
            subSection.style.display='inline-flex'
            document.querySelector(".loginDiv").replaceWith(tenantDiv)









        }else{
            alert("Enter valid credentials!")
        }
    }
}
}

}}