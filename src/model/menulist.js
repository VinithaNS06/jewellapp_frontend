const list = [
  {
    name: "Dashboard",

    isCollapsible: false,

    open: false,

    link: "/dashboard",

    active: false,
  },

  {
    name: "JewelAR",

    isCollapsible: true,

    open: false,

    active: false,

    subMenu: [
      {
        name: "Category",

        subLink: "/category",

        count: 0,

        key: "CATEGORY",
      },

      {
        name: "Products",

        subLink: "/products",

        count: 0,

        key: "PRODUCT",
      },
      {
        name: "Customer",

        subLink: "/customer",

        count: 0,

        key: "CUSTOMER",
      },
      {
        name: "Store",

        subLink: "/store",

        count: 0,

        key: "STORE",
      },
      {
        name: "Staff",

        subLink: "/staff",

        count: 0,

        key: "STAFF",
      },
      {
        name: "Appointment",

        subLink: "/appointment",

        count: 0,

        key: "APPOINTMENT",
      },
      {
        name: "Rate",

        subLink: "/rate",

        count: 0,

        key: "RATE",
      },
    ],
  },
  {
    name: "Settings",

    isCollapsible: true,

    open: false,

    active: false,

    subMenu: [
      {
        name: "Banner",

        subLink: "/bannerlist",

        count: 0,

        key: "BANNER LIST",
      },

      {
        name: "Optionlist",

        subLink: "/option",

        count: 0,

        key: "OPTIONLIST",
      },
      {
        name: "About",

        subLink: "/about",

        count: 0,

        key: "ABOUT",
      },
      {
        name: "Tryon",

        subLink: "/tryon",

        count: 0,

        key: "TRYON",
      },
      {
        name: "Testimonials",

        subLink: "/testimonial",

        count: 0,

        key: "TESTIMONIAL",
      },
    ],
  },
];

export default list;
