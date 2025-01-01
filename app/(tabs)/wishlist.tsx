import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, ScrollView, Dimensions } from 'react-native';

interface PlanItem {
  id: string;
  label: string;
  isChecked: boolean;
}

export default function TabTwoScreen() {
  const [data, setData] = useState<PlanItem[]>([
    { id: '1', label: 'Pemasukan Gaji', isChecked: false },
    { id: '2', label: 'Pengeluaran Listrik', isChecked: false },
    { id: '3', label: 'Pemasukan Jual Barang', isChecked: false },
    { id: '4', label: 'Pengeluaran Makanan', isChecked: false },
  ]);

  const handleToggleCheck = (id: string) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  };

  const handleDelete = (id: string) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Rencana Pemasukan dan Pengeluaran</Text>
      </View>

      <View style={styles.listContainer}>
        {data.map((item) => (
          <View key={item.id} style={styles.itemContainer}>
            <TouchableOpacity onPress={() => handleToggleCheck(item.id)} style={styles.itemTextContainer}>
              <Text style={[styles.itemText, item.isChecked && styles.strikeThrough]}>
                {item.label}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
              <Ionicons name="trash-bin" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f7f7f7',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  header: {
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4a4a4a',
    textAlign: 'center',
  },
  listContainer: {
    marginTop: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width: '100%',
  },
  itemTextContainer: {
    flex: 1,
  },
  itemText: {
    fontSize: 18,
    color: '#333',
    maxWidth: '80%',
  },
  strikeThrough: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  deleteButton: {
    backgroundColor: '#ff6347',
    padding: 10,
    borderRadius: 50,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
