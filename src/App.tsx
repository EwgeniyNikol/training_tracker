import { useState } from 'react';
import { Training } from './types/training';
import TrainingForm from './components/TrainingForm';
import TrainingTable from './components/TrainingTable';
import './style.css';

function formatDate(dateStr: string): string {
  const [y, m, d] = dateStr.split('-');
  return `${d}.${m}.${y}`;
}

function toInputDate(dateStr: string): string {
  const [d, m, y] = dateStr.split('.');
  return `${y}-${m}-${d}`;
}

function App() {
  const [items, setItems] = useState<Training[]>([
    { id: '1', date: '20.07.2019', distance: 5.7 },
    { id: '2', date: '19.07.2019', distance: 14.2 },
    { id: '3', date: '18.07.2019', distance: 3.4 },
  ]);
  const [editing, setEditing] = useState<Training | null>(null);

  const addItem = (date: string, distance: number) => {
    const formatted = formatDate(date);
    const existing = items.find((item) => item.date === formatted);

    if (existing) {
      setItems((prev) =>
        prev
          .map((item) =>
            item.date === formatted
              ? { ...item, distance: item.distance + distance }
              : item
          )
          .sort((a, b) => b.date.localeCompare(a.date))
      );
    } else {
      const newItem: Training = {
        id: Date.now().toString(),
        date: formatted,
        distance,
      };
      setItems((prev) => [...prev, newItem].sort((a, b) => b.date.localeCompare(a.date)));
    }
    setEditing(null);
  };

  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    setEditing(null);
  };

  const startEdit = (item: Training) => {
    setEditing(item);
  };

  const saveEdit = (date: string, distance: number) => {
    if (!editing) return;
    const formatted = formatDate(date);
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === editing.id
            ? { ...item, date: formatted, distance }
            : item
        )
        .sort((a, b) => b.date.localeCompare(a.date))
    );
    setEditing(null);
  };

  return (
    <div className="container">
      <TrainingForm
        onAdd={addItem}
        editDate={editing ? toInputDate(editing.date) : undefined}
        editDistance={editing?.distance}
        onSave={saveEdit}
      />
      <TrainingTable
        items={items}
        onDelete={deleteItem}
        onEdit={startEdit}
      />
    </div>
  );
}

export default App;