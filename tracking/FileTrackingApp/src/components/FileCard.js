import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../styles/globalStyles';

const FileCard = ({ file, onEdit }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return colors.warning;
      case 'received': return colors.primary;
      case 'completed': return colors.secondary;
      default: return colors.gray;
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onEdit}>
      <View style={styles.header}>
        <Text style={styles.fileName}>{file.fileName}</Text>
        <View style={[styles.badge, { backgroundColor: getStatusColor(file.status) }]}>
          <Text style={styles.badgeText}>{file.status.toUpperCase()}</Text>
        </View>
      </View>

      <Text style={styles.description}>{file.description}</Text>

      <View style={styles.row}>
        <Text style={styles.label}>From: </Text>
        <Text style={styles.value}>{file.uploadedByName}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>To: </Text>
        <Text style={styles.value}>{file.recipientName}</Text>
      </View>

      <Text style={styles.date}>{file.createdAt}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 15,
    elevation: 3,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  fileName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
    flex: 1,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  badgeText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    marginVertical: 3,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.black,
  },
  value: {
    fontSize: 14,
    color: colors.gray,
  },
  date: {
    fontSize: 12,
    color: colors.gray,
    marginTop: 10,
  },
});

export default FileCard;