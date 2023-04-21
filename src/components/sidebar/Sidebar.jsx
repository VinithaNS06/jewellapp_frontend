import React, { useEffect, useState } from "react";
// import "./sidebar.scss";
import { Link } from "react-router-dom";
import {
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  Typography,
} from "@mui/material";

import ExpandLess from "@mui/icons-material/ExpandLess";

import ExpandMore from "@mui/icons-material/ExpandMore";
import list from "../../model/menulist";

import { useLocation, useNavigate } from "react-router-dom";
import useStyles from "../../model/style";

// import { useSelector } from "react-redux";

const Sidebar = () => {
  const classes = useStyles();

  const navigate = useNavigate();

  const { pathname } = useLocation();

  // const menuToggle = useSelector((state) => state?.AuthReducer?.menuToggle);

  const [selectedIndex, setSelectedIndex] = useState(pathname);

  const [menuList, setMenuList] = useState(list);

  const handleClick = (index, openState) => {
    const updatedMenuList = menuList?.map((data, idx) => {
      if (data?.isCollapsible) {
        if (idx === index) {
          return { ...data, open: !openState, active: true };
        } else {
          return { ...data, open: false, active: false };
        }
      } else {
        return { ...data, open: false, active: false };
      }
    });

    setMenuList(updatedMenuList);
  };

  useEffect(() => {
    setSelectedIndex(pathname);
  }, [pathname]);

  const handleMenuNavigate = (link) => {
    navigate(link);
  }; // To Open the Active menu Collapsible True when submenu is active

  useEffect(() => {
    let currentArrObj = null;

    const currentObjInMainArr = menuList?.find(
      (data) => data?.link === pathname
    );

    if (currentObjInMainArr) {
      currentArrObj = currentObjInMainArr;
    } else {
      const currentObjInSubArr = menuList?.find((data) =>
        data?.subMenu?.find((item) => item?.subLink === pathname)
      );

      currentArrObj = currentObjInSubArr;
    }

    const updatedMenuList = menuList?.map((data) =>
      data?.name === currentArrObj?.name
        ? { ...data, open: true, active: true }
        : { ...data, open: false, active: false }
    );

    setMenuList(updatedMenuList); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      <div
        className="sidenav bg-white navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-4 "
        id="sidenav-main"
      >
        <div className="sidenav-header">
          <i
            className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
            aria-hidden="true"
            id="iconSidenav"
          ></i>

          <Link className="navbar-brand m-0" to="/">
            <img
              src="../assets/img/jewelar.png"
              className="navbar-brand-img h-100"
              alt="main_logo"
            />
            &nbsp;&nbsp;&nbsp;
            <span className="ms-1 font-weight-bold">
              Avathar<span className="artextcol">Jewellers</span>
            </span>
          </Link>
        </div>
        <hr className="horizontal dark mt-0"></hr>
        <section>
          {menuList?.map((data, idx) => (
            <List
              key={data?.name}
              component="nav"
              aria-label="navMenu"
              onClick={() =>
                data?.isCollapsible === false && handleMenuNavigate(data?.link)
              }
            >
              <ListItemButton
                selected={data?.active === true}
                onClick={() => {
                  handleClick(idx, data?.open);
                }}
              >
                <ListItemText
                  primary={data?.name}
                  className={
                    data?.active === true
                      ? classes.menuLabels
                      : classes.menuLabels2
                  }
                />
                {/* Accordion Icon */}
                {data?.isCollapsible ? (
                  data?.open ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  )
                ) : (
                  <></>
                )}
              </ListItemButton>
              {/* Accordion */}
              {data?.isCollapsible === true ? (
                <Collapse in={data?.open} timeout="auto" unmountOnExit>
                  {" "}
                  {data?.subMenu?.map((item) => (
                    <List
                      component="div"
                      disablePadding
                      key={item?.name}
                      onClick={() =>
                        data?.isCollapsible === true &&
                        handleMenuNavigate(item?.subLink)
                      }
                      className={classes.subMenuLabel}
                      sx={
                        selectedIndex === item?.subLink
                          ? {
                              background: "#c1c1c16b",
                            }
                          : {}
                      }
                    >
                      <ListItemButton>
                        <ListItemText
                          primary={
                            <Typography variant="body1">
                              {item?.name}
                            </Typography>
                          }
                        />
                      </ListItemButton>
                    </List>
                  ))}
                </Collapse>
              ) : (
                <></>
              )}
            </List>
          ))}
        </section>
      </div>
    </>
  );
};

export default Sidebar;
