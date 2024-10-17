import { z } from 'zod';

export const RegisterSchema = z.object({
  username: z.string().min(3).max(255),
  email: z.string().regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, { message: 'Email không hợp lệ' }),
  password: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{3,}$/, {
    message: 'Mật khẩu cần có ít nhất một chữ hoa',
  }),
  age: z.number().min(5).max(100),
  phone: z.string().regex(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, { message: 'Số điện thoại cần bắt đầu bằng 84 hoặc 0, và có 10 số' }),
  address: z.string().min(10).max(255),
  gender: z.enum(['Male', 'Female']).default('Male'),
});
export type RegisterSchema = z.infer<typeof RegisterSchema>;
