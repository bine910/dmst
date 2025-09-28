import React from 'react';
import AnnaNaming from '../images/Anna.png';
import WomanImg from '../images/woman.jpg';
import { Grid, Card, CardContent, Typography, Button, Avatar, Box, Chip, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const GradientButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(to right, #9c27b0, #673ab7)',
  borderRadius: 50,
  color: 'white',
  padding: '8px 24px',
}));

const PinkBubble = styled(Paper)(({ theme }) => ({
  borderRadius: 20,
  padding: '8px 16px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  backgroundColor: '#f8e1f4',
  maxWidth: 200,
  textAlign: 'center',
}));

export default function VideoCallUI() {
  return (
    <Grid container spacing={10} justifyContent="center" alignItems="center" sx={{ minHeight: '100vh', backgroundColor: '#fff', p: 4 }}>
      {/* Left Column */}
      <Grid item xs={12} md={4}>
        <Card sx={{ 
          borderRadius: 4,
          boxShadow: 3,
          pt: 12,
          pb:12,
          pl:4,
          pr:4
             }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ 
              mb: 2,
              fontFamily: "ABeeZee",
              fontWeight: "400",
              fontStyle: "Regular",
              fontSize: "12px",
              leadingTrim: "NONE",
              lineHeight: "100%",
              letterSpacing: "0px",

               }}>
              You are about to start video call with Anna.
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center" sx={{
               mb: 4,
               fontFamily: "ABeeZee",
              fontWeight: "400",
              fontStyle: "Regular",
              fontSize: "12px",
              leadingTrim: "NONE",
              lineHeight: "100%",
              letterSpacing: "0px",
               }}>
              Anna values her time at $2.5/min.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
              <Avatar
                src={WomanImg}
                sx={{ width: 120, height: 120 }}
                alt="Anna"
              />
            </Box>
            <Typography variant="body2" color="text.secondary" align="center" sx={{
               mb: 4,
               fontFamily: "ABeeZee",
              fontWeight: "400",
              fontStyle: "Regular",
              fontSize: "12px",
              leadingTrim: "NONE",
              lineHeight: "100%",
              letterSpacing: "0px",
               }}>
              You have $15.00 available in your account.
            </Typography>
            <Box sx={{ 
              display: 'flex', justifyContent: 'center'
              }}>
              <GradientButton sx={{
                boxShadow: "0px 4px 13px 0px rgba(0, 0, 0, 0.25)",
                background: "linear-gradient(90deg, #A6607C 0%, #33266E 100%)",

              }}>START VIDEO CALL</GradientButton>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Right Column */}
      <Grid item xs={12} md={8}>
        <Box sx={{ 
          position: 'relative', 
          height: { xs: 400, md: 500 }, 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          minWidth: { xs: '100%', md: 600 },
          overflow: 'visible'
        }}>
          {/* Pink Background Circle */}
          <Box
            sx={{
              position: 'absolute',
              width: { xs: 300, md: 500 },
              height: { xs: 300, md: 500 },
              borderRadius: '50%',
              backgroundColor: 'rgba(223, 172, 178, 1)',
              opacity: 0.8,
              zIndex: 0,
              top: { xs: 50, md: 0 },
              left: { xs: '50%', md: 'auto' },
              transform: { xs: 'translateX(-50%)', md: 'none' },
            }}
          />

          {/* Main Image - Moved up to have half head outside the circle */}
          <Box sx={{ 
            position: 'relative', 
            zIndex: 1,
            top: { xs: -80, md: -130 }  // Adjust negative top to push image up, revealing half head outside
          }}>
            <Box
              component="img"
              src={AnnaNaming}
              alt="Woman on phone"
              sx={{
                width: { xs: 200, md: 300 },
                height: { xs: 300, md: 400 },
                objectFit: 'cover',
                borderRadius: 20
              }}
            />
           <Typography 
              variant="body2" 
              sx={{ 
                position: 'absolute', 
                top: 12, 
                right: -8, 
                zIndex: 3, 
                display: 'flex', 
                alignItems: 'center',
                color: 'text.primary'
              }}
            >
              Active Today
              <Box 
                sx={{ 
                  ml: 0.5, 
                  width: 8, 
                  height: 8, 
                  borderRadius: '50%', 
                  backgroundColor: 'success.main' 
                }} 
              />
            </Typography>
          </Box>

          {/* Feature Bubbles - Pushed further out to sit on/ outside the circle's edge */}
          <PinkBubble sx={{ 
            position: 'absolute', 
            top: { xs: -10, md: -20 },  // Pushed up
            left: { xs: -50, md: -50 },  // Pushed left
            zIndex: 2,
            maxWidth: { xs: 150, md: 200 },
            background: "linear-gradient(101.93deg, rgba(255, 255, 255, 0.4) 8.83%, rgba(252, 252, 254, 0.1) 96.96%)",
            backdropFilter: "blur(40px)"
          }}>
            <Typography variant="body1" sx={{
               fontWeight: 'bold',
               
               }}>
              Find connections effortlessly
            </Typography>
            <Typography variant="body2" color="error">
              our 95% reply rate
            </Typography>
          </PinkBubble>

          <PinkBubble sx={{ 
            position: 'absolute', 
            bottom: { xs: -20, md: 120 },  // Pushed down
            left: { xs: -50, md: -30 },  // Pushed left
            zIndex: 2,
            maxWidth: { xs: 150, md: 200 },
            background:" rgba(250, 249, 254, 1)"
          }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              Enjoy 1:1 Chat
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Use our discrete chat, audio and video calls anytime anywhere!
            </Typography>
          </PinkBubble>

          <PinkBubble sx={{ 
            position: 'absolute', 
            top: { xs: -20, md: -30 },  // Pushed up
            right: { xs: -50, md: -30 },  // Pushed right
            zIndex: 2,
            maxWidth: { xs: 150, md: 200 },
            background: "linear-gradient(101.93deg, rgba(255, 255, 255, 0.4) 8.83%, rgba(252, 252, 254, 0.1) 96.96%)",
            backdropFilter: "blur(40px)"
          }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              Share a drink
            </Typography>
            <Typography variant="body2" color="text.secondary">
              It’s free to try! Get spoiled or spoil your flirtatious fling
            </Typography>
          </PinkBubble>

          <PinkBubble sx={{ 
            position: 'absolute', 
            bottom: { xs: -20, md: 180 },  // Pushed down
            right: { xs: -50, md: 10 },  // Pushed right
            zIndex: 2,
            maxWidth: { xs: 150, md: 200 },
            background:" rgba(236, 232, 255, 1)",
          }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              It’s free to try!
            </Typography>
            <Typography variant="body2" color="text.secondary">
              No credit card required
            </Typography>
          </PinkBubble>
        </Box>
      </Grid>
    </Grid>
  );
}