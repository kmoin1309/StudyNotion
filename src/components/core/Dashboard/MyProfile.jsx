import { useEffect, useState } from "react";

export default function MyProfile() {
  const [data, setData] = useState(null);

  useEffect(() => {
    try {
      const storedData = typeof window !== "undefined" ? localStorage.getItem("user") : null;
      if (storedData) {
        setData(JSON.parse(storedData));
      } else {
        setData(null);
      }
    } catch (err) {
      console.error("Failed to parse user data from localStorage:", err);
      setData(null);
    }
  }, []);

  if (!data) {
    return <div className="text-white text-2xl font-bold">No user data found</div>;
  }

  return (
    <div className="text-white text-2xl font-bold">
      <h1>My Profile</h1>
      <p>
        <strong>Token:</strong> {data.token ?? "N/A"}
      </p>
      <p>
        <strong>User ID:</strong> {data.user?.id ?? "N/A"}
      </p>
      <p>
        <strong>Email:</strong> {data.user?.email ?? "N/A"}
      </p>
      <p>
        <strong>Role:</strong> {data.user?.role ?? "N/A"}
      </p>
      <p>
        <strong>Name:</strong> {data.user?.name ?? "N/A"}
      </p>
    </div>
  );
}
