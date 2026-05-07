import { useEffect, useState } from "react";

export default function Dashboard() {
  const [parcels, setParcels] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const fetchParcels = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/parcels");
    const data = await res.json();
    setParcels(data);
  };

  useEffect(() => {
    fetchParcels();
  }, []);

  const markCollected = async (id) => {
    await fetch(`http://127.0.0.1:8000/api/parcel/${id}/collect`, {
      method: "PATCH",
    });

    fetchParcels();
  };

  const filteredParcels = parcels.filter((p) => {
  const matchSearch =
    p.parcel_id.toLowerCase().includes(search.toLowerCase()) ||
    p.receiver_name.toLowerCase().includes(search.toLowerCase());

  const matchStatus =
    filter === "all" ? true : p.status === filter;

  return matchSearch && matchStatus;
});

  return (
    <div className="min-h-screen bg-[#FFDEE6] p-8">

      <h1 className="text-3xl font-bold mb-6">
        Admin Dashboard
      </h1>

    {/* SEARCH */}
      <div className="flex flex-col md:flex-row gap-3 mb-4">

        <input
            type="text"
            placeholder="Search"
            className="border px-3 py-2 rounded-lg w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />

    {/* FILTER */}
        <select
            className="border px-3 py-2 rounded-lg"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
        >
            <option value="all">All</option>
            <option value="stored">Stored</option>
            <option value="collected">Collected</option>
        </select>

        </div>

    {/* TABLE */}
      <div className="bg-white rounded-2xl shadow p-6">

        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th>Parcel ID</th>
              <th>Tracking</th>
              <th>Status</th>
              <th>Received Date</th>
              <th>Storage Location</th>
              <th>Description</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredParcels.map((p) => (
            <tr key={p.id} className="border-b">

            {/* 1. Parcel ID */}
            <td className="py-2">{p.parcel_id}</td>

            {/* 2. Tracking Number */}
            <td>{p.tracking_number}</td>

            {/* 3. Receiver Name */}
            <td>{p.receiver_name}</td>

            {/* 4. Received Date */}
            <td>{p.received_date}</td>

            {/* 5. Storage Location */}
            <td>{p.storage_location}</td>

            {/* 6. Description */}
            <td>{p.description}</td>

            {/* 7. Status */}
            <td>
                <span
                className={`px-2 py-1 rounded text-sm ${
                    p.status === "collected"
                    ? "bg-green-100"
                    : "bg-gray-100"
                }`}
                >
                {p.status}
                </span>
            </td>

            {/* 8. Action */}
            <td>
                {p.status === "stored" && (
                <button
                    onClick={() => markCollected(p.id)}
                    className="bg-[#FF6B8E] text-white px-3 py-1 rounded"
                >
                    Mark Collected
                </button>
                )}
            </td>

            </tr>
        ))}
        </tbody>

        </table>

      </div>
    </div>
  );

}