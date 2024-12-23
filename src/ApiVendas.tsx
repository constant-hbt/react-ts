interface PeriodoVendas {
  inicio: string;
  fim: string;
}

export type Venda = {
  id: string;
  nome: string;
  preco: number;
  status: string;
  pagamento: string;
  parcelas: number | null;
  data: string;
}

export const getVendas = async ({inicio, fim}: PeriodoVendas): Promise<Venda[]> => {
  try{
    const response = await window.fetch(`https://data.origamid.dev/vendas?inicio=${inicio}&final=${fim}`);
    const json = await response.json();
    return json;
  }catch(error){
    console.log(`Não foi possível obter as vendas do perído. Detalhes: ${error}`);
    return [];
  }
}