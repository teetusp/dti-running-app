import React from 'react'
import { Box, Typography, Avatar, TextField, Button} from '@mui/material';
import run from './../assets/run.png'
import { Link } from 'react-router-dom';

function LoginRunner() {
  return (
    <>
      <Box sx={{ width: '100%'}}>
        <Box sx={{width :'60%', boxShadow: 2, mx: 'auto',mt: 10, py: 5}}>
          <Typography variant='h3' sx={{textAlign: 'center', color: '#0006c0'}}>
            เข้าใช้งาน <br/>Running Wep Application
          </Typography>
          <Avatar alt="Running" src={run} variant='rounded' sx={{mx:'auto', mt: 3, width: 120, height: 120, boxShadow: 2}}/>
          <Box sx={{width:'60%', mx: 'auto', mt: 3}}>
            <Typography >
              ป้อนชื่อผู้ใช้
            </Typography>
            <TextField variant='outlined' fullWidth sx={{mt: 2 ,mb: 2}}/>
            <Typography >
              ป้อนรหัสผ่าน
            </Typography>
            <TextField variant='outlined' fullWidth sx={{mt: 2, mb: 4}} type='password' label='Password'/>
            <Button variant='contained' fullWidth sx={{pt: 2, pb: 2, backgroundColor: '#0006c0'}}>
              Login
            </Button>
            <Typography sx={{mt: 2, textAlign: 'center'}}>
              ยังไม่มีบัญชีผู้ใช้?
              <Typography sx={{display: 'inline', ml: 1}}>
                <Link to ='/runner/registerrunner' style={{textDecoration: 'none', color: '#c80000'}}>
                  ลงทะเบียนผู้ใช้
                </Link>  
              </Typography>
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default LoginRunner