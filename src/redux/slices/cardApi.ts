import {createApi} from '@reduxjs/toolkit/query/react';
import {cards} from '../../constants/data';
import { shuffleArray } from '../../utils';

export const cardApi = createApi({
  reducerPath: 'cardApi',
  baseQuery: async () => {
    return {
      data: shuffleArray(cards),
    };
  },
  endpoints: builder => ({
    getCards: builder.query({
      query: () => 'cards',
    }),
  }),
});

export const {useGetCardsQuery} = cardApi;
