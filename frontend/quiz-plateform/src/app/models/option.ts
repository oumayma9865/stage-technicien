import { Question } from "./question";

export class Option {
    constructor(
        public id: number,
        public texte: string,
        public correct: boolean,
        public question?: Question
    ){}}
  