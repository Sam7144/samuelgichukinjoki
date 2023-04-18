const button = document.getElementById("btn");
button.addEventListener("click", async(e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;
  //document.getElementById('emailverifier').innerHTML='';
  const validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(!email.match(validRegex)){
        document.getElementById('emailverifier').innerHTML=`invalid email address`;
        return
    }
  const response=await fetch('/details',{
    method:"POST",
    headers:{
      'Content-Type':'application/json',
      'Accept':'application/json'
    },
    body:JSON.stringify({name,email,message})
  })
  const data=await response.json();
  email.value=" ";
  message.value=" ";
  console.log(name);
  document.getElementById('emailverifier').innerHTML=data;
});
name.innerHTML=" ";
