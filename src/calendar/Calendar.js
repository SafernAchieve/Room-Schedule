import React, { useState, useEffect, useRef } from "react";
import { DayPilot, DayPilotCalendar, DayPilotNavigator } from "daypilot-pro-react";
import { ResourceGroups } from "./ResourceGroups";
import "./Calendar.css";

const Calendar = () => {
  const [locale, setLocale] = useState("en-us");
  const [columnWidthSpec, setColumnWidthSpec] = useState("Auto");
  const [viewType, setViewType] = useState("Resources");
  const [headerLevels, setHeaderLevels] = useState(1);
  const [headerHeight, setHeaderHeight] = useState(30);
  const [cellHeight, setCellHeight] = useState(30);
  const [crosshairType, setCrosshairType] = useState("Header");
  const [showCurrentTime, setShowCurrentTime] = useState(false);
  const [eventArrangement, setEventArrangement] = useState("Cascade");
  const [allowEventOverlap, setAllowEventOverlap] = useState(true);
  const [timeRangeSelectedHandling, setTimeRangeSelectedHandling] = useState("Enabled");
  const [startDate, setStartDate] = useState(DayPilot.Date.today());
  const [events, setEvents] = useState([]);
  const [columns, setColumns] = useState([]);
  const [selected, setSelected] = useState([]);

  const groups = [
    { name: "Location 1", id: "L1" },
    { name: "Location 2", id: "L2" },
    { name: "Location 3", id: "L3" },
  ];

  const type = [
    { name: "Room Type 1", id: "R1" },
    { name: "Room Type 2", id: "R2" },
    { name: "Room Type 3", id: "R3" },
  ];

  // Reference for the DayPilotCalendar component
  const calendarRef = useRef();

  useEffect(() => {
    setEvents([
      {
        id: 1,
        text: "Event 1",
        start: DayPilot.Date.today().addHours(10),
        end: DayPilot.Date.today().addHours(12),
        resource: "R1",
      },
      {
        id: 2,
        text: "Event 2",
        start: "2018-06-02T10:00:00",
        end: "2018-06-02T11:00:00",
        resource: "R2",
        barColor: "#38761d",
        barBackColor: "#93c47d",
      },
    ]);

    resources5();
  }, []);

  const resources5 = () => {
    const columns = [
      { name: "Resource 1", id: "R1" },
      { name: "Resource 2", id: "R2" },
      { name: "Resource 3", id: "R3" },
      { name: "Resource 4", id: "R4" },
      { name: "Resource 5", id: "R5" },
    ];
    setColumns(columns);
    setHeaderLevels(1);
  };

  const resources50 = () => {
    const columns = Array.from({ length: 50 }, (_, i) => ({
      id: `R${i + 1}`,
      name: `Resource ${i + 1}`,
    }));
    setColumns(columns);
    setColumnWidthSpec("Fixed");
  };

  const daysResources = () => {
    const columns = Array.from({ length: 7 }, (_, i) => {
      const start = DayPilot.Date.today().addDays(i);
      return {
        id: `D${i}`,
        start,
        name: start.toString("MMMM d, yyyy"),
        children: [
          { name: "R1", id: "R1", start },
          { name: "R2", id: "R2", start },
          { name: "R3", id: "R3", start },
          { name: "R4", id: "R4", start },
        ],
      };
    });
    setColumnWidthSpec("Auto");
    setColumns(columns);
    setHeaderLevels(2);
  };

  const resourcesDays = () => {
    const columns = [
      { name: "Resource 1", id: "R1" },
      { name: "Resource 2", id: "R2" },
      { name: "Resource 3", id: "R3" },
      { name: "Resource 4", id: "R4" },
    ];
    columns.forEach((col) => {
      col.children = Array.from({ length: 7 }, (_, i) => {
        const start = DayPilot.Date.today().addDays(i);
        return { id: col.id, start, name: start.toString("ddd") };
      });
    });
    setColumns(columns);
    setHeaderLevels(2);
  };

  const resourceGroups = () => {
    const columns = [
      { name: "Group 1", id: "G1", children: [{ name: "Resource 1", id: "R1" }, { name: "Resource 2", id: "R2" }] },
      { name: "Group 2", id: "G2", children: [{ name: "Resource 3", id: "R3" }, { name: "Resource 4", id: "R4" }] },
      { name: "Group 3", id: "G3", children: [{ name: "Resource 5", id: "R5" }, { name: "Resource 6", id: "R6" }] },
      { name: "Group 4", id: "G4", children: [{ name: "Resource 7", id: "R7" }, { name: "Resource 8", id: "R8" }] },
    ];
    setColumns(columns);
    setHeaderLevels(2);
  };

  const previous = () => setStartDate(startDate.addDays(-1));
  const next = () => setStartDate(startDate.addDays(1));

  const onEventClick = async (args) => {
    const modal = await DayPilot.Modal.prompt("Update event text:", args.e.text());
    if (!modal.result) return;
    args.e.data.text = modal.result;
    setEvents([...events]);
  };

  const onTimeRangeSelected = async (args) => {
    const modal = await DayPilot.Modal.prompt("Create a new event:", "Event 1");
    calendarRef.current.control.clearSelection();
    if (modal.canceled) return;
    setEvents([...events, {
      start: args.start,
      end: args.end,
      id: DayPilot.guid(),
      resource: args.resource,
      text: modal.result,
    }]);
  };

  const onBeforeHeaderRender = (args) => {
    args.header.areas = [
      {
        right: "5",
        top: 5,
        width: 30,
        height: 30,
        symbol: "/daypilot.svg#edit",
        padding: 6,
        cssClass: "icon",
        toolTip: "Edit...",
        onClick: async (args) => {
          const column = args.source;
          const modal = await DayPilot.Modal.prompt("Resource name:", column.name);
          if (!modal.result) return;
          column.data.name = modal.result;
          setColumns([...columns]);
        },
      },
    ];
  };

  return (
    <div className="calendar-container">
      <div className="left">
        <DayPilotNavigator
          selectMode={"Day"}
          showMonths={3}
          skipMonths={3}
          selectionDay={startDate}
          startDate={startDate}
          onTimeRangeSelected={(args) => setStartDate(args.day)}
        />
      </div>

      <div className="right">
        <div className="space">
          <p>Resources view:</p>
          <label><input name="view" type="radio" onChange={resources5} defaultChecked /> 5 columns</label>
          <label><input name="view" type="radio" onChange={resources50} /> 50 columns</label>
          <label><input name="view" type="radio" onChange={daysResources} /> Days/resources</label>
          <label><input name="view" type="radio" onChange={resourcesDays} /> Resources/days</label>
          <label><input name="view" type="radio" onChange={resourceGroups} /> Groups</label>
        </div>

        <div className="toolbar">
          <ResourceGroups onChange={(args) => setSelected(args.selected)} items={groups} label="Location" />
          <ResourceGroups onChange={(args) => setSelected(args.selected)} items={type} label="Room Type" />
          <span>Day:</span>
          <button onClick={previous}>Previous</button>
          <button onClick={next}>Next</button>
        </div>

        <DayPilotCalendar
          {...{
            viewType: viewType,
            durationBarVisible: false,
            locale: locale,
            startDate: startDate,
            headerLevels: headerLevels,
            headerHeight: headerHeight,
            cellHeight: cellHeight,
            crosshairType: crosshairType,
            showCurrentTime: showCurrentTime,
            columnWidthSpec: columnWidthSpec,
            eventArrangement: eventArrangement,
            allowEventOverlap: allowEventOverlap,
            timeRangeSelectedHandling: timeRangeSelectedHandling,
            onEventClick,
            onTimeRangeSelected,
            onBeforeHeaderRender,
            events,
            columns,
          }}
          ref={calendarRef}
        />
      </div>
    </div>
  );
};

export default Calendar;
