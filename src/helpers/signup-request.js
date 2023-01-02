export const signup = async (email, password) => {
    try {
        const response = await fetch('http://localhost:3001/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        return await response.json()

    } catch (error) {
        console.error(error);
    }
};