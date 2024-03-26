import { LoginRequest, LoginResponse, RegisterRequest, AddStashFormDataRequest, User, MemoryProducts, ToDo, AddToDoRequest } from "../types/Api"
import { TableType } from "../types/TableType"
import { TableItem } from "../types/TableItem"
import { useLogin } from "../context/LoginProvider"
import { toast } from 'react-toastify'

const BASE_URL = "https://cimaf.cz/sms/api"

const useApi = () => {
    const { getToken } = useLogin()
    const token = getToken()

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
                toast.success('Úspěšně jsi se přihlásil!')
                return newLoginUser
            } else if(response.status === 404) {
                toast.error("Uživatel nenalezen!")
            } else if(response.status === 401) {
                toast.error("Špatné heslo!")
            } else if(response.status === 500) {
                toast.error("Chyba na backendu!")
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
                toast.success('Uspěšně jsi se zaregistroval!')
                return newRegisterUser
            } else if (response.status === 400) {
                toast.error("Email již existuje!")
            } else if(response.status === 500) {
                toast.error("Chyba na backendu!")
            }
            
        } catch (error) {
            console.error(`Error adding register user: ${error}`)
        }
    }

    const getUser = async (): Promise<User | undefined> => {
        if(token) {
            try {
                const response = await fetch(`${BASE_URL}/user`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
    
                if(response.ok) {
                    const user = await response.json()
                    return user
                } else if (response.status === 401) {
                    toast.error("Chyba na backendu!")
                    console.error("Token není platný!")
                } else if (response.status === 404) {
                    toast.error("Uživatel nenalezen!")
                } else if(response.status === 500) {
                    toast.error("Chyba na backendu!")
                }
                
            } catch (error) {
                console.error(`Error getting stash: ${error}`)
            }
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
                } else {
                    toast.error("Nepodařilo se získat tabulky!")
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
            } else {
                toast.error("Nepodařilo se přidat tabulku!")
            }
            
        } catch (error) {
            console.error(`Error adding stash: ${error}`)
        }
    }

    const deleteOneStash = async (id: number): Promise<boolean | undefined> => {
        try {
            const response = await fetch(`${BASE_URL}/stash/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            if (response.ok) {
                toast.success("Tabulka úspěšně smazána!")
                return true
            } else {
                toast.error("Nepodařilo se smazat tabulku!")
                console.error(`Error deleting OneStash ${id}: ${response.statusText}`)
                return true
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
            if (response.ok) {
                const addProduct = await response.json()
                return addProduct
            } else {
                toast.error("Produkt se nepodařilo přidat!")
            }
        } catch (error) {
            console.error(`Error adding product: ${error}`)
        }
    }

    const getMemoryProducts = async (): Promise<MemoryProducts | undefined> => {
        if(token) {
            try {
                const response = await fetch(`${BASE_URL}/select`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
    
                if(response.ok) {
                    const memoryProducts = await response.json()
                    return memoryProducts
                } else {
                    toast.error("Produkty pro našeptávač se nepodařilo přidat!")
                }
                
            } catch (error) {
                console.error(`Error getting memoryProducts: ${error}`)
            }
        }
    }

    const getToDo = async (): Promise<ToDo[] | undefined> => {
        if(token) {
            try {
                const response = await fetch(`${BASE_URL}/todo`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
    
                if(response.ok) {
                    const toDo = await response.json()
                    return toDo
                } else if (response.status === 500) {
                    toast.error("Chyba backendu!")
                }
                
            } catch (error) {
                console.error(`Error getting toDo: ${error}`)
            }
        }
    }

    const addToDo = async (data: AddToDoRequest): Promise<ToDo | undefined> => {
        try {
            const response = await fetch(`${BASE_URL}/todo`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify( data )
            })

            if(response.ok) {
                const newToDo = await response.json()
                return newToDo
            } else if (response.status === 500) {
                toast.error("Chyba backendu!")
            }
            
        } catch (error) {
            console.error(`Error adding toDo: ${error}`)
        }
    }

    const deleteToDo = async (id: number): Promise<boolean | undefined> => {
        try {
            const response = await fetch(`${BASE_URL}/todo/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            if (response.ok) {
                toast.success("Produkt byl úspěšně smazán ze seznamu!")
                return true
            } else {
                toast.success("Produkt se nepodařilo smazat ze seznamu!")
                console.error(`Error deleting ToDo ${id}: ${response.statusText}`)
                return true
            }
        } catch (error) {
            console.error(`Error deleting ToDo ${id}: ${error}`)
        }
    }
    
    return ({ loginRequest, registerRequest, getUser, getStash, addStash, deleteOneStash, addProduct, getMemoryProducts, getToDo, addToDo, deleteToDo })
}

export default useApi
