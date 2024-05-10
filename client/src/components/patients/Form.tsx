import { useQueryClient } from '@tanstack/react-query';
import { Patient, PatientFields } from '../../types'
import { APP_URL } from '../../constants';
import { errorNotify } from '../../utils';

import { Box, Button, Stack, Paper, TextField, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { styled } from '@mui/material/styles';

import { useForm, SubmitHandler, FieldErrors, Controller } from "react-hook-form"
import { ToastContainer, Bounce } from 'react-toastify';
import Dropzone from 'react-dropzone'
import { useState } from 'react';

const StyledDropzone = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: `2px dashed ${theme.palette.primary.main}`,
  padding: theme.spacing(2),
  textAlign: 'center',
  cursor: 'pointer',
  color: theme.palette.text.secondary,
}));

function PatientForm({ onRegisterSuccess }: { onRegisterSuccess: () => void }) {
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<PatientFields>()

  const queryClient = useQueryClient();
  const onSubmit: SubmitHandler<PatientFields> = async ({ name, email, address, phoneNumber, countryCode, documentPhoto }) => {
    const formData = new FormData();
    if (documentPhoto && documentPhoto.length > 0) {
      formData.append("document_photo", documentPhoto[0], documentPhoto[0].name);
    }

    formData.append('country_code', countryCode);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('address', JSON.stringify(address));
    formData.append('phone_number', phoneNumber);

    try {
      setLoading(true)
      const res = await fetch(`${APP_URL}/api/patients`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body: formData
      })

      const data = await res.json()

      if (res.status === 200 || res.status === 201) {
        onRegisterSuccess()
        queryClient.setQueryData(['patients'], (oldData: any) => [...oldData, data]);
      } else if (res.status === 422) {
        const { errors } = data
        Object.keys(errors).forEach((key) => {
          errors[key].forEach((errorMessage: string) => errorNotify(key, errorMessage))
        })
      }

    } catch (error) {
      console.log("ERROR: ", error)
    } finally {
      setLoading(false)
    }
  }

  const onError = (errors: FieldErrors<PatientFields>) => {
    const errorsKeys = Object.keys(errors) as Array<keyof typeof errors>;
    console.error('Form errors:', errors);
    errorsKeys.forEach((field) => {
      const errorMessage = errors[field]?.message;
      if (errorMessage) {
        errorNotify(field, errorMessage);
      }
    });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
        stacked
      />
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit, onError)}
      >

        <Stack spacing={2}>
          <Stack direction="row" className='stack' spacing={2}>
            <TextField
              {...register("name", {
                required: "Name is required",
                pattern: {
                  value: /^[a-zA-Z\s]*$/,
                  message: "Name can only include letters and spaces"
                }
              })}
              error={!!errors.name}
              id="outlined-error-helper-text"
              label={errors.name ? 'Error' : 'Name'}
              defaultValue="Jhon"
              helperText={errors.name ? errors.name.message : ''}
            />

            <TextField
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@gmail\.com$/,
                  message: "Email must be a valid Gmail address"
                }
              })}
              error={!!errors.email}
              id="outlined-error-helper-text"
              label={errors.email ? 'Error' : 'Email'}
              defaultValue="@gmail.com"
              helperText={errors.email ? errors.email.message : ''}
            />
          </Stack>

          <Stack direction="row" spacing={2}>
            <TextField
              label="Country Code"
              variant="outlined"
              {...register("countryCode", {
                required: "Country code is required",
                pattern: {
                  value: /^\+\d{1,4}$/,
                  message: "Country code must be in the format +123"
                }
              })}
              defaultValue={"+1"}
              error={!!errors.countryCode}
              helperText={errors.countryCode ? errors.countryCode.message : ''}
            />

            <TextField
              label="Phone Number"
              variant="outlined"
              {...register("phoneNumber", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Phone number must be numeric"
                }
              })}
              defaultValue={123456}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber ? errors.phoneNumber.message : ''}
            />
          </Stack>

          <Stack direction={'row'} spacing={2}>
            <TextField
              {...register("address.country")}
              error={!!errors.address?.country}
              id="outlined-error-helper-text"
              defaultValue="US"
              helperText={errors.address?.country ? errors.address?.country.message : ''}
              label="Country"
            />

            <TextField
              {...register("address.city",)}
              error={!!errors.address?.city}
              id="outlined-error-helper-text"
              defaultValue="New York"
              helperText={errors.address?.city ? errors.address?.city.message : ''}
            />

            <TextField
              {...register("address.state")}
              error={!!errors.address?.state}
              id="outlined-error-helper-text"
              defaultValue=""
              helperText={errors.address?.state ? errors.address?.state.message : ''}
              label="State"
            />

            <TextField
              {...register("address.zipCode")}
              error={!!errors.address?.zipCode}
              id="outlined-error-helper-text"
              defaultValue=""
              helperText={errors.address?.zipCode ? errors.address?.zipCode.message : ''}
              label="Zip Code"
            />
          </Stack>

          <TextField
            {...register("address.street")}
            error={!!errors.address?.street}
            id="outlined-error-helper-text"
            defaultValue=""
            helperText={errors.address?.street ? errors.address?.street.message : ''}
            label="Street"
            fullWidth
          />

            <Controller
              control={control}
              name="documentPhoto"
              rules={{
                required: "A document photo is required",
                validate: {
                  isJpg: files => files?.[0] && files[0].type === 'image/jpeg' || "Only JPG files are allowed"
                }
              }}
              render={({ field: { onChange, onBlur, value, name, ref }, fieldState: { error } }) => (
                <Dropzone
                  onDrop={(acceptedFiles) => onChange(acceptedFiles)}
                  accept={{
                    'image/jpeg': ['.jpg'],
                  }}
                >
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <StyledDropzone variant="outlined" {...getRootProps()}>
                        <input {...getInputProps()} />
                        <Typography variant="body1">
                          {value ? value[0].name : "Drag 'n' drop some files here, or click to select files"}
                        </Typography>
                      </StyledDropzone>
                      {error && <Typography color={'red'} variant='body1' align='center'>{error.message}</Typography>}
                    </section>
                  )}
                </Dropzone>
              )}
            />

            <Button variant="contained" type='submit' endIcon={<SendIcon />} disabled={loading}>
              REGISTER
            </Button>
        </Stack>

      </Box>
    </>
  )
}

export default PatientForm