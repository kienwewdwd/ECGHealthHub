// Chatbox.js
import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from 'react-native';
import axios from 'axios';
import { COLORS, IMG_Save, IMG_Send, IMG_addChat, IMG_back, IMG_bot } from 'assets';
import { Image } from 'react-native';

// const apiKey = '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';

const Chatbox = () => {
  const [input, setInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [output, setOutput] = useState([]);
  const userMessage = message => ({ message, type: 'user' });
  const botMessage = message => ({ message, type: 'bot' });

  const handleSendMessage = async userInput => {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/engines/text-davinci-002/completions',
        {
          prompt: `Chủ đề: HealthCare ${userInput}`,
          max_tokens: 100
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data.choices[0].text;
    } catch (error) {
      console.error('Error:', error);
      return 'Error in processing the message.';
    }
  };

  const sendMessage = async () => {
    if (!input) return;

    const userMessageText = `User: ${input}`;
    const botResponse = await handleSendMessage(input);

    // Update the chat history with both user input and bot response
    setChatHistory([...chatHistory, userMessage(input), botMessage(botResponse)]);
    setInput('');
  };

  const clearChat = () => {
    setChatHistory([]);
    setOutput([]);
  };

  return (
    <View style={styles.container}>
      <View  style={styles.inputContainer1} >
        <Image source={IMG_bot}/>
      </View>
      <FlatList
        style={styles.chatOutput}
        data={chatHistory}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={{ alignItems: item.type === 'user' ? 'flex-end' : 'flex-start' }}>
            <Text style={item.type === 'user' ? styles.userMessage : styles.botMessage}>
              {item.message}
            </Text>
          </View>
        )}
      />
      <View>
        <View style={styles.inputContainer}>
          <TextInput
            value={input}
            onChangeText={setInput}
            style={styles.input}
            placeholder="Type a message"
          />
          <TouchableOpacity onPress={sendMessage}>
            <Image source={IMG_Send} style={styles.img} />
          </TouchableOpacity>
          <TouchableOpacity onPress={clearChat}>
          <Image source={IMG_addChat} style={styles.img1}/>
        </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Chatbox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between', // Place content at the bottom
    padding: 16,
    backgroundColor: COLORS.BackGround,
    borderRadius: 20,
    width: '100%',
    height: '100%'
  },
  chatOutput: {
    marginBottom: 16
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    width: '99%',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 16
    // padding: 16,
  },
  inputContainer1: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8
    // padding: 16,
  },

  img: {
    marginRight: 10
  },
  img1: {
    marginRight: 10,
    height: 40,
    width: 40
    // marginLeft: 10
  },
  img2: {
    marginLeft: 10,
    height: 34,
    width: 34,
    marginRight: 10,

    // marginLeft: 10
  },
  input: {
    flex: 1,
    marginRight: 10,
    marginLeft: 10
  },
  userMessage: {
    backgroundColor: COLORS.LightBlue,
    padding: 12,
    borderRadius: 10,
    alignSelf: 'flex-end',
    marginBottom: 16,
    marginTop: 16,

    color: 'white', // Text color
    fontSize: 16, // Text size
    fontWeight: 'bold', // Text weight
    fontFamily: 'Arial, sans-serif', // Font family
    boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)', // Box shadow
    border: '2px solid blue', // Border
    textAlign: 'right', // Text alignment
    opacity: 0.8 // Opacity (0 to 1)
  },
  botMessage: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 10,
    alignSelf: 'flex-start',
    // marginBottom: 16,
    color: 'black', // Text color
    fontSize: 16, // Text size
    fontWeight: 'bold', // Text weight
    fontFamily: 'Arial, sans-serif', // Font family
    boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)', // Box shadow
    border: '2px solid blue', // Border
    textAlign: 'left', // Text alignment
    opacity: 0.7 // Opacity (0 to 1)
  }
});
