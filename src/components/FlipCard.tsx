import React, {FC, useEffect} from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {IFlipCardProps} from '../types';

const IMAGE = '../assets/card-background.jpg';

const FlipCard: FC<IFlipCardProps> = ({
  id,
  rank,
  isFlipped,
  isMatched,
  onFlip,
}) => {
  const rotation = useSharedValue(isFlipped ? 0 : 180);

  const frontStyle = useAnimatedStyle(() => ({
    transform: [{rotateY: `${rotation.value}deg`}],
    backfaceVisibility: 'hidden',
  }));

  const backStyle = useAnimatedStyle(() => ({
    transform: [{rotateY: `${rotation.value + 180}deg`}],
    backfaceVisibility: 'hidden',
    position: 'absolute',
  }));

  useEffect(() => {
    rotation.value = withTiming(isFlipped || isMatched ? 0 : 180, {
      duration: 800,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFlipped, isMatched]);

  const handlePress = () => {
    if (!isMatched) {
      onFlip(id);
    }
  };

  return (
    <Pressable onPress={handlePress} style={styles.cardContainer}>
      <View>
        <Animated.View style={[styles.card, frontStyle]}>
          <Text style={styles.rank}>{rank}</Text>
        </Animated.View>
        <Animated.View style={[styles.card, backStyle]}>
          <Image source={require(IMAGE)} style={styles.image} />
        </Animated.View>
      </View>
    </Pressable>
  );
};

export default FlipCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    height: 150,
  },
  card: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'black',
  },
  rank: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
});
