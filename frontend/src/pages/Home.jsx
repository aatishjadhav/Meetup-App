import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const Home = () => {
  const [type, setType] = useState("Both");
  const [search, setSearch] = useState("");
  const { data, loading, error } = useFetch(
    type === "Both"
      ? "http://localhost:4000/events"
      : `http://localhost:4000/events/types/${type}`
  );

  const filteredEvents = data?.events?.filter((event) =>
    event.eventName.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error while fetching events</p>;

  return (
    <main className="container">
      <div className="container">
        <Link to="/">
          <img
            src="https://tse2.mm.bing.net/th?id=OIP.fDQfifUfToxZkRwl0cWzHQHaCp&pid=Api&P=0&h=180"
            alt="Meetup Logo"
            className="img-fluid mt-3"
            style={{ height: "50px" }}
          />
        </Link>
        <div className="float-end mt-4">
          <form className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="⌕ Search by title and t..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
        </div>
      </div>
      <hr />
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
        {filteredEvents?.length === 0 ? (
          <p>No events found for this type.</p>
        ) : (
          filteredEvents?.map((event) => (
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
                  <Link className="btn btn-primary" to={`/events/${event._id}`}>
                    View Details
                  </Link>
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
