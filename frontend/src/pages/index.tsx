import React, { useState, useEffect } from "react";
import axios from "axios";
import CardComponent from "../components/CardComponent";

interface User {
  id: number;
  name: string;
  email: string;
}
export default function Home() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
  const [user, setUser] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
  });
  const [updateUser, setUpdateUser] = useState({
    id: "",
    name: "",
    email: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/users`);
        setUser(response.data.reverse());
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const deleteUser = (id: number) => {
    axios
      .delete(`${apiUrl}/users/${id}`)
      .then((response) => {
        setUser(user.filter((user) => user.id !== id));
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gary-200">
      <div className="space-y-4 max-w-2xl w-full">
        <h1 className="font-bold text-2xl text-gray-800 text-center">
          User Management App
        </h1>
        <div className="space-y-4">
          {user.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between bg-white p-4 shadow rounded-lg"
            >
              <CardComponent card={user} />
              <button
                onClick={() => deleteUser(user.id)}
                className="bg-red-500 hover:bg-red-300 text-white font-bold py-2 px-4 rounded"
              >
                Delete User
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
