import { Text, View, ImageBackground, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Fake data for the leaderboard
export const leaderboardData = [
  { name: "DragonSlayer42", exp: 12500 },
  { name: "SavingsWizard", exp: 10200 },
  { name: "BudgetKnight", exp: 9800 },
  { name: "GoldKeeper", exp: 8900 },
  { name: "InvestmentRogue", exp: 8500 },
  { name: "WealthPaladin", exp: 7200 },
  { name: "CoinMage", exp: 6800 },
  { name: "FrugalBarbarian", exp: 6500 },
  { name: "TreasureHunter", exp: 5900 },
  { name: "SpendingCleric", exp: 5500 },
];

export default function Leaderboard() {
  return (
    <ImageBackground
      source={require("../../assets/images/hero.jpg")}
      style={{
        flex: 1,
      }}
    >
      <SafeAreaView
        style={{
          paddingHorizontal: 20,
          flex: 1,
        }}
      >
        {/* Title with decorative bottom border */}
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
            Party Leaderboard
          </Text>
          {/* Decorative border under title */}
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
                borderColor:
                  index === 0
                    ? "#FFD700"
                    : index === 1
                    ? "#C0C0C0"
                    : index === 2
                    ? "#CD7F32"
                    : "#8B4513",
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
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  // Inner border
                  borderWidth: 1,
                  borderColor:
                    index === 0
                      ? "#FFD700"
                      : index === 1
                      ? "#C0C0C0"
                      : index === 2
                      ? "#CD7F32"
                      : "#8B4513",
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {/* Rank */}
                  <View
                    style={{
                      width: 45,
                      height: 50,
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: 12,
                      backgroundColor:
                        index === 0
                          ? "#FFD700"
                          : index === 1
                          ? "#C0C0C0"
                          : index === 2
                          ? "#CD7F32"
                          : "#8B4513",
                      borderRadius: 8,
                      borderWidth: 2,
                      borderColor: "#8B4513",
                      transform: [{ rotate: "0deg" }],
                    }}
                  >
                    <Text
                      style={{
                        color: "#000",
                        fontSize: 32,
                        textShadowColor: "rgba(255, 255, 255, 0.5)",
                        textShadowOffset: { width: 0, height: 1 },
                        textShadowRadius: 2,
                        fontFamily: "red-alert",
                      }}
                    >
                      {index + 1}
                    </Text>
                  </View>

                  {/* Username */}
                  <Text
                    style={{
                      fontSize: 22,
                      fontWeight: "600",
                      color:
                        index === 0
                          ? "#FFD700"
                          : index === 1
                          ? "#C0C0C0"
                          : index === 2
                          ? "#CD7F32"
                          : "white",
                      textShadowColor: "#000",
                      textShadowOffset: { width: 1, height: 1 },
                      textShadowRadius: 2,
                      fontFamily: "red-alert",
                    }}
                  >
                    {user.name}
                  </Text>
                </View>

                {/* EXP Display */}
                <View
                  style={{
                    backgroundColor: "rgba(139, 69, 19, 0.6)",
                    padding: 8,
                    borderRadius: 8,
                    borderWidth: 2,
                    borderColor:
                      index === 0
                        ? "#FFD700"
                        : index === 1
                        ? "#C0C0C0"
                        : index === 2
                        ? "#CD7F32"
                        : "#8B4513",
                    minWidth: 100,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color:
                        index === 0
                          ? "#FFD700"
                          : index === 1
                          ? "#C0C0C0"
                          : index === 2
                          ? "#CD7F32"
                          : "white",
                      fontWeight: "600",
                      fontSize: 22,
                      textShadowColor: "#000",
                      textShadowOffset: { width: 1, height: 1 },
                      textShadowRadius: 2,
                      fontFamily: "red-alert",
                    }}
                  >
                    {user.exp.toLocaleString()} EXP
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}
