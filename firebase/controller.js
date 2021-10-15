var firebaseConfig = {
    apiKey: "AIzaSyBG6KDG8G95hAA_wv7oWMzf8X3OQ2dVTpw",
    authDomain: "stock-d7e0d.firebaseapp.com",
    projectId: "stock-d7e0d",
    storageBucket: "stock-d7e0d.appspot.com",
    messagingSenderId: "145417125002",
    appId: "1:145417125002:web:3fe97a52dd76cb04b2c173",
    measurementId: "G-H7BLJZ4MG5"
};


// additional data for sign up users
let additionalData = () => {
  
  return {};
}

// login
let loggedIn = (user) => {
  
}

let loggedOut = () => {

}

// call model
let getUser = () => {
  let ref = new Model("users");
  let user = ref.findById("4pTmImOFt0SAYxAaiaflSW4MdLa2");
  console.log(user.data());
}
