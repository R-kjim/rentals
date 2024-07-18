let myIndex=localStorage.getItem("loginTenant")
let myLandlord=localStorage.getItem("myLandlord")
console.log(myLandlord)
console.log(myIndex)
fetch(`http://localhost:3000/landlords/${myLandlord}`)
.then(res=>res.json())
.then(data=>usemydataFn(data))
function usemydataFn(item){
let tenantDiv=document.createElement("div")
tenantDiv.innerHTML=`
<h1>Billing</h1>
<p>Hi ${item.tenants.tenantName}, below is your outstanding bill as of ${Date()}</p>
<h4>Current Due Payments</h4>
<p>Total Amount Due <span class='amountDue'></span></p>
<section class='summary'>
<div id='billLeft'>
<h3>Bill Summary</h3>
<p>Previous Balances: <span class='amountDue'></span></p>
<p><span id='month'></span> Rent: <span class='amountDue'></span></p>
<p>Garbage Fee: <span class='amountDue'></span></p>
<p><strong>Total Amount Due: </strong><span class='amountDue'></span></p>
<button>Make Payment</button>
</div>
<div id='billRight'>
<h3>Bill history</h3>
</div>
</section>
`
document.querySelector("#subBody").append(tenantDiv)
let divLeft=tenantDiv.querySelector('#billLeft')
divLeft.style.width='100px'
let subSection=tenantDiv.querySelector("section")
subSection.style.display='inline-flex'

}