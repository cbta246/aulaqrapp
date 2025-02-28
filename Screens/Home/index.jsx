import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";

const HomeScreen = () => {
  const navigation = useNavigation().navigate;
  const { user, logOut } = useAuth();

  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
      <Text>{user ? user.username : "Usuario"}</Text>
      <Text>{user ? user.role : "Rol"}</Text>
      <Button title="Scanner" onPress={() => navigation("Scanner")} />
      <Button title="Cerrar Sesión" color="red" onPress={logOut} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
