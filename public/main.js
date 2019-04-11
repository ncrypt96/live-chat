let socket = io.connect('https://new-realchat.herokuapp.com/')

let outputNode = document.getElementById('outputNode');
let inputText = document.getElementById('inputText');
let sendButton = document.getElementById('sendButton');
let avatarImage = document.getElementById("avatarImage");
let mainDiv = document.getElementById("mainDiv");

let username = "";

Swal.fire({
    titleText:"Enter a username",
    input:'text'
}).then((event)=>{

    username = event.value;

})


inputText.addEventListener('keyup',()=>{
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        sendButton.click();
      }
})

sendButton.addEventListener('click',()=>{

    if(inputText.value != ""){

        socket.emit('message',{
            message:inputText.value,
            username : username
        })
    
        inputText.value = "";

    }
    
})

socket.on('message',(data)=>{

    if(data.username == username){
        outputNode.innerHTML +='<div class="row"><div class="col-2"></div><div class="col-10">  <div class="alert alert-dark" style="background-color:#23272a;border-style: none;border-radius:25px 25px 5px 25px;" role="alert">'+ '<p style="color:white;" >'+data.message+ '</p>' + '</div></div></div>';
    }else{
        outputNode.innerHTML +='<div class="row"><div class="col-10">  <div class="alert alert-dark" style="background-color:#23272a;border-style: none;border-radius:25px 25px 25px 5px;" role="alert">'+ '<p style="color:white;" >'+'<strong style="font-size:20px";>'+ data.username +": " +'</strong>'+'<br/>'+data.message+ '</p>' + '</div></div><div class="col-2"></div></div>';

    }
    
    mainDiv.scrollTop = mainDiv.scrollHeight;
})

{/* <div class="alert alert-primary" role="alert">
  This is a primary alert with <a href="#" class="alert-link">an example link</a>. Give it a click if you like.
</div> */}