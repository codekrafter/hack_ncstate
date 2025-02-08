import { useState } from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="lightgray"
          value={username}
          onChangeText={setUsername}
        />
      </View>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="lightgray"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <View style={styles.row}>
        <Button title="Login" onPress={() => console.log("Login")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingVertical: 100,
    flexDirection: "column",
    alignItems: "center",
  },
  row: {
    paddingHorizontal: 50,
    flexDirection: "row",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
