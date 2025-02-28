import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthProvider, useAuth } from "./context/AuthContext";
// Screens
import HomeScreen from "./Screens/Home";
import ScannerScreen from "./Screens/Scanner";
import SignInScreen from "./Screens/SignIn";
import { ActivityIndicator, View } from "react-native";

const Stack = createStackNavigator();
function AppNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Scanner" component={ScannerScreen} />
          </>
        ) : (
          <Stack.Screen name="Inicio de Seisón" component={SignInScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
