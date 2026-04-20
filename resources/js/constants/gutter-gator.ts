export const LOCATIONS = [
    'Myrtle Beach',
    'North Myrtle Beach',
    'Conway',
    'Carolina Forest',
    'Surfside Beach',
    'Murrells Inlet',
    'Socastee',
    'Loris',
    'Little River',
    'Garden City',
    'Aynor',
    'Longs',
    'Forestbrook',
    'Charleston',
] as const;

export type Location = (typeof LOCATIONS)[number];

export const SERVICES = [
    {
        id: 'installation',
        title: 'Gutter Installation',
        description:
            'We have the experience and skills necessary to tackle your project. Controlling rainwater is our specialty. With Gutter Gator, you can expect professionalism, efficiency and exceptional results.',
    },
    {
        id: 'protection',
        title: 'Gutter Protection',
        description:
            'Looking for a long term solution to clogged gutters? Look no further. This service provides industry leading warranties and guarantees and peace of mind for your gutter system.',
    },
    {
        id: 'cleaning',
        title: 'Gutter Cleaning',
        description:
            'A working gutter system requires clean gutters. We can set up service plans and make changes to your system to make sure it is working as intended when it is completely free of debris.',
    },
    {
        id: 'exterior',
        title: 'Exterior Cleaning',
        description:
            'We have the expertise and equipment to ensure curb appeal is maintained. From roof to sidewalk we have got your project covered with no damage to property or landscaping.',
    },
] as const;

export const CONTACT = {
    phone: '(843) 516-6986',
    phoneRaw: '+18435166986',
    email: 'Guttergatorsc@gmail.com',
    address: '120 Kelsey Ct, Myrtle Beach, SC 29588',
} as const;

export type Service = (typeof SERVICES)[number];
export type ServiceId = Service['id'];
