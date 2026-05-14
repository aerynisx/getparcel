import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [parcels, setParcels] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [lastAction, setLastAction] = useState(null);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [courier, setCourier] = useState("");
  const [description, setDescription] = useState("");
  const [storageLocation, setStorageLocation] = useState("");
  const [receivedDate, setReceivedDate] = useState(new Date().toISOString().split("T")[0]);
  const [editingParcel, setEditingParcel] = useState(null);
  const [editTracking, setEditTracking] = useState("");
  const [editReceiver, setEditReceiver] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editCourier, setEditCourier] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editLocation, setEditLocation] = useState("");

  const logout = () => {
    // If later you use auth token, clear it here
    localStorage.removeItem("token");

    navigate("/login");
  };

  // fetch parcels from backend and store in state
  const fetchParcels = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/parcels");
    const data = await res.json();
    setParcels(data);
  };

  // on component mount, fetch parcels
  useEffect(() => {
    fetchParcels();
  }, []);

  // mark collected = change status to "collected"
  const markCollected = async (id) => {
    console.log("MARK COLLECTED", id);
    await fetch(`http://127.0.0.1:8000/api/parcel/${id}/collect`, {
      method: "PATCH",
    });

    fetchParcels();
  };

  // mark stored = change status back to "stored"
  const markStored = async (id) => {
    console.log("MARK STORED", id);
    await fetch(`http://127.0.0.1:8000/api/parcel/${id}/restore`, {
        method: "PATCH",
    });

    fetchParcels();
  };

  // whenever search or filter changes, reset to page 1
    useEffect(() => {
    setCurrentPage(1);
  }, [search, filter]);

  // apply search and filter to parcels
  const filteredParcels = parcels.filter((p) => {
    const matchSearch =
        p.parcel_id.toLowerCase().includes(search.toLowerCase()) ||
        p.receiver_name.toLowerCase().includes(search.toLowerCase());

        // if filter is "all", match all. otherwise only match if status equals filter
    const matchStatus =
        filter === "all" ? true : p.status === filter;

    return matchSearch && matchStatus;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // get only the parcels for the current page
  const currentParcels = filteredParcels.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredParcels.length / itemsPerPage);

  // create new parcel
  const createParcel = async () => {
  await fetch("http://127.0.0.1:8000/api/parcel", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      tracking_number: trackingNumber,
      receiver_name: receiverName,
      received_date: receivedDate,
      courier: courier,
      description: description,
      storage_location: storageLocation,
      status: "stored",
    }),
  });

  // refresh table
  fetchParcels();

  // clear form
  setTrackingNumber("");
  setReceiverName("");
  setReceivedDate(new Date().toISOString().split("T")[0]);
  setCourier("");
  setDescription("");
  setStorageLocation("");
  };

  // open edit form and populate with parcel data
  const openEdit = (parcel) => {
  setEditingParcel(parcel);
  setEditTracking(parcel.tracking_number);
  setEditReceiver(parcel.receiver_name);
  setEditDate(parcel.received_date);
  setEditCourier(parcel.courier);
  setEditDescription(parcel.description);
  setEditLocation(parcel.storage_location);
  };

  // send updated parcel data to backend
  const updateParcel = async () => {
  await fetch(
    `http://127.0.0.1:8000/api/parcel/${editingParcel.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        tracking_number: editTracking,
        receiver_name: editReceiver,
        received_date: editDate,
        courier: editCourier,
        description: editDescription,
        storage_location: editLocation,
      }),
    }
  );

  setEditingParcel(null);

  fetchParcels();
  };

  // prevent background scroll when editing
  useEffect(() => {
  if (editingParcel) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
}, [editingParcel]);

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


<div className="bg-white p-6 rounded-2xl shadow mb-6">

  <h2 className="text-xl font-bold mb-4">
    Add Parcel
  </h2>

  <div className="grid grid-cols-2 gap-4">

    <input
      type="text"
      placeholder="Tracking Number"
      value={trackingNumber}
      onChange={(e) => setTrackingNumber(e.target.value)}
      className="border p-2 rounded"
    />

    <input
      type="text"
      placeholder="Receiver Name"
      value={receiverName}
      onChange={(e) => setReceiverName(e.target.value)}
      className="border p-2 rounded"
    />

    <input
      type="date"
      value={receivedDate}
      onChange={(e) => setReceivedDate(e.target.value)}
      className="border p-2 rounded"
    />

    <input
      type="text"
      placeholder="Courier"
      value={courier}
      onChange={(e) => setCourier(e.target.value)}
      className="border p-2 rounded"
    />

    <input
      type="text"
      placeholder="Description"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      className="border p-2 rounded"
    />

    <input
      type="text"
      placeholder="Storage Location"
      value={storageLocation}
      onChange={(e) => setStorageLocation(e.target.value)}
      className="border p-2 rounded"
    />

  </div>

<div className="flex justify-end">
  <button
    onClick={createParcel}
    className="mt-4 bg-[#FF6B8E] text-white px-4 py-2 rounded hover:opacity-80"
  >
    Add Parcel
  </button>
</div>

</div>

    {/* TABLE */}
      <div className="bg-white rounded-2xl shadow p-6 overflow-x-auto">

        <table className="w-full text-left table-fixed">
          <thead>
            <tr className="border-b text-left">
              <th className="w-24 py-3 ">Parcel ID</th>
              <th className="w-60 text-center">Tracking</th>
              <th className="w-65 text-center">Receiver Name</th>
              <th className="w-32">Received Date</th>
              <th className="w-40">Storage Location</th>
              <th>Description</th>
              <th className="w-28 text-center">Status</th>
              <th className="w-60 text-center">Action</th>
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
            <td className="py-3">
                <div
                className={`mx-auto w-20 py-1 rounded text-sm text-center ${
                    p.status === "collected"
                    ? "bg-green-100"
                    : "bg-gray-100"
                }`}
                >
                {p.status}
                </div>
            </td>

            {/* 8. Action */}
            <td className="py-3">
  <div className="flex justify-center gap-2">

    {p.status === "stored" ? (
      <button
        onClick={() => markCollected(p.id)}
        className="w-36 bg-[#FF6B8E] text-white py-2 rounded hover:opacity-80"
      >
        Mark Collected
      </button>
    ) : (
      <button
        onClick={() => markStored(p.id)}
        className="w-36 bg-gray-500 text-white py-2 rounded hover:opacity-80"
      >
        Mark Stored
      </button>
    )}

    <button
      onClick={() => openEdit(p)}
      className="bg-[#FFDEE6] text-[#640018] px-4 py-2 rounded hover:opacity-60"
    >
      Edit
    </button>

  </div>
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

      {/* EDIT PARCEL MODAL */}
      {editingParcel && (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999]">

    <div className="bg-white p-6 rounded-2xl shadow w-[500px]">

      <h2 className="text-2xl font-bold mb-4">
        Edit Parcel
      </h2>

      <div className="grid grid-cols-2 gap-4">

        <input
          value={editTracking}
          onChange={(e) => setEditTracking(e.target.value)}
          className="border p-2 rounded"
          placeholder="Tracking Number"
        />

        <input
          value={editReceiver}
          onChange={(e) => setEditReceiver(e.target.value)}
          className="border p-2 rounded"
          placeholder="Receiver Name"
        />

        <input
          type="date"
          value={editDate}
          onChange={(e) => setEditDate(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          value={editCourier}
          onChange={(e) => setEditCourier(e.target.value)}
          className="border p-2 rounded"
          placeholder="Courier"
        />

        <input
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          className="border p-2 rounded"
          placeholder="Description"
        />

        <input
          value={editLocation}
          onChange={(e) => setEditLocation(e.target.value)}
          className="border p-2 rounded"
          placeholder="Storage Location"
        />

      </div>

      <div className="flex justify-end gap-2 mt-6">

        <button
          onClick={() => setEditingParcel(null)}
          className="px-4 py-2 rounded bg-gray-300 hover:opacity-80"
        >
          Cancel
        </button>

        <button
          onClick={updateParcel}
          className="px-4 py-2 rounded bg-[#FF6B8E] text-white hover:opacity-80"
        >
          Save
        </button>

      </div>

    </div>

  </div>
)}

    </div>
  );

}