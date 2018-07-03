import {createStore, applyMiddleware,compose} from 'redux';
import {Composite, Listeners, Component} from './Composite';
import {render} from 'react-dom';
import * as React from 'react';
import {Component as Button} from "./Button";

export const application = () => {
    const buttons = (timeouts, css) => timeouts.map(timeout => Button(`Button (${Math.round(timeout/100)/10} sec)`, css))

    const timeouts = {textarea: 100, buttons: [0, 1120, 2000]};
    let composite = Composite(timeouts);
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    let store = createStore(
        composite.reducer,
        composeEnhancers(
          applyMiddleware(composite.middleware)
        )
    );

    // initialize composite with the created store
    composite.init(store)
    const unsubscribe = composite.subscribe(Listeners(store))
    const CompositeComponent = composite.memoize(Component(buttons(timeouts.buttons, {
        display: 'block',
        marginTop: '3px'
    }), {
        float: 'left',
        marginRight: '10px'
    })).memoize

    const compositeRender = () => render(
        <CompositeComponent {...store.getState()}/>,
        document.getElementById('root')
    );

    store.subscribe(compositeRender);
    compositeRender();
};

application();
