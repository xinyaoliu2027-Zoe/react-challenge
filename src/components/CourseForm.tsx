import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { courseSchema, type CourseFormData } from '../utilities/courseValidation';

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

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: course ? {
      title: course.title,
      term: course.term as 'Fall' | 'Winter' | 'Spring' | 'Summer',
      number: course.number,
      meets: course.meets
    } : undefined
  });

  const handleCancel = () => {
    navigate('/');
  };

  const onSubmit = (data: CourseFormData) => {
    // Do nothing for now
    console.log('Form data:', data);
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
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Course Title *
            </label>
            <input
              {...register('title')}
              type="text"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Term *
            </label>
            <select
              {...register('term')}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 ${
                errors.term ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="Fall">Fall</option>
              <option value="Winter">Winter</option>
              <option value="Spring">Spring</option>
              <option value="Summer">Summer</option>
            </select>
            {errors.term && (
              <p className="text-red-500 text-sm mt-1">{errors.term.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Course Number *
            </label>
            <input
              {...register('number')}
              type="text"
              placeholder="e.g., 213 or 213-2"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 ${
                errors.number ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.number && (
              <p className="text-red-500 text-sm mt-1">{errors.number.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Meeting Times
            </label>
            <input
              {...register('meets')}
              type="text"
              placeholder="e.g., MWF 12:00-13:20 or leave empty"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 ${
                errors.meets ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.meets && (
              <p className="text-red-500 text-sm mt-1">{errors.meets.message}</p>
            )}
            <p className="text-gray-500 text-xs mt-1">
              Leave empty for no meeting time, or use format: Days StartTime-EndTime
            </p>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseForm;