export interface Message {
    type: 'success' | 'error' | 'info' | 'warning' | 'loading';
    text: string;
}

import { Tables } from './database.types';

export type User = Tables<'User'>;
export type Post = Tables<'Post'>;