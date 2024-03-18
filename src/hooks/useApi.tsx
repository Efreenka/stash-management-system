import { LoginRequest, LoginResponse, RegisterRequest, AddStashFormDataRequest } from "../types/Api"
import { TableType } from "../types/TableType"
import { TableItem } from "../types/TableItem"

const BASE_URL = "https://cimaf.cz"

const useApi = (token: string) => {
    const loginRequest = async (loginData: LoginRequest): Promise<LoginResponse | undefined> => {
        try {
            const response = await fetch(`${BASE_URL}/login`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( loginData )
            })

            if(response.ok) {
                const newLoginUser = await response.json()
                return newLoginUser
            } else if(response.status === 404) {
                console.error("Uživatel nenalezen!")
            } else if(response.status === 401) {
                console.error("Špatné heslo!")
            } else if(response.status === 500) {
                console.error("Chyba na backendu!")
            }
            
        } catch (error) {
            console.error(`Error post login user: ${error}`)
        }
    }

    const registerRequest = async (registerData: RegisterRequest): Promise<RegisterRequest | undefined> => {
        try {
            const response = await fetch(`${BASE_URL}/register`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( registerData )
            })

            if(response.ok) {
                const newRegisterUser = await response.json()
                return newRegisterUser
            } else if (response.status === 400) {
                console.error("Email již existuje!")
            } else if(response.status === 500) {
                console.error("Chyba na backendu!")
            }
            
        } catch (error) {
            console.error(`Error adding register user: ${error}`)
        }
    }

    const getStash = async (): Promise<TableType[] | undefined> => {

        if(token) {
            try {

                const response = await fetch(`${BASE_URL}/stash`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
    
                if(response.ok) {
                    const stash = await response.json()
                    return stash
                }
                
            } catch (error) {
                console.error(`Error getting stash: ${error}`)
            }
        }
    }

    const addStash = async (data: AddStashFormDataRequest): Promise<TableType | undefined> => {
        try {
            const response = await fetch(`${BASE_URL}/stash`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify( data )
            })

            if(response.ok) {
                const newStash = await response.json()
                return newStash
            }
            
        } catch (error) {
            console.error(`Error adding stash: ${error}`)
        }
    }

    const deleteOneStash = async (id: number): Promise<void> => {
        try {
            const response = await fetch(`${BASE_URL}/stash/${id}`, {
                method: 'DELETE'
            })
            if (response.ok) {
                console.log(`OneStash ${id} deleted successfully.`)
            } else {
                console.error(`Error deleting OneStash ${id}: ${response.statusText}`)
            }
        } catch (error) {
            console.error(`Error deleting OneStash ${id}: ${error}`)
        }
    }

    const addProduct = async (id: number, items: TableItem[]): Promise<TableItem[] | undefined> => {
        try {
            const response = await fetch(`${BASE_URL}/stash/${id}/items`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ items })
            })
            const addProduct = await response.json()
            return addProduct
        } catch (error) {
            console.error(`Error adding product: ${error}`)
        }
    }
    
    
    return ({ loginRequest, registerRequest, getStash, addStash, deleteOneStash, addProduct })
}

export default useApi
