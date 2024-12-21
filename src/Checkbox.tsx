import React from 'react'

const Checkbox = ({label}: {label: string}) => {

  const [value, setValue] = React.useState(false);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.currentTarget.checked);
  }

  // Se colocar a função diretamente no elemento (anônima e inline), o typescript já vai conseguir inferir o tipo de evento
  // Não tendo necessidade de anotar o tipo da função
  // De preferência fazer apenas com funções simples, por exemplo, para mudar o estado de um elemento
  return (
    <label htmlFor="" style={{padding: '1rem', border: value ? '2px solid #8D2' : '2px solid #F70'}}>
      <input type="checkbox" checked={value} onChange={({currentTarget}) => setValue(currentTarget.checked)}/>
      {label}
    </label>
  )
}

export default Checkbox