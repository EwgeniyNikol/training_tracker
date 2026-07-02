import { useState, useEffect, FormEvent } from 'react';

interface TrainingFormProps {
  onAdd: (date: string, distance: number) => void;
  editDate?: string;
  editDistance?: number;
  onSave?: (date: string, distance: number) => void;
}

function TrainingForm({ onAdd, editDate, editDistance, onSave }: TrainingFormProps) {
  const [date, setDate] = useState(editDate || '');
  const [distance, setDistance] = useState(editDistance ? String(editDistance) : '');

  useEffect(() => {
    setDate(editDate || '');
    setDistance(editDistance ? String(editDistance) : '');
  }, [editDate, editDistance]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!date || !distance) return;

    if (editDate && onSave) {
      onSave(date, Number(distance));
    } else {
      onAdd(date, Number(distance));
      setDate('');
      setDistance('');
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="date">Дата (ДД.ММ.ГГ)</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="distance">Пройдено км</label>
          <input
            id="distance"
            type="number"
            step="0.1"
            min="0"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
          />
        </div>
      </div>
      <button type="submit" className="submit-btn">
        {editDate ? 'Сохранить' : 'OK'}
      </button>
    </form>
  );
}

export default TrainingForm;