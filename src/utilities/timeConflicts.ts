interface Course {
    term: string;
    number: string;
    meets: string;
    title: string;
  }
  
  
  const parseMeetingTime = (meets: string) => {
    if (!meets || meets.trim() === '') return null;
    
    const parts = meets.split(' ');
    if (parts.length !== 2) return null;
    
    const days = parts[0];
    const times = parts[1].split('-');
    if (times.length !== 2) return null;
    
    return {
      days,
      startTime: times[0],
      endTime: times[1]
    };
  };
  
  
  const daysOverlap = (days1: string, days2: string): boolean => {
    const daySet1 = new Set<string>();
    const daySet2 = new Set<string>();
    
  
    let i = 0;
    while (i < days1.length) {
      if (i + 1 < days1.length && (days1.substring(i, i + 2) === 'Tu' || days1.substring(i, i + 2) === 'Th')) {
        daySet1.add(days1.substring(i, i + 2));
        i += 2;
      } else {
        daySet1.add(days1[i]);
        i += 1;
      }
    }
    
    
    i = 0;
    while (i < days2.length) {
      if (i + 1 < days2.length && (days2.substring(i, i + 2) === 'Tu' || days2.substring(i, i + 2) === 'Th')) {
        daySet2.add(days2.substring(i, i + 2));
        i += 2;
      } else {
        daySet2.add(days2[i]);
        i += 1;
      }
    }
    
    
    for (const day of daySet1) {
      if (daySet2.has(day)) return true;
    }
    return false;
  };
  
  
  const timesOverlap = (start1: string, end1: string, start2: string, end2: string): boolean => {
    return start1 < end2 && start2 < end1;
  };
  
  
  export const hasTimeConflict = (course1: Course, course2: Course): boolean => {
    
    if (course1.term !== course2.term) return false;
    
    const meeting1 = parseMeetingTime(course1.meets);
    const meeting2 = parseMeetingTime(course2.meets);
    
    
    if (!meeting1 || !meeting2) return false;
    
    
    return daysOverlap(meeting1.days, meeting2.days) && 
           timesOverlap(meeting1.startTime, meeting1.endTime, meeting2.startTime, meeting2.endTime);
  };
  
  
  export const courseHasConflict = (
    course: Course, 
    selectedCourseIds: string[], 
    allCourses: { [key: string]: Course }
  ): boolean => {
    return selectedCourseIds.some(id => {
      const selectedCourse = allCourses[id];
      return selectedCourse && hasTimeConflict(course, selectedCourse);
    });
  };