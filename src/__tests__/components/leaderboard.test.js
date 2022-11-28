import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from "redux";
import reducer from '../../store/reducers/index.js';
import Leaderboard from '../../components/leaderboard.js';
import { BrowserRouter as Router } from "react-router-dom";
import { handleInitialData } from '../../store/actions/shared.js';
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";

const store = createStore(reducer, applyMiddleware(thunk));


describe('Nav', () => {
  it('check if users are present on table', async () => {
    await store.dispatch(handleInitialData());
    const users = store.getState().users;
    render(<Provider store={store}><Router><Leaderboard /></Router></Provider>);
    
    Object.keys(users).map((user) => {
      const id = screen.queryAllByTestId(`name-${user}`);
      expect(id.length).toEqual(1);
    });
  });

  it('check if the number of created questions are correct', async () => {
    await store.dispatch(handleInitialData());
    const users = store.getState().users;
    const component = render(<Provider store={store}><Router><Leaderboard /></Router></Provider>);
    const answersCount = Object.keys(users['sarahedo'].answers).length;
    const answerCountPrinted = parseInt(component.getByTestId(`answer-sarahedo`).innerHTML);
    
    expect(answerCountPrinted).toEqual(answersCount);
  });

});