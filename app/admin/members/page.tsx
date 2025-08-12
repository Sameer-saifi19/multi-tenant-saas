import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogOverlay,
    DialogPortal,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


export default function Members() {
    return (
        <>
            <Dialog>
                <form>
                    <DialogTrigger asChild>
                        <Button>Create Member</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                Create Member
                            </DialogTitle>
                            <DialogDescription>
                                Create new member here. Click save when you&apos;re
                                done.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4">
                            <div className="grid gap-3">
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name"
                                    className="border p-2 rounded w-full"
                                    required
                                />
                            </div>
                            <div className="grid gap-3">
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    className="border p-2 rounded w-full"
                                    required
                                />
                            </div>
                            <div className="grid gap-3">
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="email"
                                    className="border p-2 rounded w-full"
                                    required
                                />
                            </div>
                            <div className="grid gap-3">
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="phone"
                                    className="border p-2 rounded w-full"
                                    required
                                />
                            </div>
                            <div className="grid gap-3">
                                <select name="gender" className="border p-2 rounded w-full">
                                    <option value="">Select Gender</option>
                                    <option value="MALE">Male</option>
                                    <option value="FEMALE">Female</option>
                                    <option value="OTHER">Other</option>
                                </select>
                            </div>
                            <div className="w-full">
                                <Button className="w-full" type="submit">Create</Button>
                            </div>
                        </div>
                    </DialogContent>
                </form>
            </Dialog>
        </>
    )
}