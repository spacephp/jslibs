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
