interface Course {
  term: string;
  number: string;
  meets: string;
  title: string;
}

interface CourseListProps {
  courses: { [key: string]: Course };
}

const CourseList = ({ courses }: CourseListProps) => (
  <div>
    {Object.values(courses).map((course: Course, index) => (
      <div key={index}>
        {course.term} CS {course.number}: {course.title}
      </div>
    ))}
  </div>
);

export default CourseList;