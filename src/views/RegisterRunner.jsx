import React from 'react'

function RegisterRunner() {
  return (
    <>
    <Box sx={{ width: '100%'}}>
      <Box sx={{width :'60%', boxShadow: 2, mx: 'auto',mt: 10, py: 5}}>
        <Typography variant='h3' sx={{textAlign: 'center', color: '#0006c0'}}>
          ลงทะเบียนผู้ใช้ <br/>Running Wep Application
        </Typography>
        <Avatar alt="Running" src={run} variant='rounded' sx={{mx:'auto', mt: 3, width: 120, height: 120, boxShadow: 2}}/>
        <Box sx={{width:'60%', mx: 'auto', mt: 3}}>
          <Typography >
            ป้อนชื่อ-นามสกุล
          </Typography>
          <TextField variant='outlined' fullWidth sx={{mt: 2 ,mb: 2}}/>
          <Typography >
            ป้อนชื่อผู้ใช้
          </Typography>
          <TextField variant='outlined' fullWidth sx={{mt: 2 ,mb: 2}}/>
          <Typography >
            ป้อนรหัสผ่าน
          </Typography>
          <TextField variant='outlined' fullWidth sx={{mt: 2, mb: 4}} type='password' label='Password'/>
        
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button variant='outlined' fullWidth sx={{pt: 2, pb: 2, backgroundColor: '#0006c0'}}>
              ลงทะเบียน
            </Button>
            <Button variant='outlined' fullWidth sx={{pt: 2, pb: 2, backgroundColor: '#0006c0'}}>
              ยกเลิก
            </Button>
          </Stack>

          <Typography sx={{mt: 2, textAlign: 'center'}}>
            มีบัญชีผู้ใช้แล้ว?
            <Typography sx={{display: 'inline', ml: 1}}>
              <Link to ='/runner/LoginRunner' style={{textDecoration: 'none', color: '#c80000'}}>
                กลับสู่เข้าหน้า Login
              </Link>  
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Box>
  </>
  )
}

export default RegisterRunner