const loginForm = document.querySelector('#login-form');
const logout = document.querySelector('#logout');
const signupForm = document.querySelector('#signup-form');

// login
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;
  // log the user in
  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    // close the signup modal & reset form
    $("#modal-login").modal("hide");
    loginForm.reset();
  });
});

// logout
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut();
});

// signup
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // get user info
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;
  // sign up the user & add firestore data
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    return db.collection('users').doc(cred.user.uid).set(additionalData());
  }).then(() => {
    // close the signup modal & reset form
    $("#modal-signup").modal("hide");
    signupForm.reset();
  });
});

// listen for auth status changes
auth.onAuthStateChanged(async user => {
  authChanged(user);
});
