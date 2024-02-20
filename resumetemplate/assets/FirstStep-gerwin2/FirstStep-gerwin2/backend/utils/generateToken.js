import jwt from 'jsonwebtoken'

const generateToken = (email, res) => {
    const user = { email }
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '7d'
    })

    res.cookie('access_token', accessToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000
    })
}

export default generateToken