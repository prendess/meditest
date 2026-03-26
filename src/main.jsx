import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'

const theme = extendTheme({
    colors: {
        brand: {
            50: '#e8f5e9',
            100: '#c8e6c9',
            500: '#4caf50',
            600: '#43a047',
            700: '#388e3c',
        }
    },
    styles: {
        global: {
            body: {
                bg: 'brand.50',
                color: 'gray.800'
            }
        }
    }
})

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <BrowserRouter basename="/meditest">
                <App />
            </BrowserRouter>
        </ChakraProvider>
    </React.StrictMode>,
)