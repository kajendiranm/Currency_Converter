let opt_doc = document.querySelectorAll("select")
let button = document.querySelector('button')
let from_value = document.getElementById('input-from')
let to_value = document.getElementById('input-to')

fetch('https://api.frankfurter.app/currencies')
.then(res=>res.json())
.then(res=>displayDropdown(res))

function displayDropdown(res){
    arr = (Object.entries(res))
    for(i=0;i<arr.length;i++)
    {
        curr = arr[i][0]
        let opt = `<option value="${curr}">${curr}</option>`
        opt_doc[0].innerHTML+=opt
        opt_doc[1].innerHTML+=opt
    }
}

button.addEventListener('click',()=>{
    let from = opt_doc[0].value
    let to = opt_doc[1].value
    let fromvalue = from_value.value
    if(from==to)
        to_value.value = fromvalue
    else
        convert(from,to,fromvalue)
    
})

function convert(from,to,fromvalue){
    const host = 'api.frankfurter.app';
    fetch(`https://${host}/latest?amount=${fromvalue}&from=${from}&to=${to}`)
  .then(resp => resp.json())
  .then((data) => {
    to_value.value = Object.values(data.rates)[0]
  });
}