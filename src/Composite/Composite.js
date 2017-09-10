import {Structure, Composite as ReduxComposite} from 'redux-composite';
import {Reducer as TextareaReducer, Middleware as TextareaMiddleware} from '../Textarea/index';
import {Reducer as ButtonReducer, Middleware as ButtonMiddleware} from '../Button/index';

export const Composite = timeouts => {
    const textarea = ReduxComposite({
        reducer: TextareaReducer,
        middleware: TextareaMiddleware(timeouts.textarea)
    });
    const buttons = (new Array(3)).fill(null).reduce((result, v, i) => [
        ...result,
        ReduxComposite({
            reducer: ButtonReducer,
            middleware: ButtonMiddleware(timeouts.buttons[i])
        })
    ], []);
    return Structure({
        textarea,
        buttons
    });
};

export default Composite;
