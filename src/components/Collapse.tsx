import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { PropsWithChildren } from 'react'

interface CollapseProps {
  name: string
}

const Collapse = ({children, name}: PropsWithChildren<CollapseProps>) => {
  return (
    <Accordion sx={{
                // bgcolor: 'background.paper',
                // boxShadow: 1,
                // borderRadius: 1,
                minWidth: 400,
                maxWidth: 900,
              }}>
        <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
        >
            <Typography>{name}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{
                // bgcolor: 'background.paper',
                // boxShadow: 1,
                // borderRadius: 1,
                // width: 900,
              }}>
                {children}             
        </AccordionDetails>
    </Accordion>
  )
}

export default Collapse
