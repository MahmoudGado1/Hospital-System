import { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { isAuthenticated } = useContext(Context);
  const [messagesLoading, setMessagesLoading] = useState(true); // Loading state for doctors

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/message/getall",
          {
            withCredentials: true,
          }
        );
        setMessages(data.messages);
      } catch (error) {
        console.log(error.response.data.message);
      } finally {
        setMessagesLoading(false);
      }
    };
    fetchMessages();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  return (
    <section className="page messages">
      <h1>MESSAGE</h1>
      <div className="banner">
        {messagesLoading ? (
          <div className="loading-spinner">
            <h2>Loading Messages...</h2>
          </div>
        ) : messages && messages.length > 0 ? (
          messages.map((element, index) => {
            return (
              <div className="card" key={index}>
                <div className="details">
                  <p>
                    First Name: <span>{element.firstName}</span>
                  </p>
                  <p>
                    Last Name: <span>{element.lastName}</span>
                  </p>
                  <p>
                    Email: <span>{element.email}</span>
                  </p>
                  <p>
                    Phone: <span>{element.phone}</span>
                  </p>
                  <p>
                    Message: <span>{element.message}</span>
                  </p>{" "}
                </div>
              </div>
            );
          })
        ) : (
          <h1>No Messages!</h1>
        )}
      </div>
    </section>
  );
};

export default Messages;
