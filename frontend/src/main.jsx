import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { RoutesComponent } from './routes'
import { AuthProvider } from './provider/AuthContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider>
      <AuthProvider>
        <RoutesComponent />
      </AuthProvider>
    </ChakraProvider>
  </StrictMode>,
)
