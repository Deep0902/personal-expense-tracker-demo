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
    profile_img: 6,
    wallet: 0,
    is_user_blocked: false,
  },
  {
    user_id: 3,
    user_name: "Sam Brown",
    user_email: "sam.brown@example.com",
    user_pass: "pass789",
    profile_img: 3,
    wallet: 10000,
    is_user_blocked: false,
  },
  {
    user_id: 4,
    user_name: "Tom",
    user_email: "tom@email.com",
    user_pass: "tomiscool",
    profile_img: 2,
    wallet: 10000,
    is_user_blocked: false,
  },
  {
    user_id: 5,
    user_name: "Mike Johnson",
    user_email: "mike.johnson@example.com",
    user_pass: "mike2024",
    profile_img: 1,
    wallet: 5000,
    is_user_blocked: false,
  },
  {
    user_id: 6,
    user_name: "Sarah Lee",
    user_email: "sarah.lee@example.com",
    user_pass: "sarah2024",
    profile_img: 5,
    wallet: 7000,
    is_user_blocked: false,
  },
  {
    user_id: 7,
    user_name: "David Clark",
    user_email: "david.clark@example.com",
    user_pass: "david123",
    profile_img: 2,
    wallet: 1500,
    is_user_blocked: false,
  },
  {
    user_id: 8,
    user_name: "Emily Davis",
    user_email: "emily.davis@example.com",
    user_pass: "emily2024",
    profile_img: 4,
    wallet: 2500,
    is_user_blocked: false,
  },
  {
    user_id: 9,
    user_name: "Chris Martin",
    user_email: "chris.martin@example.com",
    user_pass: "chriscool",
    profile_img: 3,
    wallet: 3000,
    is_user_blocked: false,
  },
  {
    user_id: 10,
    user_name: "Linda Brown",
    user_email: "linda.brown@example.com",
    user_pass: "lindapass",
    profile_img: 6,
    wallet: 4000,
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
    date: "2024-08-15",
    transaction_type: "debit",
  },
  {
    user_id: 2,
    transaction_no: "1",
    title: "Electric Bill",
    amount: 75.0,
    category: "Utilities",
    date: "2024-08-20",
    transaction_type: "debit",
  },
  {
    user_id: 4,
    transaction_no: "1",
    transaction_type: "debit",
    title: "Movie",
    amount: 500,
    category: "Entertainment",
    date: "2024-08-20",
  },
  {
    transaction_no: "3",
    user_id: 4,
    transaction_type: "debit",
    title: "Groceries",
    amount: 600,
    category: "Groceries",
    date: "2024-08-21",
  },
  {
    transaction_no: "4",
    user_id: 4,
    transaction_type: "debit",
    title: "Groceries",
    amount: 200,
    category: "Groceries",
    date: "2024-08-03",
  },
  {
    transaction_no: "6",
    user_id: 4,
    transaction_type: "debit",
    title: "Spotify",
    amount: 200,
    category: "Subscriptions",
    date: "2024-08-01",
  },
  {
    transaction_no: "7",
    user_id: 4,
    transaction_type: "debit",
    title: "Netflix",
    amount: 500,
    category: "Subscriptions",
    date: "2024-08-20",
  },
  {
    transaction_no: "11",
    user_id: 4,
    transaction_type: "debit",
    title: "Diesel",
    amount: 100,
    category: "Fuel",
    date: "2024-08-01",
  },
  {
    transaction_no: "15",
    user_id: 4,
    transaction_type: "credit",
    title: "Salary",
    amount: 100,
    category: "Salary",
    date: "2024-08-02",
  },
  {
    transaction_no: "17",
    user_id: 4,
    transaction_type: "debit",
    title: "Window shopping",
    amount: 500,
    category: "shopping",
    date: "2024-08-13",
  },
  {
    transaction_no: "20",
    user_id: 4,
    transaction_type: "debit",
    title: "Dog Food",
    amount: 900,
    category: "pets",
    date: "2024-08-31",
  },
];
