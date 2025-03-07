import React from 'react' 
import { AppBar, Box, Toolbar, Typography, Button, Avatar, TextField } from '@mui/material';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import RunCircleIcon from '@mui/icons-material/RunCircle';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Person from './../assets/images/person.png';
import run from './../assets/images/run.png'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

function AddRunOfRunner() {
  const [runnerName, setRunnerName] = useState('');
  const [runnerImage, setRunnerImage] = useState('');
  const [runnerId, setRunnerId] = useState('');

  const [dateRun, setDateRun] = useState('');
  const [distanceRun, setDistanceRun] = useState('');
  const [placeRun, setPlaceRun] = useState('');
  const [runImage, setRunImage] = useState(null);

  useEffect(() => {
    //อ่านข้อมูลจาก localStorage
    const runner = JSON.parse(localStorage.getItem('runner'));

    //เอาข้อมูลที่อ่านจาก localStorage ไปกำหนดให้กับ state
    setRunnerName(runner.runnerName);
    setRunnerImage(runner.runnerImage);
    setRunnerId(runner.runnerId);
  }, [])

  //กำหนด style ให้กับปุ่มเลือกไฟล์รูป
  const SelectFile = styled("input")({
    clip: "rect(0 0 0 0)",
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
    if (file) {
      setRunImage(file);
    }
  }

  //ฟังก์ชันบันทึกข้อมูลการวิ่ง
  const handleSaveRunClick = async (e) => {
    e.preventDefault();

    //validate ui
    if( dateRun === '' || distanceRun === '' || placeRun === '') {
      alert('กรุณากรอกข้อมูลให้ครบ');
      return;
    }

    //ส่งข้อมูลไปบันทึกลง DB
    //เอาข้อมูลที่จะส่งไปเก็บ FormData
    const formData = new FormData();
    formData.append('runnerId', runnerId);
    formData.append('dateRun', dateRun);
    formData.append('distanceRun', distanceRun);
    formData.append('placeRun', placeRun);
    if (runImage) {
      formData.append('runImage', runImage);
    }
    //ส่งข้อมูลไปผ่าน API ที่กำหนดไว้ที่ Back-end
    try{
      //ส่งไปบันทึก
      const response = await fetch('http://localhost:3030/run/', {
        method: 'POST',
        body: formData,       
        headers: {
          'Accept': 'application/json',
        }, 
      })

      //เช็คสถานะการส่งไป
      if(response.status === 201){
        alert('บันทึกการวิ่งสําเร็จ');
        window.location.href = '/run/runofrunner';
      }else{
        alert('บันทึกการวิ่งไม่สําเร็จ ลองใหม่อีกครั้ง')
      }
    }catch(error){
      alert(`พบปัญหาในการทำงาน ลองใหม่อีกครั้ง หรือติดต่อผู้ดูแล : ${error}`);
    }
  }

  return (
    <>  {/* React Fragment */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: '#ff0000' }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <RunCircleIcon />
            </IconButton>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              Run of Runner by Ninnin DTI-SAU
            </Typography>
            <Typography variant="h6" >
              {runnerName}
            </Typography>
            <Avatar alt="Runner"
              src={runnerImage === '' ? Person : `http://localhost:3030/images/runner/${runnerImage}`}
              sx={{ width: 50, height: 50, ml: 2 }} />
            <Link to="/" style={{ textDecoration: 'none', color: 'green', marginLeft: '10px' }}>
              Logout
            </Link>
          </Toolbar>
        </AppBar>
      </Box>

      <Box sx={{ width: '100%' }}>
        <Box sx={{ width: '60%', boxShadow: 2, mx: 'auto', my: 10, py: 5 }}>
          <Typography variant='h5' sx={{ textAlign: 'center', color: '#011474' }}>
            เพิ่มข้อมูลการวิ่ง<br />Running Web Application
          </Typography>
          <Avatar alt="Running" src={run} variant='rounded' sx={{ mx: 'auto', mt: 3, width: 120, height: 120, boxShadow: 2 }} />
          <Box sx={{ width: '60%', mx: 'auto', mt: 3 }}>
            <Typography>
              ป้อนวันที่วิ่ง
            </Typography>
            <TextField variant='outlined' fullWidth sx={{ mt: 2, mb: 2 }}
              label='ป้อนวันที่วิ่ง' value={dateRun} onChange={(e) => setDateRun(e.target.value)} />
            <Typography>
              ระยะทางที่วิ่ง
            </Typography>
            <TextField variant='outlined' fullWidth sx={{ mt: 2, mb: 2 }}
              label='ระยะทางที่วิ่ง' value={distanceRun} onChange={(e) => setDistanceRun(e.target.value)} />
            <Typography>
              สถานที่วิ่ง
            </Typography>
            <TextField variant='outlined' fullWidth sx={{ mt: 2, mb: 4 }} 
              label='สถานที่วิ่ง' value={placeRun} onChange={(e) => setPlaceRun(e.target.value)} />
            {/* --------------------------- */}
            <Avatar alt="Run" variant='rounded'
              sx={{ mx: 'auto', mb: 3, width: 150, height: 150, boxShadow: 2, p: 2 }}
              src={runImage ? URL.createObjectURL(runImage) : Person} />

            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }} >
              <Button sx={{ py: 2 }} variant='contained' component='label' color='success'
                startIcon={<CloudUploadIcon />} >
                Select file upload
                <SelectFile type="file" accept="image/*" onChange={handleImageFile} />
              </Button>
            </Box>
            {/* --------------------------- */}
            <Button variant='contained' fullWidth onClick={handleSaveRunClick}
              sx={{ pt: 2, pb: 2, backgroundColor: '#011474' }}
            >
              บันทึกการวิ่ง
            </Button>
            <Typography sx={{ ml: 1, mt: 2, textAlign: 'center' }}>
              <Link to='/run/runofrunner' style={{ textDecoration: 'none', color: '#ff0000' }}>
                กลับไปหน้าการวิ่งของฉัน
              </Link>
            </Typography>
          </Box>

        </Box>
      </Box>


    </>
  )
}

export default AddRunOfRunner


