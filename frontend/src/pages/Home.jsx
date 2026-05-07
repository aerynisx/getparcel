import { useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [tracking, setTracking] = useState("");
  const [result, setResult] = useState(null);

  const searchParcel = async () => {
    const res = await fetch(
      `http://127.0.0.1:8000/api/parcel/${tracking}`
    );

    const data = await res.json();
    setResult(data);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">

      {/* Login hyperlink */}
      <div className="absolute top-5 right-5">
        <Link
          to="/login"
          className="text-blue-500 hover:underline"
        >
          Log In
        </Link>
      </div>

      <h1 className="text-4xl font-bold mb-6">
        GetParcel
      </h1>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter tracking number"
          value={tracking}
          onChange={(e) => setTracking(e.target.value)}
          className="border rounded px-4 py-2"
        />

        <button
          onClick={searchParcel}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {result && (
        <div className="mt-6 bg-white p-4 rounded shadow">
          {result.parcel_id ? (
            <>
              <p>Parcel ID: {result.parcel_id}</p>
              <p>Status: {result.status}</p>
            </>
          ) : (
            <p className="text-red-500">
              Parcel not found
            </p>
          )}
        </div>
      )}

    </div>
  );
}