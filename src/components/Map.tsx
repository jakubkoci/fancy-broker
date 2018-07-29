import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps'
import { compose, withStateHandlers } from 'recompose'

const GOOGLE_MAP_API_KEY = 'AIzaSyAygeTGTlo0iMJLFXnEGYK9T9mYxwrTqH0'
const GOOGLE_MAP_API_URL = 'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places'

const googleMapUrl = `${GOOGLE_MAP_API_URL}&key=${GOOGLE_MAP_API_KEY}`

type Location = {
  id: string
  name: {
    first: string
    last: string
  }
  latitude: number
  longitude: number
}

type MapContainerProps = {
  locations: Location[]
}

const MapContainer = ({ locations }: MapContainerProps) => {
  return (
    <div className="map">
      <Map
        locations={locations}
        googleMapURL={googleMapUrl}
        loadingElement={<div style={{ height: '100%' }} />}
        containerElement={<div style={{ height: '600px' }} />}
        mapElement={<div style={{ height: '100%' }} />}
      />
    </div>
  )
}

type MapProps = {
  locations: Location[]
  openLocationId: string | null
  onToggleOpen: (locationId: string | null) => void
}

const PRAGUE_GPS_LOCATION = { lat: 50.0755381, lng: 14.43780049999998 }

// TODO Replace any with concrete types
const Map: any = compose<any, MapProps>(
  withStateHandlers(
    () => ({
      openLocationId: null,
    }),
    {
      onToggleOpen: ({ openLocationId }) => locationId => {
        return {
          openLocationId: openLocationId === locationId ? null : locationId,
        }
      },
    }
  ),
  withScriptjs,
  withGoogleMap
)(({ locations, openLocationId, onToggleOpen }: MapProps) => (
  <GoogleMap defaultZoom={2} defaultCenter={PRAGUE_GPS_LOCATION}>
    {locations.map(location => {
      return (
        <Marker
          key={location.id}
          position={{ lat: location.latitude, lng: location.longitude }}
          onClick={() => onToggleOpen(location.id)}
        >
          {openLocationId === location.id && (
            <InfoWindow onCloseClick={() => onToggleOpen(null)}>
              <span>{`${location.name.first} ${location.name.last}`}</span>
            </InfoWindow>
          )}
        </Marker>
      )
    })}
  </GoogleMap>
))

export default MapContainer
