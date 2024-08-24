import { useState } from "react";
import { Expense } from "../../../interfaces/Expense";
import "../NewTransacrion/NewTransacrion.css";
import PopupWarning from "../../PopupWarning/PopupWarning";
import LoadingComponent from "../../LoadingComponent/LoadingComponent";
import { dummyExpenses, dummyUsers } from "../../dummyDatas";

interface EditTransactionProps {
  onEditTransaction: () => void;
  transaction: Expense;
  userData: any;
}

function EditTransaction({
  onEditTransaction,
  transaction,
  userData,
}: EditTransactionProps) {
  // State to manage the form inputs
  const [formState, setFormState] = useState<Expense>({
    ...transaction, // Initialize with the transaction data passed as a prop
  });


  // Handler for input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Function to display alerts
  function alertDisplay(message: string) {
    setAlertMessage(message);
    toggleAlertPopup();
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Trim extra spaces from title and category
    const trimmedTitle = formState.title.trim();
    const trimmedCategory = formState.category.trim();

    // Perform validations
    let hasError = false;

    if (!trimmedTitle) {
      setIsAlertSuccess(false);
      alertDisplay("Title is required.");
      hasError = true;
    }

    const currentDate = new Date();
    const enteredDate = new Date(formState.date);
    if (!formState.date) {
      setIsAlertSuccess(false);
      alertDisplay("Date is required.");
      hasError = true;
    } else if (enteredDate > currentDate) {
      setIsAlertSuccess(false);
      alertDisplay("Date cannot be in the future.");
      hasError = true;
    }

    if (!formState.amount || Number(formState.amount) <= 0) {
      setIsAlertSuccess(false);
      alertDisplay("Amount must be a positive number.");
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

    try {
        // Determine wallet adjustment based on the change in transaction type or amount
        let walletAdjustment = 0;
        if (
          formState.transaction_type === "debit" &&
          transaction.transaction_type === "debit"
        ) {
          walletAdjustment =
            Number(transaction.amount) - Number(formState.amount);
        } else if (
          formState.transaction_type === "credit" &&
          transaction.transaction_type === "credit"
        ) {
          walletAdjustment =
            Number(formState.amount) - Number(transaction.amount);
        } else if (
          formState.transaction_type === "debit" &&
          transaction.transaction_type === "credit"
        ) {
          walletAdjustment = -(
            Number(formState.amount) + Number(transaction.amount)
          );
        } else if (
          formState.transaction_type === "credit" &&
          transaction.transaction_type === "debit"
        ) {
          walletAdjustment =
            Number(formState.amount) + Number(transaction.amount);
        }

        const newWallet = userData.wallet + walletAdjustment;
        // Check if the new wallet balance will be negative
        if (newWallet < 0) {
          setIsAlertSuccess(false);
          alertDisplay("Amount is exceeding the wallet");
          return;
        }

        // Update the dummy data with the edited transaction
        const index = dummyExpenses.findIndex(
          (exp) =>
            exp.user_id === userData.user_id &&
            exp.transaction_no === transaction.transaction_no
        );
        if (index !== -1) {
          dummyExpenses[index] = {
            ...dummyExpenses[index],
            title: trimmedTitle,
            date: formState.date,
            amount: Number(formState.amount),
            category: trimmedCategory,
            transaction_type: formState.transaction_type,
          };
        }

        // Update the user's wallet in dummy data
        const userIndex = dummyUsers.findIndex(
          (user) => user.user_id === userData.user_id
        );
        if (userIndex !== -1) {
          dummyUsers[userIndex].wallet = newWallet;
        }

        setIsAlertSuccess(true);
        alertDisplay("Transaction updated successfully and wallet updated!");
        toggleLoading();
        setTimeout(() => {
          onEditTransaction(); // Close the edit form after submission
        }, 4000);
    } catch (error) {
        console.error("Error updating transaction or wallet", error);
        setIsAlertSuccess(false);
        alertDisplay("An error occurred while processing your transaction.");
        toggleLoading();
        setTimeout(() => {
            onEditTransaction(); // Close the edit form after submission
        }, 4000);
    }
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
              <span className="poppins-bold">Edit Transaction</span>
              <label className="poppins-regular">
                Enter updated Transaction details
              </label>
              <br />
              <form className="transaction-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    name="title"
                    value={formState.title}
                    onChange={handleInputChange}
                    className="poppins-regular"
                    placeholder="Transaction Name"
                    required
                  />
                </div>

                <div className="form-group">
                  <input
                    type="date"
                    name="date"
                    value={formState.date}
                    onChange={handleInputChange}
                    placeholder="Date"
                    className="poppins-regular"
                    required
                  />
                </div>

                <div className="form-group">
                  <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    value={formState.amount}
                    onChange={handleInputChange}
                    className="poppins-regular"
                    required
                  />
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={formState.category}
                    onChange={handleInputChange}
                    className="poppins-regular"
                    required
                  />
                </div>

                <div className="form-group">
                  <select
                    name="transaction_type"
                    className="poppins-regular"
                    value={formState.transaction_type}
                    onChange={handleInputChange}
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

                <button
                  type="submit"
                  className={
                    formState.transaction_type === "debit"
                      ? "debitButtonColor poppins-semibold add-button"
                      : "poppins-semibold add-button"
                  }
                >
                  Update
                </button>
              </form>
              <button
                type="submit"
                className="poppins-semibold cancel-button"
                onClick={onEditTransaction}
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

export default EditTransaction;
