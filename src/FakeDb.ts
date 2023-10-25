interface User {
    username: string;
    password: string;
}

const users: User[] = [
    {
        username: 'fefo',
        password: 'idk'
    },
    {
        username: 'devynn',
        password: 'admin'
    },
    {
        username: 'jun',
        password: 'admin'
    },
    {
        username: 'brian',
        password: 'admin'
    },
    {
        username: 'jill',
        password: 'admin'
    },
    {
        username: 'jessie',
        password: 'admin'
    },
    {
        username: 'wendy',
        password: 'admin'
    },
    {
        username: 'ingrid',
        password: 'admin'
    },

    
    
];

export function checkCredentials(username: string, password: string): boolean {
    return users.some(user => user.username === username && user.password === password);
}
