import React, { useEffect, useRef, useState } from 'react'
import Forminput from '../Form/index'
import * as Styled from '../Home/home.Styled'
import * as  DATA from '../../DATA/data'
import mapboxgl from "mapbox-gl";

export interface IHome {
    IATA_code?: string | undefined;
    ICAO_code?: string | undefined;
    airport_name?: string | undefined;
    city_name?: string | undefined;
    lat: string | undefined;
    lon: string | undefined;
    country?: string | undefined;
    type?:string | undefined;
}

export interface ITo {
    IATA_code?: string | undefined;
    ICAO_code?: string | undefined;
    airport_name?: string | undefined;
    city_name?: string | undefined;
    lat?: string | undefined;
    lon?: string | undefined;
    country?: string;
    type?:string | undefined;
}


export default function HomeCompnent() {

    const [from, setFrom] = useState<IHome | undefined>();
    console.log("form-->",from)
    const [to, setTo] = useState<ITo | undefined>();
    console.log("to-->",to)

    const [fromAirPort, setFromAirPort] = useState([]);
    const [toAirPort, setToAirPort] = useState([]);
    console.log("toAirPort--->",toAirPort)
    const [nautical, setNautical] = useState(Number);

    const latg1 =  Number(from?.lat);
    const lon1 = Number(from?.lon);
    const latg2 = Number(to?.lat);
    const lon2 = Number(to?.lon);
    console.log("latg1-->",latg1)
    console.log("lon1-->",lon1)
    console.log("latg2-->",latg2)
    console.log("lon2-->",lon2)


    const mapContainer: any = useRef(null);
    console.log("mapContainer", mapContainer)

    const map: any = useRef(null)
    console.log(map)
    mapboxgl.accessToken = "pk.eyJ1IjoiZGVla3NoYW1laHRhMTI1IiwiYSI6ImNrcWV6OWE0bDBjcmMydXF1enZqMjd5MDMifQ.hFB7SI_kojKYfNQ42c62BA";

    const newMapData = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {
              LTYPE: "MFG",
            },
            geometry: {
              type: "Point",
              coordinates: [lon1, latg1],
            },
          },
    
          {
            type: "Feature",
            properties: {
              LTYPE: "MFG",
            },
            geometry: {
              type: "Point",
              coordinates: [lon2, latg2],
            },
          },
    
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: [
                [lon1, latg1],
                [lon2, latg2],
                // [-70.063751, 41.256952],
                // [-161.841, 60.7836],
              ],
            },
          },
        ],
      };

    //
    useEffect(() => {
        if(map.current) return
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [ 78.44064, 21.11575],
            zoom: 4,
        });
    });

    const addLayer = (map: any) =>{
        map.current.addLayer({
            id: "route",
            type: "line",
            source: "mapDataSourceId",
            filter: ["==", "$type", "LineString"],
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
            paint: {
              "line-color": "black",
              "line-width": {
                base: 1.5,
                stops: [
                  [5, 5],
                  [5, 5],
                  [5, 5],
                  [22, 8],
                ],
              },
            },
          });
      
          map.current.addLayer({
            id: "location",
            type: "circle",
            source: "route",
            filter: ["==", "$type", "Point"],
           
            paint: {
              "circle-color": "red",
              "circle-radius": {
                base: 30,
                stops: [
                  [10, 18],
                  [6, 30],
                  [10, 8],
                  [22, 12],
                ],
              },
            },
          });
        };

    
      const handleFormSearch = (value: any) =>{
        console.log("value",value)
        setFrom(value);
        // const resultData = DATA?.listAirport.filter(
        // (p) => p.country === "India"
        // );
        //  console.log("resultData",resultData) 
        // const airportList = resultData.filter((p)=>p.airport_name === "Airports");
        const resultFrom:any = DATA?.listAirport.filter((p)=>
        p.city_name.toLowerCase().includes(value));
        console.log("resultFromDATA",resultFrom)
        
        setFromAirPort(resultFrom)
        console.log("resultForm1--->",resultFrom)
      };

      const handleToSearch = (value: any) => {
        console.log("value",value)
        setTo(value);
        // const resultData = DATA?.listAirport.filter(
        //     (p) => p.country === "India"
        // );
        // const airprotlist = resultData.filter((p) => p.airport_name === "Airports");
        const resultFrom:any = DATA?.listAirport;
        // .filter((p)=> 
        // p.city_name.toLowerCase().includes(value));
        setToAirPort(resultFrom);
        console.log("resultForm--->",resultFrom)

      };

      const onHandelSelect = () => {
        if (from && to) {
            var R = 6371; // km
            var dLat = toRad(latg2 - latg1);
            var dLon = toRad(lon2 - lon1);
            var lat1 = toRad(latg1);
            var lat2 = toRad(latg2);
      
            var a =
              Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLon / 2) *
                Math.sin(dLon / 2) *
                Math.cos(lat1) *
                Math.cos(lat2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var d = R * c;
            var n = d * 0.5399568035;
            setNautical(n);
            map.current.addSource("mapDataSourceId", {
              type: "geojson",
              data: newMapData,
            });
            addLayer(map);
            map.current.flyTo({
              center: [lon1, latg1],
            });
          }
    };

    function toRad(value:any) {
        return value * (Math.PI/180)
      }




    return (
        <Styled.MainContainer>
            <Styled.HeaderText>Airport Distances</Styled.HeaderText>
            <Styled.Div>
                <Forminput
                    labletext='Distance From'
                    placeholder='From'
                    typetext='text'
                    onChange={handleFormSearch}
                    onSelected={handleFormSearch}
                    value={from}
                    searchResult={fromAirPort}
                />
                <Forminput
                    labletext='Distance To'
                    placeholder='To'
                    typetext='text'
                    onChange={handleToSearch}
                    onSelected={handleToSearch}
                    value={to} 
                    searchResult={toAirPort}
                    />

            </Styled.Div>
            <Styled.BtnContainer>
                <Styled.Button disabled={false} onClick={onHandelSelect}>
                    Distances
                </Styled.Button>
            </Styled.BtnContainer>
            <Styled.TextContainer>
                <Styled.Text>
                    Nautical :{Number(nautical).toFixed(2)}
                </Styled.Text>
            </Styled.TextContainer>
            <div ref={mapContainer} style={{ height: '1000px',marginTop:50 }} />
        </Styled.MainContainer>
    )
}
