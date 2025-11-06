import { useState } from "react";
import States from '../../content/CountryStateCityLocality/countryStateCity.json'
const StateCityDropdown = () => {
    // const countries= [
    //     {
    //       name: "India",
    //       states: [
    //         {
    //           name: "first state",
    //           cities: [
    //             {
    //               name: "area1",
    //               localities: ["locality1", "locality2", "locality3"],
    //             },
    //             {
    //               name: "area2",
    //               localities: ["locality4", "locality5", "locality6"],
    //             },
    //             {
    //               name: "area3",
    //               localities: ["locality7", "locality8", "locality9"],
    //             }
    //           ]
    //         },
    //         {
    //           name: "second state",
    //           cities: [
    //             {
    //               name: "area4",
    //               localities: ["locality1", "locality2", "locality3"],
    //             },
    //             {
    //               name: "area5",
    //               localities: ["locality4", "locality5", "locality6"],
    //             },
    //             {
    //               name: "area6",
    //               localities: ["locality7", "locality8", "locality9"],
    //             }
    //           ]
    //         },
    //         {
    //           name: "third state",
    //           cities: [
    //             {
    //               name: "area7",
    //               localities: ["locality10", "locality11", "locality12"],
    //             },
    //             {
    //               name: "area8",
    //               localities: ["locality13", "locality14", "locality15"],
    //             },
    //             {
    //               name: "area9",
    //               localities: ["locality16", "locality17", "locality18"],
    //             }
    //           ]
    //         }
    //       ]
    //     }
    //   ]

//const [country, setCountry] = useState("----country----");


  const [state, setState] = useState("----state----");
  const [city, setCity] = useState("----city----");
  const [locality, setLocality] = useState("----locality----");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [localities, setLocalities] = useState([]);

//   function changeCountry(e) {
//     setCountry(e.target.value);
//     setState("----state----");
//     setCity("----city----");
//     setLocality("----locality----");
//     setStates(Countries);
//   }

  function changeState(e) {
    setState(e.target.value);
    setCity("----city----");
    setLocality("----locality----");
    setCities(States.find((sta) => sta.name === e.target.value)?.cities || []);
  }

  function changeCity(e) {
    setCity(e.target.value);
    setLocality("----locality----");
    setLocalities(
      cities.find((cty) => cty.name === e.target.value)?.localities || []
    );
  }

  function changeLocality(e) {
    setLocality(e.target.value);
  }

  return (
    <div className="flex justify-center">
      <div className="mt-5 flex gap-6">

        {/* <select className="" value={country} onChange={changeCountry}>
          <option>---Country----</option>
          {countries?.map((ctr, index) => (
            <option key={index} value={ctr?.name}>
              {ctr.name}
            </option>
          ))}
        </select>
        <br /> */}
        
        <select value={state} onChange={changeState}>
          <option>---State----</option>
          {States?.map((state, index) => (
            <option key={index} value={state?.name}>
              {state.name}
            </option>
          ))}
        </select>
        <br />
        <select value={city} onChange={changeCity}>
          <option>---City----</option>
          {cities?.map((city, index) => (
            <option key={index} value={city?.name}>
              {city.name}
            </option>
          ))}
        </select>
        <select value={locality} onChange={changeLocality}>
          <option>---Locality----</option>
          {localities?.map((loc, index) => (
            <option key={index} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default StateCityDropdown;
