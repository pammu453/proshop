import bcrypt from 'bcryptjs'

const users = [
    {
        name: "Admin User",
        email: "admin@gmail.com",
        password: bcrypt.hashSync("1234", 10),
        isAdmin: true
    },
    {
        name: "Pramod Savant",
        email: "pramodsavant@gmail.com",
        password: bcrypt.hashSync("1234", 10),
        isAdmin: false
    },
    {
        name: "Amar KS",
        email: "amarks@gmail.com",
        password: bcrypt.hashSync("1234", 10),
        isAdmin: false
    },
]

export default users