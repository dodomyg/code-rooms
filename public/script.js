import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

const socket = io("http://localhost:8000");

getMessages();

socket.on("connection", (id) => {
  console.log(id);

  document.querySelector(".h1").innerHTML += `<p>${id}</p>`;
});

function getMessages() {
  socket.on("received-msg", (data) => {
    document.querySelector(".container").innerHTML += `<p>${data}</p>`;
  });
}

function joinRoomId(e){
  e.preventDefault();
  const joinRoom = document.querySelector(".join-room");
  if(joinRoom.value === ""){
    return;
  }
  socket.emit("join-room", joinRoom.value);
  alert("Room Joined : "+joinRoom.value);
  joinRoom.value = "";
}

function submitForm(e) {
  e.preventDefault();
  const message = document.querySelector(".message");
  const roomId = document.querySelector(".roomId");
  if (message.value === "" || roomId.value === "") {
    return;
  }
  socket.emit("message", {
    message: message.value,
    roomId: roomId.value,
  });
  message.value = "";
}

document.getElementById("form2").addEventListener("submit", joinRoomId);

document.getElementById("form").addEventListener("submit", submitForm);
