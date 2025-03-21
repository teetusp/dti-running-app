import React from 'react'
import { Box, Typography, Avatar, TextField, Button } from '@mui/material';
import run from './../assets/images/run.png'
import person from './../assets/images/person.png'
import { Link } from 'react-router-dom'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

function RegisterRunner() {
  //สร้าง state (ค่าใน component ที่จะเอาไปใช้งานหรือค่าที่สามารถเปลี่ยนแปลงได้) เพื่อเก็บไฟล์รูป
  const [runnerImage, setRunnerImage] = useState(null);
  const [runnerName, setRunnerName] = useState('');
  const [runnerUsername, setRunnerUsername] = useState('');
  const [runnerPassword, setRunnerPassword] = useState('');

  //กำหนด style ให้กับปุ่มเลือกไฟล์รูป
  const SelectFile = styled("input")({
    clip:"rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  })

  //ฟังก์ชันจัดการการเลือกไฟล์รูป
  const handleImageFile = (e) => {
    const file = e.target.files[0];
    if(file){
      setRunnerImage(file);
    }    
  }

  //ฟังก์ชันเรียกใช้ API เพื่อส่งข้อมูลไปบันทึกลง DB
  const handleRegisterClick = async (e) => {
    e.preventDefault();

    //validate ui
    if(runnerName === '' || runnerUsername === '' || runnerPassword === ''){
      alert('กรุณากรอกข้อมูลให้ครบ');
      return;
    }

    //ส่งข้อมูลไปบันทึกลง DB
    //เอาข้อมูลที่จะส่งไปเก็บ FormData
    const formData = new FormData();    
    formData.append('runnerName', runnerName);
    formData.append('runnerUsername', runnerUsername);
    formData.append('runnerPassword', runnerPassword);
    if(runnerImage  ){
      formData.append('runnerImage', runnerImage);
    }
    //ส่งข้อมูลไปผ่าน API ที่กำหนดไว้ที่ Back-end
    try{
      //ส่งไปบันทึก
      const response = await fetch('http://localhost:4444/runner/', {
        method: 'POST',
        body: formData,        
      })

      //เช็คสถานะการส่งไป
      if(response.status === 201){
        alert('ลงทะเบียนสําเร็จ');
        window.location.href = '/';
      }else{
        alert('ลงทะเบียนไม่สําเร็จ ลองใหม่อีกครั้ง')
      }
    }catch(error){
      alert(`พบปัญหาในการทำงาน ลองใหม่อีกครั้ง หรือติดต่อผู้ดูแล : ${error}`);
    }    
  }
 
  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ width: '60%', boxShadow: 2, mx: 'auto', my: 10, py: 5 }}>
          <Typography variant='h3' sx={{ textAlign: 'center', color: '#011474' }}>
            ลงทะเบียน<br />Running Web Application
          </Typography>
          <Avatar alt="Running" src={run} variant='rounded' sx={{ mx: 'auto', mt: 3, width: 120, height: 120, boxShadow: 2 }} />
          <Box sx={{ width: '60%', mx: 'auto', mt: 3 }}>
            <Typography>
              ป้อนชื่อ
            </Typography>
            <TextField variant='outlined' fullWidth sx={{ mt: 2, mb: 2 }} 
                      label='Fullname' value={runnerName} onChange={(e) => setRunnerName(e.target.value)}/>
            <Typography>
              ป้อนชื่อผู้ใช้
            </Typography>
            <TextField variant='outlined' fullWidth sx={{ mt: 2, mb: 2 }} 
                      label='Username' value={runnerUsername} onChange={(e) => setRunnerUsername(e.target.value)} />
            <Typography>
              ป้อนรหัสผ่าน
            </Typography>
            <TextField variant='outlined' fullWidth sx={{ mt: 2, mb: 4 }} type='password' 
                      label='Password' value={runnerPassword} onChange={(e) => setRunnerPassword(e.target.value)}/>
            {/* --------------------------- */}
            <Avatar alt="Runner" variant='rounded' 
                    sx={{ mx: 'auto', mb: 3, width: 150, height: 150, boxShadow: 2, p:2 }} 
                    src={ runnerImage ? URL.createObjectURL(runnerImage) : person} />

            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2}} >
              <Button sx={{py:2}} variant='contained' component='label' color='success' 
                      startIcon={<CloudUploadIcon />} >
                Select file upload
                <SelectFile type="file" accept="image/*" onChange={handleImageFile}/>
              </Button>
            </Box>
            {/* --------------------------- */}
            <Button variant='contained' fullWidth 
                    sx={{ pt: 2, pb: 2, backgroundColor: '#011474' }}
                    onClick={handleRegisterClick}>
              ลงทะเบียน
            </Button>
            <Typography sx={{ mt: 4, textAlign: 'center' }}>
              <Typography sx={{ display: 'inline', ml: 1 }}>
                <Link to='/' style={{ textDecoration: 'none', color: '#ff0000' }}>
                  LOGIN
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