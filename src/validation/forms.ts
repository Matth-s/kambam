import { z } from 'zod';

export const susbtaskValidation = z.object({
  id: z.string(),
  title: z.string().trim().min(1, 'Filed required'),
  isCompleted: z.boolean().default(false),
});

export const TaskValidation = z.object({
  id: z.string(),
  title: z.string().trim().min(1, 'Required filed'),
  description: z.string().trim(),
  status: z.string(),
  subtasks: z.array(susbtaskValidation).default([]),
});

export const ColumnValidation = z.object({
  id: z.string(),
  name: z.string().trim().min(1, 'Required field'),
  tasks: z.array(TaskValidation).default([]),
});

export const boardValidation = z.object({
  id: z.string(),
  name: z.string().trim().min(1, 'Required field'),
  columns: z.array(ColumnValidation).default([]),
});
