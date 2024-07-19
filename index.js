//add eventlisteners totheforms and captureand store their data
let myApartment=document.querySelector("#landlord")
console.log(myApartment)
myApartment.addEventListener("submit",submitFn)
function submitFn(e){
    e.preventDefault()

    let newObj={
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
    
