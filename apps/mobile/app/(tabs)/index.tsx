import { Text, View, TouchableOpacity, Modal, Pressable, ImageBackground } from "react-native";
import * as Progress from "react-native-progress";
import { useState } from "react";
import { useFonts } from "expo-font";

export default function Index() {
  // Main Progress Bar Segments
  const mainSegments = [
    { progress: 0.2, color: "#B83338", name: "Home" },
    { progress: 0.1, color: "#C4B335", name: "Automobile" },
    { progress: 0.13, color: "#55B731", name: "Food" },
    { progress: 0.12, color: "#313BB4", name: "Monthly Fees/Debt" },
    { progress: 0.05, color: "#6B31B5", name: "Other" }
  ];

  const categoryImages = {
    red: require("../../assets/images/button_2.png"),
    yellow: require("../../assets/images/button_7.png"),
    green: require("../../assets/images/button_3.png"),
    blue: require("../../assets/images/button_4.png"),
    purple: require("../../assets/images/button_1.png"),
    orange: require("../../assets/images/button_5.png"),
    lightblue: require("../../assets/images/button_6.png"),
    teal: require("../../assets/images/button_8.png"),
  };

  // Category Data
  const categories = [
    { 
      name: "Home", 
      percentage: 0.2,
      imageKey: "red",  // Use key instead of a path
      segments: [
        { progress: 0.3, color: "darkred", name: "Rent" },
        { progress: 0.2, color: "tomato", name: "Mortgage" },
        { progress: 0.1, color: "pink", name: "Repairs" }
      ]
    },
    { 
      name: "Automobile", 
      percentage: 0.1,
      imageKey: "yellow",
      segments: [
        { progress: 0.2, color: "gold", name: "Gas" },
        { progress: 0.1, color: "orange", name: "Insurance" },
        { progress: 0.15, color: "brown", name: "Repairs" }
      ]
    },
    { 
      name: "Food", 
      percentage: 0.13,
      imageKey: "green",
      segments: [
        { progress: 0.25, color: "darkgreen", name: "Groceries" },
        { progress: 0.15, color: "lightgreen", name: "Dining Out" },
        { progress: 0.1, color: "lime", name: "Snacks" }
      ]
    },
    { 
      name: "Monthly Fees/Debt", 
      percentage: 0.12,
      imageKey: "blue",
      segments: [
        { progress: 0.3, color: "navy", name: "Loans" },
        { progress: 0.2, color: "skyblue", name: "Subscriptions" },
        { progress: 0.15, color: "lightblue", name: "Utilities" }
      ]
    },
    { 
      name: "Other", 
      percentage: 0.05,
      imageKey: "purple",
      segments: [
        { progress: 0.3, color: "indigo", name: "Online Shopping" },
        { progress: 0.2, color: "violet", name: "Clothing" },
        { progress: 0.15, color: "pink", name: "Fent" }
      ]
    }
  ];

  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <ImageBackground 
      source={require('../../assets/images/TavernBackground2.png')} 
      style={{ flex: 1, alignItems: "center", paddingTop: 40 }}>

      <Text style={{color:"white", fontSize: 40, fontWeight: "bold", fontFamily: "red-alert" }}>Budget Overview</Text>
      {/* Main MultiColor Progress Bar */}
      <ImageBackground source ={require('../../assets/images/Moneybar.png')}style={{ position: "relative", width: 317, height: 77, marginVertical: 20, left:-30}}>
        <View style={{ flexDirection: 'row', top: 24, left:75}}>
          {mainSegments.map((segment, index) => {
            const previousProgress = mainSegments.slice(0, index).reduce((sum, seg) => sum + seg.progress, 0);
            return (
              <View
                style={{
                  backgroundColor: segment.color, 
                  width: 225 * segment.progress,
                  height: 27
                }}
              ></View>
              // <Progress.Bar
              //   key={index}
              //   progress={segment.progress}
              //   width={300}
              //   height={27}
              //   color={segment.color}
              //   borderColor="transparent"
              //   style={{ 
              //     position: "absolute", 
              //     top: 23, 
              //     left: `${previousProgress * 100}%` 
              //   }}
                
              // />
            );
          })}
        </View>
         
      </ImageBackground>
      <Text style={{color:"white", fontSize: 20, fontWeight: "bold", fontFamily: "red-alert", top:-25 }}>$1400 / $2000</Text>
      {/* Category Buttons to Open Popover */}
      {categories.map((category, index) => {
  const imgsrc = categoryImages[category.imageKey]; // Get the pre-mapped image

  return (
    <View key={index} style={{ width: "90%", marginVertical: 0, alignItems: "center"} }>
      <TouchableOpacity
        onPress={() => setSelectedCategory(category)}
        style={{ 
          flexDirection: "row", 
          alignItems: "center", 
          backgroundColor: "transparent", 
          borderRadius: 5,
        }}
      >
        <ImageBackground 
          source={imgsrc} 
          style={{ width: 200, height: 60, marginVertical: 20 }} 
          resizeMode="stretch"
        > 

          <Text style={{ color: "white", fontSize:16, fontFamily: "red-alert" }}>{'\n' + "    " + category.name + "  " + category.percentage * 100 + "%"}</Text>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
})}

      {/* Popover Modal */}
      {selectedCategory && (
        <Modal 
          animationType="slide" 
          transparent={true} 
          visible={!!selectedCategory}
          onRequestClose={() => setSelectedCategory(null)}
        >
          <View style={{flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.5)" }}>
            <ImageBackground source={require('../../assets/images/notebook.png')}
              style={{ 
                bottom:25,
                height:300
            }}>
              <View style={{  left:30, top: 35}}>
              <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10, fontFamily: "red-alert", width:200 }}>{selectedCategory.name} Breakdown</Text>
              <ImageBackground source={require('../../assets/images/Woodbar.png')} resizeMode = "stretch" style={{width:130}}>
              {/* Category-Specific MultiColor Progress Bar */}
              <View style={{ position: "relative", width: 200, height: 10, marginBottom: 10, flexDirection:"row" }}>
                {selectedCategory.segments.map((segment, segIndex) => {
                  const previousProgress = selectedCategory.segments.slice(0, segIndex).reduce((sum, seg) => sum + seg.progress, 0);
                  return (
                    // <Progress.Bar
                    //   key={segIndex}
                    //   progress={segment.progress}
                    //   width={200}
                    //   color={segment.color}
                    //   borderColor="transparent"
                    //   style={{ position: "absolute", left: `${previousProgress * 100}%` }}
                    // />
                    <View
                style={{
                  backgroundColor: segment.color, 
                  width: 120 * segment.progress,
                  height: 6,
                  left:4.5,
                  top: 7
                }}
                />
                  );
                })}
              </View>
              </ImageBackground>

              {/* Key for Segments */}
              <View style={{ flexDirection: "column", flexWrap: "wrap", marginTop: 5 }}>
                {selectedCategory.segments.map((segment, segIndex) => (
                  <View 
                    key={segIndex} 
                    style={{ 
                      flexDirection: "row", 
                      alignItems: "center", 
                      marginRight: 10, 
                      marginBottom: 5 
                    }}
                  >
                    <View 
                      style={{ 
                        width: 10, 
                        height: 10, 
                        backgroundColor: segment.color, 
                        marginRight: 5, 
                        borderRadius: 2 
                      }} 
                    />
                    <Text style={{ fontSize: 12, fontFamily: "red-alert" }}>{segment.name + " - " + segment.progress * 100 + "%"}</Text>
                  </View>
                ))}
              </View>
              </View>
              {/* Close Button */}
              <View style={{ borderRadius: 2, borderColor: 'black'}}>
              <Pressable 
                onPress={() => setSelectedCategory(null)}
                style={{ backgroundColor: "red", alignItems: "center", height:35, width:35, left:300, bottom:100 }}
              >
                <Text style={{ color: "white", fontWeight: "bold", fontSize:30 }}>X</Text>
              </Pressable>
              </View>

            </ImageBackground>
          </View>
        </Modal>
      )}
    </ImageBackground>
  );
}
