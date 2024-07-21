import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import Input from "./Input";
import Button from "../UI/Button";
import { ExpensesContext } from "../../store/expenses-contex";
import { useNavigation } from "@react-navigation/native";
import { getFormattedDate } from "../../util/date";

export default function ExpenseForm({ isEditing, expendesId, defaultValue }) {
  const navigation = useNavigation();
  const [inputValues, setInputValue] = useState({
    amount: defaultValue ? defaultValue.amount.toString() : "",
    date: defaultValue ? getFormattedDate(defaultValue.date) : "",
    description: defaultValue ? defaultValue.title : "",
  });

  const Dummy = useContext(ExpensesContext);

  const inputChangeHandler = (inputIdentefier, text) => {
    setInputValue((currentInputValues) => {
      return {
        ...currentInputValues,
        [inputIdentefier]: text,
      };
    });
  };
  const cancelHandler = () => {
    navigation.goBack();
  };

  const submitHandler = () => {
    const expenseData = {
      amount: +inputValues.amount,
      date: new Date(inputValues.date),
      title: inputValues.description,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() === "Invalid Date";
    const descriptionIsValid = expenseData.title.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      Alert.alert("Invalid input", "Please Check your input values");
      return;
    }
    if (isEditing) {
      Dummy.updateExpense(expendesId, expenseData);
    } else {
      Dummy.addExpense(expenseData);
    }
    navigation.goBack();
  };
  return (
    <View style={styles.containerForm}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "amount"),
            value: inputValues.amount,
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            value: inputValues.date,
            onChangeText: inputChangeHandler.bind(this, "date"),
          }}
        />
      </View>
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          value: inputValues.description,
          onChangeText: inputChangeHandler.bind(this, "description"),
        }}
      />
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={cancelHandler}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },

  containerForm: {
    marginTop: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginVertical: 24,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
