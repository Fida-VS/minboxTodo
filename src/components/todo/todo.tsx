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
            
            <div className={`task ${completed ? 'completedTask' : ''}`}  onClick={() => dispatch(toggleStatus(id))}>
            <span>{title}</span>
            </div>
            <div className={styles.deleteButton} onClick={() => dispatch(deleteTodo(id))}>✖</div>
        </div>
    )
}