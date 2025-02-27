import {
  BookOpen,
  Bot,
  IdCard,
  LifeBuoy,
  Settings2,
  SquareTerminal,
} from "lucide-react";

export const MAIN_MENUS = [
  {
    title: "Authorizations",
    url: "/auth",
    icon: IdCard,
    items: [
      {
        title: "Authority",
        url: "/authority",
      },
    ],
  },
  {
    title: "Playground",
    url: "#",
    icon: SquareTerminal,
    isActive: true,
    items: [
      {
        title: "History",
        url: "#",
      },
      {
        title: "Starred",
        url: "#",
      },
      {
        title: "Settings",
        url: "#",
      },
    ],
  },
  {
    title: "Abouts",
    url: "/about",
    icon: LifeBuoy,
    items: [
      {
        title: "About",
        url: "/about",
      },
    ],
  },
  {
    title: "Locale",
    url: "/locale",
    icon: LifeBuoy,
  },
  {
    title: "Models",
    url: "#",
    icon: Bot,
    items: [
      {
        title: "Genesis",
        url: "#",
      },
      {
        title: "Explorer",
        url: "#",
      },
      {
        title: "Quantum",
        url: "#",
      },
    ],
  },
  {
    title: "Documentation",
    url: "#",
    icon: BookOpen,
    items: [
      {
        title: "Introduction",
        url: "#",
      },
      {
        title: "Get Started",
        url: "#",
      },
      {
        title: "Tutorials",
        url: "#",
      },
      {
        title: "Changelog",
        url: "#",
      },
    ],
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings2,
    items: [
      {
        title: "General",
        url: "#",
      },
      {
        title: "Team",
        url: "#",
      },
      {
        title: "Billing",
        url: "#",
      },
      {
        title: "Limits",
        url: "#",
      },
    ],
  },
];
