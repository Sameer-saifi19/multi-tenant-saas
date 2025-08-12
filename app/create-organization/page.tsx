'use client'

import { createOrganization } from "@/actions/organization"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

export default function Organization() {
    return (
        <>
            <div className="min-h-screen flex justify-center items-center">
                <Card className="w-full max-w-xl shadow-lg" >
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl">
                            Create Organization
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">Add your organization details</p>
                    </CardHeader>
                    <Separator />
                    <CardContent className="px-6">
                        <form action={createOrganization}>
                            <div className="w-full">
                                <Label className="mb-2">Organization Name</Label>
                                <Input placeholder="e.g. FitHouse Gym" name="name" type="text" className="w-full" />
                            </div>

                            <div className="w-full">
                                <Label className="mb-2">Address</Label>
                                <Textarea placeholder="eg. 123 street, new jersey, USA" name="address" rows={3} className="w-full" />
                            </div>

                            <div className="w-full">
                                <Label className="mb-2">Phone</Label>
                                <Input placeholder="712-652-7627" type="text" name="phone" className="w-full" />
                            </div>
                            <div className="w-full">
                                <Button type="submit">
                                    Create new organization
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}