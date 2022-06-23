// Style
import "./widgetSm.scss";

export default function WidgetSm({ data }) {
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {data &&
          data.map((user) => {
            return (
              <li className="widgetSmListItem">
                <img
                  src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt=""
                  className="widgetSmImg"
                />
                <div className="widgetSmUser">
                  <span className="widgetSmUsername">
                    {user.last_name} {user.first_name}
                  </span>
                  <span className="widgetSmUserTitle">{user.email}</span>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
