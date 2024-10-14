import { ControlPanel } from '../../components/control-panel/control-panel';
import { Header } from '../../components/header/header';
import { List } from '../../components/list/list';
import styles from './main.module.css';

export const Main: React.FC = () => {


    return (
        <div className={styles.main}>
            <Header />
            <List />
            <ControlPanel />
        </div>
    )
}