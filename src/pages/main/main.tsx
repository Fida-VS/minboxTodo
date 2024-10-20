import { useEffect } from 'react';
import { ControlPanel } from '../../components/control-panel/control-panel';
import { Header } from '../../components/header/header';
import { List } from '../../components/list/list';
import styles from './main.module.css';
import { useAppDispatch, useAppSelector } from '../../hook';
import { fetchTodos } from '../../store/todoSlice';
import { Loader } from '../../components/loader/loader';


export const Main: React.FC = () => {

    const dispatch = useAppDispatch();

    const { status, error } = useAppSelector(state => state.todos);

useEffect(() => {
    dispatch(fetchTodos());
}, [dispatch])

    return (
        <div className={styles.main}>
            <div className={styles.title}>
                <h3>To-Do List</h3>
            </div>
            <Header />
            {status && <Loader />}
            {error && <div className={styles.error}>An error occured: {error}</div>}
            <List />
            <ControlPanel />
        </div>
    )
}