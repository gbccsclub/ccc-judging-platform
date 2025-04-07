import { createContext, useContext, useState } from 'react';
import { Message } from '../types';

interface MessageContextType {
  message: Message | null;
  setMessage: (message: Message | null) => void;
}

const MessageContext = createContext<MessageContextType | null>(null);

export function MessageProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState<Message | null>(null);
  
  return (
    <MessageContext.Provider value={{ message, setMessage }}>
      {children}
    </MessageContext.Provider>
  );
}

export function useMessage() {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessage must be used within a MessageProvider');
  }
  return context;
}