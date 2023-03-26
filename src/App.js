import logo from './logo.svg';
import React, {useState, useEffect} from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import Navbar from "./components/Navbar";
import NoteAdd from "./components/NoteAdd";
import Notebook from "./components/Notebook";
import './App.css';

const firebaseConfig = {
  apiKey: "AIzaSyAWSc8mc3wsIlme2hSBqQ8Jo2nyCgMMDOE",
  authDomain: "ipwt-da-app.firebaseapp.com",
  projectId: "ipwt-da-app",
  storageBucket: "ipwt-da-app.appspot.com",
  messagingSenderId: "640087970679",
  appId: "1:640087970679:web:f875f8e000611a65afc772",
  measurementId: "G-5DX4H9WF19"
};
firebase.initializeApp(firebaseConfig);

const App = () => {
  const [noteBookData, setNoteBookData] = useState([]);

  const updateNotes = () => {
    firebase
      .database()
      .ref("notebook")
      .on("child_added", (snapshot) => {
        let note = {
          id: snapshot.key,
          title: snapshot.val().title,
          description: snapshot.val().description,
        };
        let notebook = noteBookData;
        notebook.push(note);
        setNoteBookData([...noteBookData]);
      });

    firebase
      .database()
      .ref("notebook")
      .on("child_removed", (snapshot) => {
        let notebook = noteBookData;
        notebook = noteBookData.filter((note) => note.id !== snapshot.key);
        setNoteBookData(notebook);
      });
  };

  useEffect(() => {
    updateNotes();
  }, []);

  return (
    <div className="app">
      <Navbar />
      <div className="note-section">
        <NoteAdd />
        <Notebook notebook={noteBookData} />
      </div>
    </div>
  );
};

export default App;
