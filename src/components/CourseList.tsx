interface Course {
  term: string;
  number: string;
  meets: string;
  title: string;
}

interface CourseListProps {
  courses: { [key: string]: Course };
  selected: string[];
  toggleCourse: (courseId: string) => void;
}

const CourseList = ({ courses, selected, toggleCourse }: CourseListProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
    {Object.entries(courses).map(([id, course]) => (
      <div 
        key={id}
        onClick={() => toggleCourse(id)}
        className={`border rounded-lg p-4 shadow-sm cursor-pointer transition-all ${
          selected.includes(id)
            ? 'bg-blue-100 border-blue-500 border-2'
            : 'bg-white border-gray-200 hover:shadow-md'
        }`}
      >
        <div className="font-bold text-lg mb-2 flex justify-between items-center">
          <span>{course.term} CS {course.number}</span>
          {selected.includes(id) && (
            <span className="text-blue-600">✓</span>
          )}
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