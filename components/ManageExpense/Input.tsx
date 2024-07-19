import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constants/styles";

export default function Input({ label, textInputConfig }) {
  const isMultiLine = textInputConfig.multiline ? true : false;
  return (
    <View style={styles.containerInput}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, isMultiLine ? styles.multiline : null]}
        {...textInputConfig}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerInput: {
    marginHorizontal: 4,
    marginVertical: 5,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 6,
    color: GlobalStyles.colors.primary700,
    padding: 6,
    fontSize: 18,
  },
  multiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
});
