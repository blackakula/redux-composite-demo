import {createStore, applyMiddleware,compose} from 'redux';
import {Composite, Listeners, Component} from './Composite';
import {render} from 'react-dom';
import * as React from 'react';

export const application = () => {
    const timeouts = {textarea: 100, buttons: [0, 1000, 2000]};
    let composite = Composite(timeouts);
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    let store = createStore(
        composite.reducer,
        composeEnhancers(
          applyMiddleware(composite.middleware)
        )
    );

    const listeners = Listeners(store)

    // initialize composite with the created store
    const unsubscribe = composite.init(store).subscribe(listeners)
    const CompositeComponent = Component(store)(composite.memoize);

    const compositeRender = () => render(
        <CompositeComponent {...store.getState()}/>,
        document.getElementById('root')
    );

    store.subscribe(compositeRender);
    compositeRender();
};

application();
