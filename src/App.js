import './App.css';
import {
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import app from './firebase.init';
import { useState } from 'react';


const auth = getAuth(app);
function App() {
  const [user, setUser] = useState({});
  const googleProvider = new GoogleAuthProvider();
  const githubProvider= new GithubAuthProvider();

  const handleSignInWithGoogle = () => {
    // console.log('working');
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setUser(user);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSignInWithGithub=()=>{
    // console.log('working');
    signInWithPopup(auth,githubProvider)
      .then((result)=>{
        const user=result.user;
        console.log(user);
        setUser(user);
      }).catch((error)=>{
        console.error(error);
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      }).catch(() => {

      });
  };

  return (
    <div style={{
      border: '1px solid yellow',
      borderRadius: '15px',
      backgroundColor: 'lightcoral'
    }} className="App">

      {user.email ?
        <button style={{ borderRadius: '10px', marginTop: '15px', border: 'none', marginLeft: '15px' }} onClick={handleSignOut}>SignOut</button>
        :
        <>
        <button style={{ borderRadius: '10px', marginTop: '15px', border: 'none', marginLeft: '15px' }} onClick={handleSignInWithGoogle}>SignInWithGoogle</button>
        <button style={{ borderRadius: '10px', marginTop: '15px', border: 'none', marginLeft: '15px' }} onClick={handleSignInWithGithub}>SignInWithGithub</button>
        </>
      }

      <h2 style={{ color: 'white' }}>Name : {user.displayName}</h2>
      <img style={{ borderRadius: '100%', border: '1px solid green' }} src={user.photoURL} alt="" />
      <h3 style={{ color: 'white' }}>email : {user.email}</h3>
    </div>
  );
}

export default App;

