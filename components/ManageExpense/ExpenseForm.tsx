import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import Input from "./Input";
import Button from "../UI/Button";
import { ExpensesContext } from "../../store/expenses-contex";
import { useNavigation } from "@react-navigation/native";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";
import { storeExpense, updateExpense } from "../../util/http";

export default function ExpenseForm({ isEditing, expendesId, defaultValue }) {
  const navigation = useNavigation();
  const [inputValues, setInputValue] = useState({
    amount: {
      value: defaultValue ? defaultValue.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValue ? getFormattedDate(defaultValue.date) : "",
      isValid: true,
    },
    description: {
      value: defaultValue ? defaultValue.title : "",
      isValid: true,
    },
  });

  const Dummy = useContext(ExpensesContext);

  const inputChangeHandler = (inputIdentefier, text) => {
    setInputValue((currentInputValues) => {
      return {
        ...currentInputValues,
        [inputIdentefier]: { value: text, isValid: true },
      };
    });
  };
  const cancelHandler = () => {
    navigation.goBack();
  };

  const submitHandler = async () => {
    const expenseData = {
      amount: +inputValues.amount.value,
      date: new Date(inputValues.date.value),
      title: inputValues.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.title.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      // Alert.alert("Invalid input", "Please Check your input values");
      setInputValue((currentInputs) => {
        return {
          amount: { value: currentInputs.amount.value, isValid: amountIsValid },
          description: {
            value: currentInputs.description.value,
            isValid: descriptionIsValid,
          },
          date: { value: currentInputs.date.value, isValid: dateIsValid },
        };
      });
      return;
    }
    if (isEditing) {
      Dummy.updateExpense(expendesId, expenseData);
      await updateExpense(expendesId, expenseData);
    } else {
      const id = await storeExpense(expenseData);
      Dummy.addExpense({ ...expenseData, id: id });
    }
    navigation.goBack();
  };

  const formisIvalid =
    !inputValues.amount.isValid ||
    !inputValues.date.isValid ||
    !inputValues.description.isValid;
  return (
    <View style={styles.containerForm}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          invalid={!inputValues.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "amount"),
            value: inputValues.amount.value,
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          invalid={!inputValues.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            value: inputValues.date.value,
            onChangeText: inputChangeHandler.bind(this, "date"),
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!inputValues.description.isValid}
        textInputConfig={{
          multiline: true,
          value: inputValues.description.value,
          onChangeText: inputChangeHandler.bind(this, "description"),
        }}
      />
      {formisIvalid ? (
        <Text style={styles.errorText}>Please check your enter data !</Text>
      ) : (
        ""
      )}
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
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
});
