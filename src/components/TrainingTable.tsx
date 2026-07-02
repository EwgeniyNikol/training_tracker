import { Training } from '../types/training';
import TrainingRow from './TrainingRow';

interface TrainingTableProps {
  items: Training[];
  onDelete: (id: string) => void;
  onEdit: (item: Training) => void;
}

function TrainingTable({ items, onDelete, onEdit }: TrainingTableProps) {
  if (items.length === 0) {
    return (
      <div className="data-table">
        <div className="table-header">
          <div className="col-date">Дата (ДД.ММ.ГГ)</div>
          <div className="col-distance">Пройдено км</div>
          <div className="col-actions">Действия</div>
        </div>
        <div className="empty-state">Нет данных</div>
      </div>
    );
  }

  return (
    <div className="data-table">
      <div className="table-header">
        <div className="col-date">Дата (ДД.ММ.ГГ)</div>
        <div className="col-distance">Пройдено км</div>
        <div className="col-actions">Действия</div>
      </div>
      <div className="table-body">
        {items.map((item) => (
          <TrainingRow
            key={item.id}
            item={item}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
}

export default TrainingTable;