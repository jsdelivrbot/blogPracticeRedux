import { LIST } from '../actions/index';
import { FOOD } from '../actions/index';

export default function(state = {}, action) {
  switch (action.type) {
    case LIST:
      return {
        ... state,
        list:'test',
        foo:'foo',
        test: action.payload,
        type: action.type,
        books: ['fee']
      }
    case FOOD:
      return {
        ...state,
        food:action.payload
      }
    default:
      return state;
  }
}
