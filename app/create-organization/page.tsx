'use client'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { OrganizationSchema, organizationServerSchema } from "@/schema/organization";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { AnimatePresence, motion } from "framer-motion";
import { createOrganization } from "@/actions/organization";
import { redirect } from "next/navigation";

export default function Organization() {

    const [preview, setPreview] = useState<string | null>(null)
    const [error, setError] = useState<string | null>("")
    const [success, setSuccess] = useState<string | null>(null)

    const { register, handleSubmit, formState: { errors, isValid, isSubmitting }, setValue } = useForm({
        resolver: zodResolver(OrganizationSchema),
        mode: 'onChange'
    })

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if (!file) return;
        // Reset error
        setError("");

        // Validate type
        if (!["image/jpeg", "image/png"].includes(file.type)) {
            setError("Only JPG and PNG images are allowed.");
            return;
        }

        // Validate size (2 MB)
        if (file.size > 2 * 1024 * 1024) {
            setError("File size must be under 2MB.");
            return;
        }

        // Show preview

        setPreview(URL.createObjectURL(file));

        setValue("logo", file.name)
    };

    const handleRemove = () => {
        setPreview(null)
    }

    const onSubmit = async (data: organizationServerSchema) => {
        setError(null)
        setSuccess(null)
        try {
            const organization = await createOrganization(data)

            if (!organization.success) {
                if (organization.errors) {
                    // Flatten the first error
                    const firstError = Object.values(organization.errors).flat()[0]
                    setError(firstError || organization.message || "Something went wrong")
                } else {
                    setError(organization.message || "Something went wrong")
                }
                return
            }

            setSuccess("Organization created successfully!")
            redirect('/admin/dashboard')

        } catch (error) {
            console.error(errors || "Something went wrong")
            setSuccess(null)
        }
    }

    return (
        <>
            <div className="min-h-screen flex justify-center items-center">
                <Card className="w-full max-w-xl shadow-lg">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl">Create Organization</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">Add your organization details</p>
                    </CardHeader>
                    <Separator />
                    <CardContent className="px-6">
                        <form className="flex flex-col items-center gap-4" onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex flex-col items-center">
                                <label
                                    htmlFor="logo-upload"
                                    className="w-28 h-28 rounded-full border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors bg-white shadow-sm overflow-hidden"
                                >
                                    {preview ? (
                                        <img src={preview} alt="Logo Preview" className="object-cover w-full h-full" />
                                    ) : (
                                        <>
                                            <span className="mt-1 text-xs text-gray-500">Upload Logo</span>
                                        </>
                                    )}
                                </label>
                                {preview && (
                                    <Button
                                        variant="link"
                                        className="text-white text-sm"
                                        onClick={handleRemove}
                                    >
                                        Remove Image
                                    </Button>
                                )}
                                <input
                                    id="logo-upload"
                                    type="file"
                                    accept="image/png,image/jpeg"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                                {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
                                {!error && <p className="text-xs text-muted-foreground mt-2">PNG/JPG up to 2MB.</p>}
                            </div>
                            <div className="w-full">
                                <Label className="mb-2">Organization Name</Label>
                                <Input placeholder="e.g. FitHouse Gym" type="text" {...register('name')} className="w-full" />
                                <AnimatePresence>
                                    {errors.name &&
                                        <motion.p initial={{ opacity: 0, y: -5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -5 }}
                                            transition={{ duration: 0.2 }}
                                            className="text-red-500 text-sm">
                                            {errors.name.message}
                                        </motion.p>}
                                </AnimatePresence>
                            </div>

                            <div className="w-full">
                                <Label className="mb-2">Address</Label>
                                <Textarea placeholder="eg. 123 street, new jersey, USA" {...register('address')} rows={3} className="w-full" />
                                <AnimatePresence>
                                    {errors.address &&
                                        <motion.p initial={{ opacity: 0, y: -5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -5 }}
                                            transition={{ duration: 0.2 }}
                                            className="text-red-500 text-sm">
                                            {errors.address.message}
                                        </motion.p>}
                                </AnimatePresence>
                            </div>

                            <div className="w-full">
                                <Label className="mb-2">Phone</Label>
                                <Input placeholder="712-652-7627" type="text" {...register('phone')} className="w-full" />
                                <AnimatePresence>
                                    {errors.phone &&
                                        <motion.p initial={{ opacity: 0, y: -5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -5 }}
                                            transition={{ duration: 0.2 }}
                                            className="text-red-500 text-sm">
                                            {errors.phone.message}
                                        </motion.p>}
                                </AnimatePresence>
                            </div>

                            {error && (
                                <motion.p
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    className="text-red-500 text-sm text-center"
                                >
                                    {error}
                                </motion.p>
                            )}
                            {success && (
                                <motion.p
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    className="text-green-600 text-sm text-center"
                                >
                                    {success}
                                </motion.p>
                            )}
                            <div className="w-full">
                                <Button type="submit" disabled={!isValid} className="w-full">
                                    {isSubmitting ? 'creating...' : 'Create new organization'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}