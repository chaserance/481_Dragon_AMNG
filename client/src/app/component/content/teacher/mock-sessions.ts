import { Session } from './session';

export const SESSIONS: Session[] = [
    { id: 21, name: 'Arabic 1', 
        students: [
            {name: 'Stephen', id: '3', feedback: 'good job', grade: 'A'},
            {name: 'Anthony', id: '59', feedback: 'okay', grade: 'B'},
            {name: 'Brad', id: '21', feedback: 'great', grade: 'A'} 
        ]},
    { id: 39, name: 'Arabic 1', 
        students: [
            {name: 'Bill', id: '23', feedback: 'better', grade: 'C'},
            {name: 'Mary', id: '431', feedback: 'hello', grade: 'A'} 
        ]},
    { id: 42, name: 'Arabic 2', 
        students: [
            {name: 'Jane', id: '38', feedback: 'fantastic', grade: 'A'},
            {name: 'Carl', id: '531', feedback: 'bad', grade: 'D'},
            {name: 'Hank', id: '78', feedback: 'nice', grade: 'A'},
            {name: 'James', id: '226', feedback: 'so-so', grade: 'B'} 
        ]}
]