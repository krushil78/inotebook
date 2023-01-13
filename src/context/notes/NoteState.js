import React from "react";
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000/";
  const notesInitial = [ ];

  const [notes, setNotes] = useState(notesInitial);

  // get all a note
  const getNote =  async () => {
   // eslint-disable-next-line
    const response = await fetch(`${host}api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('authToken'),
         },
        });
     const json = await response.json()
    setNotes(json)
   
    // add
  
  };
  const addNote =  async ( title, description, tag) => {
   // eslint-disable-next-line
    const response = await fetch(`${host}api/notes/addnote`,{
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('authToken'),
          
        },

        body: JSON.stringify({title, description, tag}),
      }

    );
    const note= await response.json();
    setNotes(notes.concat(note));
  
  
  };
  // delete a note
  const deleteNote = async (id) => {
    const response = await fetch(
      `${host}api/notes/deletenote/${id}`,
      {
        method: "DELETE",

        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('authToken'),
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },

       
      }
    );
    // eslint-disable-next-line
    const json = response.json();

    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });

    setNotes(newNotes);
  };
 
 
   

  //  edit a note
  const editNote = async (id, title, description, tag) => {
    // api call
    const response = await fetch(
      `${host}api/notes/updatenote/${id}`,
      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('authToken'),
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },

        body: JSON.stringify({title, description, tag}),
      }
    );
     // eslint-disable-next-line
    const json =  await response.json();
   
    let newNotes =JSON.parse(JSON.stringify(notes))
    // logic to edit call
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
       break;
       
    
      }
      
      
    }
    setNotes(newNotes);
   
  };

  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, editNote, getNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
