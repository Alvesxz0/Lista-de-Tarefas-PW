import ListaTarefas from './components/ListaTarefas' //Importando o componente lista de tarefas

import './App.css' //Importando o css

function App() { //Constroi o aplicativo
  
  return (
    <>
      <h1 className='h1'>Gerenciador de Tarefas</h1> {/* Titulo dentro do site */}
      <ListaTarefas /> {/* Construindo o listaTarefas */}
    </>
  );
}

export default App; //Exportando o app 
