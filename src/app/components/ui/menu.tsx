
import { faBox, faTruck, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from "next/link";

export default function Menu() {
    return (

        <nav className="">
            <Link className="flex items-center space-x-2 p-4 text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded w-full" href="/">
                <FontAwesomeIcon icon={faBox} className="size-4" />
                <span>Entregas</span>
            </Link>

            <Link className="flex items-center space-x-2 p-4 text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded w-full" href="/truck">
                <FontAwesomeIcon icon={faTruck} className="size-4" />
                <span>Caminhões</span>
            </Link>

            <Link className='flex items-center space-x-2 p-4 text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded w-full' href="/driver">
                <FontAwesomeIcon icon={faUser} className="size-4" />
                <span>Motoristas</span>
            </Link>
        </nav>
    );
}