import * as React from 'react';

export const Component = (label = 'Button', css = {}) => ({dispatch}) => ({clicked}) => {
    let componentProps = {
        style: {
            color: 'blue',
            fontWeight: 'bold',
            backgroundColor: clicked ? '#808080' : '#C3C3C3',
            ...css
        }
    };
    if (clicked) {
        componentProps.disabled = 'disabled';
    } else {
        componentProps.onClick = () => dispatch({type: 'CLICK'});
    }
    return <button {...componentProps}>{label}</button>;
};

export default Component;
