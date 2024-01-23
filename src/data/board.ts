import { db } from "./firebase";

const userBoards = () => db.ref("conferences");

const userBoard = (board) => userBoards().child(board);

const getBoard = async (key) => {
  const user = await userBoards().child(key).once("value");
  return user.val();
};

const addBoard = (board) => {
  userBoards().push(board);
};

const deleteBoard = (key) => userBoard(key).remove();

const updateBoard = (key, data) => userBoard(key).update(data);

const addReviewer = (key, reviewer) => {
  const customChild = userBoard(key)
    .child("reviewers")
    .child(reviewer.id) as any;
  if (customChild.id) {
    return;
  } else customChild.set(reviewer);
};

export const boardService = {
  userBoards,
  getBoard,
  addBoard,
  deleteBoard,
  updateBoard,
  addReviewer
};
