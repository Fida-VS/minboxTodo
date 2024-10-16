import { useEffect } from 'react';
import { ControlPanel } from '../../components/control-panel/control-panel';
import { Header } from '../../components/header/header';
import { List } from '../../components/list/list';
import styles from './main.module.css';
import { useAppDispatch, useAppSelector } from '../../hook';
import { fetchTodos } from '../../store/todoSlice';


export const Main: React.FC = () => {

    const dispatch = useAppDispatch();

    const { status, error } = useAppSelector(state => state.todos);

useEffect(() => {
    dispatch(fetchTodos());
}, [dispatch])

    return (
        <div className={styles.main}>
            <Header />
            {status && <h2>Loading...</h2>}
            {error && <h2>An error occured: {error}</h2>}
            <List />
            <ControlPanel />
        </div>
    )
}