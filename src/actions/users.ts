'use server'

import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

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

export const onAuthenticateUser = async () => {
  try {
    const session = await auth();
    if(!session?.user?.email) {
      return {status: 403, message: "Unauthenticated"}
    }

    const userExist = await prisma.user.findUnique({
      where: {
        id: session.user.id
      },
      include:{
        gyms:{
          where: {
            ownerId: session.user.id
          }
        }
      }
    })

    if(userExist){
      return {status: 200, user: userExist}
    }

    return { status: 400 }
  } catch (error) {
      return { status: 500 }
  }
}

