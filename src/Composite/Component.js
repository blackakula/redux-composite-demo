import {Component as TextareaComponent} from '../Textarea/index';
import {Component as ButtonComponent} from '../Button/index';
import * as React from 'react';

export const Component = (redux) => {
    const buttonCss = {
        display: 'block',
        marginTop: '3px'
    };
    const Button0 = ButtonComponent('Button (0 sec)', buttonCss)(redux.buttons[0].redux);
    const Button1 = ButtonComponent('Button (1 sec)', buttonCss)(redux.buttons[1].redux);
    const Button2 = ButtonComponent('Button (2 sec)', buttonCss)(redux.buttons[2].redux);
    return ({textarea, buttons}) => (<div>
        <TextareaComponent {...textarea}/>
        <div>
            <Button0 {...buttons[0]}/>
            <Button1 {...buttons[1]}/>
            <Button2 {...buttons[2]}/>
        </div>
    </div>);
};

export default Component;
