import { useAppDispatch } from '../../hook';
import { deleteTodo, toggleStatus } from '../../store/todoSlice';
import styles from './todo.module.css';

interface TodoProps {
    id: string;
    title: string;
    completed: boolean;
}

export const Todo: React.FC<TodoProps> = ({id, title, completed}) => { 

    const dispatch = useAppDispatch();

    return (
        <div className={styles.todo}>
            <input type='checkbox' checked={completed} onChange={() => dispatch(toggleStatus(id))} />
            <span>{title}</span>
            <button type='button' onClick={() => dispatch(deleteTodo(id))}>Удалить</button>
        </div>
    )
}