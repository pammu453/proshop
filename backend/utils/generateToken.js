import jwt from 'jsonwebtoken'

const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "30d" })

    //Set JWT as HTTP_Only cookie
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,//30 days
        domain: "https://659818c729d2ab1263ca10f4--peppy-lamington-5a1956.netlify.app",
    })
}

export default generateToken