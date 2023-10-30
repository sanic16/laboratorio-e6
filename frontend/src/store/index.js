import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './counter-slice'
import authSlice from './auth-slice'


// const reducerFn = (state=initialState, action) => {
//     if(action.type === 'INCREMENT'){
//         return{
//             ...state,
//             counter: state.counter + 1
//         }
//     }
//     if(action.type === 'DECREMENT'){
//         return{
//             ...state,
//             counter: state.counter - 1
//         }
//     }
//     if(action.type === 'TOGGLE'){
//         return{
//             ...state,
//             show: !state.show
//         }
//     }
//     if(action.type === 'ADD'){
//         return{
//             ...state,
//             counter: state.counter + action.payload
//         }
//     }
//     return state
// }



const store = configureStore({
    reducer: {
        counter: counterSlice,
        auth: authSlice
    }

})


export default store
