"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createMember } from "@/actions/members";
import { DatePicker } from "@/components/ui/datepicker";


export default function Members() {
  const [dob, setDob] = useState<Date | undefined>();
  const [membershipStart, setMembershipStart] = useState<Date | undefined>();
  const [membershipEnd, setMembershipEnd] = useState<Date | undefined>();
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Member</Button>
      </DialogTrigger>

      <DialogContent>
        <form
          action={async (formData) => {
            await createMember(formData);
            setOpen(false);
          }}
          className="space-y-4"
        >
          <DialogHeader>
            <DialogTitle>Create Member</DialogTitle>
            <DialogDescription>
              Fill in the details below to create a new member.
            </DialogDescription>
          </DialogHeader>

          {/* First / Last Name */}
          <div className="grid grid-cols-2 gap-2">
            <Input type="text" name="firstName" placeholder="First Name" required />
            <Input type="text" name="lastName" placeholder="Last Name" required />
          </div>

          {/* Email / Phone */}
          <div className="grid grid-cols-2 gap-2">
            <Input type="email" name="email" placeholder="Email" required />
            <Input type="tel" name="phone" placeholder="Phone" required />
          </div>

          {/* Gender */}
          <div>
            <Select value={gender} onValueChange={setGender}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Gender</SelectLabel>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <input type="hidden" name="gender" value={gender} />
          </div>

          {/* DOB / Membership Status */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <DatePicker insidetext="Date of Birth" onChange={setDob} />
              <input type="hidden" name="dateOfBirth" value={dob ? dob.toISOString() : ""} />
            </div>
            <div>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Membership Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <input type="hidden" name="status" value={status} />
            </div>
          </div>

          {/* Membership Dates */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <DatePicker insidetext="Membership Start" onChange={setMembershipStart} />
              <input type="hidden" name="membershipStart" value={membershipStart ? membershipStart.toISOString() : ""} />
            </div>
            <div>
              <DatePicker insidetext="Membership End" onChange={setMembershipEnd} />
              <input type="hidden" name="membershipEnd" value={membershipEnd ? membershipEnd.toISOString() : ""} />
            </div>
          </div>

          {/* Notes */}
          <Textarea name="notes" placeholder="Notes..." />

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">Cancel</Button>
            </DialogClose>
            <Button type="submit">Create Member</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
