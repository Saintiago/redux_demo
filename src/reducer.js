import * as actionType from './actionType';

const copyState = function(state) {
  return JSON.parse(JSON.stringify(state));
};

function filterReducer(hideBought, action) {
  switch (action.type) {
    case actionType.HIDE_BOUGHT:
      return true;
    case actionType.SHOW_ALL:
      return false;
    default:
      return hideBought;
  }
}

function itemsReducer(items, action) {
  let newItems = copyState(items);
  switch (action.type) {
    case actionType.ADD_ITEM:
      newItems[action.name] = {
        price: action.price,
        bought: false
      };
      break;
    case actionType.REMOVE_ITEM:
      if (action.name in newItems) {
        delete newItems[action.name];
      }
      break;
    case actionType.MARK_AS_BOUGHT:
      if (action.name in newItems) {
        newItems[action.name].bought = true
      }
      break;
  }
  return newItems;
}



export function reducer(state, action) {
  return {
    hideBought: filterReducer(state.hideBought, action),
    items: itemsReducer(state.items, action)
  }
}

