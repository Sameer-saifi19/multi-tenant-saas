'use server'

import { signIn } from '@/auth'
import { prisma } from '@/lib/prisma'
import { loginSchema } from '@/schema/validation'
import bcrypt from 'bcryptjs'
import { CredentialsSignin } from 'next-auth'
import { redirect } from 'next/navigation'

export async function signupAction(formData: {
  name: string,
  email: string 
  password: string
}) {

  const existingUser = await prisma.user.findUnique({
    where: { email: formData.email },
  })

  if (existingUser) {
    return { error: "User already exists"}
  }

  const hashedPassword = await bcrypt.hash(formData.password, 12)

  const user = await prisma.user.create({
    data: {
      name: formData.name,
      email: formData.email,
      password: hashedPassword,
    },
  })

  return { success: true, user }
}

export async function Login(data: {
  email: string,
  password: string
}) {
  const parsed = loginSchema.safeParse(data)
  if(!parsed.success){
    throw new Error('Validation failed')
  }

  const formData = new URLSearchParams()
  formData.append('email', data.email)
  formData.append('password', data.password)
  formData.append("csrfToken", "")
  formData.append("callbackUrl", "/admin/dashboard")

  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/callback/credentials`, {
    method: "POST",
    headers:{
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData.toString(),
    credentials: "include"
  })

  if(!res.ok){
    throw new Error("Invalid email or password")
  }

  return true
}