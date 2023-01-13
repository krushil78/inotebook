import React, { useContext, useEffect , useState, useRef} from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const context = useContext(noteContext);
  // eslint-disable-next-line
  let navigate = useNavigate();
  const { notes, getNote ,editNote} = context;
  useEffect(() => {
    if(localStorage.getItem('authToken')){

      getNote();
    }
    else {
      navigate("/login");
    }
   
   
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({ id :'',etitle: "", edescription: "", etag:"" })
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id, etitle: currentNote.title , edescription: currentNote.description, etag:currentNote.tag });
    
  };
  const handleClick = (e)=>{
    console.log("updating the note",note)
    editNote(note.id, note.etitle, note.edescription, note.etag)
    refClose.current.click();
    props.showAlert("Updated succsesfully", "success");
   

}
const onChange = (e)=>{
 setNote ({...note, [e.target.name]: e.target.value})
}
  return (
    <>
      <AddNote  showAlert={props.showAlert}/>

      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className=" btn-Close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Title</label>
                  <input
                    type="etext"
                    className="form-control"
                    id="etitle"
                    value={note.etitle}
                    name="etitle"
                    aria-describedby="title"
                    placeholder="Enter the title"
                    onChange={onChange}
                    minLength={5} required

                  />
                </div>
                <div className="form-group">
                  <label htmlFor="edescription">description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    value={note.edescription}
                    name="edescription"
                    placeholder="Enter the description"
                    onChange={onChange}
                    minLength={5} required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="etag">tag</label>
                  <input
                    type="text"
                    className="form-control"
                    value={note.etag}
                    id="etag"
                    name="etag"
                    placeholder="Enter the tag"
                    onChange={onChange}

                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
              ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button disabled = {note.etitle.length<5 || note.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">
                Update note
              </button>
            </div>
          </div>
        </div>
      </div>
 <div className="container my-3">
           <h2>Your Notes</h2>
        <div className="container">
        {notes.length === 0  && 'no notes to display'}
        </div>
         <div className="row my-3">
          {notes.map((note) => {
            return (
              <NoteItem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Notes;
