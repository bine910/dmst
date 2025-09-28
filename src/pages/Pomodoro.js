import { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteIcon from "@mui/icons-material/Delete";

const theme = createTheme({
  palette: {
    primary: {
      main: "#7B1FA2", // Tím đậm cho nút chính
    },
    secondary: {
      main: "#AB47BC", // Tím hồng cho gradient
    },
    background: {
      default: "#FFFFFF", // Nền trắng
      paper: "#FAFAFA", // Nền giấy nhẹ
    },
    text: {
      primary: "#212121", // Chữ đen
      secondary: "#757575", // Chữ xám
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "20px", // Bo tròn nút
          textTransform: "none", // Không uppercase
        },
      },
    },
  },
});

function Pomodoro() {
  const [focusTime, setFocusTime] = useState(25); // phút mặc định
  const [shortBreakTime, setShortBreakTime] = useState(5); // phút short break
  const [longBreakTime, setLongBreakTime] = useState(15); // phút long break
  const [longBreakInterval, setLongBreakInterval] = useState(4); // số Pomodoro trước long break
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("focus"); // "focus", "shortBreak", "longBreak"
  const [pomodoroCount, setPomodoroCount] = useState(0); // Đếm số Pomodoro hoàn thành
  const [showSettings, setShowSettings] = useState(false);
  const [tasks, setTasks] = useState([]); // Danh sách nhiệm vụ
  const [currentTask, setCurrentTask] = useState(null); // Nhiệm vụ hiện tại
  const [addTaskText, setAddTaskText] = useState(""); // Input cho nhiệm vụ mới
  const [estimate, setEstimate] = useState(1); // Ước lượng Pomodoro cho nhiệm vụ
  const [completedTime, setCompletedTime] = useState(0); // Thời gian focus đã hoàn thành (phút)
  const [alarm] = useState(new Audio("https://www.soundjay.com/buttons/beep-07.mp3")); // Âm thanh alarm (thay bằng URL thực tế)

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      alarm.play(); // Phát âm thanh khi hết giờ
      handleModeSwitch();
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, mode, focusTime, shortBreakTime, longBreakTime, pomodoroCount]);

  const handleModeSwitch = () => {
    if (mode === "focus") {
      setPomodoroCount((prev) => prev + 1);
      setCompletedTime((prev) => prev + focusTime); // Cập nhật thời gian hoàn thành
      completePomodoroForTask();
      if ((pomodoroCount + 1) % longBreakInterval === 0) {
        setMode("longBreak");
        setTimeLeft(longBreakTime * 60);
      } else {
        setMode("shortBreak");
        setTimeLeft(shortBreakTime * 60);
      }
    } else {
      setMode("focus");
      setTimeLeft(focusTime * 60);
    }
  };

  const formatTime = (sec) => {
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleSaveSettings = () => {
    setIsRunning(false);
    setMode("focus");
    setTimeLeft(focusTime * 60);
    setPomodoroCount(0);
    setShowSettings(false);
  };

  const addTask = () => {
    if (addTaskText.trim()) {
      setTasks([...tasks, { text: addTaskText, estimate, completed: 0 }]);
      setAddTaskText("");
      setEstimate(1);
    }
  };

  const selectTask = (index) => {
    setCurrentTask(index);
  };

  const completePomodoroForTask = () => {
    if (currentTask !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[currentTask].completed += 1;
      setTasks(updatedTasks);
    }
  };

  const progress = ((focusTime * 60 - timeLeft) / (focusTime * 60)) * 100; // Progress bar cho focus

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ maxWidth: 600, mx: "auto", textAlign: "center", p: 2 }}>
        <Typography variant="h4" gutterBottom>
          Pomodoro Box
        </Typography>
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h5" gutterBottom>
            {mode === "focus" ? "Focus Time" : mode === "shortBreak" ? "Short Break" : "Long Break"}
          </Typography>
          <Typography variant="h2" gutterBottom>
            {formatTime(timeLeft)}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={mode === "focus" ? progress : 0}
            sx={{ height: 10, borderRadius: 5, mb: 2 }}
          />
          <Typography variant="body1" color="text.secondary">
            Pomodoro #{pomodoroCount + 1}
          </Typography>
          {currentTask !== null && (
            <Typography variant="body1" color="text.secondary">
              Task: {tasks[currentTask].text} ({tasks[currentTask].completed}/{tasks[currentTask].estimate})
            </Typography>
          )}
        </Paper>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsRunning(!isRunning)}
            sx={{
              background: "linear-gradient(45deg, #AB47BC 30%, #7B1FA2 90%)",
              color: "white",
            }}
          >
            {isRunning ? "Pause" : "Start"}
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              setIsRunning(false);
              handleModeSwitch();
            }}
          >
            Skip
          </Button>
          <IconButton color="primary" onClick={() => setShowSettings(true)}>
            <SettingsIcon />
          </IconButton>
        </Box>

        <Dialog open={showSettings} onClose={() => setShowSettings(false)}>
          <DialogTitle>Settings</DialogTitle>
          <DialogContent>
            <TextField
              label="Focus (minutes)"
              type="number"
              InputProps={{ inputProps: { min: 1 } }}
              value={focusTime}
              onChange={(e) => setFocusTime(Number(e.target.value))}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Short Break (minutes)"
              type="number"
              InputProps={{ inputProps: { min: 1 } }}
              value={shortBreakTime}
              onChange={(e) => setShortBreakTime(Number(e.target.value))}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Long Break (minutes)"
              type="number"
              InputProps={{ inputProps: { min: 1 } }}
              value={longBreakTime}
              onChange={(e) => setLongBreakTime(Number(e.target.value))}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Long Break after (pomodoros)"
              type="number"
              InputProps={{ inputProps: { min: 1 } }}
              value={longBreakInterval}
              onChange={(e) => setLongBreakInterval(Number(e.target.value))}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowSettings(false)}>Cancel</Button>
            <Button onClick={handleSaveSettings} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>

        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Tasks
          </Typography>
          <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
            <TextField
              placeholder="Add task..."
              value={addTaskText}
              onChange={(e) => setAddTaskText(e.target.value)}
              fullWidth
            />
            <TextField
              type="number"
              InputProps={{ inputProps: { min: 1 } }}
              placeholder="Estimate"
              value={estimate}
              onChange={(e) => setEstimate(Number(e.target.value))}
              sx={{ width: 100 }}
            />
            <Button variant="contained" color="primary" onClick={addTask}>
              Add
            </Button>
          </Box>
          <List>
            {tasks.map((task, index) => (
              <ListItem
                key={index}
                button
                onClick={() => selectTask(index)}
                selected={currentTask === index}
              >
                <ListItemText
                  primary={`${task.text} (${task.completed}/${task.estimate})`}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" onClick={() => setTasks(tasks.filter((_, i) => i !== index))}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Paper>

        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Report
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Completed focus time today: {completedTime} minutes
          </Typography>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}

export default Pomodoro;