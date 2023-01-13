const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Notes = require("../Modals/Notes")
const { body, validationResult } = require("express-validator");


//all route 1 get all the notes using get "api/auth/getuser" login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });

    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal server error");
  }
});
//all route 2 get all the notes using get "api/auth/addnote" login required
// bug is three we solve it leter
router.post("/addnote",fetchuser,[
    body("title", "Enter a valid  name").isLength({ min: 3 }),
    body("description", "despcription must be atlist 6 charachater").isLength({min: 6,}),
 ],async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savednote = await note.save();

      res.json(savednote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error2");
    }
  }
);

// route 3 update the data post updatenote
router.put("/updatenote/:id", fetchuser , 
async (req, res) => {
  const { title, description, tag } = req.body;
  const newNote ={};
  if (title){newNote.title = title};
  if (description){newNote.description = description};
  if (tag){newNote.tag = tag};


  //  route  find the note to be update
 let note = await Notes.findById(req.params.id);
  if(!note){return res.status(404).send("Not found")}
  if(note.user.toString() !== req.user.id) {
    return res.status(404).send("Not Allowed")
 }
   note = await Notes.findByIdAndUpdate(req.params.id , {$set: newNote},{new:true})
   res.json({note});

});
// route 4  delete an existing note Using DELET login require
router.delete("/deletenote/:id", fetchuser , async (req, res) => {

  //const { title, description, tag } = req.body;
  try {
  //  route  find the note to be update
 let note = await Notes.findById(req.params.id);
  if(!note){return res.status(404).send("Not found")}
  //allow deletion only if user delete it
  if(note.user.toString() !== req.user.id) {
    return res.status(404).send("Not Allowed")
 }
   note = await Notes.findByIdAndDelete(req.params.id )
   res.json({"succese":"note has been deleted", note: note});


    
   } catch (error)  {
    console.error(error.message);
    res.status(500).send("internal server error2");
  }
});

module.exports = router;
