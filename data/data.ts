export interface Project {
  title: string;
  cover: string;
  technologies: Array<String>;
  role: Array<String>;
  images: Array<Object>;
}

export const projects: Array<Project> = [
  {
    title: "angie",
    cover: "/projets/angie/angie.jpg",
    technologies: ["REACT", "WORDPRESS", "HTML5", "JAVASCRIPT"],
    role: ["intégration", "animations"],
    images: [
      {
        width: 1270,
        height: 2776,
        containerHeight: 2350,
        url: "/projets/angie/angie_01.jpg",
      },
      {
        width: 1270,
        height: 1813,
        containerHeight: 1620,
        url: "/projets/angie/angie_02.jpg",
      },
      {
        width: 1270,
        height: 1407,
        containerHeight: 1280,
        url: "/projets/angie/angie_03.jpg",
      },
      {
        width: 1270,
        height: 937,
        containerHeight: 1300,
        url: "/projets/angie/angie_04.jpg",
      },
    ],
  },
  {
    title: "axa",
    cover: "/projets/axa/axa.jpg",
    technologies: ["REACT", "NEXT.JS", "FRAMER-MOTION", "HTML5", "JAVASCRIPT"],
    role: ["intégration", "animations"],
    images: [
      "/projets/angie/angie_01.jpg",
      "/projets/angie/angie_02.jpg",
      "/projets/angie/angie_03.jpg",
      "/projets/angie/angie_04.jpg",
    ],
  },
  {
    title: "guerlain",
    cover: "/projets/guerlain/guerlain.jpg",
    technologies: ["HTML5", "WORDPRESS", "JAVASCRIPT"],
    role: ["intégration", "animations"],
    images: [
      "/projets/angie/angie_01.jpg",
      "/projets/angie/angie_02.jpg",
      "/projets/angie/angie_03.jpg",
      "/projets/angie/angie_04.jpg",
    ],
  },
];
