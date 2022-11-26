//import { RECEIVE_POOLS } from "../actions/pools"

export default function pools(state = {}, action) {
  switch (action.type) {
    case 'RECEIVE_POOLS':
      return {
        ...state,
        ...action.pools
      }
    default:
      return state
  }
}