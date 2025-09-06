// アプリケーション全体の構造と動作を統括するルートコンポーネントまたはメインコンポーネントとして機能
import { useState } from "react"; // Reactの状態管理フックを使う

// Todo の型定義（TypeScript）
// 1つのタスクが「id」「text」「completed（完了かどうか）」を持つ
type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

function App() {
  // todos: 現在のタスク一覧
  // setTodos: タスク一覧を更新する関数
  const [todos, setTodos] = useState<Todo[]>([]);

  // input: 入力フォームに入力されている文字列
  // setInput: 入力内容を更新する関数
  const [input, setInput] = useState("");

  // editingId: 編集中のタスクのID（編集していない時は null）
  // editText: 編集中のタスクに表示する文字列
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  // ---------------------------
  // C: Create（タスクを追加）
  // ---------------------------
  const addTodo = () => {
    if (!input.trim()) return; // 空文字なら追加しない
    const newTodo: Todo = {
      id: Date.now(), // 一意のID（現在時刻を使う）
      text: input,
      completed: false,
    };
    setTodos([...todos, newTodo]); // 新しいタスクを追加して更新
    setInput(""); // 入力フォームを空に戻す
  };

  // ---------------------------
  // U: Update（完了状態を切り替え）
  // ---------------------------
  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // U: Update（編集モード開始）
  const startEditing = (id: number, currentText: string) => {
    setEditingId(id); // 編集中のタスクIDを記録
    setEditText(currentText); // 今のテキストを編集欄にセット
  };

  // U: Update（編集を保存）
  const saveEdit = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: editText } : todo
      )
    );
    setEditingId(null); // 編集モード解除
    setEditText(""); // 編集用テキストをリセット
  };

  // ---------------------------
  // D: Delete（削除）
  // ---------------------------
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // ---------------------------
  // JSX（画面に描画される部分）
  // ---------------------------
  return (
    // アプリ全体を中央寄せするためのコンテナ
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",   // ← 画面全幅を指定
        height: "100vh",  // ← 画面全高を指定
        margin: 0,        // ← 余白を消す
        fontFamily: "sans-serif",
        background: "#f5f5f5",
      }}
    >
      {/* 白いカード風のボックス */}
      <div
        style={{
          maxWidth: 400,
          width: "100%",
          background: "white",
          padding: "1.5rem",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        {/* ここがブラウザに「大文字で表示されるタイトル」部分 */}
        <h1 style={{ marginBottom: "1rem" }}>Todo App3</h1>

        {/* 入力フォーム（新しいタスクを追加する欄） */}
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <input
            type="text"
            value={input} // 入力内容を state で管理
            onChange={(e) => setInput(e.target.value)} // 入力内容を更新
            placeholder="タスクを入力"
            style={{ flex: 1, padding: "0.5rem" }}
          />
          <button
            onClick={addTodo} // ボタンを押すと addTodo が実行される
            style={{
              padding: "0.5rem 1rem",
              background: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            追加
          </button>
        </div>

        {/* Todoリスト部分 */}
        <ul style={{ marginTop: "1rem", textAlign: "left", padding: 0 }}>
          {todos.map((todo) => (
            <li
              key={todo.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "0.5rem",
              }}
            >
              <div style={{ flex: 1 }}>
                {/* 完了チェックボックス */}
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  style={{ marginRight: "0.5rem" }}
                />

                {/* 編集モード中かどうかで表示を切り替える */}
                {editingId === todo.id ? (
                  <>
                    {/* 編集用のテキストボックス */}
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      style={{ padding: "0.25rem", flex: 1 }}
                    />
                    <button
                      onClick={() => saveEdit(todo.id)}
                      style={{
                        marginLeft: "0.5rem",
                        padding: "0.25rem 0.5rem",
                        background: "green",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      保存
                    </button>
                  </>
                ) : (
                  // 編集していないときはタスクのテキストを表示
                  <span
                    onDoubleClick={() => startEditing(todo.id, todo.text)}
                    style={{
                      textDecoration: todo.completed ? "line-through" : "none",
                      cursor: "pointer",
                    }}
                  >
                    {todo.text}
                  </span>
                )}
              </div>

              {/* 削除ボタン */}
              <button
                onClick={() => deleteTodo(todo.id)}
                style={{
                  background: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  padding: "0.25rem 0.5rem",
                  marginLeft: "0.5rem",
                }}
              >
                削除
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
