import { useUser } from "@/lib/user";
import { ImageBackground, ScrollView, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { leaderboardData } from "./leaderboard";

export default function Party() {
  const user = useUser();

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
      <SafeAreaProvider>
        <SafeAreaView style={{ paddingHorizontal: 20, flex: 1 }}>
          <View
            style={{
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                fontSize: 48,
                fontWeight: "600",
                color: "#FFD700",
                textAlign: "center",
                textShadowColor: "#000",
                textShadowOffset: { width: 2, height: 2 },
                textShadowRadius: 4,
                fontFamily: "red-alert",
              }}
            >
              Your Party ({leaderboardData.length}/10)
            </Text>
            <View
              style={{
                width: "90%",
                height: 4,
                backgroundColor: "#FFD700",
                marginTop: 10,
                borderRadius: 2,
              }}
            />
          </View>
          <ScrollView style={{ flex: 1 }}>
            {leaderboardData.map((user, index) => (
              <View
                key={user.name}
                style={{
                  marginBottom: 15,
                  borderWidth: 3,
                  borderColor: index === 0 ? "#2ECC40" : "#8B4513",
                  borderRadius: 12,
                  padding: 2, // Space for inner border
                }}
              >
                {/* Inner border container */}
                <View
                  style={{
                    backgroundColor: "rgba(44, 62, 80, 0.85)",
                    borderRadius: 8,
                    padding: 15,
                    height: 70,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    // Inner border
                    borderWidth: 1,
                    borderColor: index === 0 ? "#2ECC40" : "#8B4513",
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {/* Username */}
                    <Text
                      style={{
                        fontSize: 28,
                        fontWeight: "600",
                        color: index === 0 ? "#2ECC40" : "white",
                        textShadowColor: "#000",
                        textShadowOffset: { width: 1, height: 1 },
                        textShadowRadius: 2,
                        fontFamily: "red-alert",
                      }}
                    >
                      {user.name}
                    </Text>
                  </View>

                  {index === 0 && (
                    <View
                      style={{
                        backgroundColor: "rgba(139, 69, 19, 0.6)",
                        padding: 6,
                        borderRadius: 8,
                        borderWidth: 2,
                        borderColor: "#8B4513",
                        minWidth: 100,
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontWeight: "600",
                          fontSize: 22,
                          textShadowColor: "#000",
                          textShadowOffset: { width: 1, height: 1 },
                          textShadowRadius: 2,
                          fontFamily: "red-alert",
                        }}
                      >
                        YOU
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            ))}
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    </ImageBackground>
  );
}
