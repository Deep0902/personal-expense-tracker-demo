// dummyDatas.ts
import { Admin } from "../interfaces/Admin";
import { Users } from "../interfaces/Users";
import { Expense } from "../interfaces/Expense";

export let dummyAdmins: Admin[] = [
  {
    admin_id: "admin1",
    admin_pass: "password1",
  },
  {
    admin_id: "admin2",
    admin_pass: "password2",
  },
  {
    admin_id: "zxc",
    admin_pass: "zxc",
  },
];

export let dummyUsers: Users[] = [
  {
    user_id: 1,
    user_name: "John Doe",
    user_email: "john.doe@example.com",
    user_pass: "pass123",
    profile_img: 1,
    wallet: 0,
    is_user_blocked: false,
  },
  {
    user_id: 2,
    user_name: "Jane Smith",
    user_email: "jane.smith@example.com",
    user_pass: "pass456",
    profile_img: 1,
    wallet: 0,
    is_user_blocked: false,
  },
  {
    user_id: 3,
    user_name: "Sam Brown",
    user_email: "sam.brown@example.com",
    user_pass: "pass789",
    profile_img: 4,
    wallet: 10000,
    is_user_blocked: false,
  },
  {
    user_id: 4,
    user_name: "Tom",
    user_email: "zxc@email.com",
    user_pass: "zxc",
    profile_img: 2,
    wallet: 10000,
    is_user_blocked: false,
  },
];

export let dummyExpenses: Expense[] = [
  {
    user_id: 1,
    transaction_no: "1",
    title: "Groceries",
    amount: 50.25,
    category: "Food",
    date: "2023-01-15",
    transaction_type: "debit",
  },
  {
    user_id: 2,
    transaction_no: "1",
    title: "Electric Bill",
    amount: 75.0,
    category: "Utilities",
    date: "2023-01-20",
    transaction_type: "debit",
  },
  {
    user_id: 4,
    transaction_no: "1",
    title: "Salary",
    amount: 2000.0,
    category: "Income",
    date: "2023-01-25",
    transaction_type: "credit",
  },
];
