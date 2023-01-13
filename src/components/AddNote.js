import React , {useContext, useState}  from 'react'
import noteContext from '../context/notes/noteContext';


const AddNote = (props) => {
    const context = useContext(noteContext);
    const{ addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag:"" })

    const handleClick = (e)=>{
        e.preventDefault();
     addNote(note.title, note.description , note.tag);
     setNote( {title: "", description: "", tag:"" })
     props.showAlert("Added succsesfully", "success");

    }
    const onChange = (e)=>{
     setNote ({...note, [e.target.name]: e.target.value})
    }
  return (
    <div><div className='container my-3'>
    <h2> Add a Note</h2>
    <form className='my-3'>
   <div className="form-group">
     <label htmlFor="exampleInputEmail1">Title</label>
     <input type="text" className="form-control" id="title" name="title"  aria-describedby="title" placeholder="Enter the title" value ={note.title} onChange={onChange} minLength={5} required/>
     
   </div>
   <div className="form-group">
     <label htmlFor="description">description</label>
     <input type="text" className="form-control" id="description" name="description" placeholder="Enter the description" value ={note.description} onChange={onChange} minLength={5} required/>
   </div>
   <div className="form-group">
     <label htmlFor="tag">tag</label>
     <input type="text" className="form-control" id="tag" name="tag" placeholder="Enter the tag" value ={note.tag} onChange={onChange} minLength={5} required/>
   </div>

   <button disabled = {note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>add note</button>
 </form>                                                                        
 </div></div>
  )

  }
export default AddNote