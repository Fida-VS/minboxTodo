import { useAppSelector } from '../../hook';
import { Todo } from '../todo/todo';
import styles from './list.module.css';

export const List: React.FC = () => {

    const todos = useAppSelector(state => state.todos.todos);

    return (todos.length > 0 && todos !== null) ? (
        <div className={styles.list}>
            {todos.map((todo) => (
                <Todo 
                key={todo.id}
                {...todo}
                
                />
            ))}
        </div>
    ) : (<div>Дел нет, ура!</div>)
}