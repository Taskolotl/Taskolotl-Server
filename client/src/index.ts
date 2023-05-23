console.log("HELLO CLIENT!");

const button = document.getElementById("myButton");

button!.addEventListener("click", onButtonClick);


function onButtonClick() {
    console.log("BUTTON CLICKED");
}