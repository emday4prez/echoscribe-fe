import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import './App.css';

// withAuthenticator component wraps the app
// automatically show a sign-in/sign-up form
// if the user is not authenticated.
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

export default withAuthenticator(App);