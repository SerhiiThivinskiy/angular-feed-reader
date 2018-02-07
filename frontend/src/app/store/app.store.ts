import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger'
import {
  persistStore,
  persistCombineReducers,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import { applyMiddleware, createStore, Store } from 'redux';
import { AppState } from '../app.state';
import { feedsReducer } from './feeds.reducer';

const logger = createLogger();
const config = {
  key: 'root',
  storage: storage,
};

const reducers = persistCombineReducers(config, {
  feeds: feedsReducer
});

export const configureStore = () => {
  const store: Store<AppState> = createStore(
    reducers,
    composeWithDevTools(
      applyMiddleware(logger)
    )
  );
  const persistor = persistStore(store);

  return { persistor, store };
};
