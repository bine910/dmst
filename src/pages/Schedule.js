import { useState, useEffect } from "react";
import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
  createViewDay,
  createViewWeek,
  createViewMonthGrid,
  createViewMonthAgenda,
} from "@schedule-x/calendar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import { createDragAndDropPlugin } from "@schedule-x/drag-and-drop";
import "@schedule-x/theme-default/dist/index.css";
import moment from "moment";
import { createEventModalPlugin } from "@schedule-x/event-modal";
import { Temporal } from "@js-temporal/polyfill";

// Đảm bảo Temporal có sẵn toàn cục
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
        start: Temporal.ZonedDateTime.from(event.start), // Chuyển chuỗi về Temporal.ZonedDateTime
        end: Temporal.ZonedDateTime.from(event.end),
      }));
    } catch (error) {
      console.error("Lỗi khi đọc sự kiện từ localStorage:", error);
      return [];
    }
  });
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(null); // Sử dụng null cho DatePicker
  const [starttime, setStarttime] = useState("");
  const [endtime, setEndtime] = useState("");
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
        setEvents((prev) =>
          prev.map((e) => (e.id === updatedEvent.id ? updatedEvent : e))
        );
      },
    },
  });

  const addEvent = () => {
    if (!title || !date || !starttime || !endtime) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    const dateStr = moment(date).format("YYYY-MM-DD");
    const startDateTimeStr = `${dateStr}T${starttime}:00[Asia/Ho_Chi_Minh]`; // Thêm giây và múi giờ
    const endDateTimeStr = `${dateStr}T${endtime}:00[Asia/Ho_Chi_Minh]`;
    try {
      const newEvent = {
        id: String(Date.now()), // ID duy nhất
        title,
        start: Temporal.ZonedDateTime.from(startDateTimeStr), // Sử dụng Temporal.ZonedDateTime
        end: Temporal.ZonedDateTime.from(endDateTimeStr),
      };
      setEvents((prev) => [...prev, newEvent]);
      eventsService.add(newEvent);
      setTitle("");
      setDate(null);
      setStarttime("");
      setEndtime("");
    } catch (error) {
      console.error("Lỗi khi thêm sự kiện:", error);
      alert("Lỗi định dạng ngày giờ. Vui lòng kiểm tra lại!");
    }
  };

  const deleteEvent = (id) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    eventsService.remove(id);
  };

  useEffect(() => {
    // Lưu trữ sự kiện dưới dạng chuỗi để tương thích với localStorage
    const eventsForStorage = Events.map((event) => ({
      ...event,
      start: event.start.toString(), // Chuyển Temporal về chuỗi
      end: event.end.toString(),
    }));
    localStorage.setItem("Events", JSON.stringify(eventsForStorage));
  }, [Events]);

  useEffect(() => {
    // Đồng bộ ban đầu với eventsService
    if (Events.length > 0) {
      eventsService.set(Events);
    }
  }, [Events, eventsService]);

  return (
    <div>
      <div className="to-do-list">
        <h2>Danh sách việc cần làm</h2>
        <input
          className="input-job"
          type="text"
          placeholder="Việc cần làm"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <DatePicker
          selected={date}
          onChange={(newDate) => setDate(newDate)}
          dateFormat="yyyy-MM-dd"
          placeholderText="Chọn ngày..."
        />
        <input
          type="time"
          placeholder="Giờ bắt đầu"
          value={starttime}
          onChange={(e) => setStarttime(e.target.value)}
        />
        <input
          type="time"
          placeholder="Giờ kết thúc FUCK"
          value={endtime}
          onChange={(e) => setEndtime(e.target.value)}
        />

        <button onClick={addEvent}>Thêm việc</button>
        <ul>
          {Events.map((event) => (
            <li key={event.id}>
              {event.title} ({event.start.toString()} → {event.end.toString()})
              <button onClick={() => deleteEvent(event.id)}>Xóa Việc</button>
            </li>
          ))}
        </ul>
      </div>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  );
}