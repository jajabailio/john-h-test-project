import styles from './page.module.css';
import { CompanyForm } from '../components/companyForm';

export default async function Index() {
  return (
    <div className={styles.page}>
      <CompanyForm />
    </div>
  );
}
