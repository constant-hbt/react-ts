import React from 'react';
import Button from './Button';
import Input from './Input';

function App() {

  const [total, setTotal] = React.useState(0);
  const [date, setDate] = React.useState('');
  const [time, setTime] = React.useState('');

  function incrementar() {
    setTotal((total) => total + 1);
  }

  return (
    <div>
      <h1>Viagem</h1>
      <p>Início: {date}</p>
      <p>Hora: {time}</p>
      <p>Total: {total}</p>
      <Button id='botao-principal' className='btn' tamanho='1.5rem' onClick={incrementar}>Incrementar</Button>
      <Input label='TESTE' id='teste'/>
      <Input label='DATA' id='data' type='date' value={date} onChange={(e) => setDate(e.target.value)}/>
      <Input label='HORA' id='time' type='time' value={time} onChange={(e) => setTime(e.target.value)}/>
    </div>
  )
}

export default App;
