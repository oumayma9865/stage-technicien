import { Option } from './option';
import { Quiz } from './quiz';

export class Question {
    constructor(
        public id: number,
        public question: string,
        public type: string,
        public options: Option[],
        public quiz: Quiz){}
}