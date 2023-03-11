import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Card, Button } from "react-native-elements";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { setCookie, getCookie } from "react-native-cookies";

firebase.initializeApp({
  apiKey: "AIzaSyC0sMRX45i5l_ssMHdZ5n6DFHONCriiykY",
  authDomain: "joke-app-9afcd.firebaseapp.com",
  databaseURL:
    "https://joke-app-9afcd-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "joke-app-9afcd",
  storageBucket: "joke-app-9afcd.appspot.com",
  messagingSenderId: "419946438288",
  appId: "1:419946438288:web:494e626e4cbe72fa4c8215",
});

const db = firebase.firestore();

const jokes = [
  {
    id: 1,
    text: `A child asked his father, "How were people born?" So his father said, "Adam and Eve made babies, then their babies became adults and made babies, and so on."

    The child then went to his mother, asked her the same question and she told him, "We were monkeys then we evolved to become like we are now."
    
    The child ran back to his father and said, "You lied to me!" His father replied, "No, your mom was talking about her side of the family."`,
    funny: 0,
    notfunny: 0,
  },
  {
    id: 2,
    text: `Teacher: "Kids,what does the chicken give you?" Student: "Meat!" Teacher: "Very good! Now what does the pig give you?" Student: "Bacon!" Teacher: "Great! And what does the fat cow give you?" Student: "Homework!"`,
    funny: 0,
    notfunny: 0,
  },
  {
    id: 3,
    text: `The teacher asked Jimmy, "Why is your cat at school today Jimmy?" Jimmy replied crying, "Because I heard my daddy tell my mommy, 'I am going to eat that pussy once Jimmy leaves for school today!'"
    `,
    funny: 0,
    notfunny: 0,
  },
  {
    id: 4,
    text: `A housewife, an accountant and a lawyer were asked "How much is 2+2?" The housewife replies: "Four!". The accountant says: "I think it's either 3 or 4. Let me run those figures through my spreadsheet one more time." The lawyer pulls the drapes, dims the lights and asks in a hushed voice, "How much do you want it to be?"`,
    funny: 0,
    notfunny: 0,
  },
];

export default function App() {
  const [currentJokeIndex, setCurrentJokeIndex] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    // check if user has voted for the current joke
    getCookie(`joke${currentJokeIndex}voted`)
      .then((cookie) => {
        if (cookie && cookie === "true") {
          setHasVoted(true);
        }
      })
      .catch((error) => console.log(error));
  }, [currentJokeIndex]);

  const handleVote = (vote) => {
    if (!hasVoted) {
      // record the vote in firebase
      firebase
        .database()
        .ref(`jokes/${currentJokeIndex}/${vote}`)
        .transaction((currentVotes) => {
          return currentVotes + 1;
        });

      // set cookie to track that the user has voted for this joke
      setCookie(`joke${currentJokeIndex}voted`, "true");

      // set hasVoted to true to disable voting buttons
      setHasVoted(true);
    }
  };

  const handleNextJoke = () => {
    if (currentJokeIndex < jokes.length - 1) {
      setCurrentJokeIndex(currentJokeIndex + 1);
      setHasVoted(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.image}>
        <Image
          style={{
            width: "20%",
            height: 60,
          }}
          source={require("./assets/Logo.png")}
        />
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Image
            style={{ alignSelf: "flex-end", height: 50 }}
            source={require("./assets/Leftlogo.png")}
          />
        </View>
      </View>
      <View style={styles.titleTop}>
        <Text style={[styles.textTop, { fontSize: 22 }]}>
          A joke a day keeps the doctor away
        </Text>
        <Text style={[styles.textTop, { fontSize: 14 }]}>
          If you joke the wrong way, your teeth have to pay.(Serious)
        </Text>
      </View>
      <Text style={styles.jokeContainer}>{jokes[currentJokeIndex]}</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          width: "60%",
        }}
      >
        <Button
          title="This is funny"
          disabled={hasVoted}
          onPress={() => handleVote("funny")}
        />
        <Button
          title="This is not funny"
          disabled={hasVoted}
          onPress={() => handleVote("notfunny")}
        />
      </View>
      <View style={styles.bottomText}>
        <Text style={{ color: "gray", textAlign: "center" }}>
          This app is created as part of Hlsolution program. The materials
          contained on this website are provided for general infomartion only
          and do not constitute any form of advice. HLS assumes no
          responsibility for the accuracy of any particular statement and
          accepts no liability for any loss or damage which may arise from
          reliance onn the infomartion contained on this site
        </Text>
        <Text style={{ marginTop: 10 }}>Copyright 2021 HLS</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleTop: {
    marginTop: 70,
    backgroundColor: "#49b35f",
    height: "20%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    rowGap: 20,
  },
  jokeContainer: {
    paddingHorizontal: 30,
    paddingTop: 50,
    minHeight: 400,
  },
  textTop: {
    color: "white",
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    minWidth: 130,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    resizeMode: "contain",
    marginTop: 40,
    flexDirection: "row",
    marginBottom: 20,
  },
  bottomText: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#e1e5e8",
    paddingTop: 5,
    paddingHorizontal: 20,
    marginTop: 30,
  },
});
