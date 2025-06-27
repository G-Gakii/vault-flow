import React, { useEffect, useState } from "react";
import AxiosInstance from "../../Services/Interceptor";

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [originalTransactions, setOriginalTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const getTransation = async () => {
    try {
      const res = await AxiosInstance.get("transcations/");

      setOriginalTransactions(res.data);
      setTransactions(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTransation();
  }, []);

  const filterTranscation = () => {
    const searchLower = search.trim().toLowerCase();
    const filteredTranscation = originalTransactions.filter((transcation) => {
      return (
        transcation?.from_account.toLowerCase().includes(searchLower) ||
        transcation?.to_account.toLowerCase().includes(searchLower) ||
        transcation?.from_currency.toLowerCase().includes(searchLower) ||
        transcation?.to_currency.toLowerCase().includes(searchLower)
      );
    });
    setTransactions(filteredTranscation);
  };
  return (
    <>
      <input
        type="text"
        placeholder="Search transactions..."
        className="form-control m-3 p-3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyUp={filterTranscation}
      />

      <table className="table  m-3">
        <thead>
          <tr>
            <th className="px-5" scope="col">
              Date
            </th>
            <th scope="col">From - To</th>
            <th scope="col">To</th>
            <th scope="col">Sent</th>
            <th scope="col">Received</th>
            <th scope="col">Exchange Rate</th>
            <th scope="col">Status</th>
            <th scope="col">Note</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => {
            return (
              <tr key={transaction.transaction_id}>
                <td className="px-5 py-3">
                  {new Date(transaction.created_at).toLocaleString()}
                </td>
                <td> {transaction.from_account} </td>
                <td> {transaction.to_account}</td>

                <td>
                  {transaction.from_currency} {transaction.amount}{" "}
                </td>
                <td>
                  {transaction.to_currency} {transaction.converted_amount}{" "}
                </td>
                <td>{transaction.exchange_rate} </td>

                <td> {transaction.status} </td>
                <td> {transaction.note} </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Transaction;
