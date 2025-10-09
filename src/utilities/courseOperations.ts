import { ref, update } from 'firebase/database';
import { database } from './firebase';

interface CourseData {
  title: string;
  term: string;
  number: string;
  meets: string;
}

export const updateCourse = async (courseId: string, courseData: CourseData): Promise<void> => {
  const courseRef = ref(database, `courses/${courseId}`);
  await update(courseRef, courseData);
};