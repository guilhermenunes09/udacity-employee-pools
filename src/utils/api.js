import {
  _getUsers,
  _getQuestions,
  _authenticate
} from './_DATA.js'

export function getInitialData () {
  return Promise.all([
    _getUsers(),
    _getQuestions(),
  ]).then(([users, questions]) => ({
    users,
    questions,
  }))
}

export function authenticate () {
  return Promise.all([
    _authenticate()
  ]).then(([user]) => ({
    user
  }))
}