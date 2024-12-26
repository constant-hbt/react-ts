import { useUi } from './UiContext';
import { useUserContext } from './UserContext';

const Header = () => {

  const { setDark } = useUi();
  const { user, loading } = useUserContext();

  if (loading)
    return (<h1>Carregando...</h1>);

  if (!user)
    return (<h1>Usuário desconhecido</h1>);

  return (
    <h1>{user.nome}<button onClick={() => setDark((d) => !d)}>Alterar</button></h1>
  )
}

export default Header