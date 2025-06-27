import React, { useEffect, useState } from "react";
import "./TranscationForm.css";
import AxiosInstance from "../../Services/Interceptor";
import { useNavigate } from "react-router-dom";

const TranscationForm = () => {
  let navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);

  const [transcation, setTranscation] = useState({
    from_account_name: "From",
    to_account_name: "To",
    amount: 0,
    note: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const getAccounts = async () => {
    try {
      const res = await AxiosInstance.get("accounts/");
      let availableAccounts = [];
      for (let account of res.data) {
        availableAccounts.push(account.account_name);
      }

      setAccounts(availableAccounts);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAccounts();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTranscation((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = handleErrors(transcation);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    try {
      const res = await AxiosInstance.post("transcations/", transcation);
      alert(
        `you have successfuly transferred ${transcation.amount} to ${transcation.to_account_name} `
      );
      navigate("/transcations");
    } catch (error) {
      console.log(errors);
    }
  };

  const handleErrors = () => {
    const errors = {};
    if (!transcation.amount) {
      errors.amount = "amount required";
    }
    if (transcation.amount < 1) {
      errors.amount = "Minimum amount you can transact is 1 ";
    }
    if (!transcation.from_account_name) {
      errors.from_account_name = "Account sending money required";
    }
    if (!transcation.to_account_name) {
      errors.to_account_name = "Account receiving money required";
    }
    if (transcation.to_account_name === transcation.from_account_name) {
      errors.from_account_name = "You cannot send money to yourself";
    }
    console.log(errors);

    return errors;
  };
  // remove error when user start to fill
  const handleFocus = (e) => {
    const { name } = e.target;
    setFormErrors((prev) => {
      let updatedError = { ...prev };
      delete updatedError[name];
      return updatedError;
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-center">Transfer</h1>
      <select
        className="form-select"
        aria-label="Default select example"
        name="from_account_name"
        value={transcation.from_account_name}
        onChange={handleChange}
        onFocus={handleFocus}
      >
        <option disabled>From</option>
        {accounts.map((account, index) => {
          return (
            <option key={index} value={account}>
              {" "}
              {account}{" "}
            </option>
          );
        })}
      </select>
      {formErrors.from_account_name && (
        <span className="error">{formErrors.from_account_name} </span>
      )}
      <select
        className="form-select"
        aria-label="Default select example"
        name="to_account_name"
        value={transcation.to_account_name}
        onChange={handleChange}
        onFocus={handleFocus}
      >
        <option disabled>To</option>
        {accounts.map((account, index) => {
          return (
            <option key={index} value={account}>
              {" "}
              {account}{" "}
            </option>
          );
        })}
      </select>
      {formErrors.to_account_name && (
        <span className="error">{formErrors.to_account_name} </span>
      )}
      <div className="mb-3">
        <label htmlFor="amount" className="form-label">
          Amount
        </label>
        <input
          type="text"
          className="form-control"
          id="amount"
          name="amount"
          value={transcation.amount}
          onChange={handleChange}
          onFocus={handleFocus}
        />
      </div>
      {formErrors.amount && <span className="error">{formErrors.amount} </span>}
      <label htmlFor="Note" className="form-label">
        Note
      </label>
      <div className="mb-3">
        <textarea
          name="note"
          rows={5}
          id="note"
          placeholder=" Optional: Attach transcation note"
          value={transcation.note}
          onChange={handleChange}
        ></textarea>
      </div>
      <div className="text-center">
        <button type="submit" className="btn  w-100 p-3 fs-4">
          Submit
        </button>
      </div>
    </form>
  );
};

export default TranscationForm;
