import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useServices } from '../hooks/useServices';

export default function CreateServiceScreen({ navigation }: any) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const { createService, isLoading } = useServices();

  const handleCreate = async () => {
    if (!title || !description || !category || !location) {
      Alert.alert('خطأ', 'الرجاء ملء جميع الحقول المطلوبة');
      return;
    }

    try {
      await createService({
        title,
        description,
        category,
        location,
        price: price ? parseFloat(price) : undefined,
      });
      Alert.alert('نجاح', 'تم إنشاء الخدمة بنجاح');
      navigation.goBack();
    } catch (err: any) {
      Alert.alert('خطأ', err.message || 'فشل إنشاء الخدمة');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>عنوان الخدمة *</Text>
          <TextInput
            style={styles.input}
            placeholder="أدخل عنوان الخدمة"
            value={title}
            onChangeText={setTitle}
            editable={!isLoading}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>الوصف *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="أدخل وصف الخدمة"
            value={description}
            onChangeText={setDescription}
            editable={!isLoading}
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>الفئة *</Text>
          <TextInput
            style={styles.input}
            placeholder="أدخل فئة الخدمة"
            value={category}
            onChangeText={setCategory}
            editable={!isLoading}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>الموقع *</Text>
          <TextInput
            style={styles.input}
            placeholder="أدخل الموقع"
            value={location}
            onChangeText={setLocation}
            editable={!isLoading}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>السعر (اختياري)</Text>
          <TextInput
            style={styles.input}
            placeholder="أدخل السعر"
            value={price}
            onChangeText={setPrice}
            editable={!isLoading}
            keyboardType="decimal-pad"
          />
        </View>

        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleCreate}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>إنشاء الخدمة</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  form: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
  },
  textArea: {
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#667eea',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
