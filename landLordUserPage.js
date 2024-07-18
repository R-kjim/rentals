let mynewId=localStorage.getItem("loginId")
fetch(`http://localhost:3000/landlords/${mynewId}`)
    .then(res => res.json())
    .then(data => usedataFn(data))
function usedataFn(item) {
        let subDiv = document.querySelector(".subDiv")
        let userDiv = document.createElement("div")
        if(item.apartments.length!==0){
        userDiv.innerHTML = `<ul id="myHeader">
                        <li id="myProperties">Summary</li>
                        <li id="myTenants">Tenants</li>
                        <li id="adds">Add an apartment</li>
                        <li id="myDashboard">Add a tenant</li>
                        <li>Post an Invoice</li>
                    </ul>`

        
        subDiv.append(userDiv)
        let dashboard = userDiv.querySelector("#myDashboard")
        let properties = userDiv.querySelector("#myProperties")
        let tenants = userDiv.querySelector("#myTenants")
        let transaction = userDiv.querySelector("#myTransactions")
        let addApartment = userDiv.querySelector("#adds")
        //summary section which is the landlords default page
        let topDiv = document.createElement("section")
    //     function sumaapartments(){
    //         let sumaapartments1=0
    //     for(let j=0;j<item.apartments.length;j++){
    //       let y=parseInt(item.apartments[j].units)
    //       sumaapartments1+=y
    //     } return sumaapartments1
    // }
    // function incomeSum(){
    //     let incomeTotal=0
    //     for(let j=0;j<item.tenants.length;j++){
    //         let x=(item.tenants[j][0].monthlyBills[0].rent)
    //         incomeTotal+=x
    //     }return incomeTotal
    // }
      

        // topDiv.innerHTML = `
        //     <div class='myView'><p>Total Properties<strong><br>${item.apartments.length}</strong></p></div>
        //     <div class='myView'><p>Total Units<br>${sumaapartments()}</p></div>
        //     <div class='myView'><p>Estimated Monthly Income<br>KSH ${incomeSum()} </p></div>
        //     `
        // subDiv.append(topDiv)
     
        let overviewDiv = document.createElement("section")






        //add event listeners to each of the landing page elements
        //add a tenant data captured appropriately
        // dashboard.addEventListener("click", addTenantFn)
        let div1=document.createElement("div")
        function addTenantFn() {
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
            }
            loopArray()
            subDiv.append(div1)

            //add an eventlistener to theformsothe details captured can bestoredin the databasefor use elsewhere on the page
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

                fetch(`http://localhost:3000/landlords/${mynewId}`, {
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
        addTenantFn()


        //display tenants on the dashboard
        // tenants.addEventListener("click", tenantsFn)
        function tenantsFn() {
            let tDiv = document.createElement('div')
            if(item.tenants.length>=1){
            for (let j = 0; j < item.tenants.length; j++) {
                
                tDiv.innerHTML = `
                <h3>List of all tenants</h3>
                    <p>Tenant Name: ${item.tenants[j]['tenantName']}</p>
                    <p>Phone Number: ${item.tenants[j].phoneNumber}</p>
                    <p>ID Number: ${item.tenants[j].idNumber}</p>
                    <p><button id='edit'>Edit</button></p>
                    `
                subDiv.append(tDiv)
                console.log(subDiv)

                let mybtns = tDiv.querySelector("#edit")

                mybtns.addEventListener("click", () => {
                    let editDiv = document.createElement("div")
                    editDiv.innerHTML = `<form>
                    <p>Edit first name:<input type='text' id='tName' required></p>
                        <p>Edit second name:<input type='text' id='lName' required></p>
                        <p>Edit phone number:<input type='number' id=tNumber required></p>
                        <p>Edit tenant's ID Number:<input type='number' id='tId' required></p>
                        <p>Edit House assigned:<input type='text' id='id1' required></p>
                        <input type='submit'>
                        </form>
                        `
                    tDiv.append(editDiv)

                    let mysubmit = editDiv.querySelector('form')
                    mysubmit.addEventListener("submit", (e) => {
                        e.preventDefault()
                        let updateObj = {
                            id: e.target.id1.value,
                            tenantName: `${e.target.tName.value} ${e.target.lName.value}`,
                            phoneNumber: e.target.tNumber.value,
                            idNumber: e.target.tId.value
                        }
                        fetch(`http://localhost:3000/tenants/${mynewId}`, {
                            method: "PATCH",
                            body: JSON.stringify(updateObj),
                            headers: {
                                'Content-Type': "application/json"
                            }
                        })
                            .then(res => res.json())
                            .then(updateObj => console.log(updateObj))
                    })

                })
            }}else{
                tDiv.innerHTML="<h3>List of Tenants</h3><p>No data to display</p>"
                subDiv.append(tDiv)
            }
        }
        tenantsFn()

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

                fetch(`http://localhost:3000/landlords/${mynewId}`, {
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

        //post an invoice segment
        let invoiceDiv=document.createElement("div")
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
            
        
            fetch(`http://localhost:3000/landlords/${mynewId}`,{
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
        subDiv.append(invoiceDiv)

        
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

                fetch(`http://localhost:3000/landlords/${mynewId}`, {
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