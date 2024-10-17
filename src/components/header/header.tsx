import { useState, ChangeEvent, MouseEvent } from "react"
import styles from './header.module.css';
import { useAppDispatch } from "../../hook";
import { addNewTodo } from "../../store/todoSlice";

export const Header: React.FC = () => {

    const [value, setValue] = useState('');

    const dispatch = useAppDispatch();


    const onClickHandler = (event: MouseEvent<HTMLButtonElement>) => {
        if(value.trim().length){
        dispatch(addNewTodo(value));
        setValue('');
    }
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value);

    return (
        <div className={styles.header}>
            <input className="todoInput" placeholder="Add a new task..."  value={value} onChange={onChangeHandler} />
            <button type="button" onClick={onClickHandler} >Add</button>
        </div>
    )
}