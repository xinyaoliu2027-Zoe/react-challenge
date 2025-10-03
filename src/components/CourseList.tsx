import { useNavigate } from 'react-router-dom';
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

const CourseList = ({ courses, allCourses, selected, toggleCourse }: CourseListProps) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {Object.entries(courses).map(([id, course]) => {
        const isSelected = selected.includes(id);
        const hasConflict = !isSelected && courseHasConflict(course, selected, allCourses);
        const isDisabled = hasConflict;

        return (
          <div 
            key={id}
            className={`border rounded-lg p-4 shadow-sm transition-all ${
              isDisabled
                ? 'bg-gray-100 border-gray-300 opacity-60'
                : isSelected
                ? 'bg-blue-100 border-blue-500 border-2'
                : 'bg-white border-gray-200 hover:shadow-md'
            }`}
          >
            <div 
              onClick={() => !isDisabled && toggleCourse(id)}
              className={isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}
            >
              <div className="font-bold text-lg mb-2 flex justify-between items-center">
                <span>{course.term} CS {course.number}</span>
                <div>
                  {isSelected && <span className="text-blue-600">✓</span>}
                  {hasConflict && <span className="text-red-600">✗</span>}
                </div>
              </div>
              <div className="text-gray-700 mb-3 text-sm">
                {course.title}
              </div>
              <div className="text-gray-500 text-sm mb-3">
                {course.meets}
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/edit/${id}`);
              }}
              className="w-full mt-2 bg-blue-600 text-white px-4 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
            >
              Edit
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default CourseList;