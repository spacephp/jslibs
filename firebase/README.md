# Firebase

## New project

### Add firebase libraries
```html
<!-- Firebase App (the core Firebase SDK) is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/8.9.1/firebase-app.js"></script>

<!-- If you enabled Analytics in your project, add the Firebase SDK for Analytics -->
<script src="https://www.gstatic.com/firebasejs/8.9.1/firebase-analytics.js"></script>

<!-- Add Firebase products that you want to use -->
<script src="https://www.gstatic.com/firebasejs/8.9.1/firebase-auth.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.9.1/firebase-firestore.js"></script>

<script>
    var firebaseConfig = {
        apiKey: "AIzaSyBG6KDG8G95hAA_wv7oWMzf8X3OQ2dVTpw",
        authDomain: "stock-d7e0d.firebaseapp.com",
        projectId: "stock-d7e0d",
        storageBucket: "stock-d7e0d.appspot.com",
        messagingSenderId: "145417125002",
        appId: "1:145417125002:web:3fe97a52dd76cb04b2c173",
        measurementId: "G-H7BLJZ4MG5"
    };
    
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    const auth = firebase.auth();
    const db = firebase.firestore();
</script>

<!-- Our firebase library -->
<script src="https://oangia.github.io/jslibs/firebase/firebase-core.js"></script>

<!-- Your own code. We have sample file in this repository -->
<script src="controller.js"></script>
```

#### Controller
##### Additional user data for sign up
```js
let additionalData = () => {
  
  return {};
}
```
##### Proceduce when user login/logout
```js
let loggedOut = () => {
  
}

let loggedIn = (user) => {

}
```
##### Call model
```js
let ref = new Model("users");
let user = await ref.findById("4pTmImOFt0SAYxAaiaflSW4MdLa2");
console.log(user.data());
```
