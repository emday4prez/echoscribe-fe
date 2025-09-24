import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import './App.css';
import Uploader from './Uploader';


function App({ signOut, user }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Hello, {user.username}</h1>
        <button onClick={signOut}>Sign out</button>
      </div>
      <hr />
      <Uploader /> 
    </div>
  );
}

//wrap app with aws-amplify authenticator
export default withAuthenticator(App);