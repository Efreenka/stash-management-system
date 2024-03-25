import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { PropsWithChildren } from 'react'

interface CollapseProps {
  name: string
  deleteStash: () => void
}

const Collapse = ({children, name, deleteStash}: PropsWithChildren<CollapseProps>) => {
  return (
    <Accordion sx={{
                minWidth: 250,
                maxWidth: 880,
              }}>
        <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
        >
          <div className='flex flex-row items-center gap-3'>
            <Typography>{name}</Typography>
              <Tooltip title={`Smazat tabulku ${name}`}>
                <IconButton onClick={deleteStash}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
          </div>
        </AccordionSummary>
        <AccordionDetails >
                {children}             
        </AccordionDetails>
    </Accordion>
  )
}

export default Collapse
