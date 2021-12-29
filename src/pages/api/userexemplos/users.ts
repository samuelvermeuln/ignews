import { NextApiRequest, NextApiResponse} from "next"

// JWT(STORAGE)
// NEXT AUTH(SOCIAL)
// COGNITO, AUTH0

export default (request: NextApiRequest, response: NextApiResponse) => {
    const users = [ 
        {'nome':"samuel"},
        {'sobreNome':"santos"}
    ]

    return response.json(users)
}

// CONSEITO DE SERVELESS