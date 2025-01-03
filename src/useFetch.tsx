import React from "react";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function useFetch<T>(url: RequestInfo | URL, options?: RequestInit): FetchState<T>{
  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null); 

  // Utilizando useRef para não passar o options no array de dependencias do useEffect
  const optionsRef = React.useRef(options);
  optionsRef.current = options;

  React.useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
      setLoading(true);
      setData(null);

      try {
        const response = await window.fetch(url, {
          signal,
          ...optionsRef.current
        });

        if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);

        const json = (await response.json()) as T;

        if (!signal.aborted)
          setData(json);
      }catch (error){
        if (!signal.aborted && error instanceof Error)
          setError(error.message);
        else
          setError('Erro não especificado ao realizar a requisição');
      }
      finally {
        if (!signal.aborted)
          setLoading(false);
      }
    }

    fetchData();

    return () => {
      controller.abort();
    }
  }, [url]);

  return {
    data,
    loading,
    error
  };
}

export default useFetch;