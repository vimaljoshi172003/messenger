const socket = io();
let name;
let textarea = document.querySelector("#textarea");
let messsageArea = document.querySelector('.message_area')
do {
    Name = prompt("Please enter yor name")
} while (!Name);
textarea.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        sendMessage(e.target.value)
    }
})
function sendMessage(message) {
    let msg = {
        user: Name,
        message: message.trim(),
    }
    appendMessage(msg, 'outgoing');
    textarea.value = ""
    scrollToBotttom()
    socket.emit('message', msg)
}
function appendMessage(msg, type) {
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className, 'message');
    let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messsageArea.appendChild(mainDiv)

}
socket.on('message', (msg) => {
    scrollToBotttom()
    appendMessage(msg, 'incoming');
})
function scrollToBotttom() {
    messsageArea.scrollTop = messsageArea.scrollHeight
}