# Firebase javascript libraries

#### Add these two functions in your code to use auth library
##### Additional user data for sign up
```
let additionalData = () => {
  
  return {};
}
```
##### Produce when user login/logout
```
let authChanged = (user) => {
  if (!user) {
    // logout
  } else {
    // login
  }
}
```
##### Call model
```
let ref = new Model("users");
let user = ref.findById("4pTmImOFt0SAYxAaiaflSW4MdLa2");
console.log(user.data());
```

```html
<!-- Firebase App (the core Firebase SDK) is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/8.9.1/firebase-app.js"></script>

<!-- If you enabled Analytics in your project, add the Firebase SDK for Analytics -->
<script src="https://www.gstatic.com/firebasejs/8.9.1/firebase-analytics.js"></script>

<!-- Add Firebase products that you want to use -->
<script src="https://www.gstatic.com/firebasejs/8.9.1/firebase-auth.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.9.1/firebase-firestore.js"></script>

<script>
    // TODO: Replace the following with your app's Firebase project configuration
    // For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
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

    db.enablePersistence()
        .catch((err) => {
            if (err.code == 'failed-precondition') {
                // Multiple tabs open, persistence can only be enabled
                // in one tab at a a time.
                // ...
            } else if (err.code == 'unimplemented') {
                // The current browser does not support all of the
                // features required to enable persistence
                // ...
            }
        });
    // Subsequent queries will use persistence, if it was enabled successfully
</script>
<!-- Compiled and minified JavaScript -->
<!-- Javascript firebase libs -->
<script src="https://oangia.github.io/jslibs/utils/utils.js"></script>
<script src="https://oangia.github.io/jslibs/firebase/model.js"></script>
<script src="https://oangia.github.io/jslibs/firebase/auth.js"></script>
<script src="https://oangia.github.io/jslibs/charts/chart.js"></script>

<script src="/script/firebase.js"></script>
<script src="/script/html.js"></script>
<script src="/script/chart.js"></script>

<script src="/script/main.js"></script>

```
