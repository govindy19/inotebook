import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "https://inotebook-38hk.onrender.com"
  const notesInitial = []
  const [notes,setNotes]= useState(notesInitial)
   //Get all notes
   const getNotes = async () =>{
    //API calls
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method : "GET",
        headers : {
            'Content-Type': 'application/json',
            "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY0NTkxZDc1YzE4NmU3YTI3NDIyZjcwIn0sImlhdCI6MTcxNTg0NTMyN30.rZgRPWQFpezNjC7JWzNRM8HV1XPuOjXYyW5YBnxN1_o"
            
        }
    });
    const json =await response.json();
    console.log(json);
    setNotes(json)
   }
   
     
  

  //Add a Note
  const addNote =async (title, description, tag) => {
    //API call

    const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY0NTkxZDc1YzE4NmU3YTI3NDIyZjcwIn0sImlhdCI6MTcxNTg0NTMyN30.rZgRPWQFpezNjC7JWzNRM8HV1XPuOjXYyW5YBnxN1_o",
        },
        body: JSON.stringify({title,description,tag})
      });
     const note = await response.json();
     setNotes(notes.concat(note));
  };

  //Delete a Note

  const deleteNote = async (id) => {
    //API call to delete
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        header: {
          "Content-Type": "application/json",
          "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY0NTkxZDc1YzE4NmU3YTI3NDIyZjcwIn0sImlhdCI6MTcxNTg0NTMyN30.rZgRPWQFpezNjC7JWzNRM8HV1XPuOjXYyW5YBnxN1_o"
            
        }
        
      });
      const json = response.json();
      

    
    const newNotes = notes.filter((note) => {
      return note._id != id;
    });
    setNotes(newNotes);
  };
  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      header: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY0NTkxZDc1YzE4NmU3YTI3NDIyZjcwIn0sImlhdCI6MTcxNTg0NTMyN30.rZgRPWQFpezNjC7JWzNRM8HV1XPuOjXYyW5YBnxN1_o",
      },
      body: JSON.stringify({title,description,tag})
    });
    const json =  await response.json();
    

    let newNotes = JSON.parse(JSON.stringify(notes))

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
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
