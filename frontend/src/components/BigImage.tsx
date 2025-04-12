

// 'src/assets/t-shirt.png'
function BigImage({ urlImage, title }: { urlImage: string, title: string }) {
  return (
    <div className="rounded-lg  md:min-h-96 min-h-72 md:max-h-max flex justify-center items-center inset-shadow-sm p-2 mb-1 inset-shadow-black/50">
        <img className={"min-w-40 w-72 rounded-lg"} src={urlImage} alt={title} />  
    </div>
  )
}

export default BigImage