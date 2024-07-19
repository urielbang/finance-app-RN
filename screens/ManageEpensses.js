import { StyleSheet, View } from "react-native";
import React, { useContext, useLayoutEffect } from "react";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/UI/Button";
import { ExpensesContext } from "../store/expenses-contex";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

export default function ManageEpensses({ route, navigation }) {
  const expendesId = route.params?.expendesId;
  const isEditing = !!expendesId;
  const Dummy = useContext(ExpensesContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add expense",
    });
  }, [navigation, isEditing]);

  const deleteHandle = () => {
    Dummy.deleteExpense(expendesId);
    navigation.goBack();
  };
  const cancelHandler = () => {
    navigation.goBack();
  };
  const confirmHandler = () => {
    if (isEditing) {
      Dummy.updateExpense(expendesId, {
        title: "Test!!!!!",
        amount: 59.66,
        date: new Date("2024-07-12"),
      });
    } else {
      Dummy.addExpense({
        title: "Test!!!!!",
        amount: 59.66,
        date: new Date("2024-07-12"),
      });
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ExpenseForm />
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={cancelHandler}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={confirmHandler}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            name="trash"
            color={GlobalStyles.colors.error500}
            size={26}
            handlePress={deleteHandle}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
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
