const form = {}
form.noteText = document.querySelector('#formNoteText');
form.addButton = document.querySelector('#formAddButton');
form.color = document.querySelector('#formColor');

const notes = document.querySelector('#notes');

class NotePocket{
  addNote = () => {
    let text = form.noteText.value;
    let note = document.createElement('div');
    let deleteButton = document.createElement('span');

    note.classList.add('note');
    note.classList.add(form.color.value);
    note.innerHTML = `<div class='note-text'>${text}</div>`;
    deleteButton.classList.add('note-delete');
    deleteButton.innerHTML = '&times;';

    note.appendChild(deleteButton);  
    notes.appendChild(note);

    form.noteText.value = '';
    form.noteText.focus();

    let that = this;
    deleteButton.addEventListener('click', function (e) {
      e.stopPropagation();      
      that.deleteNote(e);
    });
  };

   deleteNote = function(e){
    let eventNote = e.target.parentNode;
    eventNote.parentNode.removeChild(eventNote);
  }

}
 let NotePocketCl = new NotePocket();
// Event Listeners
form.addButton.addEventListener('click', function (e) {
  e.preventDefault();  
  if (form.noteText.value != '') {
    NotePocketCl.addNote();
  }
})