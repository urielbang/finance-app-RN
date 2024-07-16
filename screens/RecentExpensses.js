import { StyleSheet } from "react-native";
import React from "react";
import ExpensesOutput from "../components/ExpensesOutpus/ExpensesOutput";

export default function RecentExpensses() {
  return <ExpensesOutput periodName="Last 7 Days" />;
}

const styles = StyleSheet.create({});
