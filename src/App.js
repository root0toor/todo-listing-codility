import cx from "classnames";
import { Component, useEffect, useState } from "react";

const inputContainer = cx("div", {
  display: "flex"
});

const ChildElement = () => {
  const [inputData, setInputData] = useState("");
  const [listData, setListData] = useState([]);
  const [strikeThrough, setStrikeThrough] = useState({});
  const onChange = (e) => {
    setInputData(e.target.value);
  };
  const addElement = () => {
    if (inputData) setListData([...listData, inputData]);
  };
  const toggleElement = (index) => {
    const temp = JSON.parse(JSON.stringify(strikeThrough));
    temp[index] = !temp[index];
    setStrikeThrough(temp);
  };
  useEffect(() => {
    setInputData("");
  }, [listData]);
  return (
    <>
      <div className={inputContainer}>
        <input type="text" value={inputData} onChange={onChange} />
        <button onClick={addElement}>Add</button>
      </div>
      <div className="task-counter">
        {listData.reduce((res, elem, index) => {
          return !strikeThrough[index] ? (res += 1) : res;
        }, 0)}{" "}
        remaining out of {listData.length} tasks
      </div>
      <ul>
        {listData.map((elem, index) => {
          return (
            <li
              key={"idx" + index}
              className={strikeThrough[index] ? "is-done" : ""}
              onClick={() => {
                toggleElement(index);
              }}
            >
              {elem}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default class TodoList extends Component {
  render() {
    return (
      <>
        <div>
          <h2>Todo Listing</h2>
        </div>
        <style>{`
                    .is-done {
                        text-decoration: line-through;
                    }
                `}</style>
        <ChildElement />
      </>
    );
  }
}
