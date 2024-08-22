import { Expense } from "../../../interfaces/Expense";
import "./DashboardDetails.css";
import addTransaction from "/images/add-transaction.svg";
import debitTransactionImg from "/images/debit-transaction.svg";
import expand from "/images/expand.svg";
import { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import editProfileImg from "/images/avatars/edit-profile-img.svg";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

interface DashboardDetailsProps {
  userExpenses: Expense[];
  wallet: number;
  username: any;
  onHistoryClick: (tab: string, category: string) => void; // Updated
  onNewTransaction: (arg: string) => void;
}

function DashboardDetails({
  userExpenses,
  wallet,
  username,
  onHistoryClick,
  onNewTransaction,
}: DashboardDetailsProps) {
  // Emojis for category
  const categoryEmojis: { [key: string]: string } = {
    Entertainment: "🍿",
    Fuel: "⛽",
    Groceries: "🛒",
    Subscriptions: "💳",
    Fruits: "🍍",
    Vegetables: "🥕",
    Medicines: "💊",
    Medicals: "💊",
    Rent: "🏠",
    Utilities: "💡",
    Transportation: "🚌",
    Dining: "🍽️",
    Shopping: "🛍️",
    Education: "📚",
    Travel: "✈️",
    Health: "🏥",
    Savings: "💰",
    Insurance: "📄",
    Gifts: "🎁",
    Charity: "❤️",
    Pets: "🐾",
    "Personal Care": "💅",
    Clothing: "👔",
    Electronics: "📱",
    "Home Maintenance": "🔧",
    Fitness: "🏋️",
    Snacks: "🍫",
    Coffee: "☕",
    Hobbies: "🎨",
    Investments: "📈",
    Loans: "💸",
    Taxes: "🧾",
    Internet: "🌐",
    Cleaning: "🧹",
    "Work Expenses": "💼",
    Childcare: "🍼",
    "Vehicle Maintenance": "🚗",
    Gardening: "🌱",
    Cosmetics: "💄",
    Furniture: "🛋️",
    Life: "🥳",
    Bills: "🗒️"
  };

  // Helper function to convert string to sentence case
  const toSentenceCase = (str: string) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth()
  );
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );

  // Segrate category wise amount based on current month
  const calculateMonthlyCategoryTotals = (
    expenses: Expense[],
    selectedMonth: number,
    selectedYear: number
  ): Record<string, number> => {
    const totals: Record<string, number> = {};

    expenses.forEach((expense: Expense) => {
      const expenseDate = new Date(expense.date);
      if (
        expense.transaction_type === "debit" &&
        expenseDate.getMonth() === selectedMonth &&
        expenseDate.getFullYear() === selectedYear
      ) {
        const category = expense.category.toLowerCase(); // Normalize category to lowercase
        const amount = expense.amount;
        if (totals[category]) {
          // If the category already exists, add the amount to the total
          totals[category] += amount;
        } else {
          // If the category does not exist, create it and set the amount
          totals[category] = amount;
        }
      }
    });

    return totals;
  };

  // Calculate monthly expenses
  const calculateMonthlyExpenses = (
    expenses: Expense[],
    selectedMonth: number,
    selectedYear: number
  ): number => {
    return expenses.reduce((total, expense) => {
      const expenseDate = new Date(expense.date);
      if (
        expense.transaction_type === "debit" &&
        expenseDate.getMonth() === selectedMonth &&
        expenseDate.getFullYear() === selectedYear
      ) {
        return total + expense.amount;
      }
      return total;
    }, 0);
  };

  const [totalMonthlyExpenses, setTotalMonthlyExpenses] = useState<number>(0);
  const categoryTotals = calculateMonthlyCategoryTotals(
    userExpenses,
    selectedMonth,
    selectedYear
  );

  //Handle Expand click
  const handleHistoryClick = (category: string) => {
    onHistoryClick("History", category);
  };
  // Data for the Pie chart
  const data = {
    labels: Object.keys(categoryTotals).map(toSentenceCase), // Category names
    datasets: [
      {
        data: Object.values(categoryTotals), // Amounts spent in each category
        backgroundColor: [
          "#FF6384", // Red
          "#36A2EB", // Blue
          "#FFCE56", // Yellow
          "#FF9F40", // Orange
          "#4BC0C0", // Teal
          "#9966FF", // Purple
          "#FF665C", // Coral
          "#4B9CE2", // Light Blue
          "#F7C6C7", // Light Pink
        ],
        hoverBackgroundColor: [
          "#FF6384", // Red
          "#36A2EB", // Blue
          "#FFCE56", // Yellow
          "#FF9F40", // Orange
          "#4BC0C0", // Teal
          "#9966FF", // Purple
          "#FF665C", // Coral
          "#4B9CE2", // Light Blue
          "#F7C6C7", // Light Pink
        ],
        borderWidth: 5,
        borderColor: "#eaf9f6",
        borderRadius: 10,
      },
    ],
  };

  //options for chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right" as const,
        labels: {
          font: {
            size: 20,
            family: "Poppins",
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            const dataset = tooltipItem.dataset;
            const currentValue = dataset.data[tooltipItem.dataIndex];
            const total = dataset.data.reduce(
              (acc: any, value: any) => acc + value,
              0
            );
            const percentage = ((currentValue / total) * 100).toFixed(2);
            return ` ₹ ${currentValue.toLocaleString()} (${percentage}%)`;
          },
        },
      },
    },
  };

  //options for chart
  const options2 = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          font: {
            size: 16,
            family: "Poppins",
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            const dataset = tooltipItem.dataset;
            const currentValue = dataset.data[tooltipItem.dataIndex];
            const total = dataset.data.reduce(
              (acc: any, value: any) => acc + value,
              0
            );
            const percentage = ((currentValue / total) * 100).toFixed(2);
            return ` ₹ ${currentValue.toLocaleString()} (${percentage}%)`;
          },
        },
      },
    },
  };
  const capitalizeFirstLetterOfEachWord = (str: string) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleMonthYearChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const [year, month] = event.target.value.split("-").map(Number);
    setSelectedMonth(month - 1); // JavaScript months are 0-indexed
    setSelectedYear(year);
  };

  useEffect(() => {
    const total = calculateMonthlyExpenses(
      userExpenses,
      selectedMonth,
      selectedYear
    );
    setTotalMonthlyExpenses(total);
  }, [userExpenses, selectedMonth, selectedYear]);

  const [chooseMonthExpenses, setChooseMonthExpenses] = useState(false);
  const formatMonthYear = (month: number, year: number) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return `${monthNames[month]} ${year}`;
  };
  const formatMonthInputValue = (month: number, year: number) => {
    const formattedMonth = (month + 1).toString().padStart(2, "0"); // Add 1 because months are 0-indexed
    return `${year}-${formattedMonth}`;
  };
  const resetToCurrentMonthYear = () => {
    setSelectedMonth(new Date().getMonth());
    setSelectedYear(new Date().getFullYear());
    setChooseMonthExpenses(!chooseMonthExpenses);
  };

  return (
    <>
      {chooseMonthExpenses && (
        <div className="overlayBackground">
          <div className="poppins-bold">
            <div className="overlayBox">
              <label className="">Choose Month and year</label>
              <br />
              <span className="poppins-regular">
                Select to view expenses of
              </span>
              <input
                type="month"
                onChange={handleMonthYearChange}
                value={formatMonthInputValue(selectedMonth, selectedYear)}
              />
              <button
                className="poppins-semibold add-button"
                onClick={() => setChooseMonthExpenses(!chooseMonthExpenses)}
              >
                Apply
              </button>
              <button
                className="poppins-semibold cancel-button"
                onClick={resetToCurrentMonthYear}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="dashboardDetails">
        <div className="displayUsername">
          <span className="poppins-bold">Hello, {username}!</span>
        </div>
        <div className="monthExpenses">
          <span className="poppins-semibold">
            Expenses for {formatMonthYear(selectedMonth, selectedYear)}
            :&nbsp;&nbsp;
          </span>
          <span className="inter-bold">
            ₹ {totalMonthlyExpenses.toLocaleString()}
          </span>
          <img
            className="editIcon"
            onClick={() => setChooseMonthExpenses(!chooseMonthExpenses)}
            src={editProfileImg}
            alt=""
          />
        </div>
        <br />
        <div className="overview">
          <div className="transactionActions">
            <div onClick={() => onNewTransaction("credit")}>
              <img src={addTransaction} alt="" />
              <span className="poppins-regular">Add Credit Transaction</span>
            </div>
            <div
              className="customLeftBorder"
              onClick={() => onNewTransaction("debit")}
            >
              <img src={debitTransactionImg} alt="" />
              <span className="poppins-regular debitTransactiontext">
                Add Debit Transaction
              </span>
            </div>
          </div>
          <div className="wallet">
            <p className="poppins-bold">My Wallet 🪙</p>
            <span className="inter-extra-bold">
              ₹ {wallet.toLocaleString()}
            </span>
          </div>
        </div>
        <br />
        <div className="breakdown">
          <span className="poppins-semibold">Category wise breakdown</span>
          <br />
          <label className="poppins-light">
            Where exactly is your money going?
          </label>
          <br />
          <br />
          <div className="categoryCards">
            {Object.keys(categoryTotals).map((category) => (
              <div
                key={category}
                className="cards"
                onClick={() => handleHistoryClick(category)}
              >
                <div>
                  <span className="poppins-semibold">
                    {categoryEmojis[
                      capitalizeFirstLetterOfEachWord(category)
                    ] || "📝"}{" "}
                    {toSentenceCase(category)}
                  </span>
                  <img className="expandIcon" src={expand} alt="expand" />
                </div>
                <label className="inter-extra-bold">
                  ₹ {categoryTotals[category].toLocaleString()}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <br />
      <div className="dashboardDetails">
        <div className="breakdown">
          <span className="poppins-semibold">Visualize your breakdown</span>
          <br />
        </div>
        {/* Add the Pie Chart here */}
        <br />
        {Object.keys(categoryTotals).length > 0 ? (
          <>
            <div className="pieChartContainer webView2">
              <span className="poppins-semibold">
                Click on categories to show/hide them
              </span>
              <Doughnut data={data} options={options} />
            </div>
            <div className="pieChartContainer mobileView2">
              <span className="poppins-semibold">
                Click on categories to show/hide them
              </span>
              <br />
              <br />
              <Doughnut data={data} options={options2} />
            </div>
          </>
        ) : (
          <div className="pieChartContainerEmpty">
            <p className="poppins-semibold ">
              There is nothing to display here! 😲
            </p>
          </div>
        )}
      </div>
      <br />
    </>
  );
}

export default DashboardDetails;
