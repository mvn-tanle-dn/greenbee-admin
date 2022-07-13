import Chart from "../../components/Chart/Chart";
import FeaturedInfo from "../../components/FeauturedInfo/FeaturedInfo";
import "./home.scss";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/WidgetSm/WidgetSm";
import WidgetLg from "../../components/WidgetLg/WidgetLg";
import { useEffect, useState } from "react";
import { getLatestUsers } from "../../api/user";
import { getLatestTransactions } from "../../api/cart";

export default function Home() {
  const [latestUsers, setLatestUser] = useState([]);
  const [latestTransactions, setLatestTransactions] = useState([]);

  useEffect(() => {
    getLatestUsers().then((res) => {
      if (res.data) {
        setLatestUser(res.data.data);
      }
    });
    getLatestTransactions().then((res) => {
      if (res.data) {
        setLatestTransactions(res.data.data);
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
        <WidgetSm data={latestUsers} />
        <WidgetLg data={latestTransactions} />
      </div>
    </div>
  );
}
