import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { PropsWithChildren } from 'react'

interface TheModalProps {
    open: boolean,
    close: () => void,
    name: string
}

const TheModal = ({open, close, children, name}: PropsWithChildren<TheModalProps>) => {

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        minWidth: 300,
        bgcolor: 'background.paper',
        boxShadow: 2,
        borderRadius: 4,
        textAlign: "center",
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        p: 4,
    }

    return (
        <>
            <Modal
                open={open}
                onClose={(close)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h4" component="h1">
                        {name}
                    </Typography>
                    {children}
                </Box>
            </Modal>
        </>


    )
}

export default TheModal
