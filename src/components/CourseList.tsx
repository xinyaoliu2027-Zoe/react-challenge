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
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
    {Object.values(courses).map((course: Course, index) => (
      <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
        <div className="font-bold text-lg mb-2">
          {course.term} CS {course.number}
        </div>
        <div className="text-gray-700 mb-3 text-sm">
          {course.title}
        </div>
        <div className="text-gray-500 text-sm">
          {course.meets}
        </div>
      </div>
    ))}
  </div>
);

export default CourseList;