import React from 'react';

import {Provider} from 'react-redux';
import {store} from './src/redux/store';

import Leaderboard from './src/screens/LeaderBoard';
import CardDeck from './src/screens/CardDeck';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import { ScrollView } from 'react-native';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{flex: 1}}>
        <ScrollView>
          <CardDeck />
          <Leaderboard />
        </ScrollView>
      </GestureHandlerRootView>
    </Provider>
  );
}

export default App;
