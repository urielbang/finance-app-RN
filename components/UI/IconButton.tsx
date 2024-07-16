import { Pressable, StyleSheet, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function IconButton({ color, size, name, handlPress }) {
  return (
    <Pressable
      onPress={handlPress}
      style={({ pressed }) => {
        return pressed && styles.pressed;
      }}
    >
      <View style={styles.buttonContainer}>
        <Ionicons name={name} color={color} size={size} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 24,
    padding: 6,
    margin: 4,
  },
  pressed: {
    opacity: 0.75,
  },
});
