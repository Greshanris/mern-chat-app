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



