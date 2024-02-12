export default function Messages({ user, message }) {
  if (user) {
    return (
      <div>
        <div className="chat chat-start">
          <div className="chat-bubble chat-bubble-accent">
            {user}: {message}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="chat chat-end">
          <div className="chat-bubble chat-bubble-warning">You: {message}</div>
        </div>
      </div>
    );
  }
}
