import { useNavigate, useParams } from 'react-router-dom';

interface Course {
  term: string;
  number: string;
  meets: string;
  title: string;
}

interface CourseFormProps {
  courses: { [key: string]: Course };
}

const CourseForm = ({ courses }: CourseFormProps) => {
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();
  
  const course = courseId ? courses[courseId] : null;

  const handleCancel = () => {
    navigate('/');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // onSubmit does nothing for now
  };

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Course not found</div>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Edit Course</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Course Title
            </label>
            <input
              type="text"
              defaultValue={course.title}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Meeting Times
            </label>
            <input
              type="text"
              defaultValue={course.meets}
              placeholder="e.g., MWF 10:00-10:50"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseForm;