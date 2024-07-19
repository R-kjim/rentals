let mynewId=localStorage.getItem("loginId")
fetch(`https://database-orcin.vercel.app/landlords/${mynewId}`)
    .then(res => res.json())
    .then(data => usedataFn(data))
function usedataFn(item) {
        let subDiv = document.querySelector(".subDiv")
        let replacableDiv=document.createElement("div")
        replacableDiv.setAttribute("class","changeable")
        let userDiv = document.createElement("div")
        if(item.apartments.length!==0){
        userDiv.innerHTML = `<ul id="myHeader">
                        <li id="myTenants">Add a tenant</li>
                        <li id="adds">Add an apartment</li>
                        <li id='invoice'>Post an Invoice</li>
                    </ul>`

        
        subDiv.append(userDiv)
        let tenants = userDiv.querySelector("#myTenants")
        let addApartment = userDiv.querySelector("#adds")
        let postInvoice=userDiv.querySelector("#invoice")

        //summary section which is the landlords default page
        let topDiv = document.createElement("section")
        //functions that evaluate values for use in the summary section
            let myApartments=item.apartments.length//numberof apartments

            //calculate the totalnumber of units for each landlord
            let myUnits=0
            function totalUnits(){
                for(let j=0;j<item.apartments.length;j++){
                    let subUnits=parseInt(item.apartments[j].units)
                    myUnits+=subUnits
                }
                return myUnits
            }

            //function that calculates the expected income based on number of units rented
            let incomeExp=0
            function expectedFn(){
                for(let j=0;j<item.tenants.length;j++){
                    let individualIncome=parseInt(item.tenants[0][j].monthlyBills[0].rent)
                    incomeExp+=individualIncome
                }
                return incomeExp
            }
      

        topDiv.innerHTML = `
            <div class='myView'><p>Total Properties<strong><br>${myApartments}</strong></p></div>
            <div class='myView'><p>Total Units<br>${totalUnits()}</p></div>
            <div class='myView'><p>Estimated Monthly Income<br>KSH ${expectedFn()} </p></div>
            `
        subDiv.append(topDiv)
     
        //display tenants on the dashboard
        let tenantDisplay=document.createElement("div")
        tenantDisplay.innerHTML="<h3>My Tenants</h3>"
        tenantDisplay.setAttribute("class","myLists")
        function tenantsFn() {
           for(i=0;i<item.tenants[0].length;i++){
            let mydiv=document.createElement("div")
            mydiv.innerHTML=`
            <p>Name: ${item.tenants[0][i].tenantName}</p>
            <p>Apartment: ${item.tenants[0][i].phoneNumber}</p>
            
            `
            tenantDisplay.append(mydiv)
            subDiv.append(tenantDisplay)
           }
            }
            tenantsFn()


        //add event listeners to each of the landing page elements
        //add a tenant data captured appropriately
        tenants.addEventListener("click", addTenantFn)
        
        let div1=document.createElement("div")
        div1.setAttribute("class","changeable")
        function addTenantFn() {
            subDiv.appendChild(replacableDiv)

            div1.innerHTML = `
            <form>
            <h3>Add a Tenant</h3>
            <p>Enter first name:<br><input type='text' id='tName' required</p>
            <p>Enter second name:<br><input type='text' id='lName' required></p>
            <p>Enter phone number:<br><input type='number' id=tNumber required></p>
            <p>Enter tenant's ID Number:<br><input type='number' id='tId' required></p>
            <p>Housing Apartment: <br><select required id='apartment'></select></p>
            <p>House assigned:<br><input type='text' id='id1' required></p>
            <p>Create a password: <br><input type='password' id=tPass required></p>
            <input type='submit' id='submit'>
            </form>
            `
            //loop through our data to  obtain a list of all apartments under each landlord and create a dropdown to be used when adding a tenant
            function loopArray(){
                for(let j=0;j<item.apartments.length;j++){
                let x=item.apartments[j].name
                let myChoices=document.createElement("option")
                myChoices.textContent=x
                div1.querySelector("select").append(myChoices)
            } 
            replacableDiv.replaceChildren(div1)

            }
            loopArray()
            document.querySelector(".changeable").replaceWith(div1)
            //add an eventlistener to the form so the details captured can be stored in the databasefor use elsewhere on the page
            div1.querySelector("form").addEventListener("submit", (e) => {
                e.preventDefault()

                //update data on the database through PATCH method
                //adds a tenant to the existing array
                let tObj = {
                        tenantName: `${e.target.tName.value} ${e.target.lName.value}`,
                        phoneNumber: e.target.tNumber.value,
                        id: e.target.id1.value,
                        idNumber: e.target.tId.value,
                        password: e.target.tPass.value,
                        apartment:e.target.apartment.value,
                        monthlyBills: [
                            {
                                rent: 10000,
                                garbage: 400
                            }
                        ],
                        payments: {
                            invoice:[],
                            cashIn:[],
                            balances:[]
                        }
                    
                }
                let array=item.tenants
                let myObj1={tenants:[...array,tObj]}//updates the array tobe patched by making acopy of the existing one and adding
                console.log(myObj1)

                fetch(`https://database-orcin.vercel.app/landlords${mynewId}`, {
                    method: 'PATCH',
                    body: JSON.stringify(myObj1),
                    headers: {
                        'Content-Type': "application/json"
                    }
                })
                    .then(res => res.json())
                    .then(tObj => console.log(tObj))
            })
        }
        // addTenantFn()


           
        // }}

        //add an apartment function
        //add an event listener to the add an apartment section
        addApartment.addEventListener("click",apartmentFn)
        function apartmentFn() {
            let myform = document.createElement("form")
            myform.setAttribute("class","changeable")
            myform.innerHTML = "<h3>Add an apartment</h3><p>Enter your username:<br><input type='text' id='user' required></p><p>Building Name:<br><input type='text' id='name' required></p><p>Building Type:<br><input type='text' id='bType' required></p><p>Number of units:<br><input type='number' id='anum' required></p><p>Location Address:<br><input type='text' id='address'></p><p><input type='submit' id='submit'></p>"
            document.querySelector(".changeable").replaceWith(myform)
            myform.addEventListener("submit", (e) => {
                e.preventDefault()
                location.reload()
                let apartmentName = e.target.name.value
                let apartmentUnits = e.target.anum.value
                let myUser = e.target.user.value
                let type1 = e.target.bType.value
                let address = e.target.address.value
                let array = item.apartments
                let newObj = {
                    name: apartmentName,
                    type: type1,
                    address: address,
                    units: apartmentUnits,
                    occupied: 0
                }
                let myObj = {
                    apartments: [...array, newObj]
                }

                fetch(`https://database-orcin.vercel.app/landlords/${mynewId}`, {
                    method: "PATCH",
                    body: JSON.stringify(myObj),
                    headers: {
                        'Content-Type': "application/json"
                    }
                })
                    .then(res => res.json())
                    .then(myObj => console.log(myObj))

            })
        }
        // apartmentFn()

        //post an invoice segment
        //add an eventlistener to post an invoicefor the tenants
        postInvoice.addEventListener("click",postInvoiceFn)
        function postInvoiceFn(){
        let invoiceDiv=document.createElement("div")
        invoiceDiv.setAttribute("class","changeable")
        invoiceDiv.innerHTML=`
        <h3>Post an Invoice to all Tenants</h3>
        <form>
        <label>Rent:<br><input type='number' id='rent' required></label><br>
        <label>Garbage: <br><input type='number' id='garbage' required></label><br>
        <label>Total: <span id='total'></span></label><br>
        <button>Send</button>
        </form>
        `
        invoiceDiv.querySelector("form").addEventListener("submit",(e)=>{
            e.preventDefault()
            let mybills=parseInt(e.target.rent.value)+parseInt(e.target.garbage.value)
            invoiceDiv.querySelector("#total").textContent=mybills
            for(let j=0;j<item.tenants.length;j++){
                let coppyArray=[...item.tenants]
            //    coppyArray[j].payments.balances[0]=parseInt(coppyArray[j].payments.balances[0])
               coppyArray[j].payments.balances+=mybills
               let patchObj={

                tenants:[coppyArray]
               }
            
        
            fetch(`https://database-orcin.vercel.app/landlords/${mynewId}`,{
                method:"PATCH",
                body:JSON.stringify(patchObj),
                headers: {
                    'Content-Type': "application/json"
                }
            })
            .then(res=>res.json())
            .then(patchObj=>console.log(patchObj))
        }
        })
        document.querySelector(".changeable").replaceWith(invoiceDiv)
        }
        
    }else{
            userDiv.innerHTML=`Add an apartment first so you can view your data`
            subDiv.append(userDiv)
             //add an apartment function
        function apartmentFn() {
            let myform = document.createElement("form")
            myform.innerHTML = "<h3>Add an apartment</h3><p>Enter your username:<br><input type='text' id='user' required></p><p>Building Name:<br><input type='text' id='name' required></p><p>Building Type:<br><input type='text' id='bType' required></p><p>Number of units:<br><input type='number' id='anum' required></p><p>Location Address:<br><input type='text' id='address'></p><p><input type='submit' id='submit'></p>"
            subDiv.append(myform)
            myform.addEventListener("submit", (e) => {
                e.preventDefault()
                let apartmentName = e.target.name.value
                let apartmentUnits = e.target.anum.value
                let myUser = e.target.user.value
                let type1 = e.target.bType.value
                let address = e.target.address.value
                let array = item.apartments
                let newObj = {
                    name: apartmentName,
                    type: type1,
                    address: address,
                    units: apartmentUnits,
                    occupied: 0
                }
                let myObj = {
                    apartments: [...array, newObj]
                }

                fetch(`https://database-orcin.vercel.app/landlords/${mynewId}`, {
                    method: "PATCH",
                    body: JSON.stringify(myObj),
                    headers: {
                        'Content-Type': "application/json"
                    }
                })
                    .then(res => res.json())
                    .then(myObj => console.log(myObj))

            })
        }
        apartmentFn()
        }
    
}