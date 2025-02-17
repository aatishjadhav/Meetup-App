import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";

const Home = () => {
  const [type, setType] = useState("Both");
  const { data, loading, error } = useFetch(
    type === "Both"
      ? "http://localhost:4000/events"
      : `http://localhost:4000/events/types/${type}`
  );

  useEffect(() => {
    console.log(data); 
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error while fetching events</p>;

  return (
    <main className="container">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="fw-bold">Meetup Events</h1>

          <div>
            <form action="" className="input-group">
              <select
                name=""
                id=""
                className="form-control"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
                <option value="Both">Both</option>
              </select>
            </form>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        {/* Check if data exists and has events */}
        {data?.events?.length === 0 ? (
          <p>No events found for this type.</p>
        ) : (
          data?.events?.map((event) => (
            <div key={event._id} className="col-md-4">
              <div className="card mb-3">
                <img
                  src={event.eventImgUrl}
                  className="card-img"
                  alt="Event Image"
                />
                <div
                  className="card-img-overlay p-2"
                  style={{ width: "fit-content" }}
                >
                  <h5 className="card-title bg-light text-black rounded py-2 px-2 d-inline-block">
                    {event.eventType}
                  </h5>
                </div>
                <div className="card-body">
                  <p className="card-text">
                    {event.sessionTimings.fromDate} .{" "}
                    {event.sessionTimings.fromTime}
                  </p>
                  <h2>{event.eventName}</h2>
                  <a className="btn btn-primary" href={`/events/${event._id}`}>
                    View Details
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
};

export default Home;
