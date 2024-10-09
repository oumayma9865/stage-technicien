import { Question } from './question';
import { Skill } from './skill';
import { Test } from './test';
export class Quiz{
    constructor(
        public id: number,
        public titre: string,
        public difficulte: string,
        public domaine: string,
        public score: number,
        public temps: string,
        public skill: Skill,
        public questions: Question[],
        
      
    ){}
}