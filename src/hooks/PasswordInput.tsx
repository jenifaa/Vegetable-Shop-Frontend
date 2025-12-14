

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"

export function PasswordInput({...field}) {
  const [showPassword, setShowPassword] = useState(false)
  
  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        placeholder="Enter password"
        className="pr-10"
        {...field}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
      </Button>
    </div>
  )
}