import React from 'react'
import { Patient } from '../../types'
import { Accordion, AccordionDetails, AccordionSummary, Alert, Avatar, Box, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { STORAGE_URL } from '../../constants';


function PatientInfo({ patient }: { patient: Patient }) {
  return (
    <TableContainer className='patientsTable'>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Phone number</TableCell>
            <TableCell align="center">Verified</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow
            key={patient.name}
          >
            <TableCell component="th" scope="patient" align="center">{patient.email}</TableCell>
            <TableCell align="center">{patient.country_code} {patient.phone_number}</TableCell>
            <TableCell align="center"><Alert severity={patient.email_verified_at ? 'success' : 'warning'}>{patient.email_verified_at ? 'Verified' : 'Not verified'}</Alert></TableCell>
          </TableRow>

        </TableBody>
      </Table>
    </TableContainer>
  );
}

function PatientsList({ patients }: { patients: Patient[] | undefined }) {
  return (
    !patients || patients?.length === 0
      ? <p>No patients to show</p>
      : <Box minHeight={200}>
        {patients.map(patient => (
          <Accordion key={patient.id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Stack direction={'row'} alignItems={'center'} spacing={4} width={200}>
                <Avatar alt={patient.name + '-photo'} src={`${STORAGE_URL}/${patient.document_photo}`} />
                <Typography sx={{ width: '20%', flexShrink: 0 }}>
                  {patient.name}
                </Typography>
              </Stack>
            </AccordionSummary>
            <AccordionDetails style={{ padding: 0 }}>
              <PatientInfo patient={patient} />
            </AccordionDetails>
          </Accordion>
        ))}

      </Box>
  )
}

export default PatientsList