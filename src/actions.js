import * as action from './actionType';

export function addItem(name, price) {
  return {
    type: action.ADD_ITEM,
    name,
    price
  }
}

export function removeItem(name) {
  return {
    type: action.REMOVE_ITEM,
    name
  }
}

export function hideBought() {
  return {
    type: action.HIDE_BOUGHT
  }
}

export function showAll() {
  return {
    type: action.SHOW_ALL
  }
}

export function markAsBought(name) {
  return {
    type: action.MARK_AS_BOUGHT,
    name
  }
}

export function prevState() {
  return {
    type: action.PREV_STATE
  }
}

export function nextState() {
  return {
    type: action.NEXT_STATE
  }
}