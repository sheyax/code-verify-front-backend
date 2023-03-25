import axios from "axios";
import { useState } from "react";
export default function FeedPage() {
  const [data, setData] = useState("");
  const getData = async () => {
    const res = await axios.get("http://localhost:5000/auth/user", {withCredentials: true});

    setData(res.data);
  };
  return (
    <div>
      <h1>feed page data out: {data}</h1>
      <button onClick={getData} className=" bg-blue-600 text-white p-2">
        Get User
      </button>
    </div>
  );
}
