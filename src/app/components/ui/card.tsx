import { promises } from "dns";

type Props = {
    title: string;
    value: string;
    percentage: string
    period: string 
    percentageColor: number
}

export default function Card({title, value, percentage, period, percentageColor}: Props) {
    return (
        <div className="bg-white p-4">
            <h3 className="text-sm font-semibold text-gray-600">{title}</h3>
            <p className="text-2xl font-bold mt-2">{value}</p>
            <div className="flex items-center mt-2">
                <span className={`text-sm bg-green-100 ${percentageColor == 1 ? 'bg-green-100 text-green-700' : ' bg-red-100 text-red-700'} rounded-full px-2 py-1 mr-2`}>{percentage}</span>
                <span className="text-sm text-gray-500">{period}</span>
            </div>
        </div>
    );
}