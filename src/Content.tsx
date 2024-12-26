import { useUi } from './UiContext';
import { useUserContext } from './UserContext';

const Content = () => {

  const { dark } = useUi();
  const { user, loading } = useUserContext();

  if (loading)
    return (<h1>Carregando...</h1>);

  if (!user)
    return (<h1>Usuário desconhecido</h1>);

  const { preferencias: { playback, volume, qualidade } } = user;

  return (
    <div>
      <h1>{dark ? 'Dark' : 'Light'}</h1>
      <p>Playback: {playback}</p>
      <p>Volume: {volume}</p>
      <p>Qualidade: {qualidade}</p>
    </div>
  )
}

export default Content;