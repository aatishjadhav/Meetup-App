import { useParams } from "react-router-dom";
import Header from "../components/Header";
import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";

const EventDetails = () => {
  const eventId = useParams();
  const { data, loading, error } = useFetch(
    `https://meetup-app-indol.vercel.app/events/${eventId.eventId}`
  );


  if (loading) return <p>Loading event details...</p>;
  if (error) return <p>Error fetching event details: {error.message}</p>;
  if (!data) return <p>No event found.</p>;

  return (
    <div>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-6 mb-3">
            <h1>{data.events.eventName}</h1>
            <p>Hosted By:</p>
            <h2>{data.events.hostedBy}</h2>
            <img src={data.events.eventImgUrl} alt="Event Image" />
            <h2>Details:</h2>
            <p>{data.events.eventDetails}</p>
            <h2>Additional Information:</h2>
            <p>
              <strong>Dress Code:</strong> {data.events.additionalInfo.dressCode}
            </p>
            <p>
              <strong>Age Restrictions:</strong>{" "}
              {data.events.additionalInfo.ageRestriction}
            </p>
            <h2>Event Tags</h2>
            {data.events.eventTags.map((tag) => (
              <button
                className="btn btn-danger rounded"
                style={{ marginRight: "14px", marginBottom: "10px" }}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="col-md-6">
            <div className="card bg-light">
              <div className="card-body">
                <p className="card-text">
                  {data.events.sessionTimings.fromDate} at{" "}
                  {data.events.sessionTimings.fromTime} to <br />
                  {data.events.sessionTimings.toDate} at{" "}
                  {data.events.sessionTimings.toTime}
                </p>

                <p className="card-text">
                  {data.events.address.location} <br />
                  {data.events.address.venue}
                </p>

                <p className="card-text">₹ {data.events.price}</p>
              </div>
            </div>

            <div className="row py-3">
              <h3>Speakers: ({data.events.speakers.length})</h3>
              {data.events.speakers.map((speaker) => (
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-body text-center">
                      <img
                        src={speaker.imgUrl}
                        alt="speaker image"
                        className="rounded-circle"
                        height={140}
                        width={120}
                      />

                      <p className="card-text">
                        <strong>{speaker.name}</strong>
                      </p>
                      <p className="card-text">{speaker.designation}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
