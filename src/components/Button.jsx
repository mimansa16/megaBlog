//this button comp is a common button made(designed) so that where ever a button is needed, it can be directly used there, thus saving 
//time and code.
import React from "react"

export default function Button({
    children, //this children is whatever is passed in the argument, here it signifies the button text.
    type = 'button', // these are the default values given to the button comp which can be over-written if values of these attributes 
    //are given alag se alag se.
    bgColor = 'bg-blue-600',
    textColor = 'text-white',
    className = '', //className is taken as empty most of the time here so that when this comp is called,the user can themselves pass
    //some values into it. 
    ...props // className ke alava jitni bhi properties user ne pass kari hain, we've taken them into the props and thus we have
    //spread all those properties by spreading props.
 }) {
  return (// now in this case, className inside button tag is written inside backticks, and since backticks are a part of
  // js, they are written inside {}
    <button className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} {...props} >{children}</button> //to yaha fir we can
    //{...props} by which all the additional properties passed by the user are added to the button tag.
  )
}
