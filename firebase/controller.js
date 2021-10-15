// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

// additional data for sign up users
let additionalData = () => {
  
  return {};
}

// login
let authChanged = (user) => {
  if (!user) {
    // logout
  } else {
    // login
  }
}

// call model
let ref = new Model("users");
let user = ref.findById("4pTmImOFt0SAYxAaiaflSW4MdLa2");
console.log(user.data());
