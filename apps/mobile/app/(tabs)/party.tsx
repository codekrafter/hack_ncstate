import { ImageBackground, Text, View } from "react-native";

export default function Party() {
  return (
    <ImageBackground
      source={require("../../assets/images/fountain.jpg")}
      style={{
        flex: 1,
        alignItems: "center",
        paddingTop: 40,
        backgroundPosition: "left",
      }}
    >
      <Text>Party</Text>
    </ImageBackground>
  );
}
