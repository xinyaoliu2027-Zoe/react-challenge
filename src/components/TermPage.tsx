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

  const filteredCourses = Object.fromEntries(
    Object.entries(courses).filter(([, course]) => course.term === selection)
  );

  return (
    <div>
      <TermSelector selection={selection} setSelection={setSelection} />
      <CourseList courses={filteredCourses} />
    </div>
  );
};

export default TermPage;