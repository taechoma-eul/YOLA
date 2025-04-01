import { createPlugin, sliceEvents } from '@fullcalendar/core';

function CustomView(props: any) {
  // props는 FullCalendar가 자동으로 전달해줌
  const { dateProfile, eventStore } = props;
  const segs = sliceEvents(props, true); // allDay=true

  return (
    <div>
      <h2>
        📅 {dateProfile.currentRange.start.toDateString()} ~ {dateProfile.currentRange.end.toDateString()}
      </h2>
      <p>이벤트 수: {segs.length}</p>

      <ul>
        {segs.map((seg, idx) => (
          <li key={idx}>{seg.def.title}</li>
        ))}
      </ul>
    </div>
  );
}

const customViewPlugin = createPlugin({
  name: 'customView',
  views: {
    custom: {
      component: CustomView
    }
  }
});

export default customViewPlugin;
