
export const gradeSystem = [
    { min: 97, max: 100, grade: 'A+'},
    { min: 93, max: 96, grade: 'A'},
    { min: 90, max: 92, grade: 'A-'},
    { min: 87, max: 89, grade: 'B+'},
    { min: 83, max: 86, grade: 'B'},
    { min: 80, max: 82, grade: 'B-'},
    { min: 77, max: 79, grade: 'C+'},
    { min: 73, max: 76, grade: 'C'},
    { min: 70, max: 72, grade: 'C-'},
    { min: 67, max: 69, grade: 'D+'},
    { min: 65, max: 66, grade: 'D'},
    { min: 0, max: 64, grade: 'E'}
]

export const getGrade = (marks) => {
    for(let i of gradeSystem) {
        if(+marks >= i.min)
            return i.grade;
    }
}