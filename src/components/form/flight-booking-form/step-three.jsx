// import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
// import { useFormContext } from 'react-hook-form';
// import { countries } from 'src/assets/data';
// import { Field } from 'src/components/hook-form'; 

// const StepThree = () => {
//   const {
//     control,
//     formState: { errors },
//   } = useFormContext(); 
//   return (
//     <>
//       <Box>
//         <h3>Billing Information</h3>

//         <Box display="flex" gap={2} sx={{ padding: 2 }}>
//           <Field.Text
//             label="Address"
//             name="stepThree.address"
//             error={errors?.stepThree?.address?.message}
//           />
//           <Field.Text label="City" name="stepThree.city" error={errors?.stepThree?.city?.message} />
//         </Box>

//         <Box display="flex" gap={2} sx={{ padding: 2 }}>
//           <Field.Select name="stepThree.country" label="Country">
//             <MenuItem value="">select</MenuItem>
//             {countries.map((item) => (

//             <MenuItem value={item.code}>{item.label}</MenuItem>
//             ))}
//           </Field.Select>
//         </Box>

//         <Box display="flex" gap={2} sx={{ padding: 2 }}>
//           <Field.Text
//             label="State"
//             name="stepThree.state"
//             error={errors?.stepThree?.state?.message}
//           />
//           <Field.Text
//             label="Postal/Zip Code"
//             name="stepThree.postalCode"
//             error={errors?.stepThree?.postalCode?.message}
//           />
//           <Field.Text
//             label="Billing Phone"
//             name="stepThree.billingPhone"
//             error={errors?.stepThree?.billingPhone?.message}
//           />
//         </Box>
//       </Box>
//     </>
//   );
// };

// export default StepThree;
