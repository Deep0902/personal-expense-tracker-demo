import { useEffect, useState } from "react";
import "./NewTransacrion.css";
import PopupWarning from "../../PopupWarning/PopupWarning";
import LoadingComponent from "../../LoadingComponent/LoadingComponent";
import { dummyExpenses } from "../../dummyDatas";

interface NewTransactionProps {
  userData: any;
  onNewTransaction: () => void;
  defaultTransactionType?: string; // Add this prop
}

function NewTransaction({ userData, onNewTransaction, defaultTransactionType }: NewTransactionProps) {
  // State for form inputs
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date().toISOString().substr(0, 10));
  const [amount, setAmount] = useState<string | number>("");
  const [category, setCategory] = useState("");
  const [transactionType, setTransactionType] = useState(defaultTransactionType || "debit");

  function alertDisplay(message: string) {
    setAlertMessage(message);
    toggleAlertPopup();
    // alert(message)
  }

  // Handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  
    // Perform validations
    let hasError = false;
  
    // Trim the input values
    const trimmedTitle = title.trim();
    const trimmedCategory = category.trim();
  
    if (!trimmedTitle) {
      setIsAlertSuccess(false);
      alertDisplay("Title is required.");
      hasError = true;
    }
  
    const currentDate = new Date();
    const enteredDate = new Date(date);
    if (!date) {
      setIsAlertSuccess(false);
      alertDisplay("Date is required.");
      hasError = true;
    } else if (enteredDate > currentDate) {
      setIsAlertSuccess(false);
      alertDisplay("Date cannot be in the future.");
      hasError = true;
    }
  
    if (!amount || Number(amount) <= 0) {
      setIsAlertSuccess(false);
      alertDisplay("Amount must be a positive number.");
      hasError = true;
    } else if (
      transactionType === "debit" &&
      Number(amount) > userData.wallet
    ) {
      setIsAlertSuccess(false);
      alertDisplay(
        `Amount cannot exceed wallet balance of ${userData.wallet}.`
      );
      hasError = true;
    }
  
    if (!trimmedCategory) {
      setIsAlertSuccess(false);
      alertDisplay("Category is required.");
      hasError = true;
    }
  
    if (hasError) {
      return;
    }
  
    // Add the new transaction to the dummyExpenses array
    dummyExpenses.push({
      user_id: userData.user_id,
      transaction_no: (dummyExpenses.length + 1).toString(),
      title: trimmedTitle,
      date,
      amount: Number(amount),
      category: trimmedCategory,
      transaction_type: transactionType,
    });
  
    // Update the user's wallet
    userData.wallet =
      transactionType === "debit"
        ? userData.wallet - Number(amount)
        : userData.wallet + Number(amount);
  
    setIsAlertSuccess(true);
    alertDisplay("Transaction added successfully and wallet updated!");
    toggleLoading();
    setTimeout(() => {
      onNewTransaction(); // Refresh the transaction list
    }, 2000);
  };
  
  //Logic for Alert
  const [isAlertSuccess, setIsAlertSuccess] = useState(false);
  const [isPopVisible, setIsPopVisible] = useState(false);
  const toggleAlertPopup = () => {
    setIsPopVisible(!isPopVisible);
  };
  const [alertMessage, setAlertMessage] = useState("");

  //Logic for Loading screen
  const [isLoadingVisible, setIsLoadingVisible] = useState(false);
  const toggleLoading = () => {
    setIsLoadingVisible(!isLoadingVisible);
  };
  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <>
      {isPopVisible && (
        <PopupWarning
          message={alertMessage}
          onButtonClickded={toggleAlertPopup}
          successAlert={isAlertSuccess}
        />
      )}
      {isLoadingVisible && <LoadingComponent />}
      <div className="modal">
        <div className="overlay">
          <div className="overlayContent">
            <div className="popupBox">
              <span className="poppins-bold">New Transaction</span>
              <label className="poppins-regular">
                Enter Transaction details
              </label>
              <br />
              <form onSubmit={handleSubmit} className="transaction-form">
                <div className="form-group ">
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="poppins-regular"
                    placeholder="Transaction Name"
                    required
                  />
                </div>

                <div className="form-group ">
                  <input
                    type="date"
                    value={date}
                    placeholder="Date"
                    onChange={(e) => setDate(e.target.value)}
                    className="poppins-regular"
                    required
                  />
                </div>

                <div className="form-group">
                  <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="poppins-regular"
                    required
                  />
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="poppins-regular"
                    required
                  />
                </div>

                <div className="form-group">
                  <select
                    className="poppins-regular"
                    value={transactionType}
                    onChange={(e) => setTransactionType(e.target.value)}
                    required
                  >
                    <option className="poppins-regular" value="credit">
                      Credit
                    </option>
                    <option className="poppins-regular" value="debit">
                      Debit
                    </option>
                  </select>
                </div>

                <button type="submit" className={transactionType === "debit"? "debitButtonColor poppins-semibold add-button": "poppins-semibold add-button"}>
                  Add
                </button>
              </form>
              <button
                className="poppins-semibold cancel-button"
                onClick={onNewTransaction}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewTransaction;
