
type VariantType = "default" | "sell" | "detail" 
export interface TextBlockProps {
    variant: VariantType;
    text: string | number;
    onClick?: () => void;
}

function TextBlock({ variant, text, onClick } : TextBlockProps) {

    const styleVariant = {
        default: 'hover:bg-amber-500 hover:text-zinc-700',
        sell: 'outline-1 outline-emerald-800 hover:bg-emerald-900  cursor-pointer',
        detail: 'outline-1 outline-indigo-600 hover:bg-indigo-900  cursor-pointer'
    }

    const defaultStyle: string = 'px-2 transition-all duration-300 py-0.5 lg:py-1';
    
    return (
        <div className={`${styleVariant[variant]} ${defaultStyle} `}  
        onClick={onClick}
        >
            {text}
        </div>
    )
}

export default TextBlock