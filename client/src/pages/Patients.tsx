import React, { useState } from 'react'
import PatientsList from '../components/patients/List'
import { useQuery } from '@tanstack/react-query'
import { getPatients } from '../api/patients'
import { Box, CardActionArea, CardContent, Skeleton, Stack, Typography } from '@mui/material'
import Layout from '../components/layouts/Layout'
import UseModal from '../components/Modal'
import PatientForm from '../components/patients/Form'

function PatientsPage() {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { data: patients, isLoading, error } = useQuery({ queryKey: ['patients'], queryFn: getPatients })

  return (
    <Layout>
      <CardContent className='card-content'>
        <Stack spacing={2}>
          <Stack spacing={2} direction={'row'}>
            <Typography variant="h5" component="div">
              Welcome to the patient registration app
            </Typography>
            <UseModal open={open} handleOpen={handleOpen} handleClose={handleClose} openModalText='Register new patient'>
              <PatientForm onRegisterSuccess={handleClose} />
            </UseModal>
          </Stack>

          {isLoading
            ? <Stack>
              <Skeleton height={40} />
              <Skeleton height={40} />
              <Skeleton height={40} />
            </Stack>
            : error ? <Typography variant="body2" color="text.secondary">Opps, something happened</Typography>
              : !patients || patients?.length === 0
                ? <Stack>
                  <Typography variant="h6" color="text.secondary">Register your first patient!</Typography>
                  <Skeleton height={40} />
                  <Skeleton height={40} />
                  <Skeleton height={40} />
                </Stack>
                : <PatientsList patients={patients} />
          }
        </Stack>
      </CardContent>
    </Layout>

  )
}

export default PatientsPage