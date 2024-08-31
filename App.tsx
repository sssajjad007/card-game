import React from 'react';
import './src/styles';

import {KeyboardProvider} from 'react-native-keyboard-controller';
import Home from './src/screen';

function App(): React.JSX.Element {
  return (
    // remove the KeyboardProvider to prevent rendering
    <KeyboardProvider>
      <Home />
    </KeyboardProvider>
  );
}

export default App;
