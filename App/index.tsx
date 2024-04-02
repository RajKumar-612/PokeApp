import React, { useEffect } from 'react';
import {Provider} from 'react-redux';
import Router from './router';
// Import your Redux store here
import {store, persistor} from './store/store';
import { PersistGate } from 'redux-persist/integration/react';


import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';


const App: React.FC = () => {
  const queryClient = new QueryClient()



  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <QueryClientProvider client={queryClient}>
        <PaperProvider theme={DefaultTheme}>
            <Router />
        </PaperProvider>
      </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
