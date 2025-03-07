import React from 'react'
import { Box, Typography, Avatar, TextField, Button } from '@mui/material';
import run from './../assets/images/run.png'
import { Link } from 'react-router-dom' 
import { useState } from 'react';

function LoginRunner() {
  //สร้าง state (ค่าใน component ที่จะเอาไปใช้งานหรือค่าที่สามารถเปลี่ยนแปลงได้) 
  const [runnerUsername, setRunnerUsername] = useState('');
  const [runnerPassword, setRunnerPassword] = useState('');

  //สร้างฟังก์ชันเพื่อจัดการการกดปุ่ม Login
  const handleLoginClick = async (e) => {
    e.preventDefault();    

    //validate ui
    if(runnerUsername === '' || runnerPassword === ''){      
      alert('กรุณากรอกข้อมูลให้ครบ');
      return;
    }

    //ส่งข้อมูลไปตรวจสอบ DB
    try{
      const response = await fetch(`http://localhost:3030/runner/${runnerUsername}/${runnerPassword}`, {
        method: 'GET',
      })

      if(response.status === 200){
        // alert('ถูกต้องจ้าาาาาา');
        //ก่อนที่จะเปิดไป เราจะเอาข้อมูลของผู้ใช้เก็บใน localStorage
        const responseData = await response.json();
        localStorage.setItem('runner', JSON.stringify(responseData["data"])); 

        window.location.href = '/run/runofrunner';
      }else if(response.status === 404){
        alert('ผู้ใช้ไม่ถูกต้องจ้าาาา');
      }else{
        alert('Login ไม่สําเร็จ ลองใหม่อีกครั้ง');        
      }
      
    }catch(error){
      alert(`พบปัญหาในการทำงาน ลองใหม่อีกครั้ง หรือติดต่อผู้ดูแล : ${error}`);
    }
  }

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ width: '60%', boxShadow: 2, mx: 'auto', mt: 10, py: 5 }}>
          <Typography variant='h3' sx={{ textAlign: 'center', color: '#011474' }}>
            เข้าใช้งาน<br />Running Web Application
          </Typography>
          <Avatar alt="Running" src={run} variant='rounded' sx={{ mx: 'auto', mt: 3, width: 120, height: 120, boxShadow: 2 }} />
          <Box sx={{width:'60%', mx:'auto', mt: 3}}>
            <Typography>
              ป้อนชื่อผู้ใช้
            </Typography>
            <TextField variant='outlined' fullWidth sx={{mt: 2, mb: 2}} label='Username'
                       value={runnerUsername} onChange={(e) => setRunnerUsername(e.target.value)}/>
            <Typography>
              ป้อนรหัสผ่าน
            </Typography>
            <TextField variant='outlined' fullWidth sx={{mt: 2, mb: 4}} type='password' label='Password'
                       value={runnerPassword} onChange={(e) => setRunnerPassword(e.target.value)}/>
            <Button variant='contained' fullWidth sx={{pt: 2, pb: 2, backgroundColor: '#011474'}}
                    onClick={handleLoginClick}>
              Login
            </Button>
            <Typography sx={{mt: 4, textAlign: 'center'}}>
              ยังไม่มีบัญชีผู้ใช้?  
              <Typography sx={{display:'inline', ml:1}}>
                <Link to='/runner/registerrunner' style={{textDecoration:'none', color:'#ff0000'}}>
                  ลงทะเบียน
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