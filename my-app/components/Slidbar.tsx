import { MenuIcon } from "lucide-react"
import Newdocument from "./Newdocument"
import {
 Sheet,
 SheetContent,
 SheetHeader,
 SheetTitle,
 SheetTrigger,
} from "@/components/ui/sheet"



function Slidbar() {
 const menuoption = (
  <>
  <Newdocument />
  </>
 ) 
 return (
  <div className="p-2 md:p-5 bg-gray-200 relative">
   <div className="md:hidden">
   <Sheet>
    <SheetTrigger>
     <MenuIcon  className="p-2 hover:opacity-30 rounded-lg" size={40}/>
    </SheetTrigger>
    <SheetContent side="left">
     <SheetHeader>
      <SheetTitle>Menu</SheetTitle>
      <div>{
       menuoption
       }</div>
     </SheetHeader>
    </SheetContent>
   </Sheet>
   </div>

   <div className="hidden md:inline">
    <Newdocument />
   </div>
  </div>
 )
}

export default Slidbar
