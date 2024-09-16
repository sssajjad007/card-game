import {LeaderboardEntry} from '../redux/slices/types';

const shuffleArray = (array: any[]) => {
  return array
    .map((item: any) => ({...item, sort: Math.random()}))
    .sort((a: {sort: number}, b: {sort: number}) => a.sort - b.sort)
    .map(({...item}) => item);
};

const sortLeaderboard = (entries: LeaderboardEntry[]): LeaderboardEntry[] => {
  return entries.slice().sort((a, b) => {
    if (a.time !== b.time) {
      return a.time - b.time;
    }
    return a.moves - b.moves;
  });
};

export {shuffleArray, sortLeaderboard};
