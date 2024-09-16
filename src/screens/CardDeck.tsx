import React, { useState, useEffect, useRef} from 'react';
import {View, StyleSheet, FlatList, Text, Button} from 'react-native';
import FlipCard from '../components/FlipCard';
import {ICard} from '../types';
import {useGetCardsQuery} from '../redux/slices/cardApi';
import {
  addLeaderboardEntry,
  saveLeaderboard,
  loadLeaderboard,
} from '../redux/slices/leaderboardSlice';

import useTimer from '../hooks/useTimer';
import {dispatch} from '../redux/store';

const CardDeck: React.FC = () => {
  const {data: shuffledCards} = useGetCardsQuery({});

  const [flippedCards, setFlippedCards] = useState<ICard[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);
  const [hasGameStarted, setHasGameStarted] = useState(false);

  const moveRef = useRef(moves);

  const {time, resetTimer} = useTimer({
    isRunning: hasGameStarted && !gameFinished,
  });

  useEffect(() => {
    dispatch(loadLeaderboard());
  }, []);


  const handleFlip = (id: number) => {
    if (flippedCards.length === 2 || matchedCards.includes(id)) {
      return;
    }

    if (!hasGameStarted) {
      setHasGameStarted(true);
    }

    const flippedCard = shuffledCards.find(
      (card: {id: number}) => card.id === id,
    );
    if (flippedCard) {
      const newFlippedCards = [...flippedCards, flippedCard];
      setFlippedCards(prev => [...prev, flippedCard]);

      if (newFlippedCards.length === 2) {
        moveRef.current += 1;
        setMoves(prev => prev + 1);

        const [firstCard, secondCard] = newFlippedCards;
        if (firstCard.rank === secondCard.rank) {
          setMatchedCards(prev => [...prev, firstCard.id, secondCard.id]);
          setFlippedCards([]);

          if (matchedCards.length + 2 === shuffledCards.length) {
            setGameFinished(true);
            dispatch(addLeaderboardEntry({moves: moveRef.current, time}));
            dispatch(saveLeaderboard());
          }
        } else {
          setTimeout(() => {
            setFlippedCards([]);
          }, 1000);
        }
      }
    }
  };

  const isCardFlipped = (id: number) =>
    flippedCards.some(card => card.id === id);

  const isCardMatched = (id: number) => matchedCards.includes(id);

  const renderItem = ({item}: {item: ICard}) => (
    <View style={styles.cardContainer}>
      <FlipCard
        id={item.id}
        rank={item.rank}
        isFlipped={isCardFlipped(item.id)}
        isMatched={isCardMatched(item.id)}
        onFlip={handleFlip}
      />
    </View>
  );

  const handleReset = () => {
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setGameFinished(false);
    setHasGameStarted(false);
    resetTimer();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.stats}>
        Moves: {moves} | Time: {time}s
      </Text>
      <FlatList
        scrollEnabled={false}
        data={shuffledCards}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={3}
        contentContainerStyle={styles.grid}
      />
      <Button title="Reset Game" onPress={handleReset} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
  },
  grid: {
    padding: 4,
  },
  cardContainer: {
    flex: 1,
    margin: 4,
  },
  stats: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default CardDeck;
