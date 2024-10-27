type Props = {
    placeholder: string;
    value?: string;
    onChange?: (newValue: string) => void;
}

export default function Input({placeholder, value, onChange}: Props){
    return(
        <input           
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange && onChange(e.target.value)}
        />
    );
}