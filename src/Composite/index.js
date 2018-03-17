import Component from './Component';
import Composite from './Composite';
import {Redux} from 'redux-composite';

export const Builder = timeouts => {
    const composite = Composite(timeouts);
    return {
        composite,
        component: ({dispatch, getState, subscribe}) => {
            const redux = Redux(composite)({dispatch, getState, subscribe});
            const listener = i => ({getState}) => {
                if (getState().clicked) {
                    redux.textarea.redux.dispatch({type: 'ADD', todo: `Button ${i}`});
                }
            };
            const asyncListener = () => {
                let prev = undefined;
                return ({getState}) => {
                    const state = getState();
                    if (typeof state.selectedSubreddit === 'string' && typeof state.postsBySubreddit === 'object') {
                        const subreddit = state.selectedSubreddit;
                        if (typeof state.postsBySubreddit[subreddit] === 'object'
                            && state.postsBySubreddit[subreddit].isFetching === false
                            && state.postsBySubreddit[subreddit].didInvalidate === false
                            && prev !== state.postsBySubreddit
                        ) {
                            redux.textarea.redux.dispatch({type: 'ADD', todo: `Subreddit ${subreddit} is fetched`});
                        }
                        prev = state.postsBySubreddit;
                    }
                }
            };
            composite.subscribe(dispatch, getState, subscribe)({
                buttons: [
                    listener(0),
                    listener(1),
                    listener(2),
                    ({getState}) => {
                        if (getState().clicked === false) {
                            redux.textarea.redux.dispatch({type: 'ADD', todo: `Button ${3}`});
                        }
                    }
                ],
                async: asyncListener()
            });
            return Component(redux, composite.memoize(getState));
        }
    };
};

export default {Builder};
