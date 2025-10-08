import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useFirebaseData } from './utilities/useFirebaseData';
import Banner from './components/Banner';
import TermPage from './components/TermPage';
import CourseForm from './components/CourseForm';

interface Course {
  term: string;
  number: string;
  meets: string;
  title: string;
}

interface Schedule {
  title: string;
  courses: { [key: string]: Course };
}

const App = () => {
  const [data, isLoading, error] = useFirebaseData('/');

  if (error) return <h1>Error loading course data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading course data...</h1>;
  if (!data) return <h1>No course data found</h1>;

  const schedule = data as Schedule;

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Banner title={schedule.title} />
        <Routes>
          <Route path="/" element={<TermPage courses={schedule.courses} />} />
          <Route path="/edit/:courseId" element={<CourseForm courses={schedule.courses} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;