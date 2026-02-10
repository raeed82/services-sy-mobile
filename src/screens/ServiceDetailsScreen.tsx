import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useServices } from '../hooks/useServices';

export default function ServiceDetailsScreen({ route, navigation }: any) {
  const { serviceId } = route.params;
  const { selectedService, isLoading, getServiceDetails } = useServices();

  useEffect(() => {
    getServiceDetails(serviceId);
  }, [serviceId]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#667eea" />
      </View>
    );
  }

  if (!selectedService) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>لم يتم العثور على الخدمة</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {selectedService.images && selectedService.images[0] && (
        <Image
          source={{ uri: selectedService.images[0] }}
          style={styles.headerImage}
        />
      )}

      <View style={styles.content}>
        <Text style={styles.title}>{selectedService.title}</Text>
        
        <View style={styles.providerCard}>
          <View>
            <Text style={styles.providerName}>{selectedService.provider?.name}</Text>
            <Text style={styles.providerRole}>مقدم الخدمة</Text>
          </View>
          {selectedService.provider?.avatar && (
            <Image
              source={{ uri: selectedService.provider.avatar }}
              style={styles.providerAvatar}
            />
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>الوصف</Text>
          <Text style={styles.description}>{selectedService.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>التفاصيل</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>الفئة:</Text>
            <Text style={styles.detailValue}>{selectedService.category}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>الموقع:</Text>
            <Text style={styles.detailValue}>{selectedService.location}</Text>
          </View>
          {selectedService.price && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>السعر:</Text>
              <Text style={styles.detailValue}>{selectedService.price} ل.س</Text>
            </View>
          )}
        </View>

        {selectedService.rating && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>التقييم</Text>
            <View style={styles.ratingRow}>
              <Text style={styles.rating}>⭐ {selectedService.rating}</Text>
              <Text style={styles.reviews}>
                ({selectedService.reviews || 0} تقييم)
              </Text>
            </View>
          </View>
        )}

        <TouchableOpacity style={styles.contactButton}>
          <Text style={styles.contactButtonText}>التواصل مع المقدم</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.favoriteButton}>
          <Text style={styles.favoriteButtonText}>❤️ إضافة للمفضلة</Text>
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
  headerImage: {
    width: '100%',
    height: 250,
    backgroundColor: '#eee',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  providerCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  providerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  providerRole: {
    fontSize: 12,
    color: '#666',
  },
  providerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#eee',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffa500',
    marginRight: 10,
  },
  reviews: {
    fontSize: 14,
    color: '#666',
  },
  contactButton: {
    backgroundColor: '#667eea',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginBottom: 10,
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  favoriteButton: {
    borderWidth: 1,
    borderColor: '#667eea',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginBottom: 20,
  },
  favoriteButtonText: {
    color: '#667eea',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 16,
    color: '#c33',
    textAlign: 'center',
  },
});
