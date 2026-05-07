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
    <div className="min-h-screen bg-[#FFDEE6] flex flex-col items-center justify-center">
        
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96 text-center">
      <h1 className="text-4xl font-bold mb-6">
        GetParcel
      </h1>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter tracking number"
          value={tracking}
          onChange={(e) => setTracking(e.target.value)}
          className="border rounded px-4 py-2 flex-1 bg-white"
        />

        <button
          onClick={searchParcel}
          className="bg-[#FF6B8E] hover:opacity-80 text-white px-4 py-2 rounded-lg"
        >
          Search
        </button>
      </div>

{result && (
  <div
    className={`mt-6 p-4 rounded shadow w-full text-center ${
      result.parcel_id
        ? result.status === "collected"
          ? "bg-gray-100"
          : "bg-green-100"
        : "bg-red-100"
    }`}
  >
    {result.parcel_id ? (
      <>
        <p className="font-semibold text-lg">
          Parcel ID: {result.parcel_id}
        </p>

        <p className="mt-2">
          Status: {result.status}
        </p>
      </>
    ) : (
      <p className="text-red-500">
        Parcel not found
      </p>
    )}
  </div>
)}

    </div>

    <Link
          to="/login"
          className="mt-6 text-[#FF6B8E] hover:underline font-medium"
        >
          Log In
        </Link>

    </div>
  );
}