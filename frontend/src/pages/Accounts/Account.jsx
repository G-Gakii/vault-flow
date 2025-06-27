import React, { useEffect, useState } from "react";
import AxiosInstance from "../../Services/Interceptor";

const Account = () => {
  const [accounts, setAccounts] = useState([]);
  const getAccounts = async () => {
    try {
      let res = await AxiosInstance.get("accounts/");

      setAccounts(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAccounts();
  }, []);

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Account Name</th>

          <th scope="col">Amount</th>
        </tr>
      </thead>
      <tbody>
        {accounts.map((account) => {
          return (
            <tr key={account.account_id}>
              <th scope="row"> {accounts.indexOf(account)} </th>
              <td>{account.account_name} </td>

              <td>
                {" "}
                {account.currency} {account.balance}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Account;
