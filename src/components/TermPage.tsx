import { useState } from 'react';
import TermSelector from './TermSelector';
import CourseList from './CourseList';
import Modal from './Modal';
import CoursePlan from './CoursePlan';

interface Course {
  term: string;
  number: string;
  meets: string;
  title: string;
}

interface TermPageProps {
  courses: { [key: string]: Course };
}

const TermPage = ({ courses }: TermPageProps) => {
  const [selection, setSelection] = useState('Fall');
  const [selected, setSelected] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredCourses = Object.fromEntries(
    Object.entries(courses).filter(([, course]) => course.term === selection)
  );

  const toggleCourse = (courseId: string) => {
    setSelected(prev => 
      prev.includes(courseId)
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center px-4 py-2">
        <TermSelector selection={selection} setSelection={setSelection} />
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Course Plan
        </button>
      </div>
      <CourseList 
        courses={filteredCourses} 
        selected={selected}
        toggleCourse={toggleCourse}
      />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CoursePlan courses={courses} selected={selected} />
      </Modal>
    </div>
  );
};

export default TermPage;