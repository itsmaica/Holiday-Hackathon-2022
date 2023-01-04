import { highlightIcon, upvoteIcon } from "../icons/reply-icons.js";
import { db } from "../../firebase.js";
import {
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

export const questionListContainer = async () => {
  const roomContainer = document.getElementById("room-container");
  const container = document.createElement("div");

  container.setAttribute("id", "question-list-container");
  container.setAttribute("class", "question-containers");


  const questions = collection(db, "questions");
  const allQuestions = await getDocs(questions);
  allQuestions.forEach((doc) => {
    const content = createQuestion(doc);
    container.append(content);
  });

  roomContainer.appendChild(container);
};

export const createQuestion = (
  doc,
  highlighted = false,
  upvote = 0
) => {
  const container = document.createElement("section");
  container.setAttribute("class", "questions");

  const question = document.createElement("h2");
  question.setAttribute("class", "question-content");
  question.dataset.questionId = doc.id;

  question.innerText = doc.data().question;

  const questionActions = createQuestionActions(doc.id, highlighted, upvote);

  container.append(question, questionActions);

  return container;
};

export const createQuestionActions = (questionId, highlighted, upvote) => {
  const actionContainer = document.createElement("div");
  actionContainer.setAttribute("id", "reply-actions-container");

  const replyButton = document.createElement("button");
  replyButton.setAttribute("id", "reply-button");
  replyButton.setAttribute("class", "submit-buttons");
  replyButton.dataset.questionId = questionId;

  replyButton.innerText = "Reply";

  actionContainer.append(
    highlightIcon(questionId, highlighted),
    upvoteIcon(questionId, upvote),
    replyButton
  );

  return actionContainer;
};

// TODO: fetch questions in question list container
export const getAllQuestions = async () => {
  // const response = await fetch("/questions");

  // if (response.ok) {
  //   const data = await response.json();
  //   return data;
  // }
  const questions = collection(db, "questions");

  const allQuestions = await getDocs(questions);
  allQuestions.forEach((doc) => {
    console.log(doc.data());
  });
};
