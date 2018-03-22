import {createStore} from 'redux';
import {reducer} from './reducer';
import * as action from './actions';

const initalState = {
  hideBought: '',
  items: {
    milk: {
      price: 10,
      bought: false
    }
  },
  step: 0
};

const store = createStore(reducer, initalState);

const container = document.createElement('div');
document.body.appendChild(container);

store.subscribe(() => {
  const state = store.getState();

  const ul = document.createElement('ul');
  for (let name in state.items) {
    if (state.items.hasOwnProperty(name)) {

      if (state.hideBought && state.items[name].bought) {
        continue;
      }

      const li = document.createElement('li');
      li.innerHTML = '<strong>' + name + '</strong>, ' + state.items[name].price + ', ' + (state.items[name].bought ? 'bought' : 'not bought');
      ul.appendChild(li);
    }
  }
  container.innerHTML = '';
  container.appendChild(ul);
});

window['store'] = store;
window['action'] = action;

store.dispatch(action.showAll());