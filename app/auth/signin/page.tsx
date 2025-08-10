"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { loginSchema } from "@/schema/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from "react";
import { useRouter } from "next/navigation"
import { Applebtn, Googlebtn } from "@/components/oauthbtn"
import { Login } from "@/actions/user"

export default function Signin() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<loginSchema>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange'
  })
  const router = useRouter();

  const [error, setError] = useState<string | null>(null)

  async function onsubmit(data: loginSchema) {
    setError(null)
    try {
      await Login(data)
      router.push("/admin/dashboard")
    } catch (err: any) {
      setError(err.message || "Invalid email or password")
    }
  }
  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Sign into ===</CardTitle>
          <CardDescription className="text-center">
            Welcome back ! Please sign in to Continue
          </CardDescription>
          <div className="grid mt-4 grid-cols-2 gap-4">
            <Googlebtn/>
            <Applebtn/>
          </div>
          <div className="flex justify-between items-center mt-2">
            <hr className="w-[47%]" />
            <CardDescription>or</CardDescription>
            <hr className="w-[47%]" />
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onsubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  {...register('email')}
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  required
                />
                <AnimatePresence>
                  {errors.email &&
                    <motion.p initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="text-red-500 text-sm">
                      {errors.email.message}
                    </motion.p>}
                </AnimatePresence>
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="/admin/auth/password-reset"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" {...register("password")} type="password" required />
                <AnimatePresence>
                  {errors.password &&
                    <motion.p initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="text-red-500 text-sm">
                      {errors.password.message}
                    </motion.p>}
                </AnimatePresence>
              </div>
              <AnimatePresence>
                  {error &&
                    <motion.p initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="text-red-500 text-sm">
                      {error}
                    </motion.p>}
                </AnimatePresence>
              <div className="flex flex-col gap-3">
                <Button  type="submit" className="w-full">
                  {isSubmitting ? 'signing...' : 'sign in'}
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="/auth/signup" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

