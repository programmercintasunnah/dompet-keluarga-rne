import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View, Text, FlatList,ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

export default function HomeScreen() {
  const [showBalance, setShowBalance] = useState(false);
  const transactions = [
    { id: '1', description: 'Groceries', amount: -50 },
    { id: '2', description: 'Salary', amount: 1000 },
    { id: '3', description: 'Electricity Bill', amount: -100 },
    { id: '4', description: 'Gym Membership', amount: -20 },
    { id: '5', description: 'Coffee', amount: -5 },
  ];

  const totalBalance = 5000;
  const walletBalance = 2000;
  const bankBalance = 3000;
  const dailyExpense = 100;
  const monthlyExpense = 500;
  const yearlyExpense = 6000;

  return (
    <ScrollView style={styles.scrollView}>
      <ThemedView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.profileInfo}>
            <Image
              source={require('../../assets/images/favicon.png')}
              style={styles.profileImage}
            />
            <View>
              <Text style={styles.profileName}>Zakie Zrae</Text>
              <Text style={styles.familyName}>Keluarga Zrae</Text>
            </View>
          </View>
          <TouchableOpacity>
            <Ionicons
              name='refresh'
              size={24}
              color="#000"
            />
          </TouchableOpacity>
        </View>

        {/* Balance */}
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceLabel}>Total Saldo</Text>
          <View style={styles.balanceRow}>
            <Text style={styles.balanceText}>
              {showBalance ? `Rp ${totalBalance.toLocaleString('id-ID')}` : '••••••••'}
            </Text>
            <TouchableOpacity onPress={() => setShowBalance(!showBalance)}>
              <Ionicons
                name={showBalance ? 'eye-off-outline' : 'eye-outline'}
                size={16}
                color="#000"
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.subBalance}>Saldo di Bank: Rp {bankBalance.toLocaleString('id-ID')}</Text>
          <Text style={styles.subBalance}>Saldo di Dompet: Rp {walletBalance.toLocaleString('id-ID')}</Text>
        </View>

        {/* Expenses */}
        <View style={styles.expensesContainer}>
          <Text style={styles.expensesTitle}>Pengeluaran</Text>
          <Text style={styles.expense}>Hari ini: Rp {dailyExpense.toLocaleString('id-ID')}</Text>
          <Text style={styles.expense}>Bulan ini: Rp {monthlyExpense.toLocaleString('id-ID')}</Text>
          <Text style={styles.expense}>Tahun ini: Rp {yearlyExpense.toLocaleString('id-ID')}</Text>
        </View>

        {/* Recent Transactions */}
        <View style={styles.transactionsContainer}>
          <Text style={styles.transactionsTitle}>5 Transaksi Terakhir</Text>
          <FlatList
            data={transactions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.transactionItem}>
                <Text>{item.description}</Text>
                <Text
                  style={[
                    styles.transactionAmount,
                    { color: item.amount > 0 ? 'green' : 'red' },
                  ]}>
                  {item.amount > 0 ? `+Rp ${item.amount}` : `Rp ${item.amount}`}
                </Text>
              </View>
            )}
          />
        </View>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  familyName: {
    fontSize: 14,
    color: '#555',
  },
  balanceContainer: {
    marginBottom: 20,
  },
  balanceLabel: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  balanceText: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
  },
  subBalance: {
    fontSize: 14,
    color: '#555',
  },
  expensesContainer: {
    marginBottom: 20,
  },
  expensesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  expense: {
    fontSize: 14,
    color: '#555',
  },
  transactionsContainer: {
    marginTop: 20,
  },
  transactionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  transactionAmount: {
    fontSize: 14,
  },
});
