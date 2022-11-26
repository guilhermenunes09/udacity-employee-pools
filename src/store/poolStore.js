import { createStore } from 'redux';

export default () => {
  const store = createStore((state = {counter: 0}, action) => {
    switch(action.type) {
      case 'GET_POOLS':
        return {
          ...state
        }
    }
  });

  return store;
}

