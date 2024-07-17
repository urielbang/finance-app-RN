import { createContext, useReducer } from "react";

const Dummy = [
  {
    id: "e1",
    title: "A per Of Shoes",
    amount: 59.66,
    date: new Date("2024-07-12"),
  },
  {
    id: "e3",
    title: "A per Of shirts",
    amount: 60.66,
    date: new Date("2022-07-12"),
  },
  {
    id: "e4",
    title: "A per Of banana",
    amount: 9.66,
    date: new Date("2023-07-12"),
  },
  {
    id: "e5",
    title: "A per Of books",
    amount: 12.66,
    date: new Date("2024-07-12"),
  },
  {
    id: "e6",
    title: "A per Of Shoes",
    amount: 59.66,
    date: new Date("2024-03-12"),
  },
  {
    id: "e7",
    title: "A per Of shirts",
    amount: 60.66,
    date: new Date("2022-07-12"),
  },
  {
    id: "e8",
    title: "A per Of banana",
    amount: 9.66,
    date: new Date("2023-02-12"),
  },
  {
    id: "e9",
    title: "A per Of books",
    amount: 12.66,
    date: new Date("2024-07-12"),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

const expensesReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const id = new Date().toISOString() + Math.random().toString();
      return [
        ...state,
        {
          ...action.payload,
          id: id,
        },
      ];
    case "UPDATE":
      const updatebleItem = state.findIndex(
        (expense) => expense.id === action.payload
      );

      const updatebleExpemse = state[updatebleItem];
      const updatedItem = { ...updatebleExpemse, ...action.data };
      const updatedExpeneses = [...state];
      updatedExpeneses[updatebleItem] = updatedItem;
      return updatedExpeneses;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
};

const ExpensesContextProvider = ({ children }) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, Dummy);

  const addExpense = (expenseData) => {
    dispatch({ type: "ADD", payload: expenseData });
  };
  const deleteExpense = (id) => {
    dispatch({ type: "DELETE", payload: id });
  };
  const updateExpense = (id, expenseData) => {
    dispatch({ type: "UPDATE", payload: id, data: expenseData });
  };

  const value = {
    expenses: expensesState,
    addExpense,
    deleteExpense,
    updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContextProvider;
