import { FlatList, StyleSheet } from "react-native";
import React from "react";
import ExpenseItem from "./ExpenseItem";

const renderExpenseItem = (itemData) => {
  return (
    <ExpenseItem
      description={itemData.item.title}
      date={itemData.item.date}
      amount={itemData.item.amount}
    />
  );
};

export default function ExpensesList({ expenses }) {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
    />
  );
}

const styles = StyleSheet.create({});
