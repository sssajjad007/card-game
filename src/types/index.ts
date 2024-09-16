export interface ICard {
  id: number;
  rank: string;
}

export interface IFlipCardProps extends ICard {
  isFlipped: boolean;
  isMatched: boolean;
  onFlip: (id: number) => void;
}
