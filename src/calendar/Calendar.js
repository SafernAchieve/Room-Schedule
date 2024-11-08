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
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [groups, setGroups] = useState([]);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const data = [
      {
        name: "RP",
        id: "locations",
        resources: [
          { name: "RP 1", id: "R1", columnWidth: 200 },
          { name: "RP 2", id: "R2", columnWidth: 200 },
          { name: "RP 3", id: "R3", columnWidth: 20 },
          { name: "RP 4", id: "R4", columnWidth: 200 },
          { name: "RP 5", id: "R5", columnWidth: 200 },
          { name: "RP 6", id: "R6", columnWidth: 200 },
          { name: "RP 7", id: "R7", columnWidth: 200 },
        ],
      },
      {
        name: "Child Care",
        id: "people",
        resources: [
          { name: "CC 1", id: "P1" },
          { name: "CC 2", id: "P2" },
          { name: "CC 3", id: "P3" },
          { name: "CC 4", id: "P4" },
          { name: "CC 5", id: "P5" },
          { name: "CC 6", id: "P6" },
          { name: "CC 7", id: "P7" },
        ],
      },
      {
        name: "Airmont",
        id: "tools",
        resources: [
          { name: "Airmont 1", id: "T1" },
          { name: "Airmont 2", id: "T2" },
          { name: "Airmont 3", id: "T3" },
          { name: "Airmont 4", id: "T4" },
          { name: "Airmont 5", id: "T5" },
          { name: "Airmont 6", id: "T6" },
          { name: "Airmont 7", id: "T7" },
        ],
      },
    ];

    setGroups(data);
    setSelectedGroup(data[0]); // Default selection
  }, []);

  useEffect(() => {
    const typeData = [
      {
        name: "Play",
        id: "Play",
        resources: [
          { name: "Play 1", id: "R1" },
          { name: "Play 2", id: "R2" },
          { name: "Play 3", id: "R3" },
          { name: "Play 4", id: "R4" },
          { name: "Play 5", id: "R5" },
          { name: "Play 6", id: "R6" },
          { name: "Play 7", id: "R7" },
        ],
      },
      {
        name: "Couple",
        id: "Couple",
        resources: [
          { name: "Couple 1", id: "P1" },
          { name: "Couple 2", id: "P2" },
          { name: "Couple 3", id: "P3" },
          { name: "Couple 4", id: "P4" },
          { name: "Couple 5", id: "P5" },
          { name: "Couple 6", id: "P6" },
          { name: "Couple 7", id: "P7" },
        ],
      },
      {
        name: "Individual",
        id: "individual",
        resources: [
          { name: "Individual 1", id: "T1" },
          { name: "Individual 2", id: "T2" },
          { name: "Individual 3", id: "T3" },
          { name: "Individual 4", id: "T4" },
          { name: "Individual 5", id: "T5" },
          { name: "Individual 6", id: "T6" },
          { name: "Individual 7", id: "T7" },
        ],
      },
    ];

    setTypes(typeData);
    setSelectedType(typeData[0]); // Default selection
  }, []);

  // Combine selectedGroup and selectedType to set columns
  useEffect(() => {
    if (selectedGroup && selectedType) {
      const combinedResources = [
        ...selectedGroup.resources,
        ...selectedType.resources,
      ];
      setColumns(combinedResources);
    }
  }, [selectedGroup, selectedType]);

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
        start: "2024-11-08T10:00:00",
        end: "2024-11-08T11:00:00",
        resource: "R2",
        barColor: "#38761d",
        barBackColor: "#93c47d",
      },
    ]);

    // Initialize with a default view, e.g., resources5
    resources5();
  }, []);

  // Function to set columns to all resources from all groups
  const resources50 = () => {
    // Aggregate all resources from all groups
    const aggregatedResources = groups.reduce((acc, group) => {
      return acc.concat(group.resources);
    }, []);

    setColumns(aggregatedResources);
    setColumnWidthSpec("Fixed"); // Adjust as needed
    setHeaderLevels(1);
    setViewType("Resources"); // Ensure the view type is set appropriately
  };

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
    setColumnWidthSpec("Auto"); // Reset to auto if needed
    setViewType("Resources");
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
    setViewType("Days");
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
    setViewType("ResourcesDays");
  };

  const resourceGroups = () => {
    const columns = [
      {
        name: "Group 1",
        id: "G1",
        children: [
          { name: "Resource 1", id: "R1" },
          { name: "Resource 2", id: "R2" },
        ],
      },
      {
        name: "Group 2",
        id: "G2",
        children: [
          { name: "Resource 3", id: "R3" },
          { name: "Resource 4", id: "R4" },
        ],
      },
      {
        name: "Group 3",
        id: "G3",
        children: [
          { name: "Resource 5", id: "R5" },
          { name: "Resource 6", id: "R6" },
        ],
      },
      {
        name: "Group 4",
        id: "G4",
        children: [
          { name: "Resource 7", id: "R7" },
          { name: "Resource 8", id: "R8" },
        ],
      },
    ];
    setColumns(columns);
    setHeaderLevels(2);
    setViewType("Groups");
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
    setEvents([
      ...events,
      {
        start: args.start,
        end: args.end,
        id: DayPilot.guid(),
        resource: args.resource,
        text: modal.result,
      },
    ]);
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
          <label>
            <input name="view" type="radio" onChange={resources5} defaultChecked /> 5 columns
          </label>
          <label>
            <input name="view" type="radio" onChange={resources50} /> 50 columns
          </label>
          <label>
            <input name="view" type="radio" onChange={daysResources} /> Days/resources
          </label>
          <label>
            <input name="view" type="radio" onChange={resourcesDays} /> Resources/days
          </label>
          <label>
            <input name="view" type="radio" onChange={resourceGroups} /> Groups
          </label>
        </div>

        <div className="toolbar">
          <ResourceGroups
            onChange={(args) => setSelectedGroup(args.selected)}
            items={groups}
            label="Location" // First dropdown with the label "Location"
          />

          <ResourceGroups
            onChange={(args) => setSelectedType(args.selected)}
            items={types}
            label="Room Type" // Second dropdown with the label "Room Type"
          />
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
