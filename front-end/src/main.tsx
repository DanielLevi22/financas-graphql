import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ApolloProvider } from '@apollo/client/react'
import './index.css'
import { App } from './App.tsx'
import { apolloClient } from './lib/apollo'
import { AuthInitializer } from './components/AuthInitializer'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={apolloClient}>
      <AuthInitializer>
        <App />
      </AuthInitializer>
    </ApolloProvider>
  </StrictMode>,
)
