"use client"

import { faBox, faTruck, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from "next/link";
import { usePathname } from 'next/navigation';

type Props = {
    label: string;
    icon: IconDefinition;
    href: string;
    active?: boolean;
}

export default function NavItem({label, icon, href, active}: Props) {   
    
    const pathName = usePathname();
    const isPath = pathName === href;

    return (
            <Link className={`flex items-center gap-6 p-3 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded w-full ${active || isPath ? 'font-semibold' : 'text-gray-700'}`} href={href}>
                <FontAwesomeIcon icon={icon} className="size-4" />
                <span>{label}</span>
            </Link>
    );
}