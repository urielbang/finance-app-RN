import { StyleSheet, View } from "react-native";
import React, { useContext, useLayoutEffect, useState } from "react";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-contex";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { deleteExpense } from "../util/http";
import Loading from "../components/UI/Loading";
import ErrorOverLay from "../components/UI/ErrorOverLay";

export default function ManageEpensses({ route, navigation }) {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  const expendesId = route.params?.expendesId;
  const isEditing = !!expendesId;
  const Dummy = useContext(ExpensesContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add expense",
    });
  }, [navigation, isEditing]);

  const deleteHandle = async () => {
    setIsFetching(true);

    try {
      await deleteExpense(expendesId);
      Dummy.deleteExpense(expendesId);
      navigation.goBack();
    } catch (error) {
      setError("Could not delete expense please try again later !");
      setIsFetching(false);
    }
  };

  const selectedExpense = Dummy.expenses.find(
    (expense) => expense.id === expendesId
  );

  const errorHandler = () => {
    setError(null);
  };

  if (isFetching) {
    return <Loading />;
  }
  if (error && !isFetching) {
    return <ErrorOverLay message={error} onConfirm={errorHandler} />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        isEditing={isEditing}
        expendesId={expendesId}
        defaultValue={selectedExpense}
      />

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
});
