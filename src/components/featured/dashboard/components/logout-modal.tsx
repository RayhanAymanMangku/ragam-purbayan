"use client"
import { signOut } from "next-auth/react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { LogOutIcon } from "lucide-react"

interface LogoutModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const LogoutModal = ({ open, onOpenChange }: LogoutModalProps) => {
  const handleLogout = async () => {
    await signOut({
      callbackUrl: "/auth/login",
      redirect: true,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <LogOutIcon className="h-5 w-5 text-red-500" />
            Confirm Logout
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to log out of your account? You will be redirected to the login page.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-2 sm:gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleLogout} className="flex-1">
            <LogOutIcon className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default LogoutModal
