import {z} from "zod"

export  const loginSchema = z.object({
        email: z.string().email({ message: "Invalid email format" }),
        password: z.string().min(6, { message: "Password is required" }),
    }); 


export const signupSchema = z.object({

  username: z.string().min(3, { message: "Username must be at least 3 characters long" }),

  email: z.string().email({ message: "Invalid email address" }),

  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),

  image: z.string().optional(), 
  
});
