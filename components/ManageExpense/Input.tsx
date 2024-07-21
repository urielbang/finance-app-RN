import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constants/styles";

export default function Input({ label, textInputConfig, style, invalid }) {
  const isMultiLine = textInputConfig.multiline ? true : false;
  return (
    <View style={[styles.containerInput, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput
        style={[
          styles.input,
          invalid && styles.invalidInput,
          isMultiLine ? styles.multiline : null,
        ]}
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
  invalidLabel: { color: GlobalStyles.colors.error500 },
  invalidInput: { backgroundColor: GlobalStyles.colors.error500 },
});
