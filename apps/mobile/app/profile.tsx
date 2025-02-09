import { Text, View, TouchableOpacity, StyleSheet, Image, ImageSourcePropType } from "react-native";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Edit2 } from "lucide-react-native";

interface CharacterItem {
  id: number;
  name: string;
  filepath: ImageSourcePropType;  // Changed from string to ImageSourcePropType
}

interface CharacterParts {
  head: CharacterItem[];
  torso: CharacterItem[];
  legs: CharacterItem[];
  feet: CharacterItem[];
}

type BodyPart = keyof CharacterParts;

interface SelectedParts {
  head: number;
  torso: number;
  legs: number;
  feet: number;
}

interface CharacterPartProps {
  part: BodyPart;
  label: string;
}

// Mock data for character customization - replace with actual data
const characterParts: CharacterParts = {
  head: [
    { id: 1, name: "Wizard Hat", filepath: require("../assets/images/hat.png") },
    { id: 2, name: "Crown", filepath: "" },
    { id: 3, name: "Hood", filepath: "" },
  ],
  torso: [
    { id: 1, name: "Robe", filepath: require("../assets/images/torso.png") },
    { id: 2, name: "Armor", filepath: "" },
    { id: 3, name: "Tunic", filepath: "" },
  ],
  legs: [
    { id: 1, name: "Pants", filepath: require("../assets/images/pants.png") },
    { id: 2, name: "Skirt", filepath: "" },
    { id: 3, name: "Shorts", filepath: "" },
  ],
  feet: [
    { id: 1, name: "Boots", filepath: require("../assets/images/shoes.png") },
    { id: 2, name: "Sandals", filepath: "" },
    { id: 3, name: "Shoes", filepath: "" },
  ],
};

const CharacterImage = ({ filepath, part }: { filepath: ImageSourcePropType | string; part: BodyPart }) => {
    if (!filepath) {
      return (
        <Text style={styles.placeholderText}>
          {part.charAt(0).toUpperCase() + part.slice(1)} item not available
        </Text>
      );
    }
  
    return (
      <Image
        source={filepath as ImageSourcePropType}
        style={styles.partImage}
        onError={() => {
          console.log('Image error for', part);
        }}
      />
    );
  };
  
  export default function Profile() {
    const [selectedParts, setSelectedParts] = useState<SelectedParts>({
      head: 0,
      torso: 0,
      legs: 0,
      feet: 0,
    });
  
    const cyclePart = (part: BodyPart, direction: 'next' | 'prev') => {
      const partLength = characterParts[part].length;
      setSelectedParts((prev) => ({
        ...prev,
        [part]: (prev[part] + (direction === "next" ? 1 : -1) + partLength) % partLength,
      }));
    };
  
    const CharacterPart = ({ part, label }: CharacterPartProps) => (
      <View style={styles.partContainer}>
        <Text style={styles.partLabel}>{label}</Text>
        <View style={styles.controls}>
          <TouchableOpacity 
            onPress={() => cyclePart(part, "prev")}
            style={styles.arrowButton}
          >
            <ChevronLeft size={24} color="#6B7280" />
          </TouchableOpacity>
          
          <Text style={styles.partName}>
            {characterParts[part][selectedParts[part]].name}
          </Text>
          
          <TouchableOpacity 
            onPress={() => cyclePart(part, "next")}
            style={styles.arrowButton}
          >
            <ChevronRight size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </View>
    );
  
    return (
      <View style={styles.container}>
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={styles.usernameContainer}>
            <Text style={styles.username}>GuildMaster123</Text>
            <TouchableOpacity style={styles.editButton}>
              <Edit2 size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>
          <Text style={styles.level}>Level 15 Financial Wizard</Text>
        </View>
  
        {/* Character Preview */}
        <View style={styles.characterPreview}>
          {Object.keys(characterParts).map((part) => (
            <View key={part} style={styles.partPreview}>
              <CharacterImage 
                filepath={characterParts[part as BodyPart][selectedParts[part as BodyPart]].filepath}
                part={part as BodyPart}
              />
            </View>
          ))}
        </View>
  
        {/* Character Customization */}
        <View style={styles.customization}>
          <CharacterPart part="head" label="Head" />
          <CharacterPart part="torso" label="Torso" />
          <CharacterPart part="legs" label="Legs" />
          <CharacterPart part="feet" label="Feet" />
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#F3F4F6",
    },
    header: {
      marginBottom: 24,
    },
    usernameContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 4,
    },
    username: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#1F2937",
      marginRight: 8,
    },
    editButton: {
      padding: 4,
    },
    level: {
      fontSize: 16,
      color: "#4B5563",
    },
    characterPreview: {
      height: 200,
      backgroundColor: "#E5E7EB",
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 24,
      position: 'relative',
    },
    partPreview: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    partImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
    },
    placeholderText: {
      color: "#6B7280",
      fontSize: 14,
      textAlign: "center",
    },
    customization: {
      backgroundColor: "#FFFFFF",
      borderRadius: 8,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    partContainer: {
      backgroundColor: "#FFFFFF",
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: "#E5E7EB",
    },
    partLabel: {
      fontSize: 16,
      fontWeight: "600",
      color: "#374151",
      marginBottom: 8,
    },
    controls: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    arrowButton: {
      padding: 8,
    },
    partName: {
      fontSize: 16,
      color: "#4B5563",
      flex: 1,
      textAlign: "center",
    },
  });
