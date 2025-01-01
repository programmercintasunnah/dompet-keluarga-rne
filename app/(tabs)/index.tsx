import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View, Text, FlatList, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function HomeScreen() {
  const [showBalance, setShowBalance] = useState(false);
  const transactions = [
    { id: '1', description: 'Bayar kontrakan januari 2025', amount: -506500 },
    { id: '2', description: 'Token listrik', amount: -203000 },
    { id: '3', description: 'Belanja kedai', amount: -5000 },
  ];

  const bankBalance = 938737;
  const walletBalance = 1461000;
  const dailyExpense = 203000+506500+5000;
  const monthlyExpense = dailyExpense;
  const yearlyExpense = monthlyExpense;

  const totalBalance = walletBalance + bankBalance;

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
          <View style={styles.balanceRow}>
            <Text style={styles.balanceLabel}>Total Saldo</Text>
            <TouchableOpacity onPress={() => setShowBalance(!showBalance)}>
              <Ionicons
                name={showBalance ? 'eye-off-outline' : 'eye-outline'}
                size={16}
                color="#000"
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.balanceText}>
            {showBalance ? `Rp ${totalBalance.toLocaleString('id-ID')}` : '••••••••'}
          </Text>
          <View style={styles.hiddenBalances}>
            <View style={styles.subBalanceRow}>
              <MaterialCommunityIcons name="bank" size={20} color="#000" style={styles.icon} />
              <Text style={styles.subBalanceText}>
                {showBalance ? `Rp ${bankBalance.toLocaleString('id-ID')}` : '••••••••'}
              </Text>
            </View>
            <View style={styles.subBalanceRow}>
              <MaterialCommunityIcons name="wallet" size={20} color="#000" style={styles.icon} />
              <Text style={styles.subBalanceText}>
                {showBalance ? `Rp ${walletBalance.toLocaleString('id-ID')}` : '••••••••'}
              </Text>
            </View>
          </View>
        </View>

        {/* Expenses */}
        <View style={styles.expensesContainer}>
          <Text style={styles.expensesTitle}>Pengeluaran</Text>
          <View style={styles.expensesBox}>
            <Text style={styles.expenseTitle}>Today</Text>
            <Text style={styles.expense}>Rp {dailyExpense.toLocaleString('id-ID')}</Text>
          </View>
          <View style={styles.expensesBox}>
            <Text style={styles.expenseTitle}>This Month</Text>
            <Text style={styles.expense}>Rp {monthlyExpense.toLocaleString('id-ID')}</Text>
          </View>
          <View style={styles.expensesBox}>
            <Text style={styles.expenseTitle}>This Year</Text>
            <Text style={styles.expense}>Rp {yearlyExpense.toLocaleString('id-ID')}</Text>
          </View>
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
  icon: {
    marginRight: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
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
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  balanceLabel: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
    flex: 1,
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
  hiddenBalances: {
    marginTop: 10,
  },
  subBalanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  subBalance: {
    fontSize: 14,
    color: '#555',
  },
  expensesContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  expensesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  expensesBox: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  expenseTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  expense: {
    fontSize: 14,
    color: '#555',
  },
  transactionsContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
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
  subBalanceBox: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  subBalanceLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
  },
  subBalanceText: {
    fontSize: 14,
    color: '#555',
  },
});
