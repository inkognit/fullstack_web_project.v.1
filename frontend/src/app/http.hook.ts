import { useCallback, useState } from "react"


export const useHTTP = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState(null);

    const request = useCallback(async (
        url: string,
        method: "GET" | "POST" = "GET",
        body: any = null,
        headers = method === "POST" ? { "Content-Type": "application/json" } : { "Content-Type": "text/json" }
    ) => {
        setLoading(true)
        try {
            const response = await fetch(url, {
                method,
                body: JSON.stringify(body),
                headers,
            })
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data || 'Что-то пошло не так')
            }
        } catch (error: any) {
            setError(error.message)
            throw error
        } finally {
            setLoading(false)
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