const noteCtrl = {};

const Note = require('../models/Note');

noteCtrl.getNote = async(req, res) => {
    const note = await Note.findById(req.params.id);
    res.json(note);
}

noteCtrl.getNotes = async (req, res) => {
    const notes = await Note.find();
    res.json(notes);
};

noteCtrl.createNote = async(req, res) => {
    const { title, content, date, author } = req.body;
    const newNote = new Note({
        title,
        content,
        date,
        author
    });
    await newNote.save();
    res.json({message: 'Note saved'});
};


noteCtrl.updateNote = async(req, res) => {
    const { title, content, author} = req.body
    await Note.findOneAndUpdate(req.content.id, {
        title,
        content,
        author
    });
    res.json({message: 'Note updated'});
}

noteCtrl.deleteNote = async(req, res) =>{
    const ID = req.params.id
    await Note.findByIdAndDelete(ID);
    res.json('Delete note');
};

module.exports = noteCtrl;