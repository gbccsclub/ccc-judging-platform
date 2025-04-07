export interface Message {
    type: 'success' | 'error' | 'info' | 'warning' | 'loading';
    text: string;
}

import { Tables } from './database.types';

export type User = Tables<'User'>;
export type Post = Tables<'Post'>;
export type Rating = Tables<'Rating'>;
export type PostWithUser = Post & { User: User };
export type NavigatedPost = Post & {User: User, Rating?: Rating[] | null};