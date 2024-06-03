//container accepts some properties passed to it as children(you can name it anything, children is just a name)
//container ke andar hum styling properties define karate hain and uske andar jo bhi value hoti hain as it is display kara lete hain.



function Container({children}) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4">
        {children}
    </div>
  )
}
export default Container