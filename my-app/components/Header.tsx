'use client'
import { SignedIn, UserButton } from "@clerk/clerk-react";
import { SignedOut, SignInButton, useUser } from "@clerk/nextjs"


function Header() {
 const {user} = useUser();
  return (
    <div className="flex items-center justify-between p-4">
     {user && (<h1 className="text-2xl poppins-regular">{user?.firstName}{`'s `}Space</h1>)}
      
      {/* buttons */}
      <div>
       <SignedOut>
        <SignInButton/>
       </SignedOut>

       <SignedIn>
        <UserButton/>
       </SignedIn>
      </div>
    </div>
  )
}

export default Header
