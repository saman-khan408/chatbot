import RobotProfileImage from "../assets/robot.png";
import UserProfileImage from "../assets/user.png";
// import ProfileImage from "../assets/profile-1.jpg"
import "./ChatMessage.css";
import dayjs from "dayjs";

export function ChatMessage(props) {
  const message = props.message;
  const sender = props.sender;
  const time = props.time;

  return (
    <div
      className={sender === "user" ? "chat-message-user" : "chat-message-robot"}
    >
      {sender === "robot" && (
        <img
          src={RobotProfileImage}
          alt="robot"
          className="chat-message-profile"
        />
      )}
      <div className="chat-message-text">
        {message}
        {time && (
          <div className="chat-message-time">{dayjs(time).format("h:mma")}</div>
        )}
      </div>

      {sender === "user" && (
        <img className="chat-message-profile" src={UserProfileImage} />
      )}
    </div>
  );
}
