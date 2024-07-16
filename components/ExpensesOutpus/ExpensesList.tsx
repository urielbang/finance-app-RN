import { FlatList, StyleSheet, Text } from "react-native";
import React from "react";

const renderExpenseItem = ({ item }) => {
  return <Text>{item.title}</Text>;
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
