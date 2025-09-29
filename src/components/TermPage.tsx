import { useState } from 'react';
import TermSelector from './TermSelector';
import CourseList from './CourseList';

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
      <TermSelector selection={selection} setSelection={setSelection} />
      <CourseList 
        courses={filteredCourses} 
        selected={selected}
        toggleCourse={toggleCourse}
      />
    </div>
  );
};

export default TermPage;