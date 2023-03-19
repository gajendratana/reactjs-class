import React, { useEffect, useState } from 'react'
const url = 'https://api.github.com/users/QuincyLarson'

const FetchData = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const [user, setUser] = useState(null)


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const resp = await fetch(url)
                if (!resp.ok) {
                    setIsError(true)
                    setIsLoading(false)
                    return
                }

                const user = await resp.json()
                setUser(user)
            }
            catch (err) {
                console.log(err)
                setIsError(true)
            }
        }

        fetchUser()
    })

    if (isLoading) {
        return <h2> Loading.....</h2>
    }

    if (isError) {
        return <h2>Page cannot be found....</h2>
    }

    const { avatar_url, bio, name, company } = user
    return (
        <div>
            <img src={avatar_url} alt={name} />
            <h2>{name}</h2>
            <h4>Works at {company}</h4>
            <p>{bio}</p>
        </div>
    )
}

export default FetchData
