import React from 'react';
import { View, Text, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to the Disaster Mail Relay App!</Text>
      <Button
        title="Send Message"
        onPress={() => navigation.navigate('Sender')}
      />
      <Button
        title="Receive Message"
        onPress={() => navigation.navigate('Recipient')}
      />
    </View>
  );
};

export default HomeScreen;