import { useMemo, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Modal,
  Pressable,
} from "react-native";
import { useFonts } from "expo-font";
import { SafeAreaView } from "react-native-safe-area-context";

interface Quest {
  id: string;
  title: string;
  points: string;
  type: "weekly" | "monthly";
  progress: number;
}

export default function Quests() {
  const [activeTab, setActiveTab] = useState<"weekly" | "monthly">("weekly");
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);

  const questBackgroundImage = require("../../assets/images/newPaper.png");

  const quests: Quest[] = [
    // Weekly Quests
    {
      id: "1",
      title: "Complete Budget",
      points: "50 XP",
      type: "weekly",
      progress: 75,
    },
    {
      id: "2",
      title: "Add Transaction",
      points: "30 XP",
      type: "weekly",
      progress: 30,
    },
    {
      id: "3",
      title: "Review Goals",
      points: "40 XP",
      type: "weekly",
      progress: 60,
    },
    {
      id: "4",
      title: "Track Spending",
      points: "25 XP",
      type: "weekly",
      progress: 45,
    },
    {
      id: "5",
      title: "Complete Budget",
      points: "50 XP",
      type: "weekly",
      progress: 75,
    },
    {
      id: "6",
      title: "Add Transaction",
      points: "30 XP",
      type: "weekly",
      progress: 30,
    },
    {
      id: "7",
      title: "Review Goals",
      points: "40 XP",
      type: "weekly",
      progress: 60,
    },
    {
      id: "8",
      title: "Track Spending",
      points: "25 XP",
      type: "weekly",
      progress: 45,
    },
    // Monthly Quests
    {
      id: "m1",
      title: "Save $100",
      points: "100 XP",
      type: "monthly",
      progress: 25,
    },
    {
      id: "m2",
      title: "No Overdraft",
      points: "75 XP",
      type: "monthly",
      progress: 100,
    },
    {
      id: "m3",
      title: "Budget Review",
      points: "60 XP",
      type: "monthly",
      progress: 50,
    },
    {
      id: "m4",
      title: "Meet Savings Goal",
      points: "150 XP",
      type: "monthly",
      progress: 80,
    },
  ];

  const activeQuests = quests.filter((quest) => quest.type === activeTab);

  const rotations = useMemo(() => {
    return Object.fromEntries(
      activeQuests.map((q) => [q.id, (Math.random() * 10 - 5).toFixed(1)])
    );
  }, [activeTab]);

  const getColorForProgress = (progress: number) => {
    const value = progress / 100;
    const r = Math.round(255 * (1 - value));
    const g = Math.round(255 * value);
    const b = 0;
    return `rgb(${r}, ${g}, ${b})`;
  };

  const renderItem = ({ item }: { item: Quest }) => {
    const rotation = rotations[item.id];
    const progressColor = getColorForProgress(item.progress);

    return (
      <Pressable
        style={{
          padding: 8,
          margin: 8,
        }}
        onPress={() => setSelectedQuest(item)}
      >
        <ImageBackground
          source={questBackgroundImage}
          style={{
            width: 140,
            height: 180,
            padding: 20,
            overflow: "hidden",
            transform: [{ rotate: `${rotation}deg` }],
          }}
        >
          <View style={{ justifyContent: "space-between", height: "100%" }}>
            <View style={{ alignItems: "center", marginVertical: 8 }}>
              <Text
                style={{
                  fontSize: 20,
                  color: "black",
                  fontFamily: "red-alert",
                  textAlign: "center",
                }}
              >
                {item.title}
              </Text>
            </View>
            <View style={{ alignItems: "center", marginVertical: 8 }}>
              <Text
                style={{
                  color: progressColor,
                  fontSize: 24,
                  fontFamily: "red-alert",
                  textAlign: "center",
                }}
              >
                {item.progress}%
              </Text>
            </View>
            <View style={{ alignItems: "center", marginVertical: 8 }}>
              <Text
                style={{
                  fontSize: 16,
                  color: "black",
                  fontFamily: "red-alert",
                  textAlign: "center",
                }}
              >
                {item.points}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </Pressable>
    );
  };

  return (
    <ImageBackground
      source={require("../../assets/images/bettercork.png")}
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
      resizeMode="stretch"
    >
      <SafeAreaView style={{ marginBottom: 100 }}>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 44,
              fontFamily: "red-alert",
              textAlign: "center",
            }}
          >
            Quest Board
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <TouchableOpacity
            style={{
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderBottomWidth: 2,
              borderBottomColor: activeTab === "weekly" ? "#000" : "#ddd",
              backgroundColor: "transparent",
            }}
            onPress={() => setActiveTab("weekly")}
          >
            <Text
              style={{
                fontSize: 28,
                color: activeTab === "weekly" ? "#000" : "#666",
                fontFamily: "red-alert",
                textAlign: "center",
              }}
            >
              Weekly
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderBottomWidth: 2,
              borderBottomColor: activeTab === "monthly" ? "#000" : "#ddd",
              backgroundColor: "transparent",
            }}
            onPress={() => setActiveTab("monthly")}
          >
            <Text
              style={{
                fontSize: 28,
                color: activeTab === "monthly" ? "#000" : "#666",
                fontFamily: "red-alert",
                textAlign: "center",
              }}
            >
              Monthly
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: "91.5%" }}>
          <FlatList
            data={activeQuests}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "center" }}
          />
        </View>

        {/* Bottom Sheet Modal */}
        <Modal
          visible={selectedQuest !== null}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setSelectedQuest(null)}
        >
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => setSelectedQuest(null)}
          >
            <View
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 300,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                padding: 20,
              }}
            >
              <TouchableOpacity
                activeOpacity={1}
                onPress={(e) => e.stopPropagation()}
                style={{ flex: 1 }}
              >
                {selectedQuest && (
                  <ImageBackground source={require("../../assets/images/notebook.png")} style={{ height: 300 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                        <View style={{ width: "45%", height: "100%", justifyContent: "center", alignItems: "center"}}>
                            <Text
                            style={{
                                fontSize: 40,
                                fontFamily: "red-alert",
                                textAlign: "center",
                            }}
                            >
                            {selectedQuest.title}
                            </Text>
                        </View>
                        <View style={{ width: "50%", height: "100%", justifyContent: "center", alignItems: "center"}}>
                            <Text style={{ color: `${getColorForProgress(selectedQuest.progress)}`, fontSize: 40, fontFamily: "red-alert", textAlign: "center"}}>
                                {selectedQuest.progress + "%"}
                            </Text>
                            <Text

                            style={{
                                fontSize: 18,
                                marginTop: 10,
                                fontFamily: "red-alert",
                                textAlign: "center",
                            }}
                            >
                            {selectedQuest.points}
                            </Text>
                        </View>
                        {/* Add more quest details here */}
                    </View>
                  </ImageBackground>
                )}
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      </SafeAreaView>
    </ImageBackground>
  );
}
