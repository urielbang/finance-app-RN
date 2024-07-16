import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ManageEpensses from "./screens/ManageEpensses";
import RecentExpensses from "./screens/RecentExpensses";
import AllExpensses from "./screens/AllExpensses";
import { GlobalStyles } from "./constants/styles";
import { Ionicons } from "@expo/vector-icons";

export default function App() {
  const Stack = createNativeStackNavigator();
  const BottomTabs = createBottomTabNavigator();

  const ExpensesTabs = () => {
    return (
      <BottomTabs.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
          headerTintColor: "white",
          tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
          tabBarActiveTintColor: GlobalStyles.colors.accent500,
        }}
      >
        <BottomTabs.Screen
          name="RecentExpenses"
          component={RecentExpensses}
          options={{
            title: "Recent Expenses",
            tabBarLabel: "Recent",
            tabBarIcon: ({ color, size }) => {
              <Ionicons name="add" color={color} size={size} />;
            },
          }}
        />
        <BottomTabs.Screen
          name="AllExpenses"
          component={AllExpensses}
          options={{
            title: "All Expenses",
            tabBarLabel: "All Expenses",
            tabBarIcon: ({ color, size }) => {
              <Ionicons name="calendar" color={color} size={size} />;
            },
          }}
        />
      </BottomTabs.Navigator>
    );
  };
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="ExpensesOverView"
            component={ExpensesTabs}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="ManageExpenss" component={ManageEpensses} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
