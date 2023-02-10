let addBtn = document.querySelector("#add");
let box = document.querySelector(".box");

let updateLSData = () => {
  let textAreaData = document.querySelectorAll("textarea");
  let notes = [];
  console.log(textAreaData);
  textAreaData.forEach((note) => {
    return notes.push(note.value);
  });
  console.log(notes);

  localStorage.setItem("notes", JSON.stringify(notes));
};

const addNewNote = (text = "") => {
  const note = document.createElement("div");
  note.classList.add("note");

  const htmlData = `
    <div class="operation">
        <button class="edit"><i id="edit" class="fa-solid fa-pen-to-square"></i></button>
        <button class="delete"><i id="delete" class="fa-solid fa-trash-can"></i></button>
    </div>
    <div class="main ${text ? "" : "hidden"}"> </div>
    <textarea class="${text ? "hidden" : ""}"></textarea>`;

  note.insertAdjacentHTML("afterbegin", htmlData);
  console.log(note);

  box.appendChild(note);
  // it appends a node as te last child of a node

  // getting the reference
  const editBtn = note.querySelector(".edit");
  const delBtn = note.querySelector(".delete");
  const mainDiv = note.querySelector(".main");
  const textArea = note.querySelector("textarea");

  // deleting the note
  delBtn.addEventListener("click", () => {
    note.remove();
  });

  // toggle using edit button
  // textArea.value = text;
  // mainDiv.innerHTML = text;

  editBtn.addEventListener("click", () => {
    mainDiv.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
  });

  textArea.addEventListener("change", () => {
    const value = event.target.value;
    mainDiv.innerHTML = value;
    // console.log(value);

    updateLSData();
  });
};

const notes = JSON.parse(localStorage.getItem("notes"));
if (notes) {
  notes.forEach((note) => addNewNote(note));
}

addBtn.addEventListener("click", () => addNewNote());
