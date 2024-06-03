import React,{useCallback} from "react"
import { useForm } from "react-hook-form"
import {Button, Input, Select, RTE} from "../index"
import service from "../../appwrite/config"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"



function PostForm() {
    const {register,handleSubmit, watch, setValue, getValue, control} = useForm({
        defaultValues : {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    })


    const navigate = useNavigate();
    const userData = useSelector(state => state.user.userData);

    const submit = async (data) => {
        if(post){ //if post exists, update file
          const file = data.image[0] ? service.uploadFile(data.image[0]) : null
        

        if(file){ //if file exists i.e. if new image is uploaded, then delete the old image.
          service.deleteFile(post.featuredImage)
        }

        //updating the post
        const dbPost = await service.updatePost(post.$id, {
            ...data,
            featuredImage : file ? file.$id : undefined,
        })

         if (dbPost) {
            navigate(`/post/${dbPost.$id}`)
        }

    } else { // if post does not exist already --> create new post
      const file = await service.uploadFile(data.image[0]);

      if(file){
        const fileId = file.$id;
        data.featuredImage = fileId
        const dbPost = await service.createPost({
            ...data,
            userId : userData.$id
        })

        if(dbPost){
            navigate(`/post/${dbPost.$id}`);
        }

      }
    }

 }

 //through slugTransform --> title ko watch karna hai and slug ke andar value generate karni hai.also agr title me kahi pe bhi user
 //space deta hai to space ko convert karna hai - (dash) me.
 const slugTransform = useCallback((value) => {
    if(value && typeof value === 'string'){
        return value
        .trim()
        .toLowerCase()
        .replace(/^[a-zA-Z\d]+/g, '-') //(^ --> negate)this means replace all characters which doesn't come in [a-zA-Z\d]+ (/d --> digits) with '-'
    }
    else{
        return ''
    }
 })

    React.useEffect(() => {
        const subscription = watch((value, {name}) => {
          if (name === 'title'){
            setValue('slug', slugTransform(value.title, {shouldValidate : true}))
          }

        })

        return () => {
            subscription.unsubscribe() //for memory management and optimization 
        }
    }, [watch, slugTransform, setValue])

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
  
}
export default PostForm