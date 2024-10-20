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
    const [isButtonAllActive, setIsButtonAllActive] = useState(true);
    const [isButtonActiveActive, setIsButtonActiveActive] = useState(false);
    const [isButtonCompletedActive, setIsButtonCompletedActive] = useState(false);

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

    const onClickHandler = (buttonName: string) => {
        
        dispatch(changeFilter(buttonName));

        switch(buttonName) {
            case 'all':  
            setIsButtonAllActive(true);
            setIsButtonActiveActive(false);
            setIsButtonCompletedActive(false);
              break;
          
            case 'active':  
            setIsButtonActiveActive(true);
            setIsButtonAllActive(false);
            setIsButtonCompletedActive(false);
              break;

              case 'completed':  
              setIsButtonCompletedActive(true);
              setIsButtonAllActive(false);
              setIsButtonActiveActive(false);
              break;
          
            default:
             return;
          }
    };

    const getActiveTodosCounter = (todos: Todo[]) => {
      return todos.filter(todo => todo.completed === false).length;
    };

    let activeTodosCount = getActiveTodosCounter(todos);

    return (
        <div className={`controlPanel ${plate ? 'controlPanel-plate' : ''}`} onMouseEnter={onMouseEnterHandler} onMouseLeave={onMouseLeaveHandler} >

            <div className={`wrapper ${miniPlate ? 'miniPlate' : ''} ${plate ? 'plate' : ''}`}>

            {plate && <div className='controlPanel__buttons'>
            <div className={` ${isButtonAllActive ? 'active' : ''}`}  onClick={() => onClickHandler('all')}>All</div>
            <div className={` ${isButtonActiveActive ? 'active' : ''}`} onClick={() => onClickHandler('active')}>Active</div>
            <div className={` ${isButtonCompletedActive ? 'active' : ''}`} onClick={() => onClickHandler('completed')}>Completed</div>
            </div>}    

        <div className={styles.controlPanel__text} onClick={togglePlate}>
            <div>{activeTodosCount + countString}</div>
            {(countString === ' items left') && <div className={`arrow ${plate ? 'arrowTransform' : ''}`}></div>}
            </div>
            </div>
        </div>
    )
}