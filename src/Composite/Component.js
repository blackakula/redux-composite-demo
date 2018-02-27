import {Component as TextareaComponent} from '../Textarea/index';
import {Component as ButtonComponent} from '../Button/index';
import * as React from 'react';

export const Component = (redux, memoize) => {
    const buttonCss = {
        display: 'block',
        marginTop: '3px'
    };
    const buttonsComponents = [0, 1, 2].map(index => ButtonComponent(`Button (${index} sec)`, buttonCss)(redux.buttons[index].redux));
    const Button0 = memoize.structure.buttons[0].memoize(buttonsComponents[0]);
    const Button1 = memoize.structure.buttons[1].memoize(buttonsComponents[1]);
    const Button2 = memoize.structure.buttons[2].memoize(buttonsComponents[2]);
    return memoize.memoize(({textarea, buttons}) => {
        const Textarea = memoize.structure.textarea.memoize(TextareaComponent);
        return (<div>
            <Textarea {...textarea}/>
            <div>
                <Button0 {...buttons[0]}/>
                <Button1 {...buttons[1]}/>
                <Button2 {...buttons[2]}/>
            </div>
        </div>);
    });
};

export default Component;
