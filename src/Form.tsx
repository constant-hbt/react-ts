import React from 'react'
import Input from './Input'

type State = {
  nome: string;
  email: string;
}

// type Action = {
//   type: 'setName' | 'setEmail';
//   payload: string;
// }

type Action = { type: 'setName'; payload: string } | { type: 'setEmail'; payload: string };

// function reducer(state: State, action: Action): State {
//   console.log(action);

//   if (action.type === 'setName') {
//     return {
//       ...state,
//       nome: action.payload
//     }
//   }

//   if (action.type === 'setEmail') {
//     return {
//       ...state,
//       email: action.payload
//     }
//   }

//   return state;
// }

function reducer(state: State, action: Action): State {

  switch(action.type){
    case 'setName':
      return {
        ...state,
        nome: action.payload
      }
    case 'setEmail':
      return {
        ...state,
        email: action.payload
      }
    default:
      return state;
  }
}

const Form = () => {
  const [state, dispatch] = React.useReducer(reducer, { nome: '', email: '' });

  React.useEffect(() => {
    dispatch({type: 'setName', payload: 'Henrique BT'});
  }, []);

  return (
    <div>
      <Input label={`Nome: ${state.nome}`} id='nome' value={state.nome} onChange={(e) => dispatch({type: 'setName', payload: e.target.value})}/>
      <Input label={`Email: ${state.email}`} id='email' value={state.email} onChange={(e) => dispatch({type: 'setEmail', payload: e.target.value})}/>
    </div>
  )
}

export default Form