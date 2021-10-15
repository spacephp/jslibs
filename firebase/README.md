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
let user = ref.findById("4pTmImOFt0SAYxAaiaflSW4MdLa2");
console.log(user.data());
```
