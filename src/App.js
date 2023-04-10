import React from "react";
import "./styles.css";
import Header from "./components/Header";
import Alert from "./components/Alert";
import Input from "./components/Input";
import List from "./components/List";
// import Footer from "./components/Footer";

export default function App() {
  const [listItems, setList] = React.useState(
    JSON.parse(localStorage.getItem("listItem")) || []
  );
  const [done, setDone] = React.useState(
    JSON.parse(localStorage.getItem("done")) || {
      isDone: false,
      id: undefined
    }
  );
  const [editId, setEditId] = React.useState(null);
  const [editList, setEditList] = React.useState(null);
  const [alert, setAlert] = React.useState({
    msg: "",
    type: ""
  });
  function add(inputText) {
    if (inputText !== "") {
      displayAlert("item added", "success");
      setList((prevState) => {
        return [...prevState, inputText];
      });
    } else {
      displayAlert("Text field cannot be empty", "error");
    }
  }

  function updateList(updatedText) {
    const index = editId;
    const newArr = [...listItems];
    if (updatedText) {
      newArr.splice(index, 1, updatedText);
      setList(newArr);
      displayAlert("Item updated", "success");
    } else {
      displayAlert("Text field cannot be empty", "error");
    }
    setEditList(null);
  }
  function submit(event, inputText, setInputText) {
    if (event.key === "Enter") {
      add(inputText);
      setInputText("");
      setEditList(null);
    }
  }

  // edit list
  function editItems(id) {
    if (done.id !== editId) {
      setEditList(listItems[id]);
      setEditId(id);
    } else {
      displayAlert("Cannot change completed events", "error");
    }
  }

  function deleteList(id) {
    handleDone(id);
    // done(id);
    setList((prevState) => {
      return prevState.filter((item, index) => {
        return id !== index;
      });
    });
    displayAlert("Item removed", "error");
  }

  function handleDone(id) {
    setDone({
      isDone: !done.isDone,
      id: id
    });
  }

  function displayAlert(msg = "", type = "") {
    setAlert({ msg, type });
  }

  React.useEffect(() => {
    localStorage.setItem("listItem", JSON.stringify(listItems));
    localStorage.setItem("done", JSON.stringify(done));
  }, [listItems, done]);

  React.useEffect(() => {
    const { isDone, id } = done;
    const liEls = document.querySelectorAll("li");
    const liEl = liEls[id];

    if (liEl) {
      if (isDone) {
        liEl.style.textDecoration = "line-through";
      } else {
        liEl.style.textDecoration = "none";
      }
    }
  }, [done]);

  return (
    <div className="App">
      <Header />
      <Alert {...alert} showAlert={displayAlert} listItems={listItems} />
      <Input
        addItem={add}
        submit={submit}
        editList={editList}
        updateList={updateList}
      />
      <ul className="list">
        {listItems.map((item, index) => {
          return (
            <List
              key={index}
              done={done}
              handleDone={handleDone}
              id={index}
              listItem={item}
              edit={editItems}
              onDelete={deleteList}
            />
          );
        })}
      </ul>
      {listItems.length > 0 && (
        <p
          className="clear-list"
          onClick={() => {
            setList([]);
            setAlert({
              msg: "No items to show",
              type: "error"
            });
          }}
        >
          Clear All
        </p>
      )}
      {/* <Footer /> */}
    </div>
  );
}
