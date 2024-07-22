import { StyleSheet } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutpus/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-contex";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import Loading from "../components/UI/Loading";
import ErrorOverLay from "../components/UI/ErrorOverLay";

export default function RecentExpensses() {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);
  const Dummy = useContext(ExpensesContext);

  useEffect(() => {
    const getExpenses = async () => {
      try {
        const expenses = await fetchExpenses();
        Dummy.setExpenses(expenses);
      } catch (error) {
        setError("Could not Fetch Expenses");
      }
      setIsFetching(false);
    };

    getExpenses();
  }, []);

  const errorHandler = () => {
    setError(null);
  };

  const recent = Dummy.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date > date7DaysAgo;
  });
  if (isFetching) {
    return <Loading />;
  }
  if (error && !isFetching) {
    return <ErrorOverLay message={error} onConfirm={errorHandler} />;
  }

  return (
    <ExpensesOutput
      periodName="Last 7 Days"
      expenses={recent}
      fallBackText="No expenses in last 7 days"
    />
  );
}

const styles = StyleSheet.create({});
