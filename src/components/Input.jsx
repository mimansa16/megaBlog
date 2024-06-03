//like we've made a common button to be used where ever buttons are used similarly this is a common input field 
//which could be used anywhere needed.


import React,{useId} from "react"

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    ...props
  }, ref){
     const id = useId();
        return (
        <div className="w-full">
            {label && <label
            className="inline-block mb-1 pl-1" //the htmlfor is used for accessibility purpose in production, but usko use nhi bhi 
            //karenge to its okay
            htmlFor={id}>
                {label}
            </label>}
            <input
            type = {type}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none
             focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
             ref={ref} //this will give us the reference of this comp in the parent comp, to reference vaha se pass kiya jayega and yaha se 
             //state ka access liya jayega.
             {...props}
             id = {id} //isse hota kya hai ki jo id label ke htmlfor me pass kari hai vahi input tag me bhi as id pass karne se vo id ka label 
             //us hi id ke input field se link ho jayega.
            />
        </div>
    )
})



export default Input