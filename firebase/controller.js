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
let getUser = async () => {
  let ref = new Model("users");
  let user = await ref.findById("4pTmImOFt0SAYxAaiaflSW4MdLa2");
  console.log(user.data());
}
