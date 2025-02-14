import React from "react";
import { Box, Typography, Avatar, TextField, Button } from "@mui/material";
import run from "./../assets/images/run.png";
import person from "./../assets/images/person.png";
import { Link } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/system";
import { useState } from "react";

function RegisterRunner() {
  //สร้าง state เพื่อเก็บไฟล์รูป
  const [runnerImage, setRunnerImage] = useState(null)
  const [runnerName , setRunnerName] = useState('')
  const [runnerUsername , setRunnerUsername] = useState('')
  const [runnerPassword , setRunnerPassword] = useState('') 

  //กำหนด style ให้กับปุ่มเลือกไฟล์รูป
  const SelectFile = styled('input')({
    clip:'ract(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    whiteSpace: 'nowrap',
    width: 1
})

  //ฟังก์ชันจัดการเลือกไฟล์รูป
  const handleImageFile = (e) => {
    const file = e.target.files[0]
    if(file){
      setRunnerImage(file);
    }
  };

  //ฟังก์ชันเรียกใช้ API เพื่อส่งข้อมูลไปยังฐานข้อมูล
  const handleRegisterClick = async (e) => {
    e.preventDefault();
    //validate UI
    if(runnerName === '' || runnerUsername === '' || runnerPassword === ''){
      alert('กรุณากรอกข้อมูลให้ครบ')
      return;
    }
    //ส่งข้อมูลไปบันทึกลง DB
  const formData = new FormData();
  formData.append('runnerName', runnerName);
  formData.append('runnerUsername', runnerUsername);
  formData.append('runnerPassword', runnerPassword);
  if(runnerImage){
    formData.append('runnerImage', runnerImage);
  }
  try{
    const response = await fetch('http://localhost:3030/runner/', {
      method: 'POST',
      body: formData
    })
    if(response.status === 201){
      alert('ลงทะเบียนผู้ใช้สําเร็จ');
      window.location.href = '/';
    }else{
      alert('ลงทะเบียนไม่สําเร็จ ลองใหม่อีกครั้ง');
    }

  }catch(err){
    alert(`พบปัญหาในการทำงาน ลองใหม่อีกครั้ง หรือติดต่อผู้ดูแล : ${error}`)
  }
}
  return (
      <>
      <Box sx={{ width: '100%'}}>
        <Box sx={{width :'60%', boxShadow: 2, mx: 'auto',my: 10, py: 5}}>
          <Typography variant='h3' sx={{textAlign: 'center', color: '#0006c0'}}>
            ลงทะเบียนผู้ใช้ <br/>Running Wep Application
          </Typography>
          <Avatar alt="Running" src={run} variant='rounded' sx={{mx:'auto', mt: 3, width: 120, height: 120, boxShadow: 2}}/>
          <Box sx={{width:'60%', mx: 'auto', mt: 3}}>
            <Typography >
              ป้อนชื่อ
            </Typography>
            <TextField variant='outlined' fullWidth sx={{mt: 2 ,mb: 2}}
              label='Fullname' value={runnerName} onChange={(e) => setRunnerName(e.target.value)}/>
            <Typography >
              ป้อนชื่อผู้ใช้
            </Typography>
            <TextField variant='outlined' fullWidth sx={{mt: 2 ,mb: 2}}
              label='Username' value={runnerUsername} onChange={(e) => setRunnerUsername(e.target.value)}/>
            <Typography >
              ป้อนรหัสผ่าน
            </Typography>
            <TextField variant='outlined' fullWidth sx={{mt: 2, mb: 4}} type='password'
              label='Password' value={runnerPassword} onChange={(e) => setRunnerPassword(e.target.value)}/>
            {/************************************ */}
            <Avatar alt="Runner" variant="rounded" sx={{mx:'auto', mt: 3, width: 120, height: 120, boxShadow: 2, p:2}}
              src={runnerImage ? URL.createObjectURL(runnerImage) : person}/>
            <Box sx ={{display:'flex', justifyContent: 'center'}}>
              <Button sx={{py: 2}} variant='contained' component ='label' color='success' startIcon={<CloudUploadIcon />} >
                Select File Upload
                <SelectFile type ="file" accept="image/*" onChange={handleImageFile}/>
              </Button>
            </Box>
            {/************************************ */}
            <Box sx={{ display: "flex", gap: "2%", mt: "1%", mb: "5%" }}>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  pt: "3%",
                  pb: "3%",
                  backgroundColor: "primary.main",
                  color: "white",
                }}
                onClick={handleRegisterClick}
              >
                Register
              </Button>
              <Button
                variant="outlined"
                fullWidth
                sx={{
                  pt: "3%",
                  pb: "3%",
                  borderColor: "primary.main",
                  color: "primary.main",
                }}
                component={Link}
                to="/"
              >
                Cancel
              </Button>
            </Box>
              <Typography sx={{ mt: "1%", textAlign: "center" }}>
                มีบัญชีผู้ใช้แล้ว?
                <Typography sx={{ display: "inline", ml: "2%" }}>
                  <Link
                    to="/" style={{ textDecoration: "none", color: "#ff0000" }}>
                    เข้าใช้งาน
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