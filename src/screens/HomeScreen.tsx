import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  Image,
} from 'react-native';
import { useServices } from '../hooks/useServices';
import { useAuth } from '../hooks/useAuth';

export default function HomeScreen({ navigation }: any) {
  const { filteredServices, isLoading, error, fetchServices } = useServices();
  const { user } = useAuth();
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchServices();
    setRefreshing(false);
  };

  const renderServiceCard = ({ item }: any) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ServiceDetails', { serviceId: item.id })}
    >
      {item.images && item.images[0] && (
        <Image
          source={{ uri: item.images[0] }}
          style={styles.cardImage}
        />
      )}
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.cardCategory}>{item.category}</Text>
        <View style={styles.cardFooter}>
          <Text style={styles.cardProvider}>{item.provider?.name}</Text>
          {item.rating && (
            <Text style={styles.cardRating}>⭐ {item.rating}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  if (isLoading && filteredServices.length === 0) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#667eea" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>❌ {error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={handleRefresh}
          >
            <Text style={styles.retryButtonText}>إعادة محاولة</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>مرحباً، {user?.name}</Text>
        <Text style={styles.subGreeting}>استكشف الخدمات المتاحة</Text>
      </View>

      {filteredServices.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>لا توجد خدمات متاحة</Text>
        </View>
      ) : (
        <FlatList
          data={filteredServices}
          renderItem={renderServiceCard}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor="#667eea"
            />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#667eea',
    padding: 20,
    paddingTop: 10,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  subGreeting: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  list: {
    padding: 10,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 5,
    marginVertical: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 120,
    backgroundColor: '#eee',
  },
  cardContent: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  cardCategory: {
    fontSize: 12,
    color: '#667eea',
    marginBottom: 8,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardProvider: {
    fontSize: 12,
    color: '#666',
  },
  cardRating: {
    fontSize: 12,
    color: '#ffa500',
  },
  errorBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#c33',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#667eea',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: '#999',
  },
});
