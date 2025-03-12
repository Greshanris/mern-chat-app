# Realtime Chat-Application

- Backend will be in MERN
- Frontend will be in React and TailwindCSS

## First let's build everything related to API (Backend)

- cd into the ``backend`` folder we created
- initialize node package using ``npm init -y``
- install dependencies using
```powershell
npm install express mongoose dotenv bcryptjs cookie-parser cloudinary socket.io jsonwebtoken
```
- one more for the dev dependency ``npm i nodemon -D``
- signed up in mongoDB and cloudinary
- MongoDB: create a cluster and get the connection string
- Cloudinary: get the cloud name, api key and api secret
- create a ``.env`` file and added mongoDB uri, port, secret key, and cloudinary details.
- created a src folder and added a ``index.js`` file
- changed package.json to run the server using nodemon, using module instead of commonjs in type.
- changed "dev": "nodemon src/index.js" in package.json
- Now, all explanation on what i did will be updated soon.

## Documentation will be updated soon regarding what i did
- The reason being while coding i forgot to note it down and now i am too lazy to go through the code and write it down
- I will try to update it soon for mine and others reference
- Thank you for understanding
- Right now, I will go into frontend and start building the UI
- I will come back to backend and update the documentation but
**Backend is Completed** with ``socket.io`` usage left.

### Just a quick info:
- `Cloudinary:` Used for storing images
- `bcryptjs:` Used for hashing the password
- `jsonwebtoken:` Used for creating the token
- `cookie-parser:` Used for parsing the cookies from the request
- `dotenv:` Used for environment variables
- `express:` Used for creating the server
- `mongoose:` Used for connecting to MongoDB and creating models and schemas and queries.
- `socket.io:` Used for real-time chat(this still needs to be implemented) after the UI is done.

## Now let's build the UI (Frontend)

### First, let's create a react app using Vite
- open terminal
- cd into the ``backend`` folder and run the server ``npm run dev``
- open another terminal
- cd into the ``frontend`` folder we created
- initialize react app using ``npm create vite@latest``

### Install dependencies Using
```powershell
npm i react-router-dom react-hot-toast
```
- react-router-dom for routing and react-hot-toast for toast notifications
#### TailwindCSS
- Install TailwindCSS using
```powershell
npm install tailwindcss @tailwindcss/vite
```
- configure tailwindcss in vite configuration
```javascript
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})
```
- Add the following in the ``index.css`` file
```css
@import "tailwindcss";
```
- run the server using ``npm run dev``

If everything is working fine, you will see the default vite page with vite logo on top of React logo.

#### Now, let's use DaisyUI with TailwindCSS
- This is optional, but i like to use it because we don't have to write much utility class names for every element for basic styling.
- Install DaisyUI using
```powershell
npm i -D daisyui@latest
```
- Add the following in the ``index.css`` file
```css
@plugin "daisyui";
```
after the tailwindcss import.

- Now, you can use the utility classes provided by DaisyUI for basic styling.

### Frontend Development
- First of all, we should implement ``react-router-dom`` for routing.
- Wrap the app component in ``main.jsx`` with ``BrowserRouter`` from ``react-router-dom``.
- Use ``Routes`` and ``Route`` from ``react-router-dom`` to create routes in App.jsx after ``Navbar`` component.
- Create a ``Navbar`` component in the ``components`` folder.
- Create a ``pages`` folder and create all component used in ``element={<Component />}`` like ``Home``, ``Login``, ``Signup``, ``Settings``, ``Profile``.

#### Using axios for API calls instead of fetch and zustand for global state management
##### Axios
- Install axios and zustand using
```powershell
npm i axios zustand
```

- Then, create a folder named ``lib`` inside ``src``folder and create a file named ``axios.js``.
- ``axios.js`` will have the axios instance using ``axios.create({})`` with the base url that is backend API url and we would like to send cookies with each request. So, we set ``withCredentials`` to true.
```javascript
axiosInstance.get('/').then((res) => {
    console.log(res.data);
  }
  ).catch((err) => {
    console.log(err);
  });
```
This is how the axios instance is used to make a request to the backend.

##### Zustand
- It is a global state management library
- Suppose we need state for Authenticating the user, and we need it in Home page, Profile page, Settings page, and Navbar component. So, instead of passing the state as props to each component, we can use zustand to create a global state and use it in any component.

So, to create a authentication state, we create a folder named "store" inside "src" folder and created a file named ``useAuthStore.js``.
```