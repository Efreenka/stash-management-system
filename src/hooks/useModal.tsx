import { useState } from "react"

const useModal = () => {
    const [openModal, setOpenModal] = useState<boolean>(false)

    const handleOpen = () => setOpenModal(true)
  
    const handleClose = () => setOpenModal(false)
    
    return ({ openModal, handleOpen, handleClose })
}

export default useModal
