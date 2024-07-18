export type SidebarItemProps = {
    icon: React.ForwardRefExoticComponent<
        Omit<React.SVGProps<SVGSVGElement>, 'ref'> & React.RefAttributes<SVGSVGElement>
    >;
    label: string;
    href: string;
    subCategory?: {
        icon: React.ForwardRefExoticComponent<
            Omit<React.SVGProps<SVGSVGElement>, 'ref'> & React.RefAttributes<SVGSVGElement>
        >;
        label: string;
        href: string;
    }[];
};
