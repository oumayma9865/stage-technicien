import { Quiz } from "./quiz";
import { Skill } from "./skill";
import { TestResult } from "./testResult";
import { User } from "./user";

export class Test{
    constructor(
        public id: number,
        public titre: string,
        public poste: string,
        public niveau: string,
        public duree: string, 
        public date: Date, 
        public skills: Skill[],
        public quizzes: Quiz[],
        public users: User[],
        public testResults: TestResult[]
    ){}
}