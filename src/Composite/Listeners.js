export const Listeners = ({getState, dispatch}) => ({
    buttons: Object.keys(getState().buttons).map(
        i => ({getState}) => getState().clicked && dispatch({type: 'COMPOSITE', composite: {
            textarea: {type: 'ADD', todo: `Button ${i}`}
        }})
    )
})

export default Listeners
