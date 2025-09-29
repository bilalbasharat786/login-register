import { useState } from "react"; // useState hook import

function App() {
  // students ka array banaya
  const [students, setStudents] = useState([
    { id: 1, name: "Ali" },
    { id: 2, name: "Sara" },
    { id: 3, name: "Bilal" },
  ])

  return (
    <div>
      <h1>Lists and Keys Example</h1>

      {/* ---------- LIST RENDERING with map() ---------- */}
      <ul>
        {students.map((student) => (
          
          <li key={student.id}>{student.name}</li>
        ))}
      </ul>

      {/* ---------- ADDING NEW ITEM (Dynamic list) ---------- */}
      
    </div>
  );
}

export default App;



