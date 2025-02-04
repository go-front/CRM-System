import styles from './StateFilter.module.css';
import { IFilterCounts } from '../types/types';

type OnFilterChange = (target: string) => void;

interface IStateFilterProps {
  onFilterChange: OnFilterChange;
  filterCounts: IFilterCounts;
}

const StateFilter = ({ onFilterChange, filterCounts }: IStateFilterProps) => {
  const filters = [
    { key: 'all', label: 'Все', count: filterCounts?.all ?? 0 },
    { key: 'inWork', label: 'В работе', count: filterCounts?.inWork ?? 0 },
    { key: 'completed', label: 'Сделано', count: filterCounts?.completed ?? 0 },
  ];

  return (
    <div className={styles.filters}>
      {filters.map(({ key, label, count }) => (
        <button
          key={key}
          type="button"
          className={styles.filter_button}
          onClick={() => onFilterChange(key)}
        >
          {label} ({count})
        </button>
      ))}
    </div>
  );
};

export default StateFilter;
