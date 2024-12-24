import React from 'react';
import Button from './Button';
import Input from './Input';
import Checkbox from './Checkbox';
import ButtonIncrementar from './ButtonIncrementar';
import {getVendas, Venda} from './ApiVendas';
import videoSrc from './video.mp4';
import useLocalStorage from './useLocalStorage';
import useFetch from './useFetch';

function user(){
  return {
    nome: 'Henrique',
    profissao: 'Dev'
  }
}

type User = {
  nome: string;
  profissao: string;
}

type Produto = {
  id: string;
  nome: string;
  preco: number;
  quantidade: number;
  descricao: string;
  internacional: boolean;
}

// api de vendas -> https://data.origamid.dev/vendas/

function App() {

  const [total, setTotal] = React.useState(0);
  const [date, setDate] = React.useState('');
  const [time, setTime] = React.useState('');
  const [data, setData] = React.useState<null | User>(null);
  const [totalIncrementado, setTotalIncrementado] = React.useState(0);
  const [dataInicio, setDataInicio] = React.useState('');
  const [dataFim, setDataFim] = React.useState('');
  const [dataVendas, setDataVendas] = React.useState<Venda[]>([]);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const videoExercicio = React.useRef<HTMLVideoElement>(null); // null pois o víddeo ainda não foi renderizado
  const [playing, setPlaying] = React.useState(false);
  const videoCustomHook = React.useRef<HTMLVideoElement>(null);
  const [volume, setVolume] = useLocalStorage('volume', '0');

  const [produtoId, setProdutoId] = React.useState('p001');
  const produtos = useFetch<Produto[]>('https://data.origamid.dev/produtos');
  const produto = useFetch<Produto>(`https://data.origamid.dev/produtos/${produtoId}`);

  React.useEffect(() => {
    setTimeout(() => {
      setData(user());
    }, 2000);
  }, []);

  async function listarVendas(inicio: string, fim: string) {
    setDataVendas(await getVendas({inicio, fim}));
  }

  React.useEffect(() => {
    if (!dataInicio || !dataFim){
      setDataVendas([]);
      return;
    }

    listarVendas(dataInicio, dataFim);
  }, [dataInicio, dataFim]);

  React.useEffect(() => {
    console.log('Montou. Observação: Utilizando o strict mode, ele monta duas vezes pra verificar se existe erro. Não acontece quando se builda o app');

    return () => {
      console.log('Desmontou');
    }
  }, []);

  function incrementar() {
    setTotal((total) => total + 1);
  }

  const handleClickMouseEvent = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event.pageX); 
  }

  // Não precisa anotar o que é o event, já que está anotando o tipo da função,
  // já que a propriedade já tem um tipo predefinido
  const handleClickMouseEvent2: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    console.log(event.pageX); 
  }

  function forward(){
    if (videoExercicio.current)
      videoExercicio.current.currentTime += 2;
  }

  function changePlayBackRate(speed: number){
    if (videoExercicio.current && speed > 0)
      videoExercicio.current.playbackRate = speed;
  }

  function mute(){
    if (videoExercicio.current)
      videoExercicio.current.muted = !videoExercicio.current.muted;
  }

  async function pictureInPicture(){
    if (!videoExercicio.current) return;

    if (document.pictureInPictureElement){
      await document.exitPictureInPicture();
    }
    else{
      await videoExercicio.current.requestPictureInPicture();
    }
  }

  React.useEffect(() => {
    if (!videoCustomHook.current) return;

    const volumeNumber = Number(volume);

    if (volumeNumber >= 0 && volumeNumber <= 100)
      videoCustomHook.current.volume =  volumeNumber / 100;
  }, [volume]);

  return (
    <div>
      <h1>Viagem</h1>
      <p>Início: {date}</p>
      <p>Hora: {time}</p>
      <p>Total: {total}</p>
      <Button id='botao-principal' className='btn' tamanho='1.5rem' onClick={incrementar}>Incrementar</Button>
      <Button id='botao-principal' className='btn' tamanho='1.5rem' onClick={handleClickMouseEvent}>Click</Button>
      <Input label='TESTE' id='teste'/>
      <Input label='DATA' id='data' type='date' value={date} onChange={(e) => setDate(e.target.value)}/>
      <Input label='HORA' id='time' type='time' value={time} onChange={(e) => setTime(e.target.value)}/>
      <Checkbox label='Termos e Condições'/>
      <div>
        {data !== null && <div>{data.nome}: {data.profissao}</div>}
      </div>
      <p>Total Incrementado: {totalIncrementado}</p>
      <ButtonIncrementar incrementar={setTotalIncrementado}/>
      <div>
        <Input label='Data de Início' id='data-inicio' type='date' value={dataInicio} onChange={(e) => setDataInicio(e.target.value)}/>
        <Input label='Data de Término' id='data-fim' type='date' value={dataFim} onChange={(e) => setDataFim(e.target.value)}/>
        <p>{dataInicio}</p>
        <p>{dataFim}</p>
      </div>
      <div>
        {dataVendas.length > 0 && <div>Vendas: <ul>{dataVendas.map((venda) => <li key={venda.id}>{venda.nome}: {venda.status}</li>)}</ul></div>}
      </div>
      <div>
        <div className='flex'>
          <button onClick={() => videoRef.current?.play()}>Play</button>
          <button onClick={() => videoRef.current?.pause()}>Pause</button>
        </div>
        <video src={videoSrc} controls ref={videoRef}></video>
      </div>
      <div style={{marginTop: '1rem'}}>
        <div className='flex'>
          {playing ? (
            <button onClick={() => videoExercicio.current?.pause()}>Pause</button>
            ) : (
            <button onClick={() => videoExercicio.current?.play()}>Play</button>
          )}
          <button onClick={forward}>+2s</button>
          <button onClick={() => changePlayBackRate(1.0)}>1x</button>
          <button onClick={() => changePlayBackRate(2.0)}>2x</button>
          <button onClick={pictureInPicture}>PiP</button>
          <button onClick={mute}>M</button>
        </div>
        <div>
        <video src={videoSrc} controls ref={videoExercicio} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}></video>
        </div>
      </div>
      <div>
        Exercício de Custom Hook
        <div className='flex'>
          <button onClick={() => setVolume('0')}>0</button>
          <button onClick={() => setVolume('50')}>50</button>
          <button onClick={() => setVolume('100')}>100</button>
        </div>
        <p>Volume: {volume}</p>
        <video src={videoSrc} ref={videoCustomHook} controls></video>
      </div>
      <div style={{marginTop: '1rem'}}>
        <div className='flex'>
          {produtos.data && produtos.data.map((produto) => <button key={produto.id} onClick={() => setProdutoId(produto.id)}>{produto.nome}</button>)}
        </div>
        <div>
          {produto.loading && <div>Carregando...</div>}
          {produto.data && (
            <ul>
              <li>ID: {produto.data.id}</li>
              <li>Nome: {produto.data.nome}</li>
              <li>Descrição: {produto.data.descricao}</li>
              <li>Quantidade: {produto.data.quantidade}</li>
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default App;
