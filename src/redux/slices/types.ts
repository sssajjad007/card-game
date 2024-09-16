export interface LeaderboardEntry {
  moves: number;
  time: number;
}

export interface LeaderboardState {
  entries: LeaderboardEntry[];
}
