import React from 'react';
import { StyleSheet, Alert, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/ui/Button';
import { auth } from '@/src/api/auth';
import { useUser } from '@/hooks/useUser';
import { ActivityIndicator } from 'react-native';

export default function ProfileScreen() {
    const { user, loading } = useUser();
    if (loading) {
        return (
          <ThemedView style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
          </ThemedView>
        );
      }
  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await auth.logout();
            router.replace('/login');
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedView style={styles.avatarContainer}>
          <Ionicons name="person-circle-outline" size={80} color="#007AFF" />
        </ThemedView>
        <ThemedText style={styles.name}>{user?.name}</ThemedText>
        <ThemedText style={styles.email}>{user?.email}</ThemedText>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>My Information</ThemedText>
        <ThemedView style={styles.infoItem}>
          <Ionicons name="business-outline" size={24} color="#666" />
          <ThemedView style={styles.infoContent}>
          <ThemedText style={styles.infoLabel}>Condominium</ThemedText>
          <ThemedText style={styles.infoValue}>{user?.condominium}</ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.infoItem}>
          <Ionicons name="calendar-outline" size={24} color="#666" />
          <ThemedView style={styles.infoContent}>
            <ThemedText style={styles.infoLabel}>Member Since</ThemedText>
            <ThemedText style={styles.infoValue}>January 2024</ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Account Settings</ThemedText>
        <Button 
          title="Edit Profile"
          onPress={() => {}}
          icon={<Ionicons name="create-outline" size={20} color="#fff" />}
          style={styles.button}
        />
        <Button 
          title="Change Password"
          onPress={() => {}}
          icon={<Ionicons name="lock-closed-outline" size={20} color="#fff" />}
          style={styles.button}
        />
      </ThemedView>

      <ThemedView style={[styles.section, styles.lastSection]}>
        <Button 
          title="Logout"
          onPress={handleLogout}
          variant="destructive"
          icon={<Ionicons name="log-out-outline" size={20} color="#fff" />}
        />
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    margin: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lastSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoContent: {
    marginLeft: 12,
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  button: {
    marginBottom: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
});