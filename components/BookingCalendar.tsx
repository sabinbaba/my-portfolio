"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  X, 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";
import { 
  format, 
  addDays, 
  startOfWeek, 
  addWeeks, 
  subWeeks, 
  isToday, 
  isSameDay, 
  isPast,
  isWeekend
} from "date-fns";

interface Appointment {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  service: string;
  createdAt: Date;
}

interface BookingCalendarProps {
  theme: "iot" | "security" | "ml";
}

export default function BookingCalendar({ theme }: BookingCalendarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "consultation",
    time: "09:00"
  });

  // Load appointments from localStorage on component mount
  useEffect(() => {
    const storedAppointments = localStorage.getItem("clientAppointments");
    if (storedAppointments) {
      try {
        const parsedAppointments = JSON.parse(storedAppointments);
        // Convert createdAt strings back to Date objects
        const appointmentsWithDates = parsedAppointments.map((appt: any) => ({
          ...appt,
          createdAt: new Date(appt.createdAt)
        }));
        setAppointments(appointmentsWithDates);
      } catch (error) {
        console.error("Error parsing appointments:", error);
      }
    }
  }, []);

  // Save appointments to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("clientAppointments", JSON.stringify(appointments));
  }, [appointments]);

  const getThemeColor = () => {
    switch (theme) {
      case "iot":
        return {
          bg: "bg-cyan-600 hover:bg-cyan-700",
          border: "border-cyan-400",
          text: "text-cyan-400",
          ring: "focus:ring-cyan-400"
        };
      case "security":
        return {
          bg: "bg-rose-600 hover:bg-rose-700",
          border: "border-rose-400",
          text: "text-rose-400",
          ring: "focus:ring-rose-400"
        };
      case "ml":
        return {
          bg: "bg-purple-600 hover:bg-purple-700",
          border: "border-purple-400",
          text: "text-purple-400",
          ring: "focus:ring-purple-400"
        };
    }
  };

  const themeColors = getThemeColor();

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 17; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(time);
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const isTimeSlotAvailable = (date: Date, time: string) => {
    const dateString = format(date, 'yyyy-MM-dd');
    return !appointments.some(appt => 
      appt.date === dateString && appt.time === time
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate) return;

    const newAppointment: Appointment = {
      id: Date.now().toString(),
      ...formData,
      date: format(selectedDate, 'yyyy-MM-dd'),
      createdAt: new Date()
    };

    setAppointments(prev => [...prev, newAppointment]);
    setFormData({ name: "", email: "", phone: "", service: "consultation", time: "09:00" });
    setSelectedDate(null);
    setIsOpen(false);
  };

  const getWeekDates = () => {
    const start = startOfWeek(currentWeek, { weekStartsOn: 1 }); // Start on Monday
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  };

  const nextWeek = () => {
    setCurrentWeek(addWeeks(currentWeek, 1));
  };

  const prevWeek = () => {
    setCurrentWeek(subWeeks(currentWeek, 1));
  };

  const weekDates = getWeekDates();

  return (
    <>
      {/* Booking Button */}
      <motion.button
        className={`fixed bottom-6 right-6 z-50 ${themeColors.bg} text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 transition-all duration-300 hover:scale-105`}
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Calendar className="w-5 h-5" />
        Book Appointment
      </motion.button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-900 rounded-lg border border-slate-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <h2 className={`text-2xl font-bold ${themeColors.text}`}>
                Schedule Appointment
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Week Navigation */}
              <div className="flex items-center justify-between mb-4">
                <button
                  type="button"
                  onClick={prevWeek}
                  className="p-2 text-slate-400 hover:text-white"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <h3 className="text-lg font-semibold text-white">
                  {format(weekDates[0], 'MMM d')} - {format(weekDates[6], 'MMM d, yyyy')}
                </h3>
                <button
                  type="button"
                  onClick={nextWeek}
                  className="p-2 text-slate-400 hover:text-white"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Date Selection */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Select Date
                </label>
                <div className="grid grid-cols-7 gap-2">
                  {weekDates.map((date) => {
                    const isDisabled = isPast(date) && !isToday(date);
                    const isSelected = selectedDate && isSameDay(date, selectedDate);
                    const isWeekendDay = isWeekend(date);
                    
                    return (
                      <button
                        key={date.toISOString()}
                        type="button"
                        onClick={() => !isDisabled && setSelectedDate(date)}
                        disabled={isDisabled}
                        className={`p-2 rounded text-sm flex flex-col items-center ${
                          isSelected
                            ? `${themeColors.bg.replace('hover:', '')} text-white`
                            : isDisabled
                            ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                            : isWeekendDay
                            ? 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        <span className="text-xs opacity-70">
                          {format(date, 'EEE')}
                        </span>
                        <span className="font-medium">
                          {format(date, 'd')}
                        </span>
                        {isToday(date) && (
                          <span className="w-1 h-1 bg-cyan-400 rounded-full mt-1"></span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Selection */}
              {selectedDate && (
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    <Clock className="w-4 h-4 inline mr-2" />
                    Select Time
                  </label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className={`w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-slate-300 focus:outline-none focus:ring-2 ${themeColors.ring}`}
                    required
                  >
                    {timeSlots.map((time) => (
                      <option 
                        key={time} 
                        value={time}
                        disabled={!isTimeSlotAvailable(selectedDate, time)}
                      >
                        {time} {isTimeSlotAvailable(selectedDate, time) ? '' : '(Booked)'}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Service Selection */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Service Type
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className={`w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-slate-300 focus:outline-none focus:ring-2 ${themeColors.ring}`}
                  required
                >
                  <option value="consultation">Consultation</option>
                  <option value="security-audit">Security Audit</option>
                  <option value="iot-development">IoT Development</option>
                  <option value="ml-project">ML Project</option>
                  <option value="emergency-support">Emergency Support</option>
                </select>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-slate-300 focus:outline-none focus:ring-2 ${themeColors.ring}`}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-slate-300 focus:outline-none focus:ring-2 ${themeColors.ring}`}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-slate-300 focus:outline-none focus:ring-2 ${themeColors.ring}`}
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!selectedDate}
                className={`w-full ${themeColors.bg} text-white py-3 rounded font-medium transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                Confirm Appointment
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </>
  );
}