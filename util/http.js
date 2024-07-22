import axios from "axios";

const backURl = "https://react-native-course-b21f8-default-rtdb.firebaseio.com";

export function storeExpense(expenseData) {
  axios
    .post(backURl + "/expenses.json", expenseData)
    .then((response) => {
      console.log("Data stored successfully:", response.data);
    })
    .catch((error) => {
      console.error("Error storing data:", error);
    });
}

export async function fetchExpenses() {
  const expenses = [];

  for (const key in res.data) {
    const expense = {
      id: key,
      amount: res.data[key].amount,
      date: new Date(res.data[key].date),
      title: res.data[key].title,
    };
    expenses.push(expense);
  }
  return expenses;
}
