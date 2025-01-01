import React, { useState } from 'react';
import { Modal, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Tabs } from 'expo-router';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [inputType, setInputType] = useState('');
  const [inputDescription, setInputDescription] = useState('');
  const [inputTotal, setInputTotal] = useState('');
  const [inputPaymentMethod, setInputPaymentMethod] = useState('');
  const [inputDate, setInputDate] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleAddButtonPress = () => {
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
    resetInputs();
  };

  const handleSubmit = () => {
    if (!validateInputs()) {
      return;
    }
    console.log('Submitting', {
      inputType,
      inputDescription,
      inputTotal,
      inputPaymentMethod,
      inputDate,
    });
    setModalVisible(false);
    resetInputs();
  };

  const validateInputs = () => {
    if (inputType === 'wishlist' && !inputDescription) {
      setValidationError('Deskripsi rencana tidak boleh kosong.');
      return false;
    }
    if ((inputType === 'income' || inputType === 'expense') && (!inputDescription || !inputTotal || !inputPaymentMethod || !inputDate)) {
      setValidationError('Semua input harus diisi.');
      return false;
    }
    setValidationError('');
    return true;
  };

  const resetInputs = () => {
    setInputType('');
    setInputDescription('');
    setInputTotal('');
    setInputPaymentMethod('');
    setInputDate('');
    setValidationError('');
  };

  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              position: 'absolute',
            },
            default: {},
          }),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="reports"
          options={{
            title: 'Laporan',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="clipboard.text" color={color} />,
          }}
        />
        <Tabs.Screen
          name="wishlist"
          options={{
            title: 'Rencana',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="star.fill" color={color} />,
          }}
        />
      </Tabs>
      <TouchableOpacity style={styles.addButton} onPress={handleAddButtonPress}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Tambah Baru</Text>
            <View style={styles.inputGroup}>
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  inputType === 'income' && styles.typeButtonActive,
                ]}
                onPress={() => setInputType('income')}
              >
                <Text
                  style={[
                    styles.typeButtonText,
                    inputType === 'income' && styles.typeButtonTextActive,
                  ]}
                >
                  Income
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  inputType === 'expense' && styles.typeButtonActive,
                ]}
                onPress={() => setInputType('expense')}
              >
                <Text
                  style={[
                    styles.typeButtonText,
                    inputType === 'expense' && styles.typeButtonTextActive,
                  ]}
                >
                  Expense
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  inputType === 'wishlist' && styles.typeButtonActive,
                ]}
                onPress={() => setInputType('wishlist')}
              >
                <Text
                  style={[
                    styles.typeButtonText,
                    inputType === 'wishlist' && styles.typeButtonTextActive,
                  ]}
                >
                  Wishlist
                </Text>
              </TouchableOpacity>
            </View>

            {validationError ? <Text style={styles.errorText}>{validationError}</Text> : null}

            {inputType === 'wishlist' && (
              <TextInput
                placeholder="Deskripsi rencana"
                value={inputDescription}
                onChangeText={setInputDescription}
                style={styles.input}
              />
            )}

            {(inputType === 'income' || inputType === 'expense') && (
              <>
                <TextInput
                  placeholder="Deskripsi income/expense"
                  value={inputDescription}
                  onChangeText={setInputDescription}
                  style={styles.input}
                />
                <TextInput
                  placeholder="Total Bayar"
                  keyboardType="numeric"
                  value={inputTotal}
                  onChangeText={setInputTotal}
                  style={styles.input}
                />

                <View style={styles.radioGroup}>
                  <TouchableOpacity
                    onPress={() => setInputPaymentMethod('cash')}
                    style={[
                      styles.radioButton,
                      inputPaymentMethod === 'cash' && styles.radioButtonSelected,
                    ]}
                  >
                    <Text
                      style={[
                        styles.radioText,
                        inputPaymentMethod === 'cash' && styles.radioTextSelected,
                      ]}
                    >
                      Cash
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setInputPaymentMethod('transfer')}
                    style={[
                      styles.radioButton,
                      inputPaymentMethod === 'transfer' && styles.radioButtonSelected,
                    ]}
                  >
                    <Text
                      style={[
                        styles.radioText,
                        inputPaymentMethod === 'transfer' && styles.radioTextSelected,
                      ]}
                    >
                      Transfer
                    </Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.datePickerLabel}>Tanggal</Text>
                <TextInput
                  placeholder="Tanggal"
                  value={inputDate}
                  onChangeText={setInputDate}
                  style={styles.input}
                />
              </>
            )}

            <View style={styles.actionButtons}>
              <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addButton: {
    position: 'absolute',
    bottom: 55,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.light.tint,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  addButtonText: {
    fontSize: 30,
    color: '#fff',
    lineHeight: 35,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  typeButton: {
    flex: 1,
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  typeButtonActive: {
    backgroundColor: Colors.light.tint,
  },
  typeButtonText: {
    color: '#333',
  },
  typeButtonTextActive: {
    color: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    marginRight: 5,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#333',
  },
  submitButton: {
    flex: 1,
    marginLeft: 5,
    padding: 10,
    backgroundColor: Colors.light.tint,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  radioGroup: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  radioButton: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  radioButtonSelected: {
    backgroundColor: Colors.light.tint,
  },
  radioText: {
    color: '#333',
  },
  radioTextSelected: {
    color: '#fff',
  },
  datePickerLabel: {
    marginVertical: 10,
  },
});