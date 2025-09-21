import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import './App.css';

// withAuthenticator component wraps the app
// automatically show a sign-in/sign-up form
// if the user is not authenticated.
function App({ signOut, user }) {
  return (
    <div>
      <h1>Hello, {user.username}!</h1>
      <p>Welcome to EchoScribe.</p>
      {/* This signOut function is provided by withAuthenticator */}
      <button onClick={signOut}>Sign out</button>
    </div>
  );
}

export default withAuthenticator(App);