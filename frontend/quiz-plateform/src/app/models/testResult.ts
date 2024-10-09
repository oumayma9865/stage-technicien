import { Test } from "./test";
import { User } from "./user";

export class TestResult{
    constructor(
        public id: number,
        public score: number,
        public totalQuestion: number,
        public correctAnswers:number,
        public tempspasse: string, 
        public date: Date, 
        public user: User,
        public test: Test
    ){}
}