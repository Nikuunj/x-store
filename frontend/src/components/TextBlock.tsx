
type VariantType = "default" | "sell" | "detail" | "denger" | 'signin'
export interface TextBlockProps {
    variant: VariantType;
    size: "sm" | "md" | "lg";
    textSize: "sm" | "md" | "lg";
    text: string | number;
    onClick?: () => void;
}

function TextBlock({ variant, size, textSize, text, onClick } : TextBlockProps) {

    const styleVariant = {
        default: 'hover:bg-amber-500 hover:text-zinc-700',
        sell: 'outline-1 outline-emerald-800 hover:bg-emerald-900  cursor-pointer',
        detail: 'outline-1 outline-indigo-600 hover:bg-indigo-900  cursor-pointer',
        denger: 'outline-1 outline-red-800/60 hover:bg-red-800/60  cursor-pointer',
        signin: 'outline-1 outline-emerald-800 hover:bg-emerald-900/55 cursor-pointer'
    }

    const boxSizeStyle = {
        sm: "py-0.5 lg:py-1 px-2",
        md: "py-2 px-4",
        lg: "py-4 px-4",
    }


    const textSizeStyle = {
        sm: 'text-sm',
        md: 'text-md',
        lg: 'text-xl',
    }

    const defaultStyle: string = 'transition-all duration-300 ';
    
    return (
        <div className={`${styleVariant[variant]} ${defaultStyle} ${boxSizeStyle[size]}  ${textSizeStyle[textSize]}`}  
        onClick={onClick}
        >
            {text}
        </div>
    )
}

export default TextBlock