type Props = {
  lat: number;
  lng: number;
  label: string;
};

export function TourMap({ lat, lng, label }: Props) {
  // OpenStreetMap embed — no API key needed.
  const d = 0.3; // bbox padding in degrees
  const bbox = [lng - d, lat - d / 2, lng + d, lat + d / 2].join(",");
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;

  return (
    <figure className="overflow-hidden rounded-3xl border border-border">
      <iframe
        title={`Map showing ${label}`}
        src={src}
        loading="lazy"
        className="block aspect-[16/9] w-full"
      />
      <figcaption className="flex items-center justify-between border-t border-border bg-muted/40 px-4 py-2.5 text-xs text-muted-foreground">
        <span>{label}</span>
        <a
          href={`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=10/${lat}/${lng}`}
          target="_blank"
          rel="noreferrer"
          className="hover:text-foreground"
        >
          View larger map →
        </a>
      </figcaption>
    </figure>
  );
}
