import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {sortLeaderboard} from '../utils';

const Leaderboard: React.FC = () => {
  const leaderboard = useSelector(
    (state: RootState) => state.leaderboard.entries,
  );

  const sortedLeaderboard = sortLeaderboard(leaderboard);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>
      <FlatList
        scrollEnabled={false}
        data={sortedLeaderboard}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item, index}) => (
          <View style={styles.entry}>
            <Text style={styles.text}>
              #{index + 1}: Moves - {item.moves}, Time - {item.time}s
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 20,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  entry: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  text: {
    fontSize: 18,
  },
});

export default Leaderboard;
