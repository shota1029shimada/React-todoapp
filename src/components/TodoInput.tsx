// タスク入力用コンポーネント//
import { useState } from "react";
// React の useState フックをインポート
// コンポーネント内で状態（ここでは入力値）を管理するために使用する

type Props = {
	onAdd: (text: string) => void;
	// 親コンポーネント(App)から渡される関数
	// 入力されたタスクを親に渡す役割
	onDeleteCompleted?: () => void;
	// 完了済みタスクを一括削除する関数（オプション）
	hasCompletedTodos?: boolean;
	// 完了済みタスクがあるかどうかのフラグ（オプション）
	errorMessage?: string;
	// エラーメッセージ（オプション）
};

const TodoInput = ({
	onAdd,
	onDeleteCompleted,
	hasCompletedTodos,
	errorMessage,
}: Props) => {
	// useState で入力欄の値を管理
	// input: 現在の入力文字列
	// setInput: input を更新する関数
	const [input, setInput] = useState("");

	// ボタンを押したときの処理
	const handleAdd = () => {
		if (!input.trim()) return; // 空文字（または空白のみ）の場合は何もしない
		onAdd(input); // 親に入力内容を渡す（タスク追加の依頼）
		setInput(""); // 入力欄をクリア
	};

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				gap: "0.5rem",
				justifyContent: "center",
				width: "100%",
			}}
		>
			{/* 入力フォーム */}
			<div
				style={{
					display: "flex",
					gap: "0.5rem",
					justifyContent: "center",
					width: "100%",
				}}
			>
				{/* タスク入力用のテキストボックス */}
				<input
					type="text"
					value={input} // 入力欄の値は state (input) と同期
					onChange={(e) => setInput(e.target.value)} // 入力が変わったら state を更新
					placeholder="タスクを入力"
					style={{ flex: 1, padding: "0.5rem" }}
				/>
				{/* タスク追加ボタン */}
				<button
					onClick={handleAdd} // ボタンが押されたら handleAdd 実行
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

			{/* エラーメッセージ表示 */}
			{errorMessage && (
				<div
					style={{
						color: "#dc3545",
						fontSize: "0.9rem",
						textAlign: "center",
						padding: "0.5rem",
						background: "#f8d7da",
						border: "1px solid #f5c6cb",
						borderRadius: "4px",
					}}
				>
					{errorMessage}
				</div>
			)}

			{/* 一括削除ボタン（完了済みタスクがある場合のみ表示） */}
			{hasCompletedTodos && onDeleteCompleted && (
				<button
					onClick={onDeleteCompleted}
					style={{
						padding: "0.5rem 1rem",
						background: "#dc3545",
						color: "white",
						border: "none",
						borderRadius: "4px",
						cursor: "pointer",
						fontSize: "0.9rem",
					}}
				>
					完了済みタスクを一括削除
				</button>
			)}
		</div>
	);
};

export default TodoInput;
// 他のファイルからこのコンポーネントを使えるようにする
