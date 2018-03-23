export const LIST = 'LIST';
//

export function List() {
  return {
    payload:'test payload',
    type: LIST
  };
}



export const FOOD = 'FOOD';

export function fetchFood(food) {
  return {
    type: FOOD,
    payload: food
  }
}
