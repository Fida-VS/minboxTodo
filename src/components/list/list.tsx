import { useAppSelector } from '../../hook';
import { Todo } from '../todo/todo';
import styles from './list.module.css';

type parameterTodo = {
    id: string;
    title: string;
    completed: boolean;
  }

export const List: React.FC = () => {

    const todos = useAppSelector(state => state.todos.todos);
    const filter = useAppSelector(state => state.todos.filter);

    const filterTodos = (todos: parameterTodo[], filter: string) : parameterTodo[] => {
        switch (filter) {
            case 'completed':
                return todos.filter(todo => todo.completed === true);
                break;
                case 'active':
                return todos.filter(todo => todo.completed === false);
                break;
                default:
                    return todos;
        }
    };

    let filteredTodos = filterTodos(todos, filter);

    return (todos.length > 0 && todos !== null) ? (
        <div className={styles.list}>
            {filteredTodos.map((todo) => (
                <Todo 
                key={todo.id}
                {...todo}
                
                />
            ))}
        </div>
    ) : (<div>Дел нет, ура!</div>)
}