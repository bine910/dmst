import React from "react";
import {
  Box,
  Grid,
  Card,
  Paper,
  CardContent,
  Typography,
  Button,
  Avatar,
  Chip,
} from "@mui/material";

export default function HomeScreen() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#fff",
        px: 4,
        py: 6,
      }}
    >
      <Grid container spacing={4}>
        {/* BÊN TRÁI */}
        <Grid item xs={12} md={5}>
          <Paper
            elevation={3}
            sx={{
              width: "100%",
              height: "100%",
              borderRadius: "10px",
              p: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="body2" sx={{ color: "#4A4A4A", mb: 1 }}>
              You are about to start video call with Anna.
            </Typography>
            <Typography variant="body2" sx={{ color: "#939393", mb: 4 }}>
              Anna values her time at $2.5/min.
            </Typography>

            <Avatar
              src="/anna.jpg"
              alt="Anna"
              sx={{
                width: 250,
                height: 250,
                mb: 4,
              }}
            />

            <Typography variant="body2" sx={{ color: "#4A4A4A", mb: 3 }}>
              You have $1500 available in your account.
            </Typography>

            <Button
              fullWidth
              sx={{
                background: "linear-gradient(90deg, #A6607C 0%, #33266E 100%)",
                color: "#fff",
                borderRadius: "62px",
                textTransform: "none",
                fontSize: "14px",
                py: 1.5,
                boxShadow: "0px 4px 13px rgba(0,0,0,0.25)",
                "&:hover": {
                  background: "linear-gradient(90deg, #8d4f67 0%, #261d54 100%)",
                },
              }}
            >
              START VIDEO CALL
            </Button>
          </Paper>
        </Grid>

        {/* BÊN PHẢI */}
        <Grid item xs={12} md={7}>
          <Box
    sx={{
      position: "relative",
      width: 400,
      height: 400,
      borderRadius: "50%",
      bgcolor: "#f8d7da", // màu hồng nhạt
    }}
  >
    {/* Card 1 */}
    <Paper
      sx={{
        position: "absolute",
        top: "10%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 160,
        p: 2,
      }}
    >
      <Typography variant="subtitle1">Share a drink</Typography>
      <Typography>🍹 It’s free to try!</Typography>
    </Paper>

    {/* Card 2 */}
    <Paper
      sx={{
        position: "absolute",
        bottom: "15%",
        left: "20%",
        transform: "translate(-50%, 50%)",
        width: 160,
        p: 2,
      }}
    >
      <Typography variant="subtitle1">It’s free to try!</Typography>
      <Typography>No credit card required</Typography>
    </Paper>

    {/* Card 3 */}
    <Paper
      sx={{
        position: "absolute",
        top: "30%",
        right: "5%",
        transform: "translate(50%, -50%)",
        width: 160,
        p: 2,
      }}
    >
      <Typography variant="subtitle1">Find connections</Typography>
      <Typography>Enjoy 1:1 chat</Typography>
    </Paper>
  </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
