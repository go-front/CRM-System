import styles from "./StateFilter.module.css";
import { IFilterCounts } from "../types/types";

// interface IFilterCounts {
//   all: number;
//   completed: number;
//   inWork: number;
// }
type onFilterChange = (target: string) => void;
interface IStateFilterProps {
  onFilterChange: onFilterChange;
  filterCounts: IFilterCounts;
}

export default function StateFilter({
  onFilterChange,
  filterCounts,
}: IStateFilterProps) {
  return (
    <div className={styles.filters}>
      <button
        type="button"
        className={styles.filter_button}
        onClick={() => onFilterChange("all")}
      >
        Все({filterCounts.all})
      </button>
      <button
        type="button"
        className={styles.filter_button}
        onClick={() => onFilterChange("inWork")}
      >
        В работе({filterCounts.inWork})
      </button>
      <button
        type="button"
        className={styles.filter_button}
        onClick={() => onFilterChange("completed")}
      >
        Сделано({filterCounts.completed})
      </button>
    </div>
  );
}
