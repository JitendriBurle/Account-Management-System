import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const TransferMoney = () => {

  const [users,setUsers] = useState([]);
  const [receiverId,setReceiverId] = useState("");
  const [amount,setAmount] = useState("");

  const navigate = useNavigate();

  useEffect(()=>{

    const fetchUsers = async()=>{
      const res = await API.get("/account/users");
      setUsers(res.data);
    };

    fetchUsers();

  },[]);

  const handleTransfer = async(e)=>{

    e.preventDefault();

    await API.post("/account/transfer",{
      receiverId,
      amount:Number(amount)
    });

    alert("Transfer Successful");

    navigate("/dashboard");

  };

  return(

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white shadow-lg p-8 rounded w-96">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Send Money
        </h2>

        <form onSubmit={handleTransfer} className="space-y-4">

          <select
            className="w-full border p-2 rounded"
            onChange={(e)=>setReceiverId(e.target.value)}
          >
            <option>Select User</option>

            {users.map(user=>(
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}

          </select>

          <input
            type="number"
            placeholder="Amount"
            className="w-full border p-2 rounded"
            onChange={(e)=>setAmount(e.target.value)}
          />

          <button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
          >
            Transfer
          </button>

        </form>

      </div>

    </div>

  );
};

export default TransferMoney;