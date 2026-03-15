import { useEffect,useState } from "react";
import API from "../services/api";

const Statement = () => {

  const [transactions,setTransactions] = useState([]);

  useEffect(()=>{

    const fetchTransactions = async()=>{

      const res = await API.get("/account/statement");
      setTransactions(res.data);

    };

    fetchTransactions();

  },[]);

  return(

    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-3xl font-bold mb-8 text-center">
        Account Statement
      </h1>

      <div className="max-w-4xl mx-auto bg-white shadow rounded">

        <table className="w-full">

          <thead className="bg-gray-200">

            <tr>

              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Sender</th>
              <th className="p-3 text-left">Receiver</th>

            </tr>

          </thead>

          <tbody>

            {transactions.map(t=>{

              const credit = t.transaction_type==="credit";

              return(

                <tr key={t.id} className="border-t">

                  <td className="p-3">
                    {new Date(t.created_at).toLocaleDateString()}
                  </td>

                  <td className={`p-3 font-bold ${credit ? "text-green-600":"text-red-600"}`}>
                    {t.transaction_type}
                  </td>

                  <td className="p-3">
                    ₹{t.amount}
                  </td>

                  <td className="p-3">
                    {t.sender_name}
                  </td>

                  <td className="p-3">
                    {t.receiver_name}
                  </td>

                </tr>

              )

            })}
          </tbody>
        </table>
      </div>
    </div>

  );
};

export default Statement;