import { MapContainer } from "./map";

export function Directions() {
  return (
    <div className = "directionsCenter">
      <h1 className="directionsPageHeading">Where to find us!</h1>
      <div className="directionsPage">
        <img alt="cinema" src="/cinemapic.jpg"></img>

        <div className="directionsParagraph">
          <h1>Directions</h1>
          <div className="directionsText">
            <div className="directionsLeft">
              <div className="textBlock">
                <p>
                  <strong>By train</strong>
                </p>
                <br />
                <p>
                  Nearest train station to the cinema is QA station (approx. 10
                  minute walk)
                </p>{" "}
                <br />
              </div>
              <div className="textBlock">
                <p>
                  <strong>By bus</strong>
                </p>
                <br />
                <p>
                  Buses number 20 33 and 50 stop directly outside the complex.
                  There is also other bus stops nearby at quality street which
                  is a 5 minute walk away and assurance road which is a 15
                  minute walk away
                </p>{" "}
                <br />
              </div>
              <div className="textBlock">
                <p>
                  <strong>By car</strong>
                </p>
                <br />
                <p>
                  QA cinema complex is accessible from north road and south
                  street
                </p>{" "}
                <br />
              </div>
            </div>

            <div className="directionsRight">
              <div className="textBlock">
                <p>
                  <strong>Parking</strong>
                </p>
                <br />
                <p>
                  There is secure parking next to the complex. parking is free
                  for the first 5 hours after which you must pay a fee to stay
                  any longer. We do not own or operate the car park and
                  therefore the conditions of use are subject to change
                </p>{" "}
                <br />
              </div>
              <div className="textBlock">
                <p>
                  <strong>Disabled Access</strong>
                </p>
                <br />
                <p>
                  The cinema is on 2 levels and has disable lift access to the
                  second floor
                </p>{" "}
                <br />
              </div>
              <div className="textBlock">
                <p>
                  <strong>Disabled Parking</strong>
                </p>
                <br />
                <p>
                  there are 20 designated disabled spots available in the car
                  park
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mapAndHeading">
      <h1 className="directionsPageHeading">&#8595; We are here &#8595;</h1>
      <div className="map">
        <MapContainer />
      </div>
    </div>
    </div>
  );
}
