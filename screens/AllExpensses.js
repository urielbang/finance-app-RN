import { StyleSheet } from "react-native";
import React, { useContext } from "react";
import ExpensesOutput from "../components/ExpensesOutpus/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-contex";

export default function AllExpensses() {
  const Dummy = useContext(ExpensesContext);

  return (
    <ExpensesOutput
      periodName="Total"
      expenses={Dummy.expenses}
      fallBackText="No registered expenses found!"
    />
  );
}

const styles = StyleSheet.create({});
