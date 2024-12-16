import styles from './StateFilter.module.css';
export default function StateFilter() {
  return (
    <div className={styles.filters}>
      <button type="button" className={styles.filter_button}>
        Все()
      </button>
      <button type="button" className={styles.filter_button}>
        В работе()
      </button>
      <button type="button" className={styles.filter_button}>
        Сделано()
      </button>
    </div>
  );
}
