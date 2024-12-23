import React from "react";

const useLocalStorage = (key: string, inicial: string): [string, React.Dispatch<React.SetStateAction<string>>] => {
  const [state, setState] = React.useState(() => {
    const local = window.localStorage.getItem(key);
    return local ?? inicial;
  });

  React.useEffect(() => {
    window.localStorage.setItem(key, state);
  }, [state, key]);

  // Duas formas para o typescript mostrar corretamente o tipo quando o retorno for um array:
  // - Anotando o tipo de retorno
  //  - utilizando  as const. Quando coloca como constante, sempre o primeiro elemento será o estado e o segundo o setState
  return [state, setState] /*as const*/; 
}

export default useLocalStorage;