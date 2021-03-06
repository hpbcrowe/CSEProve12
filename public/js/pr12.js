const socket = io('/'); // This means your client will always be connected to your server, locally or on Heroku.

const errorContainer = document.getElementById('errMsg');
const usernameInput = document.getElementById('username');
const date = new Date()  //initializing the date...

// Using ASYNC to do a post function
const getData = async (url = '') => {
    const response = await fetch(url, {
      method: 'GET',
    });
    return response.json()
};

// A simple async POST request function
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return response.json()
};

//Format time as a string

const getTime = () => {
    const d = new Date();

    //use String.padStart to add zeroes at the start
    const hours = d.getHours().toString().padStart(2, '0');
    const mins = d.getMinutes().toString().padStart(2, '0');
  
    // Return the time as a string
    return `${hours}:${mins}`;
};

// Login user to access chat room.
const login = async () => {

    // Get the username from  the input
    const username = usernameInput.value;
  
    // Checking to see if there is a username or if it is blank....
    errorContainer.innerHTML = '';
    if (!username || username.trim() === '') {
      errorContainer.innerHTML = 'Username cannot be empty!';
      return;
    }
  
    // Get JSON data from the server
    const data = await postData('/login', {
      username,
    });
  
    // Check for errors
    if (data.error) {
      errorContainer.innerHTML = data.error;
      return;
    }
  
    // No errors, emit a newUser event and redirect to /chat
    socket.emit('newUser', username, getTime());
    window.location = '/chat';
  };