import * as actionType from './actionType';

const copyState = function(state) {
  return JSON.parse(JSON.stringify(state));
};

function filterReducer(hideBought = false, action) {
  switch (action.type) {
    case actionType.HIDE_BOUGHT:
      return true;
    case actionType.SHOW_ALL:
      return false;
    default:
      return hideBought;
  }
}

function itemsReducer(items = [], action) {
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

function stepReducer(step = 0, action) {
  return step + 1;
}

let states = [];

function progressState(state, action) {
  const newState = {
    hideBought: filterReducer(state.hideBought, action),
    items: itemsReducer(state.items, action),
    step: stepReducer(state.step, action)
  };

  states = states.slice(0, state.step);
  states.push(newState);

  return newState;
}

function prevState(step) {
  const stepIndex = step - 1;
  const prevStepIndex = stepIndex - 1;
  return typeof states[prevStepIndex] !== 'undefined' ? states[prevStepIndex] : states[stepIndex];
}

function nextState(step) {
  const stepIndex = step - 1;
  const nextStepIndex = stepIndex + 1;
  return typeof states[nextStepIndex] !== 'undefined' ? states[nextStepIndex] : states[stepIndex];
}

export function reducer(state, action) {
  switch (action.type) {
    case actionType.PREV_STATE:
      return prevState(state.step);
    case actionType.NEXT_STATE:
      return nextState(state.step);
    default:
      return progressState(state, action)
  }
}

