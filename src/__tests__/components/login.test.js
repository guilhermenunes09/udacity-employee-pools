import * as React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from "redux";
import reducer from '../../store/reducers/index.js';
import { BrowserRouter as Router } from "react-router-dom";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { act } from 'react-dom/test-utils';
import Login from '../../components/login.js';

const store = createStore(reducer, applyMiddleware(thunk));

describe('Login', () => {
  it('will match snapshot', () => {
    var component = render(<Provider store={store}><Router><Login /></Router></Provider>);
    expect(component).toMatchSnapshot();
  });

  it('displays error messagen when login and password doesnt match', async () => {
    const component = render(<Provider store={store}><Router><Login /></Router></Provider>);
    const inputUsername = component.getByTestId("loginusername");
    const inputPassword = component.getByTestId("login-password");
    const submitButton = component.getByTestId("submit-button");
    
    fireEvent.change(inputUsername, {target: { value: 'gn09'}});
    fireEvent.change(inputPassword, {target: { value: '123w45'}});

    act(() => {
      fireEvent.click(submitButton);
    })

    await waitFor(() => {
      expect(component.queryByTestId('error-message')).toBeInTheDocument()
    })
  });


  it('verifies if name field, password field, and submit button are present', () => {
    var component = render(<Provider store={store}><Router><Login /></Router></Provider>);
    expect(component.getByTestId("loginusername")).toBeInTheDocument();
    expect(component.getByTestId("login-password")).toBeInTheDocument();
    expect(component.getByTestId("submit-button")).toBeInTheDocument();
  });
});