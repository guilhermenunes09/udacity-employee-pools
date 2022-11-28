import * as React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from "redux";
import reducer from '../../store/reducers/index.js';
import Nav from '../../components/Nav.js';
import { BrowserRouter as Router } from "react-router-dom";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";

const store = createStore(reducer, applyMiddleware(thunk));

describe('Nav', () => {
  it('checks if links: home, leaderboard and new are displaying in the navbar', () => {
    var component = render(<Provider store={store}><Router><Nav /></Router></Provider>);
    expect(component.getByTestId("nav-home")).toBeInTheDocument();
    expect(component.getByTestId("nav-leaderboard")).toBeInTheDocument();
    expect(component.getByTestId("nav-new")).toBeInTheDocument();
  });

  it('checks if links in the navbar are redirecting to proper URLs', () => {
    var component = render(<Provider store={store}><Router><Nav /></Router></Provider>);
    const navHome = component.getByTestId("nav-home");
    const navLeaderboard = component.getByTestId("nav-leaderboard");
    const navNew = component.getByTestId("nav-new");
    
    const rootPath = window.location.protocol + '//' + window.location.host;

    expect(navHome).toHaveProperty('href', rootPath + '/');
    expect(navLeaderboard).toHaveProperty('href', rootPath + '/leaderboard');
    expect(navNew).toHaveProperty('href', rootPath + '/add');
  });
});