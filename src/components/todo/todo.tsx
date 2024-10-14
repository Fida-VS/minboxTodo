import { useAppDispatch } from '../../hook';
import { removeTodo, toggleComplete } from '../../store/todoSlice';
import styles from './todo.module.css';

interface TodoProps {
    id: string;
    text: string;
    completed: boolean;
}

export const Todo: React.FC<TodoProps> = ({id, text, completed}) => { 

    const dispatch = useAppDispatch();

    return (
        <div className={styles.todo}>
            <input type='checkbox' checked={completed} onChange={() => dispatch(toggleComplete(id))} />
            <span>{text}</span>
            <button type='button' onClick={() => dispatch(removeTodo(id))}>Удалить</button>
        </div>
    )
}