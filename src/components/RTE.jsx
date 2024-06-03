import React from "react"
import { Controller } from "react-hook-form" //what we were doing with the help of forwardRef hook abhi tak,
// here that'll be done through Controller which is provided by react-hook-form itself.
import {Editor} from '@tinymce/tinymce-react'

export default function RTE({name, control, label, defaultValue = ""}) { //this control comes from react-hook-form and is 
    //responsible for taking all the states of this component into the form.
    
    
  return (
    <div className="w-full">
    {label && <label className="inline-block mb-1 pl-1">{label}</label>}

    <Controller 
    name = {name || "content"}
    control= {control}
    render = {({field: {onChange}}) => ( //this says that render these given elements whenever there's an onChange event on this field i.e. Controller.
      <Editor 
      initialValue={defaultValue}
      init={{
        initialValue : defaultValue,
        height : 500,
        menubar : true,
        plugins: [
          "image",
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "anchor",
          "searchreplace",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "code",
          "help",
          "wordcount",
          "anchor",
      ],
      toolbar:
      "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
      content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
  }}
    onEditorChange={onChange} //treat onEditorChange as an onChange event.
      />
    )}
    />
      

    </div>
  )
}