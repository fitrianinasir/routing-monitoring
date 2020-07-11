import React, { useState, useContext } from "react";
import Helmet from "react-helmet";
import DayPicker, { DateUtils } from "react-day-picker";
import { dataContainer } from "../FilterData/FilterData";
import "react-day-picker/lib/style.css";

import "./FilterDate.css";

function FilterDate(props) {
  const [year, setYear] = useState(null);
  const [month, setMonth] = useState(null);
  const [isShowToday, setIsShowToday] = useState(true);
  const [isShowPastWeek, setIsShowPastWeek] = useState(false);
  const [isShowLast30Days, setIsShowLast30Days] = useState(false);
  const [isShowThisMonth, setIsShowThisMonth] = useState(false);
  const [isShowLastMonth, setIsShowLastMonth] = useState(false);
  const [isShowTimeSpan, setIsShowTimeSpan] = useState(false);
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [selectedDays, setSelectedDays] = useState(initialDate);
  const { setDate, setShowDate } = useContext(dataContainer);

  // INITIAL DATE
  function initialDate() {
    return {
      from: undefined,
      to: undefined,
    };
  }
  // TODAY CALENDAR
  function handleDayChange(day) {
    setSelectedDay(day);
    setSelectedDays(initialDate);
  }

  function showTodayCalendar() {
    setIsShowToday(true);
    setIsShowPastWeek(false);
    setIsShowLast30Days(false);
    setIsShowThisMonth(false);
    setIsShowLastMonth(false);
    setIsShowTimeSpan(false);
  }

  // PAST WEEK
  function showPastWeek() {
    setIsShowToday(false);
    setIsShowPastWeek(true);
    setIsShowLast30Days(false);
    setIsShowThisMonth(false);
    setIsShowLastMonth(false);
    setIsShowTimeSpan(false);

    const dates = [...Array(7)].map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d;
    });
    setSelectedDay(undefined);
    setSelectedDays({
      from: dates[6],
      to: new Date(),
    });

    setYear(dates[6].getFullYear());
    setMonth(dates[6].getMonth());
  }

  // PAST 30 DAYS
  function showLast30Days() {
    setIsShowToday(false);
    setIsShowPastWeek(false);
    setIsShowLast30Days(true);
    setIsShowThisMonth(false);
    setIsShowLastMonth(false);
    setIsShowTimeSpan(false);

    const dates = [...Array(30)].map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d;
    });
    setSelectedDay(undefined);
    setSelectedDays({
      from: dates[29],
      to: new Date(),
    });
    setYear(dates[29].getFullYear());
    setMonth(dates[29].getMonth());
  }

  // THIS MONTH
  function showThisMonth() {
    setIsShowToday(false);
    setIsShowPastWeek(false);
    setIsShowLast30Days(false);
    setIsShowThisMonth(true);
    setIsShowLastMonth(false);
    setIsShowTimeSpan(false);

    let startDate = new Date();
    let endDate = new Date();
    let totalDays = new Date(
      endDate.getFullYear(),
      endDate.getMonth() + 1,
      0
    ).getDate();

    startDate.setDate(1);
    endDate.setDate(totalDays);

    setSelectedDay(undefined);
    setSelectedDays({
      from: startDate,
      to: endDate,
    });

    setYear(startDate.getFullYear());
    setMonth(startDate.getMonth());
  }

  // LAST MONTH
  function showLastMonth() {
    setIsShowToday(false);
    setIsShowPastWeek(false);
    setIsShowLast30Days(false);
    setIsShowThisMonth(false);
    setIsShowLastMonth(true);
    setIsShowTimeSpan(false);

    let date = new Date();
    date.setDate(1);
    date.setMonth(date.getMonth() - 1);
    date.setHours(date.getHours());
    const startDate = new Date(date);

    let endDate = new Date();
    endDate.setDate(0);

    setSelectedDay(undefined);
    setSelectedDays({
      from: startDate,
      to: endDate,
    });

    setYear(endDate.getFullYear());
    setMonth(endDate.getMonth());
  }

  // TIME SPAN
  function showTimeSpan() {
    setIsShowToday(false);
    setIsShowPastWeek(false);
    setIsShowLast30Days(false);
    setIsShowThisMonth(false);
    setIsShowLastMonth(false);
    setIsShowTimeSpan(true);

    let date = new Date();
    setYear(date.getFullYear());
    setMonth(date.getMonth());
  }

  function handleTimeSpan(day) {
    const range = DateUtils.addDayToRange(day, selectedDays);
    setSelectedDay(undefined);
    setSelectedDays(range);
  }

  function resetTimeSpan() {
    setSelectedDays({
      from: undefined,
      to: undefined,
    });
  }

  function filterDate() {
    if (selectedDay !== undefined) {
      let convertedDate = selectedDay;
      let date = convertedDate.getDate();
      let month = convertedDate.getMonth() + 1;
      const year = convertedDate.getFullYear();
      if (date < 10) {
        date = `0${date}`;
      }
      if (month < 10) {
        month = `0${month}`;
      }
      setDate(`${year}-${month}-${date}`);
      setShowDate(`${date}-${month}-${year}`);
      console.log(selectedDay);
    }

    if (selectedDays.from !== undefined) {
      let convertedDateFrom = selectedDays.from;
      let convertedDateTo = selectedDays.to;

      let dateFrom = convertedDateFrom.getDate();
      let monthFrom = convertedDateFrom.getMonth() + 1;
      const yearFrom = convertedDateFrom.getFullYear();
      if (dateFrom < 10) {
        dateFrom = `0${dateFrom}`;
      }
      if (monthFrom < 10) {
        monthFrom = `0${monthFrom}`;
      }

      let dateTo = convertedDateTo.getDate();
      let monthTo = convertedDateTo.getMonth() + 1;
      const yearTo = convertedDateTo.getFullYear();
      if (dateTo < 10) {
        dateTo = `0${dateTo}`;
      }
      if (monthTo < 10) {
        monthTo = `0${monthTo}`;
      }

      setDate({
        from: `${yearFrom}-${monthFrom}-${dateFrom}`,
        to: `${yearTo}-${monthTo}-${dateTo}`,
      });
      setShowDate({
        from: `${dateFrom}-${monthFrom}-${yearFrom}`,
        to: `${dateTo}-${monthTo}-${yearTo}`,
      });
    }
  }

  function cancelDate() {
    setSelectedDay(undefined);
    setShowDate(undefined);
    setDate(undefined);
  }

  const buttonActiveStyle = {
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
  };

  const { from, to } = selectedDays;
  const modifiers = { start: selectedDays.form, end: selectedDays.to };
  const numberOfMonths = isShowThisMonth || isShowLastMonth ? 1 : 2;

  return (
    <div className="card card-body shadow ml-5 filter-date-body">
      <div className="button-options">
        <button
          className="btn-items"
          onClick={showTodayCalendar}
          style={isShowToday ? buttonActiveStyle : {}}
        >
          Hari ini
        </button>
        <button
          className="btn-items"
          onClick={showPastWeek}
          style={isShowPastWeek ? buttonActiveStyle : {}}
        >
          7 hari terakhir
        </button>
        <button
          className="btn-items"
          onClick={showLast30Days}
          style={isShowLast30Days ? buttonActiveStyle : {}}
        >
          30 hari terakhir
        </button>
        <button
          className="btn-items"
          onClick={showThisMonth}
          style={isShowThisMonth ? buttonActiveStyle : {}}
        >
          Bulan ini
        </button>
        <button
          className="btn-items"
          onClick={showLastMonth}
          style={isShowLastMonth ? buttonActiveStyle : {}}
        >
          Bulan lalu
        </button>
        <button
          className="btn-items"
          onClick={showTimeSpan}
          style={isShowTimeSpan ? buttonActiveStyle : {}}
        >
          Rentang waktu
        </button>
      </div>
      <hr />
      {isShowToday ? (
        <div className="date-container">
          <DayPicker onDayClick={handleDayChange} selectedDays={selectedDay} />
        </div>
      ) : (
        ""
      )}

      {isShowPastWeek ||
      isShowLast30Days ||
      isShowThisMonth ||
      isShowLastMonth ||
      isShowTimeSpan ? (
        <div className="RangeExample">
          <p>
            {!from && !to && "Please select the first day"}
            {from && !to && "Please select the last day"}
            {from &&
              to &&
              `Selected from ${from.toLocaleDateString()} to
                ${to.toLocaleDateString()}`}
            {isShowTimeSpan && from && to ? (
              <button
                className="link btn btn-primary reset-button ml-1"
                onClick={resetTimeSpan}
              >
                Reset
              </button>
            ) : (
              ""
            )}
          </p>
          <DayPicker
            className="Selectable"
            numberOfMonths={numberOfMonths}
            selectedDays={[from, { from, to }]}
            modifiers={modifiers}
            month={new Date(year, month)}
            onDayClick={isShowTimeSpan ? handleTimeSpan : ""}
          />
          <Helmet>
            <style>
              {`
                .Selectable .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
                  background-color: #f0f8ff !important;
                  color: #4a90e2;
                }
                .Selectable .DayPicker-Day {
                  border-radius: 0 !important;
                }
                .Selectable .DayPicker-Day--start {
                  border-top-left-radius: 50% !important;
                  border-bottom-left-radius: 50% !important;
                }
                .Selectable .DayPicker-Day--end {
                  border-top-right-radius: 50% !important;
                  border-bottom-right-radius: 50% !important;
                }
              `}
            </style>
          </Helmet>
        </div>
      ) : (
        ""
      )}

      <div className="button-section w-100">
        <button
          className="btn btn-light mt-4 mr-2 w-25 float-left text-secondary"
          onClick={cancelDate}
        >
          Batal
        </button>
        <button
          className="btn btn-primary mt-4 mr-2 w-25 float-right"
          onClick={filterDate}
        >
          Pilih
        </button>
      </div>
    </div>
  );
}

export default FilterDate;
