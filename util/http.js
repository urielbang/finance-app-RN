import axios from "axios";

const backURl = "https://react-native-course-b21f8-default-rtdb.firebaseio.com";

export async function storeExpense(expenseData) {
  await axios
    .post(backURl + "/expenses.json", expenseData)
    .then((response) => {
      const respones = response.data;
      const id = respones.data.name;

      console.log("Data stored successfully:", response.data);
      return id;
    })
    .catch((error) => {
      console.error("Error storing data:", error);
    });
}

export async function fetchExpenses() {
  const expenses = [];

  const res = await axios.get(backURl + "/expenses.json");

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

export function updateExpense(id, expenseData) {
  return axios.put(backURl + `/expenses/${id}.json`, expenseData);
}
export function deleteExpense(id) {
  return axios.delete(backURl + `/expenses/${id}.json`);
}
