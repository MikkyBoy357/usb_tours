// Photography from one-off events and departures that isn't tied to a single
// tour's cover/gallery. Merged into the gallery page alongside the tour images.

export type PhotoSet = {
  /** Filter chip shown in the gallery. Matches the tour tag styling. */
  tag: string;
  photos: { src: string; alt: string }[];
};

const p = (name: string) => `/photos/${name}.jpg`;

export const photoSets: PhotoSet[] = [
  {
    tag: "Creative",
    photos: [
      {
        src: p("sip-paint-paillote-wide"),
        alt: "The thatched beach paillote at Cotonou set with easels and long white tables",
      },
      {
        src: p("sip-paint-friends-easel"),
        alt: "Two friends in sunglasses laughing behind their blank canvases at the Sip & Paint",
      },
      {
        src: p("sip-paint-brush-portrait"),
        alt: "A guest with burgundy locs turning from her easel, brush in hand",
      },
      {
        src: p("sip-paint-canvas-sketch"),
        alt: "A canvas sketched with a sun, a palm tree and a camper van waiting to be painted",
      },
      {
        src: p("sip-paint-guest-canvas"),
        alt: "A guest beside her canvas of a figure in a wide yellow hat",
      },
      {
        src: p("sip-paint-orange-smile"),
        alt: "A guest in orange smiling over her shoulder with a paintbrush raised",
      },
      {
        src: p("sip-paint-table-row"),
        alt: "Guests seated in a row along the paillote tables, painting in the afternoon light",
      },
      {
        src: p("sip-paint-hat-portrait-canvas"),
        alt: "A guest painting a portrait in blue and yellow, complete with a wide-brimmed hat",
      },
      {
        src: p("sip-paint-blue-headwrap-canvas"),
        alt: "A finished canvas of a woman in a blue headwrap beside a vase of red flowers",
      },
      {
        src: p("sip-paint-guest-blue-dress"),
        alt: "A guest in patterned blue smiling back from her half-finished painting",
      },
      {
        src: p("sip-paint-guest-laugh"),
        alt: "A guest laughing mid-brushstroke, henna on her hands, at the Sip & Paint",
      },
      {
        src: p("sip-paint-coconut-orange"),
        alt: "A guest in an orange batik dress with a fresh coconut on the beach",
      },
      {
        src: p("sip-paint-coconut-full-length"),
        alt: "A guest walking the sand with her coconut between painting sessions",
      },
      {
        src: p("sip-paint-coconut-locs"),
        alt: "A guest holding out a fresh coconut in front of the beach huts",
      },
      {
        src: p("sip-paint-host-cheer"),
        alt: "A MrUSB host in a branded tee cheering under the paillote roof",
      },
      {
        src: p("sip-paint-frames-duo"),
        alt: "Two guests holding MrUSB photo frames with their finished paintings",
      },
      {
        src: p("sip-paint-frame-green-canvas"),
        alt: "A guest framing her finished portrait canvas on the beach",
      },
      {
        src: p("sip-paint-frames-friends"),
        alt: "Friends holding photo frames and the colourful canvases they painted",
      },
      {
        src: p("sip-paint-frame-palm-bus"),
        alt: "A guest with her painting of a camper van beneath palm trees",
      },
      {
        src: p("sip-paint-frame-peace-duo"),
        alt: "Two guests throwing peace signs inside a MrUSB photo frame on the sand",
      },
      {
        src: p("sip-paint-frames-sunset-canvas"),
        alt: "Two guests presenting their paintings — a portrait and a palm-tree sunset — on the beach",
      },
    ],
  },
];
