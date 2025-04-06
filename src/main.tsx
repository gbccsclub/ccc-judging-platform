import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from 'flowbite-react'
import MessageDialog from './components/MessageDialog.tsx'
import { MessageProvider } from './context/MessageContext.tsx'
import { SessionProvider } from './context/SessionContext.tsx'
import { SupabaseProvider } from './context/SupabaseContext.tsx'
import { customTheme } from './services/flowbite.ts'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider theme={customTheme}>
            <SupabaseProvider>
                <MessageProvider>
                    <SessionProvider>
                        <App />
                        <MessageDialog />
                    </SessionProvider>
                </MessageProvider>
            </SupabaseProvider>
        </ThemeProvider>
    </StrictMode>,
)
