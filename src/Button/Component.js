import * as React from 'react';

export const Component = (label = 'Button', css = {}) => ({dispatch, getState}) => (clicked => (
    props => <button {...props}>{label}</button>
)({
    style: {
        color: 'blue',
        fontWeight: 'bold',
        backgroundColor: clicked ? '#808080' : '#C3C3C3',
        ...css
    },
    ...(clicked ? {disabled: 'disabled'} : {onClick: () => dispatch({type: 'CLICK'})})
}))(getState().clicked)

export default Component;
