import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const [data, setData] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const getData = async () => {
    const res = await axios.get("https://ogo8ul-5000.csb.app/auth/user");

    setData(res.data);
  };

  const login = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      "https://ogo8ul-5000.csb.app/auth/login",
      {
        username,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
      { withCredentials: true }
    );

    console.log(res.data);
    router.push("/feedpage");
  };

  // useEffect(() => {
  //   getData();
  // }, []);
  return (
    <div>
      <h1>Hello {data}</h1>
      <form onSubmit={login}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="username"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
        />
        <button type="submit" className=" bg-blue-600 text-white p-2">
          {" "}
          Login{" "}
        </button>
      </form>

      <button onClick={getData} className=" bg-blue-600 text-white p-2">
        {" "}
        Get Data
      </button>
    </div>
  );
}
