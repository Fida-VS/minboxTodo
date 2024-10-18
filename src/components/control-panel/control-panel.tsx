import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hook';
import { changeFilter } from '../../store/todoSlice';
import styles from './control-panel.module.css';

type Todo = {
    id: string;
    title: string;
    completed: boolean;
  }

export const ControlPanel: React.FC = () => {

    const [countString, setCountString] = useState('');
    const [plate, setPlate] = useState(false);
    const [miniPlate, setMiniPlate] = useState(false);

    const dispatch = useAppDispatch();

    const todos = useAppSelector(state => state.todos.todos);

    const onMouseEnterHandler = () => {
        setMiniPlate(true);
        setCountString(' items left');
    };

    const onMouseLeaveHandler = () => {
        if(plate)return;
        setCountString('');
        setMiniPlate(false);
    };

    const togglePlate = () => {
        setPlate(!plate);
    };

    const getActiveTodosCounter = (todos: Todo[]) => {
      return todos.filter(todo => todo.completed === false).length;
    };

    let activeTodosCount = getActiveTodosCounter(todos);

    return (
        <div className={`controlPanel ${plate ? 'controlPanel-plate' : ''}`} onMouseEnter={onMouseEnterHandler} onMouseLeave={onMouseLeaveHandler} >

            <div className={`wrapper ${miniPlate ? 'miniPlate' : ''} ${plate ? 'plate' : ''}`}>

            {plate && <div className={styles.controlPanel__buttons}>
            <div onClick={() => dispatch(changeFilter('all'))}>All</div>
            <div onClick={() => dispatch(changeFilter('active'))}>Active</div>
            <div onClick={() => dispatch(changeFilter('completed'))}>Completed</div>
            </div>}    

        <div className={styles.controlPanel__text} onClick={togglePlate}>
            <div>{activeTodosCount + countString}</div>
            {(countString === ' items left') && <div className={styles.arrow}></div>}
            </div>
            </div>
        </div>
    )
}