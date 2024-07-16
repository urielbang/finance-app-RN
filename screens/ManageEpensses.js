import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";

export default function ManageEpensses({ route, navigation }) {
  const expendesId = route.params?.expendesId;
  const isEditing = !!expendesId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add expense",
    });
  }, [navigation, isEditing]);

  return (
    <View>
      <Text>ManageEpensses - {expendesId}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
