interface Course {
  term: string;
  number: string;
  meets: string;
  title: string;
}

interface CoursePlanProps {
  courses: { [key: string]: Course };
  selected: string[];
}

const CoursePlan = ({ courses, selected }: CoursePlanProps) => {
  const selectedCourses = selected
    .map(id => ({ id, ...courses[id] }))
    .filter(c => c.term);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Course Plan</h2>
      {selectedCourses.length === 0 ? (
        <div className="text-gray-600">
          <p className="mb-2">No courses selected yet.</p>
          <p className="text-sm">Click on course cards to add them to your plan.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {selectedCourses.map(course => (
            <div key={course.id} className="border border-gray-200 rounded p-4">
              <div className="font-bold text-lg">
                {course.term} CS {course.number}
              </div>
              <div className="text-gray-700">{course.title}</div>
              <div className="text-gray-500 text-sm">{course.meets}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CoursePlan;