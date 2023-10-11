import styles from './page.module.css';
import { UserForm } from '../components/userForm';

export default async function Index() {
  return (
    <div className={styles.page}>
      <UserForm />
    </div>
  );
}
