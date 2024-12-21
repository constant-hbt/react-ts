import React from 'react';

interface ButtonProps {
  tamanho?: string;
  children?: React.ReactNode;
  onClick?: () => void;
} 

// O react já oferece um tipo utilitário, que já vem declarado o children
type ButtonPropsWithChildren = React.PropsWithChildren<{
  tamanho?: string;
  onClick?: () => void;
}>;

// Tipo utilitário do React, que informa que pode receber qualquer propriedade que um elemento button possua por padrão
// e ainda podemos extender essas propriedades com &
type ButtonPropsUtilirarioButton = React.ComponentProps<'button'> & {
  tamanho?: string
};

// Podendo desestruturar as propriedades, tornando o componente mais reutilizável
const Button = ({tamanho, children, ...props}: ButtonPropsUtilirarioButton) => {
  return (
    <button style={{fontSize: tamanho}} {...props}>{children}</button>
  )
}

export default Button;