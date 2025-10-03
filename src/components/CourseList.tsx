import { courseHasConflict } from '../utilities/timeConflicts';

interface Course {
  term: string;
  number: string;
  meets: string;
  title: string;
}

interface CourseListProps {
  courses: { [key: string]: Course };
  allCourses: { [key: string]: Course };
  selected: string[];
  toggleCourse: (courseId: string) => void;
}

const CourseList = ({ courses, allCourses, selected, toggleCourse }: CourseListProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
    {Object.entries(courses).map(([id, course]) => {
      const isSelected = selected.includes(id);
      const hasConflict = !isSelected && courseHasConflict(course, selected, allCourses);
      const isDisabled = hasConflict;

      return (
        <div 
          key={id}
          onClick={() => !isDisabled && toggleCourse(id)}
          className={`border rounded-lg p-4 shadow-sm transition-all ${
            isDisabled
              ? 'bg-gray-100 border-gray-300 cursor-not-allowed opacity-60'
              : isSelected
              ? 'bg-blue-100 border-blue-500 border-2 cursor-pointer'
              : 'bg-white border-gray-200 hover:shadow-md cursor-pointer'
          }`}
        >
          <div className="font-bold text-lg mb-2 flex justify-between items-center">
            <span>{course.term} CS {course.number}</span>
            {isSelected && <span className="text-blue-600">✓</span>}
            {hasConflict && <span className="text-red-600">✗</span>}
          </div>
          <div className="text-gray-700 mb-3 text-sm">
            {course.title}
          </div>
          <div className="text-gray-500 text-sm">
            {course.meets}
          </div>
        </div>
      );
    })}
  </div>
);

export default CourseList;