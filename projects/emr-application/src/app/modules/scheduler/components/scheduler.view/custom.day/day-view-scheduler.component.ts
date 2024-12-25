import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Injectable,
  Input,
  LOCALE_ID,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  CalendarUtils,
  CalendarWeekViewComponent,
  DateAdapter,
  getWeekViewPeriod,
} from 'angular-calendar';
import {
  WeekView,
  GetWeekViewArgs,
  WeekViewTimeEvent,
  EventColor,
  CalendarEvent,
  WeekViewAllDayEventRow,
  WeekViewAllDayEvent,
  WeekViewHourColumn,
  WeekViewHour,
} from 'calendar-utils';
import { DragEndEvent, DragMoveEvent } from 'angular-draggable-droppable';
import { Calendar } from '../../../../administration/model/calendar/calendar';

interface DayViewScheduler extends WeekView {
  calendars: Calendar[];
}

interface GetWeekViewArgsWithUsers extends GetWeekViewArgs {
  calendars: Calendar[];
}
interface WeekViewHourSegment {
  isStart: boolean;
  date: Date;
  displayDate: Date;
  cssClass?: string;
  calendar?: Calendar
}
@Injectable()
export class DayViewSchedulerCalendarUtils extends CalendarUtils {
  private enrichSegment(hourColumns:WeekViewHourColumn,calendar:Calendar){
    hourColumns.hours.forEach((hour:WeekViewHour) => {
      var segments: WeekViewHourSegment[] = [];
      hour.segments.forEach(segment => {
        var _msegment : WeekViewHourSegment=segment;
        _msegment.calendar=calendar
        segments.push(_msegment)
      });
      hour.segments = segments;
    });
  }
  override getWeekView(args: GetWeekViewArgsWithUsers): DayViewScheduler {
    const { period } = super.getWeekView(args);
    const view: DayViewScheduler = {
      period,
      allDayEventRows: [],
      hourColumns: [],
      calendars: [...args.calendars],
    };
    if (view.calendars.length === 0) {
      const columnView = super.getWeekView({
        ...args,
      });
      view.hourColumns.push(columnView.hourColumns[0]);
      columnView.allDayEventRows.forEach(({ row }, rowIndex) => {
        view.allDayEventRows[rowIndex] = view.allDayEventRows[rowIndex] || {
          row: [],
        };
        view.allDayEventRows[rowIndex].row.push({
          ...row[0],
          offset: 0,
          span: 1,
        });
      });
    }
    view.calendars.forEach((calendar, columnIndex) => {
      const events = calendar.events
      const columnView = super.getWeekView({
        ...args,
        events,
      });
      this.enrichSegment(columnView.hourColumns[0],calendar)
      view.hourColumns.push(columnView.hourColumns[0]);
      columnView.allDayEventRows.forEach(({ row }, rowIndex) => {
        view.allDayEventRows[rowIndex] = view.allDayEventRows[rowIndex] || {
          row: [],
        };
        view.allDayEventRows[rowIndex].row.push({
          ...row[0],
          offset: columnIndex,
          span: 1,
        });
      });
    });
    return view;
  }
}

@Component({
  selector: 'mwl-day-view-scheduler',
  templateUrl: 'day-view-scheduler.component.html',
  providers: [DayViewSchedulerCalendarUtils],
})
export class DayViewSchedulerComponent
  extends CalendarWeekViewComponent
  implements OnChanges {
  @Input() calendars: Calendar[] = [];

  @Output() userChanged = new EventEmitter();

  @Output()  override hourSegmentClicked = new EventEmitter<{
    date: any;
    sourceEvent: MouseEvent;
  }>();
  override view: DayViewScheduler;

  override daysInWeek = 1;

  constructor(
    protected override cdr: ChangeDetectorRef,
    protected override utils: DayViewSchedulerCalendarUtils,
    @Inject(LOCALE_ID) locale: string,
    protected override dateAdapter: DateAdapter,
    protected override element: ElementRef<HTMLElement>
  ) {
    super(cdr, utils, locale, dateAdapter, element);
  }

  trackByCalendarId = (index: number, row: Calendar) => row.id;

  override ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes['calendars']) {
      this.refreshBody();
      this.emitBeforeViewRender();
    }
  }

  override getDayColumnWidth(eventRowContainer: HTMLElement): number {
    return Math.floor(eventRowContainer.offsetWidth / this.calendars.length);
  }

  override dragMove(dayEvent: WeekViewTimeEvent, dragEvent: DragMoveEvent) {
    if (this.snapDraggedEvents) {
      const newUser = this.getDraggedUserColumn(dayEvent, dragEvent.x);
      const newEventTimes = this.getDragMovedEventTimes(
        dayEvent,
        { ...dragEvent, x: 0 },
        this.dayColumnWidth,
        true
      );
      const originalEvent = dayEvent.event;
      const adjustedEvent = {
        ...originalEvent,
        ...newEventTimes,
        meta: { ...originalEvent.meta, user: newUser },
      };
      const tempEvents = this.events.map((event) => {
        if (event === originalEvent) {
          return adjustedEvent;
        }
        return event;
      });
      this.restoreOriginalEvents(
        tempEvents,
        new Map([[adjustedEvent, originalEvent]])
      );
    }
    this.dragAlreadyMoved = true;
  }

  override dragEnded(
    weekEvent: WeekViewAllDayEvent | WeekViewTimeEvent,
    dragEndEvent: DragEndEvent,
    dayWidth: number,
    useY = false
  ) {
    super.dragEnded(
      weekEvent,
      {
        ...dragEndEvent,
        x: 0,
      },
      dayWidth,
      useY
    );
    const newUser = this.getDraggedUserColumn(weekEvent, dragEndEvent.x);
    if (newUser && newUser !== weekEvent.event.meta.user) {
      this.userChanged.emit({ event: weekEvent.event, newUser });
    }
  }

  protected override getWeekView(events: CalendarEvent[]) {
    return this.utils.getWeekView({
      events,
      calendars: this.calendars,
      viewDate: this.viewDate,
      weekStartsOn: this.weekStartsOn,
      excluded: this.excludeDays,
      precision: this.precision,
      absolutePositionedEvents: true,
      hourSegments: this.hourSegments,
      dayStart: {
        hour: this.dayStartHour,
        minute: this.dayStartMinute,
      },
      dayEnd: {
        hour: this.dayEndHour,
        minute: this.dayEndMinute,
      },
      segmentHeight: this.hourSegmentHeight,
      weekendDays: this.weekendDays,
      ...getWeekViewPeriod(
        this.dateAdapter,
        this.viewDate,
        this.weekStartsOn,
        this.excludeDays,
        this.daysInWeek
      ),
    });
  }

  private getDraggedUserColumn(
    dayEvent: WeekViewTimeEvent | WeekViewAllDayEvent,
    xPixels: number
  ) {
    const columnsMoved = Math.round(xPixels / this.dayColumnWidth);
    const currentColumnIndex = this.view.calendars.findIndex(
      (user) => user === dayEvent.event.meta.user
    );
    const newIndex = currentColumnIndex + columnsMoved;
    return this.view.calendars[newIndex];
  }
  
}
