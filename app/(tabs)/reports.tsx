import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  Button,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';

interface Transaction {
  id: string;
  description: string;
  date: string;
  totalDebit: number;
  totalCredit: number;
}

const dummyData: Transaction[] = Array.from({ length: 10 }, (_, index) => ({
  id: index.toString(),
  description: `Transaction ${index + 1}`,
  date: `2024-01-${index + 1}`,
  totalDebit: index % 2 === 0 ? 0 : Math.floor(Math.random() * 100000),
  totalCredit: index % 2 === 0 ? Math.floor(Math.random() * 100000) : 0,
}));

export default function TabTwoScreen() {
  const [selectedFilter, setSelectedFilter] = useState('today');
  const [isModalVisible, setModalVisible] = useState(false);

  const renderTransactionItem = ({ item }: { item: Transaction }) => (
    <View style={styles.transactionItem}>
      <Ionicons
        name={item.totalDebit > 0 ? 'arrow-up' : 'arrow-down'}
        size={20}
        color={item.totalDebit > 0 ? '#e63946' : '#2a9d8f'}
        style={styles.transactionIcon}
      />
      <View style={styles.transactionDetails}>
        <Text style={styles.transactionDesc}>{item.description}</Text>
        <Text style={styles.transactionDate}>{item.date}</Text>
      </View>
      <Text
        style={[
          styles.transactionAmount,
          item.totalDebit > 0 ? styles.expense : styles.income,
        ]}
      >
        {item.totalDebit > 0
          ? `-Rp${item.totalDebit.toLocaleString()}`
          : `+Rp${item.totalCredit.toLocaleString()}`}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Picker
          selectedValue={selectedFilter}
          onValueChange={(itemValue) => setSelectedFilter(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Today" value="today" />
          <Picker.Item label="This Month" value="thisMonth" />
          <Picker.Item label="This Year" value="thisYear" />
          <Picker.Item label="All" value="all" />
        </Picker>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.filterButtonText}>Filter</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={dummyData}
        keyExtractor={(item) => item.id}
        renderItem={renderTransactionItem}
        contentContainerStyle={
          dummyData.length === 0 ? styles.emptyList : styles.transactionList
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Data tidak tersedia</Text>
          </View>
        }
      />

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter Options</Text>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 16,
  },
  headerRow: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  picker: {
    flex: 1,
    height: 40,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginRight: 8,
  },
  filterButton: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  filterButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  transactionList: {
    marginTop: 16,
    backgroundColor: '#fff',
    padding: 12,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptyList: {},
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center', // Align vertically
    justifyContent: 'space-between', // Space between icon and other details
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 8,
  },
  transactionIcon: {
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1, // Take up remaining space
    flexDirection: 'column', // Stack description and date
    justifyContent: 'center',
  },
  transactionDesc: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#333',
  },
  transactionDate: {
    fontSize: 12,
    color: '#888',
  },
  transactionAmount: {
    fontSize: 14,
    textAlign: 'right', // Right align text
  },
  income: {
    color: '#2a9d8f',
  },
  expense: {
    color: '#e63946',
  },
});
