import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "calc(100vh - 70px)",

    position: "fixed",

    left: 0,

    zIndex: 999,

    width: 244,

    overflowY: "auto", // background: theme.palette.custom.light,

    background: "#ffffff",

    boxShadow: "8px 0px 16px rgb(0 0 0 / 8%)",

    scrollbarWidth: "thin",

    "& .MuiSvgIcon-root": {
      color: "#022247",
    },
  },

  menuLabels: {
    "& .MuiTypography-root": {
      color: "#000",

      fontWeight: 600,
    },
  },

  menuLabels2: {
    "& .MuiTypography-root": {
      fontWeight: 400,
    },
  },

  subMenuLabel: {
    "& .MuiTypography-root": {
      color: "#000000",

      paddingInlineStart: 12,
    },
  },

  count: {
    // color: theme.palette.custom.dark,

    marginInlineStart: 4,

    fontSize: 13,

    fontWeight: 700,
  },
}));

export default useStyles;
