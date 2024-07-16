import { StyleSheet, View } from "react-native";
import React from "react";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constants/styles";

export default function ExpensesOutput({ expenses, periodName }) {
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
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={Dummy} periodName={periodName} />
      <ExpensesList expenses={Dummy} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 12,
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
