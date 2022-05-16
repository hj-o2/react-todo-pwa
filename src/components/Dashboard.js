import { useContext, useEffect, useState } from "react";
import dig from "object-dig";
import * as Api from "../service/api";
import { signInWithGoogle } from "../service/firebase";
import { AuthContext } from "../providers/AuthProvider";
import ToDoList from "./TodoList";

const Dashboard = () => {
  const currentUser = useContext(AuthContext);
  const [inputName, setInputName] = useState("");
  const [todos, seTtodos] = useState([]);
  // console.log(inputName);
  console.log(todos);

  useEffect(() => {
    // Todoの一覧を取得
    dig(currentUser, "currentUser", "uid") ? fetch() : undefined;
  }, [currentUser]);

  const fetch = async () => {
    const date = await Api.initGet(currentUser.currentUser.uid);
    await seTtodos(date);
  };

  const formRender = () => {
    let dom;
    dig(currentUser, "currentUser", "uid")
      ? (dom = (
          <form>
            <input
              placeholder="ToDoName"
              value={inputName}
              onChange={(e) => setInputName(e.currentTarget.value)}
            />
            <button type="button" onClick={() => post()}>
              追加
            </button>
          </form>
        ))
      : (dom = <button onClick={signInWithGoogle}>ログイン</button>);
    return dom;
  };
  const post = async () => {
    await Api.addTodo(inputName, currentUser.currentUser.uid);
    await setInputName("");
    fetch();
  };

  return (
    <div>
      {formRender()}
      <ToDoList todos={todos} fetch={fetch} />
    </div>
  );
};

export default Dashboard;
