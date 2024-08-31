import { ScrollView, TextInput} from 'react-native';
import React from 'react';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

export default function Home() {
  const {styles} = useStyles(style);

  console.log('render');
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput style={styles.textInput} />
    </ScrollView>
  );
}

const style = createStyleSheet(() => ({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    width: '90%',
    borderWidth: 1,
    borderColor: 'black',
  },
}));
