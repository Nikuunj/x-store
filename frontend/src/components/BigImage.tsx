

// 'src/assets/t-shirt.png'
function BigImage({ urlImage, title }: { urlImage: string, title: string }) {
  return (
    <div className="rounded-lg inset-shadow-sm p-2 mb-1 inset-shadow-zinc-700">
        <img className={"min-w-40 w-72 rounded-lg"} src={urlImage} alt={title} />  
    </div>
  )
}

export default BigImage