/*
* Pobranie elementów ze strony
*/
const form = {}
form.noteText = document.querySelector('#formNoteText');
form.addButton = document.querySelector('#formAddButton');
form.color = document.querySelector('#formColor');
const notes = document.querySelector('#notes');


/*
* Klasa do tworzenia notatek
*/

class NotePocket{

  /*
  * Metoda do tworzenia notatki
  */
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

    //trick z this
    let that = this;
    /*
    * Listener do usuwania notatki
    */
    deleteButton.addEventListener('click', function (e) {
      e.stopPropagation();      
      that.deleteNote(e);
    });
  };
  /*
  * Metoda służąca do usuwania notatek
  */
   deleteNote = function(e){
    let eventNote = e.target.parentNode;
    eventNote.parentNode.removeChild(eventNote);
  }

}

// Deklaracja naszego obiektu NotePocket
let NotePocketCl = new NotePocket();

//Dodanie notatki za pomocą przycisku na stronie
form.addButton.addEventListener('click', function (e) {
  e.preventDefault();  
  if (form.noteText.value != '') {
    NotePocketCl.addNote();
  }
})