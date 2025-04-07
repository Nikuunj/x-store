

// 'src/assets/t-shirt.png'
function BigImage({ urlImage, title }: { urlImage: string, title: string }) {
  return (
    <div>
        <img className={"min-w-40 w-72 rounded-lg"} src={urlImage} alt={title} />  
    </div>
  )
}

export default BigImage