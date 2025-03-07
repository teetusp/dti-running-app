import React from 'react'
import { AppBar, Box, Toolbar, Typography, Button, Avatar } from '@mui/material';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import RunCircleIcon from '@mui/icons-material/RunCircle';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Person from './../assets/images/person.png';

function RunOfRunner() {
  const [runnerName, setRunnerName] = useState('');
  const [runnerImage, setRunnerImage] = useState('');
  const [runnerId, setRunnerId] = useState(''); //เอาไว้เก็บรหัสนักวิ่ง
  const [runData, setRunData] = useState([]); //เอาไว้เก็บข้อมูลการวิ่งที่ดึงมาจาก DB

  useEffect(() => {
    //อ่านข้อมูลจาก localStorage
    const runner = JSON.parse(localStorage.getItem('runner'));

    //เอาข้อมูลที่อ่านจาก localStorage ไปกำหนดให้กับ state
    setRunnerName(runner.runnerName);
    setRunnerImage(runner.runnerImage);
    setRunnerId(runner.runnerId);

    //ดึงข้อมูลการวิ่งของนักวิ่งจากฐานข้อมูล
    try {
      const getData = async () => {
        const response = await fetch(`http://localhost:3030/run/${runner.runnerId}`, {
          method: 'GET',
        })

        if(response.status === 200){
          const result = await response.json();
          console.log(result);
          setRunData(result);
        }
      }

      getData();
    } catch (error) {
      alert(`พบปัญหาในการทำงาน ลองใหม่อีกครั้ง หรือติดต่อผู้ดูแล : ${error}`);
    }

  }, [])


  return (
    <>
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
              {runnerName} {runnerId}
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
        <Box sx={{ width: '60%', boxShadow: 2, mx: 'auto', my: 10, py: 5, px: 10 }}>
          <Typography variant='h5' sx={{ textAlign: 'center', color: '#011474' }}>
            การวิ่งของฉัน<br />Running Web Application
          </Typography>

          {/* โค้ดเอาข้อมูลการวิ่งของนักวิ่งมาแสดง */}

          <Button variant='contained' fullWidth component={Link} to='/run/addrunofrunner'
            sx={{ pt: 2, pb: 2, backgroundColor: '#011474' }}>
            เพิ่มข้อมูลการวิ่งของฉัน
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default RunOfRunner