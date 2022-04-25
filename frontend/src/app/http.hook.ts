import { useCallback, useState } from "react"


export const useHTTP = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState(null);

    const request = useCallback(async (
        url: string,
        method: "GET" | "POST" = "GET",
        body?,
        headers?
    ) => {
        setLoading(true)
        try {
            if (body) {
                body = JSON.stringify(body)
                headers = {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                }
            }

            const response = await fetch(url, {
                method,
                body,
                headers,
            })
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data || 'Что-то пошло не так')
            }
            setLoading(false)
            return data
        } catch (error: any) {
            setLoading(false)
            setError(error.message)
            throw error
        }
    }, [])

    const clearError = () => setError(null)
    return {
        request,
        clearError,
        loading,
        error
    }
}