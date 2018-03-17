import {createStore, applyMiddleware,compose} from 'redux';
import {Builder} from './Composite/index';
import {Reducer as TextareaReducer} from './Textarea/index';
import {Reducer as ButtonReducer} from './Button/index';
import {render} from 'react-dom';
import * as React from 'react';

export const application = () => {
    const builder = Builder({textarea: 100, buttons: [0, 1000, 2000, 3000]});
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    let store = createStore(
        builder.composite.reducer,
        {
            textarea: TextareaReducer(),
            buttons: [
                ButtonReducer(),
                ButtonReducer(),
                ButtonReducer()
            ]
        },
        composeEnhancers(
          applyMiddleware(builder.composite.middleware)
        )
    );
    const CompositeComponent = builder.component(store);

    const compositeRender = () => render(
        <CompositeComponent {...store.getState()}/>,
        document.getElementById('root')
    );

    store.subscribe(compositeRender);
    compositeRender();
};

application();
