import { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function RegistryItemCard({ item }) {
  const [reserved, setReserved] = useState(item.reserved);
  const [saving, setSaving] = useState(false);

  const handleReserve = async () => {
    if (reserved) return; // already taken

    setSaving(true);
    console.log("I am saving the item");
    const { error } = await supabase
      .from('registry_items')
      .update({ reserved: true })
      .eq('id', item.id)
    if (error) {
        console.log("I didn't save the item");
      console.error(error);
      alert('Something went wrong reserving this item.');
    } else {
        console.log("I saved the item");
      setReserved(true);
      alert(`You reserved: ${item.name}`);
    }

    setSaving(false);
  };

  return (
    <div
        className={`border rounded-lg p-6 shadow-lg transform transition hover:scale-105 hover:shadow-xl ${
            reserved ? "opacity-40 line-through" : "bg-sand"
        }`}
        >
        <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
        <p className="mb-2">{item.description}</p>
        <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-copper underline hover:text-brown"
        >
            View Item
        </a>

      <button
        onClick={handleReserve}
        disabled={reserved || saving}
        className="mt-4 px-4 py-2 bg-copper text-white rounded"
      >
        {reserved ? 'Already Reserved' : saving ? 'Reserving…' : 'Reserve Gift'}
      </button>
    </div>
  );
}

