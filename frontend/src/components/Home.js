// Home.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function Home() {
  const [docId, setDocId] = useState("");
  const navigate = useNavigate();

  const handleCreate = () => {
    const newId = uuidv4();
    navigate(`/editor/${newId}`);
  };

  const handleJoin = () => {
    if (docId.trim()) {
      navigate(`/editor/${docId}`);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Document Editor</h1>
      <button onClick={handleCreate}>Create New Document</button>
      <div>
        <input
          type="text"
          placeholder="Enter Document ID"
          value={docId}
          onChange={(e) => setDocId(e.target.value)}
        />
        <button onClick={handleJoin}>Join</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "100px",
  },
};

export default Home;
