import { configureStore } from "@reduxjs/toolkit";
import reduxReducer from './reducers/reduxReducer';

const saveStateToLocalStorage = (state: any) => {
   try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('reduxState', serializedState);
   } catch (error) {
      console.error('Error saving to localStorage:', error);
   }
};

const loadStateFromLocalStorage = () => {
   try {
      const serializedState = localStorage.getItem('reduxState');
      if (serializedState === null) {
         return undefined;
      }
      return JSON.parse(serializedState);
   } catch (error) {
      console.error('Error loading state from localStorage:', error);
      return undefined;
   }
};

const store = configureStore({
   reducer: reduxReducer,
   preloadedState: loadStateFromLocalStorage() || undefined,
});

store.subscribe(() => {
   const state = store.getState();
   saveStateToLocalStorage(state);
});

export default store;