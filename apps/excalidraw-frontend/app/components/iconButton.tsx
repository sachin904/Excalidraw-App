import { ReactNode } from "react";

export function IconButton({icon,onClick,activated}:{icon:ReactNode,onClick:()=>void,activated:boolean}){
    return<div className={` ${activated?"text-red-500":"text-white"} pointer rounded-full border p-2 bg-black hover:bg-gray-300`} onClick={onClick}>
       {icon}
    </div>

}