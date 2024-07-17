import { StyleSheet } from "react-native";
import React, { useContext } from "react";
import ExpensesOutput from "../components/ExpensesOutpus/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-contex";
import { getDateMinusDays } from "../util/date";

export default function RecentExpensses() {
  const Dummy = useContext(ExpensesContext);

  const recent = Dummy.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date > date7DaysAgo;
  });

  return (
    <ExpensesOutput
      periodName="Last 7 Days"
      expenses={recent}
      fallBackText="No expenses in last 7 days"
    />
  );
}

const styles = StyleSheet.create({});
