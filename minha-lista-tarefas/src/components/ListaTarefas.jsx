import { useState, useEffect } from "react"; //importando o useState e useEffect
import './ListaTarefas.css'; //importando o css

function ListaTarefas() { 
    const [tarefas, setTarefas] = useState([]); //Cria uma variável de estado chamada tarefas
    const [novaTarefa, setNovaTarefa] = useState(''); //Cria uma variável de estado chamada novaTarefa

    useEffect(() => {
        const tarefasSalvas = JSON.parse(localStorage.getItem("tarefas"));
        if (tarefasSalvas) {
            setTarefas(tarefasSalvas);
        }
    }, []); //Carrega as tarefas salvas no localStorage e se tiver tarefas salvas atualiza o estado tarefas com esses dados

    useEffect(() => {
        if (tarefas.length > 0) {
            localStorage.setItem("tarefas", JSON.stringify(tarefas));
        }
    }, [tarefas]); //Sempre que o estado das tarefas mudar a função vai salvar as tarefas no localStorage

    const adicionarTarefa = () => {
        if (novaTarefa.trim() !== '') {
            const novaTarefaObj = {
                texto: novaTarefa,
                concluida: false,
                dataCriacao: new Date()
            };
            setTarefas([...tarefas, novaTarefaObj]);
            setNovaTarefa("");
        }
    }; //Verifica se o texto da tarefa não ta vazio e cria um objeto com as informações da nova tarefa  

    const removerTarefa = (indice) => {
        setTarefas(tarefas.filter((_, i) => i !== indice));
    }; //Remove a tarefa da lista com base no índice

    const alternarConcluida = (indice) => {
        const novasTarefas = [...tarefas];
        novasTarefas[indice].concluida = !novasTarefas[indice].concluida;
        setTarefas(novasTarefas);
    }; //altera o estado de conclusão de uma tarefa invertendo o valor de concluida de uma tarefa com base no indice

    const ordenarTarefas = (tipo) => {
        let tarefasOrdenadas;
        if (tipo === 'alfabetico') {
            tarefasOrdenadas = [...tarefas].sort((a, b) => a.texto.localeCompare(b.texto));
        } else {
            tarefasOrdenadas = [...tarefas].sort((a, b) => new Date(a.dataCriacao) - new Date(b.dataCriacao));
        }
        setTarefas(tarefasOrdenadas);
    }; //Ordena as tarefas com base no tipo de ordenação passado 

    return ( 
        <div className="div"> 
            <h2 className="h2">Lista de Tarefas</h2>
            <div className="add"> {/* Div criada para a parte do input e os botões */}
            <input
                type='text'
                value={novaTarefa}
                onChange={(e) => setNovaTarefa(e.target.value)}
                placeholder='Digite uma nova tarefa'
                className="input"
            /> {/* input onde a tarefa é digitada e atualiza o estado da novatarefa */}

            <button className="button" onClick={adicionarTarefa}>Adicionar</button> {/* Botão adicionar */}
            
            <button className="button" onClick={() => ordenarTarefas('alfabetico')}>Ordenar Alfabético</button> {/* Botãopara ordenar em ordem alfabética */}
            
            <button className="button" onClick={() => ordenarTarefas('data')}>Ordenar por Data</button> {/* Botão para ordenar por data */}
            </div>

            <ul> 
                {tarefas.map((tarefa, indice) => (
                    <li key={indice}> {/* Faz com que cada item da lista tenha um indice que é uma chave única de cada um */}
                        <span className={tarefa.concluida ? 'concluida' : ''}> {/* Envolve o texto da tarefa em uma tag span com a classe "concluida" */}
                        {tarefa.texto.length > 30 ? tarefa.texto.slice(0, 30) + "..." : tarefa.texto} {/* Exibe o texto da tarefa e se o texto for maior que 30 caracteres ele é cortado e adiciona ... no final */}
                        </span>
                        <button className="remover" onClick={() => removerTarefa(indice)}>Remover</button> {/* Botão para remover a tarefa de acordo com o indice */}
                        <button 
                            className={`concluir ${tarefa.concluida ? 'desmarcar' : ''}`} 
                            onClick={() => alternarConcluida(indice)}>
                            {tarefa.concluida ? 'Desmarcar' : 'Concluir'}
                        </button> {/* Cria um botão que muda o estado de concluida da tarefa e que muda o texto do botão conforme esse estado */}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListaTarefas; //Exporta o componente listaTarefas para que possa ser utilizado em outros arquivos 