import { Map, MapControls, MapMarker, MapRoute, MarkerContent, MarkerPopup } from "@/components/ui/map";

export function MarkerPlace({ index }: { index: number }) {
  return (
    <MarkerContent>
      <div className="relative flex h-5 w-5 items-center justify-center rounded-full border-1 border-white bg-primary shadow-md">
        <span className="text-xs font-semibold text-primary-foreground">{index}</span>
      </div>
    </MarkerContent>
  )
}

export type Place = {
  name: string;
  longitude: number;
  latitude: number;
}

type ItineraryProps = {
  data: Place[]
}

export default function Itinerary({ data }: ItineraryProps) {
  return (
    <div>
      <Map center={[-73.996, 40.7395]} zoom={11} className="w-auto h-96">
        <MapControls />
        {
          data.map((place, index) => (
            <MapMarker key={index} longitude={place.longitude} latitude={place.latitude}>
              <MarkerPlace index={index + 1} />
              <MarkerPopup>
                <h6 className="text-sm font-medium">{place.name}</h6>
              </MarkerPopup>
            </MapMarker>
          ))
        }

        <MapRoute coordinates={data.map(place => [place.longitude, place.latitude])} />
      </Map>
    </div>
  )
}