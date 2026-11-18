import { z } from "zod";

export const gradeOptions = ["Grade 10", "Grade 11", "Grade 12", "Not sure yet"] as const;

const optionalText = (max: number, message: string) =>
  z
    .string()
    .trim()
    .max(max, { message })
    .transform((v) => (v === "" ? null : v));

/** Rules for the admissions inquiry form. The database enforces the same limits. */
export const inquirySchema = z.object({
  parentName: z
    .string()
    .trim()
    .min(2, { message: "Please enter your full name." })
    .max(100, { message: "Name must be under 100 characters." }),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9 ()-]{7,25}$/, { message: "Please enter a valid phone number, e.g. 0712 345678." }),
  email: z
    .string()
    .trim()
    .max(255, { message: "Email must be under 255 characters." })
    .refine((v) => v === "" || z.string().email().safeParse(v).success, {
      message: "Please enter a valid email address, or leave it empty.",
    })
    .transform((v) => (v === "" ? null : v.toLowerCase())),
  studentName: z
    .string()
    .trim()
    .min(2, { message: "Please enter the student's name." })
    .max(100, { message: "Name must be under 100 characters." }),
  grade: z.enum(gradeOptions, { errorMap: () => ({ message: "Please choose a grade." }) }),
  currentSchool: optionalText(150, "School name must be under 150 characters."),
  message: z
    .string()
    .trim()
    .min(5, { message: "Please tell us a little about your question." })
    .max(1500, { message: "Message must be under 1,500 characters." }),
});

export type InquiryInput = z.input<typeof inquirySchema>;
export type Inquiry = z.output<typeof inquirySchema>;

/** Maps a checked inquiry to the stored row. */
export function toInquiryRow(i: Inquiry) {
  return {
    parent_name: i.parentName,
    phone: i.phone,
    email: i.email,
    student_name: i.studentName,
    grade: i.grade,
    current_school: i.currentSchool,
    message: i.message,
  };
}
