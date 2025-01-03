import styles from './StateFilter.module.css';
export default function StateFilter({ onFilterChange, filterCounts }) {
  return (
    <div className={styles.filters}>
      <button
        type="button"
        className={styles.filter_button}
        onClick={() => onFilterChange('all')}
      >
        Все({filterCounts.all})
      </button>
      <button
        type="button"
        className={styles.filter_button}
        onClick={() => onFilterChange('inWork')}
      >
        В работе({filterCounts.inWork})
      </button>
      <button
        type="button"
        className={styles.filter_button}
        onClick={() => onFilterChange('completed')}
      >
        Сделано({filterCounts.completed})
      </button>
    </div>
  );
}
