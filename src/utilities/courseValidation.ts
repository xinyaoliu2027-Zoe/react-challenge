import { z } from 'zod';

const meetingTimeRegex = /^(([MTWF]|Tu|Th)+\s\d{1,2}:\d{2}-\d{1,2}:\d{2})?$/;

export const courseSchema = z.object({
  title: z.string()
    .min(2, { message: 'Title must be at least 2 characters' }),
  
  term: z.enum(['Fall', 'Winter', 'Spring', 'Summer']),
  
  number: z.string()
    .regex(/^\d+(-\d+)?$/, { message: 'Course number must be a number with optional section (e.g., 213-2)' }),
  
  meets: z.string()
    .regex(meetingTimeRegex, { message: 'Meeting time must contain days and start-end time (e.g., MWF 12:00-13:20)' })
    .or(z.literal(''))
});

export type CourseFormData = z.infer<typeof courseSchema>;