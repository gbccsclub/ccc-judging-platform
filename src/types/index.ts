import {JSX} from "react";

export interface Message {
    type: 'success' | 'error' | 'info' | 'warning' | 'loading';
    text: string | JSX.Element;
}

import { Tables } from './database.types';

export type User = Tables<'User'>;
export type Post = Tables<'Post'>;
export type Rating = Tables<'Rating'>;
export type NavigatedPost = Post & {User: User, Rating?: Rating[] | null};