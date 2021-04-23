//DOM queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-rooms');
// add a new chat 
newChatForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)
        .then(() => newChatForm.reset())
        .catch(error => console.log(error))
})

//update the new name
newNameForm.addEventListener('submit', e => {
    e.preventDefault();
    //update name via chat room clas
    const newName = newNameForm.name.value.trim();
    chatroom.updateName(newName);
    // reset the form 
    newNameForm.reset();
    //show then hide the update msg
    updateMssg.innerText = `your name was updated to ${newName}`
    setTimeout(() => updateMssg.innerText = '', 3000)
})

// update the caht rooms 
rooms.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
        chatUI.clear();
        chatroom.updateRoom(e.target.getAttribute('id'));
        chatroom.getChats(chat => chatUI.render(chat));
    }
})


// check local storage name
const username = localStorage.username ? localStorage.username : 'gost';

// class instences 
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general', username);


// get the cahts and render
chatroom.getChats(data => chatUI.render(data));