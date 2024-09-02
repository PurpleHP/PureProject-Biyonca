# Biyonca, A Pure Project for Sabanci University
****
## Summary:
> A simple Web UI made with **React.js** and **Tailwind**. Hosted at Vercel as [Biyonca](https://biyonca.vercel.app/) (not working correctly since the backend is in localhost)\
> `npm run dev` to start the program locally after setting up the backend in your machine. (works in local)\
> [Biyonca](http://localhost:5173) (http://localhost:5173) in local
****
#### https://biyonca.vercel.app/
> Main page. User can click login / sign up buttons.
****
#### https://biyonca.vercel.app/login
> User can login. The auth token, username and password will be encrpted and saved to localstorage to automatically refresh user's token by sending a login request with the decrpted values (should decrpt at backend)
****
#### https://biyonca.vercel.app/signup
> User can create a new account. The auth token, username and password will be encrpted and saved to localstorage to automatically refresh user's token by sending a sign up request with the decrpted values (should decrpt at backend)
****
#### https://biyonca.vercel.app/fetchdata
> **The actual page** for user to see all the test values. User can filter by:\
* Test name
* Test date
* Test number
* Test result
