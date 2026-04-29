import { useState } from "react";

export default function App() {
  const [tracking, setTracking] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const searchParcel = async () => {
    if (!tracking) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/parcel/${tracking}`
      );
      const data = await res.json();

      setResult(data);
    } catch (err) {
      setResult({ message: "Error connecting to server" });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">

      <h1 className="text-4xl font-bold mb-6">GetParcel</h1>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter tracking number"
          value={tracking}
          onChange={(e) => setTracking(e.target.value)}
          className="border rounded px-4 py-2 w-64"
        />

        <button
          onClick={searchParcel}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {loading && <p className="mt-4">Searching...</p>}

      {result && (
        <div className="mt-6 bg-white p-4 rounded shadow w-72 text-center">

          {result.parcel_id ? (
            <>
              <p className="text-lg font-semibold">
                Parcel ID: {result.parcel_id}
              </p>

              <p
                className={`mt-2 font-medium ${
                  result.status === "stored"
                    ? "text-yellow-600"
                    : "text-green-600"
                }`}
              >
                Status: {result.status}
              </p>
            </>
          ) : (
            <p className="text-red-500">{result.message}</p>
          )}

        </div>
      )}

    </div>
  );
}