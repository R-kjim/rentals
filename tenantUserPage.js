let myIndex=localStorage.getItem("loginTenant")
let myLandlord=localStorage.getItem("myLandlord")
console.log(myLandlord)
console.log(myIndex)
fetch(`http://localhost:3000/landlords/${myLandlord}`)
.then(res=>res.json())
.then(data=>usemydataFn(data))
function usemydataFn(item){
let tenantDiv=document.createElement("div")
//functions to display data in the tenants sections
let totalDue=parseInt(item.tenants[0][myIndex].payments.balances)
let prevBal
let garbageFee=item.tenants[0][myIndex].monthlyBills[0].garbage
let rentDues=item.tenants[0][myIndex].monthlyBills[0].rent
tenantDiv.innerHTML=`
<h1>Billing</h1>
<p>Hi ${item.tenants[0][myIndex].tenantName}, below is your outstanding bill as of ${Date()}</p>
<h4>Current Due Payments</h4>
<p>Total Amount Due <span class='amountDue'>KSH ${totalDue}</span></p>
<section class='summary'>
<div id='billLeft'>
<h3>Bill Summary</h3>
<p>Previous Balances: <span class='amountDue'></span></p>
<p><span id='month'></span> Rent: <span class='amountDue'>${rentDues}</span></p>
<p>Garbage Fee: <span class='amountDue'>${garbageFee}</span></p>
<p><strong>Total Amount Due: </strong><span class='amountDue'></span></p>
<button>Make Payment</button>
</div>
<div id='billRight'>
<h3>Bill history</h3>
</div>
</section>
`
//add an event to the make payment button so it updates accordingly
let payBtn=tenantDiv.querySelector("button").addEventListener("click",()=>{
    let payDiv=document.createElement("div")
    payDiv.innerHTML=`
    <p><form>Enter Amount:<br><input type='number'id='amount'><input type='submit'></form></p>
    `
    tenantDiv.append(payDiv)
    let payForm=(tenantDiv.querySelector("form"))

    payForm.addEventListener("submit",(e)=>{
        e.preventDefault()
        console.log(e.target.amount.value)
        let updatedObj=item
        updatedObj.payments.push(e.target.amount.value)
        updatedObj.tenants[0][myIndex].payments.cashIn.push(e.target.amount.value)

    })
})





document.querySelector("#subBody").append(tenantDiv)
let divLeft=tenantDiv.querySelector('#billLeft')
divLeft.style.width='100px'
let subSection=tenantDiv.querySelector("section")
subSection.style.display='inline-flex'

}