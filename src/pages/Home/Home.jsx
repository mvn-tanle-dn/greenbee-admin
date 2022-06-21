import Chart from "../../components/Chart/Chart";
import FeaturedInfo from "../../components/FeauturedInfo/FeaturedInfo";
import "./home.scss";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/WidgetSm/WidgetSm";
import WidgetLg from "../../components/WidgetLg/WidgetLg";
import { useEffect, useState } from "react";
import { getLastUsers } from "../../api/user";

export default function Home() {
  const [lastUsers, setLastUser] = useState([]);

  useEffect(() => {
    getLastUsers().then((res) => {
      if (res.data) {
        setLastUser(res.data.data);
      }
    });
  }, []);

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart
        data={userData}
        title="User Analytics"
        grid
        dataKey="Active User"
      />
      <div className="homeWidgets">
        <WidgetSm data={lastUsers} />
        <WidgetLg />
      </div>
    </div>
  );
}
