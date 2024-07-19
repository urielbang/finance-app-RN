import { StyleSheet, View } from "react-native";
import React from "react";
import Input from "./Input";

export default function ExpenseForm() {
  const amountChangeHandler = () => {};
  return (
    <View>
      <Input
        label="Amount"
        textInputConfig={{
          keyboardType: "decimal-pad",
          onChange: amountChangeHandler,
        }}
      />
      <Input
        label="Date"
        textInputConfig={{
          placeholder: "YYYY-MM-DD",
          maxLength: 10,
        }}
      />
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          //   autoCorrect: false,
          //   autoCapitalize: "words",
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
