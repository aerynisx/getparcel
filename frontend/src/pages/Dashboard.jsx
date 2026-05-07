import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [parcels, setParcels] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const logout = () => {
    // If later you use auth token, clear it here
    localStorage.removeItem("token");

    navigate("/login");
  };

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

    useEffect(() => {
    setCurrentPage(1);
  }, [search, filter]);

  const filteredParcels = parcels.filter((p) => {
  const matchSearch =
    p.parcel_id.toLowerCase().includes(search.toLowerCase()) ||
    p.receiver_name.toLowerCase().includes(search.toLowerCase());

  const matchStatus =
    filter === "all" ? true : p.status === filter;

  return matchSearch && matchStatus;
});

const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;

const currentParcels = filteredParcels.slice(
  indexOfFirstItem,
  indexOfLastItem
);

const totalPages = Math.ceil(filteredParcels.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-[#FFDEE6] p-8">

      <div className="flex items-center justify-between mb-6">
  
  <h1 className="text-3xl font-bold">
    Admin Dashboard
  </h1>

  <button
    onClick={logout}
    className="bg-[#FB003D] text-white px-4 py-2 rounded hover:opacity-80 shadow-lg"
  >
    Log Out
  </button>

</div>

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
            {currentParcels.map((p) => (
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
                    className="bg-[#FF6B8E] text-white px-3 py-1 rounded hover:opacity-80 shadow-lg"
                >
                    Mark Collected
                </button>
                )}
            </td>

            </tr>
        ))}
        </tbody>

        </table>
        {/* PAGINATION */}
        <div className="flex justify-center mt-6 gap-2">

  <button
    disabled={currentPage === 1}
    onClick={() => setCurrentPage((p) => p - 1)}
    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
  >
    Prev
  </button>

  <span className="px-3 py-1">
    Page {currentPage} / {totalPages}
  </span>

  <button
    disabled={currentPage === totalPages}
    onClick={() => setCurrentPage((p) => p + 1)}
    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
  >
    Next
  </button>

</div>

      </div>
    </div>
  );

}