import {
  LineStyle,
  Timeline,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  FormatQuote,
  Category,
} from "@material-ui/icons";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import "./sidebar.scss";

export default function Sidebar() {
  const location = useLocation();
  const [locationPath, setLocationPath] = useState();

  const checkMenuActive = (path, location) =>
    path === location ? "active" : "";

  useEffect(() => {
    setLocationPath(location.pathname);
  }, [location]);

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li
                className={`sidebarListItem ${checkMenuActive(
                  "/",
                  locationPath
                )}`}
              >
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </Link>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li
                className={`sidebarListItem ${checkMenuActive(
                  "/users",
                  locationPath
                )}`}
              >
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="/categories" className="link">
              <li
                className={`sidebarListItem ${checkMenuActive(
                  "/categories",
                  locationPath
                )}`}
              >
                <Category className="sidebarIcon" />
                Categories
              </li>
            </Link>
            <Link to="/products" className="link">
              <li
                className={`sidebarListItem ${checkMenuActive(
                  "/products",
                  locationPath
                )}`}
              >
                <Storefront className="sidebarIcon" />
                Products
              </li>
            </Link>
            <li className="sidebarListItem">
              <AttachMoney className="sidebarIcon" />
              Transactions
            </li>
            <Link to="/blogs" className="link">
              <li
                className={`sidebarListItem ${checkMenuActive(
                  "/blogs",
                  locationPath
                )}`}
              >
                <FormatQuote className="sidebarIcon" />
                Blogs
              </li>
            </Link>
            <li className="sidebarListItem">
              <BarChart className="sidebarIcon" />
              Reports
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <MailOutline className="sidebarIcon" />
              Mail
            </li>
            <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              Feedback
            </li>
            <li className="sidebarListItem">
              <ChatBubbleOutline className="sidebarIcon" />
              Messages
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
