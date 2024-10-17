import { useAppDispatch, useAppSelector } from '../../hook';
import { changeFilter } from '../../store/todoSlice';
import styles from './control-panel.module.css';

type Todo = {
    id: string;
    title: string;
    completed: boolean;
  }

export const ControlPanel: React.FC = () => {

    const dispatch = useAppDispatch();
    const todos = useAppSelector(state => state.todos.todos);

    const getActiveTodosCounter = (todos: Todo[]) => {
      return todos.filter(todo => todo.completed === false).length;
    };

    let activeTodosCount = getActiveTodosCounter(todos);

    return (
        <div className={styles.controlPanel}>

            {/* <div className={styles.controlPanel__todosCount}>
                <div>{activeTodosCount} items left</div>
            </div>

            <div className={styles.controlPanel__buttons}>
            <button type='button' onClick={() => dispatch(changeFilter('all'))}>All</button>
            <button type='button' onClick={() => dispatch(changeFilter('active'))}>Active</button>
            <button type='button' onClick={() => dispatch(changeFilter('completed'))}>Completed</button>
            </div> */}

            <div>{activeTodosCount}</div>
            
        </div>
    )
}