import { Training } from '../types/training';

interface TrainingRowProps {
  item: Training;
  onDelete: (id: string) => void;
  onEdit: (item: Training) => void;
}

function TrainingRow({ item, onDelete, onEdit }: TrainingRowProps) {
  return (
    <div className="table-row">
      <div className="col-date">{item.date}</div>
      <div className="col-distance">{item.distance} км</div>
      <div className="col-actions">
        <button className="action-btn edit-btn" onClick={() => onEdit(item)}>
          ✎
        </button>
        <button className="action-btn delete-btn" onClick={() => onDelete(item.id)}>
          ✘
        </button>
      </div>
    </div>
  );
}

export default TrainingRow;