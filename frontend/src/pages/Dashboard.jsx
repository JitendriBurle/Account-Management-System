import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

const Dashboard = () => {

  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await API.get("/account/balance");
      setBalance(res.data.balance);
    };

    fetchBalance();
  }, []);

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-3xl font-bold mb-8 text-center">
        Account Dashboard
      </h1>

      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6">

        <h2 className="text-lg text-gray-600">
          Current Balance
        </h2>

        <p className="text-4xl font-bold text-green-600 mt-2">
          ₹{balance}
        </p>

        <div className="flex justify-between mt-8">

          <Link
            to="/send"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded"
          >
            Send Money
          </Link>

          <Link
            to="/statement"
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded"
          >
            View Statement
          </Link>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;