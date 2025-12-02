// import { Box, Typography } from '@mui/material';
// import { useFormContext } from 'react-hook-form';
// import { Field } from 'src/components/hook-form';
// import useUserPermissions, { useUserDetails } from 'src/hooks/use-user';
// import { EyeOff } from 'lucide-react';

// const StepFour = ({ showPayment = true }) => {
//   const {
//     formState: { errors },
//   } = useFormContext();

//   return (
//     <Box sx={{ p: 2 }}>
//       <h3>Payment Info</h3>

//       {!showPayment ? (
//         <Box textAlign="center" sx={{ mt: 3 }}>
//           <EyeOff size={60} color="gray" />
//           <Typography variant="h6" sx={{ mt: 2, color: 'gray' }}>
//             You don’t have permission to view payment details.
//           </Typography>
//           <Box sx={{ mt: 4 }}>
//             <Field.Text
//               label="Comment"
//               name="stepFour.comment"
//               multiline
//               rows={4}
//               error={errors?.stepFour?.comment?.message}
//             />
//           </Box>
//         </Box>
//       ) : (
//         <>
//           <Field.Checkbox
//             label="Payment Link Available"
//             name="stepFour.paymentlink"
//             error={errors?.stepFour?.paymentlink?.message}
//           />

//           <Box display="flex" gap={2} sx={{ padding: 2 }}>
//             <Field.Text
//               label="Card Type"
//               name="stepFour.cardType"
//               error={errors?.stepFour?.cardType?.message}
//             />
//             <Field.Text
//               label="Cardholder Name"
//               name="stepFour.cardholderName"
//               error={errors?.stepFour?.cardholderName?.message}
//             />
//             <Field.Text
//               label="Card Number"
//               name="stepFour.cardNumber"
//               type="text"
//               error={errors?.stepFour?.cardNumber?.message}
//             />
//           </Box>

//           <Box display="flex" gap={2} sx={{ padding: 2 }}>
//             <Field.Text
//               label="Exp Month"
//               name="stepFour.expMonth"
//               error={errors?.stepFour?.expMonth?.message}
//             />
//             <Field.Text
//               label="Exp Year"
//               name="stepFour.expYear"
//               error={errors?.stepFour?.expYear?.message}
//             />
//             <Field.Text
//               label="CVV Number"
//               name="stepFour.cvvNumber"
//               error={errors?.stepFour?.cvvNumber?.message}
//             />
//           </Box>

//           <Box sx={{ padding: 2 }}>
//             <Field.Text
//               label="Comment"
//               name="stepFour.comment"
//               multiline
//               rows={4}
//               error={errors?.stepFour?.comment?.message}
//             />
//           </Box>
//         </>
//       )}
//     </Box>
//   );
// };

// export default StepFour;
