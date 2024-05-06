import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import './index.css';
import App from './App';

import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  components: {
    Text: {
      baseStyle: {
        fontWeight: 'normal',  // Default weight
      },
      variants: {
        heading: {
          fontSize: '6xl',
          fontWeight: 'bold',
          lineHeight: 'shorter',
        },
        subHeading: {
          fontSize: 'xl',
          fontWeight: 'normal',
        }
      }
    }
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);

