import { useState } from "react";
import { Text, View, TouchableOpacity, FlatList, ImageBackground, Modal } from "react-native";
import { BlurView } from 'expo-blur';

interface Quest {
    id: string;
    title: string;
    points: string;
    type: 'weekly' | 'monthly';
}

export default function Quests() {
    const [activeTab, setActiveTab] = useState('weekly');

    const quests: Quest[] = [
        // Weekly Quests
        { id: '1', title: 'Complete Budget', points: '50 pts', type: 'weekly' },
        { id: '2', title: 'Add Transaction', points: '30 pts', type: 'weekly' },
        { id: '3', title: 'Review Goals', points: '40 pts', type: 'weekly' },
        { id: '4', title: 'Track Spending', points: '25 pts', type: 'weekly' },
        // Monthly Quests
        { id: 'm1', title: 'Save $100', points: '100 pts', type: 'monthly' },
        { id: 'm2', title: 'No Overdraft', points: '75 pts', type: 'monthly' },
        { id: 'm3', title: 'Budget Review', points: '60 pts', type: 'monthly' },
        { id: 'm4', title: 'Meet Savings Goal', points: '150 pts', type: 'monthly' },
    ];

    const activeQuests = quests.filter(quest => quest.type === activeTab);

    const renderItem = ({ item }: { item: Quest }) => (
        <View style={{
            flex: 1,
            margin: 8,
            padding: 16,
            backgroundColor: '#f0f0f0',
            borderRadius: 8,
            alignItems: 'center',
        }}>
            <Text style={{ fontSize: 16, fontWeight: '500' }}>{item.title}</Text>
            <Text style={{ marginTop: 8, color: '#666' }}>{item.points}</Text>
        </View>
    );

    return (
        <View style={{ backgroundColor: 'white' }}>
            <View style={{ alignItems: 'center' }}>

                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Quest Board</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20, marginBottom: 20 }}>
                <TouchableOpacity 
                    style={{ 
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        borderBottomWidth: 2,
                        borderBottomColor: activeTab === 'weekly' ? '#000' : '#ddd',
                        backgroundColor: '#fff'
                    }}
                    onPress={() => setActiveTab('weekly')}
                >
                    <Text style={{ fontSize: 16, fontWeight: activeTab === 'weekly' ? '500' : '400', color: activeTab === 'weekly' ? '#000' : '#666' }}>Weekly</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{ 
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        borderBottomWidth: 2,
                        borderBottomColor: activeTab === 'monthly' ? '#000' : '#ddd',
                        backgroundColor: '#fff'
                    }}
                    onPress={() => setActiveTab('monthly')}
                >
                    <Text style={{ fontSize: 16, color: activeTab === 'monthly' ? '#000' : '#666' }}>Monthly</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={activeQuests}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 16 }}
            />
        </View>
    )
}
