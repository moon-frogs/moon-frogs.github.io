const output = document.getElementById("output");
const button = document.getElementById("button");
const input = document.getElementById("stuff");

function collectData(){
    let arg = input.value;
    arg = arg.split("");
    let integer = parseInt(arg[0]);
    let message = [];
    for (let i = 0; i < integer; i++){
        message.push(arg[1]);
    }
    message = message.toString();
    output.textContent = message;
}