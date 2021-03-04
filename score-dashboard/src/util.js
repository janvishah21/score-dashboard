
const gradeSystem = [
    { min: 97, max: 100, grade: 'A+'},
    { min: 93, max: 96, grade: 'A+'},
    { min: 90, max: 92, grade: 'A+'},
    { min: 87, max: 89, grade: 'A+'},
    { min: 83, max: 86, grade: 'A+'},
    { min: 80, max: 82, grade: 'A+'},
    { min: 77, max: 79, grade: 'A+'},
    { min: 73, max: 76, grade: 'A+'},
    { min: 70, max: 72, grade: 'A+'},
    { min: 67, max: 69, grade: 'A+'},
    { min: 65, max: 66, grade: 'A+'},
    { min: 0, max: 64, grade: 'E/F'}
]

export const getGrade = (marks) => {
    gradeSystem.map((item) => {
        if(+marks >= item.min)
            return item.grade;
    });
}