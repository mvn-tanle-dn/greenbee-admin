import { useEffect } from "react";
import "./widgetLg.scss";

export default function WidgetLg({ data }) {
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        {data &&
          data.map((transaction, index) => (
            <tr className="widgetLgTr">
              <td className="widgetLgUser">
                <img
                  src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  alt=""
                  className="widgetLgImg"
                />
                <span className="widgetLgName">
                  {transaction.shipping_last_name}{" "}
                  {transaction.shipping_first_name}
                </span>
              </td>
              <td className="widgetLgDate">{transaction.updated_at}</td>
              <td className="widgetLgAmount">{transaction.amount}</td>
              <td className="widgetLgStatus">
                <Button type={transaction.status === 1 ? "Approved" : ""} />
              </td>
            </tr>
          ))}
      </table>
    </div>
  );
}
