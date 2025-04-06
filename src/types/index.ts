export interface Message {
    type: 'success' | 'error' | 'info' | 'warning' | 'loading';
    text: string;
}