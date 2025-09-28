import { useState, useEffect } from "react";
import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
  createViewDay,
  createViewWeek,
  createViewMonthGrid,
  createViewMonthAgenda,
} from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import { createDragAndDropPlugin } from "@schedule-x/drag-and-drop";
import { createEventModalPlugin } from "@schedule-x/event-modal";
import "@schedule-x/theme-default/dist/index.css";

import { Temporal } from "@js-temporal/polyfill";
import moment from "moment";
import "./schedule.css";


// ✅ MUI Components
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker as MuiDatePicker, TimePicker as MuiTimePicker } from "@mui/x-date-pickers";
import { TextField, Button, List, ListItem, ListItemText, IconButton, Checkbox, ListItemIcon } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from "dayjs";

// Đảm bảo Temporal sẵn sàng
if (!window.Temporal) {
  window.Temporal = Temporal;
}

export default function Schedule() {
  const eventsService = useState(() => createEventsServicePlugin())[0];

  const [Events, setEvents] = useState(() => {
    const storedEvents = localStorage.getItem("Events");
    if (!storedEvents) return [];
    try {
      return JSON.parse(storedEvents).map((event) => ({
        ...event,
        start: Temporal.ZonedDateTime.from(event.start),
        end: Temporal.ZonedDateTime.from(event.end),
      }));
    } catch (error) {
      console.error("Lỗi khi đọc sự kiện từ localStorage:", error);
      return [];
    }
  });

  const [title, setTitle] = useState("");
  const [date, setDate] = useState(null);
  const [starttime, setStarttime] = useState("");
  const [endtime, setEndtime] = useState("");

  // State mới để track các event đã check (dùng Set cho nhanh)
  const [checkedEvents, setCheckedEvents] = useState(new Set());

  // Toggle check cho event
  const toggleCheck = (id) => {
    setCheckedEvents((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const calendar = useCalendarApp({
    views: [
      createViewDay(),
      createViewWeek(),
      createViewMonthGrid(),
      createViewMonthAgenda(),
    ],
    events: Events,
    plugins: [
      eventsService,
      createDragAndDropPlugin(),
      createEventModalPlugin(),
    ],
    callbacks: {
      onEventUpdate: (updatedEvent) => {
        console.log("Event updated via drag & drop (new):", updatedEvent);
        
        const updatedEventCopy = {
          ...updatedEvent,
          start: Temporal.ZonedDateTime.from(updatedEvent.start.toString()),
          end: Temporal.ZonedDateTime.from(updatedEvent.end.toString()),
        };
        
        setEvents((prev) => {
          const newEvents = prev.map((e) => (e.id === updatedEventCopy.id ? updatedEventCopy : e));
          console.log("Updated Events state:", newEvents);
          return newEvents;
        });
        
        eventsService.update(updatedEventCopy);
      },
    },
  });

  // ✅ Thêm sự kiện
  const addEvent = () => {
    if (!title || !date || !starttime || !endtime) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    const dateStr = moment(date).format("YYYY-MM-DD");
    const startDateTimeStr = `${dateStr}T${starttime}:00+07:00[Asia/Ho_Chi_Minh]`;
    const endDateTimeStr = `${dateStr}T${endtime}:00+07:00[Asia/Ho_Chi_Minh]`;

    try {
      const newEvent = {
        id: String(Date.now()),
        title,
        start: Temporal.ZonedDateTime.from(startDateTimeStr),
        end: Temporal.ZonedDateTime.from(endDateTimeStr),
      };
      setEvents((prev) => {
        const updatedEvents = [...prev, newEvent];
        eventsService.set(updatedEvents);
        return updatedEvents;
      });
      console.log("Event added:", newEvent);
      setTitle("");
      setDate(null);
      setStarttime("");
      setEndtime("");
    } catch (error) {
      console.error("Lỗi khi thêm sự kiện:", error);
      alert("Lỗi định dạng ngày giờ. Vui lòng kiểm tra lại!");
    }
  };

  // ✅ Xóa sự kiện
  const deleteEvent = (id) => {
    eventsService.remove(id); // Xóa từ service trước
    setEvents((prev) => prev.filter((e) => e.id !== id));
    setCheckedEvents((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  // ✅ Lưu vào localStorage
  useEffect(() => {
    const eventsForStorage = Events.map((event) => ({
      ...event,
      start: event.start.toString(),
      end: event.end.toString(),
    }));
    localStorage.setItem("Events", JSON.stringify(eventsForStorage));
  }, [Events]);

  useEffect(() => {
    console.log("Events state changed, syncing to service:", Events);
    eventsService.set(Events);
  }, [Events, eventsService]);

  // Hàm định dạng thời gian
  const formatTime = (dateTime) => {
    const hour = dateTime.hour.toString().padStart(2, '0');
    const minute = dateTime.minute.toString().padStart(2, '0');
    return `${hour}:${minute}`;
  };

  const formatDate = (dateTime) => {
    const day = dateTime.day.toString().padStart(2, '0');
    const month = dateTime.month.toString().padStart(2, '0');
    const year = dateTime.year;
    return `${day}/${month}/${year}`;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div style={{ padding: "20px" }}>
        <h2>📅 To-do-list</h2>
        <div className="schedule-container">

        <div className="schedule-side">

        {/* Form nhập liệu với MUI */}
        <div style={{ display: "flex", flexDirection: "column", gap: "15px", maxWidth: "400px", marginBottom: "20px" }}>
          <TextField
            label="Tên sự kiện"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            variant="outlined"
            size="small"
          />
          <MuiDatePicker
            label="Chọn ngày"
            value={date ? dayjs(date) : null}
            onChange={(newValue) =>
              setDate(newValue ? newValue.format("YYYY-MM-DD") : null)
            }
            slotProps={{ textField: { size: "small" } }}
          />
          <MuiTimePicker
            label="Giờ bắt đầu"
            value={starttime ? dayjs(starttime, "HH:mm") : null}
            onChange={(newValue) =>
              setStarttime(newValue ? newValue.format("HH:mm") : "")
            }
            slotProps={{ textField: { size: "small" } }}
          />
          <MuiTimePicker
            label="Giờ kết thúc"
            value={endtime ? dayjs(endtime, "HH:mm") : null}
            onChange={(newValue) =>
              setEndtime(newValue ? newValue.format("HH:mm") : "")
            }
            slotProps={{ textField: { size: "small" } }}
          />
          <Button variant="contained" color="primary" onClick={addEvent}>
            Thêm sự kiện
          </Button>
        </div>

        {/* Danh sách event với Checkbox và gạch ngang */}
        <List>
          {Events.map((event) => {
            const isChecked = checkedEvents.has(event.id);
            return (
              <ListItem
                key={event.id}
                disablePadding
                secondaryAction={
                  <IconButton edge="end" aria-label="delete" onClick={() => deleteEvent(event.id)}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={isChecked}
                    onChange={() => toggleCheck(event.id)}
                    tabIndex={-1}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText
                  primary={event.title}
                  secondary={`${formatTime(event.start)} -> ${formatTime(event.end)} ${formatDate(event.start)}`}
                  primaryTypographyProps={{
                    style: {
                      textDecoration: isChecked ? 'line-through' : 'none',
                    },
                  }}
                  secondaryTypographyProps={{
                    style: {
                      textDecoration: isChecked ? 'line-through' : 'none',
                    },
                  }}
                />
              </ListItem>
            );
          })}
        </List>
        </div>

        {/* Calendar */}<div className="schedule-calendar">

        <ScheduleXCalendar calendarApp={calendar} />
        </div>
        </div>
      </div>
    </LocalizationProvider>
  );
}