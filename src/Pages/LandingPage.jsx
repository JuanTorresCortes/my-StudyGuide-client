import React from 'react';
import RegisterForm from '../components/RegisterForm';
import { Box, Typography } from '@mui/material';

const LandingPage = () => {
  return (
    <Box 
      style={{
        height: "100vh",
        width: "56em",
        backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <Box 
        display="flex" 
        flexDirection="column" 
        justifyContent="center" 
        alignItems="center" 
        px={2}
      >
        <Box height='26em' width="90%" maxWidth={450} bgcolor="white" p={5} mt={8} borderRadius="16px">
          <RegisterForm />
        </Box>
      </Box>
    </Box>
  );
}

export default LandingPage;


//     <Box 
//       style={{
//         height: "100vh",
//         width: "100vw",
//         background: `linear-gradient(white 60%, transparent), url(https://source.unsplash.com/random?wallpapers) center/cover no-repeat`
//     </Box>
//   );
// }

