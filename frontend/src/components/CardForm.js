
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useParams } from "react-router-dom";

function CardForm({ setShowForm , users }) {
  const { addCard } = useContext(UserContext);

  const [errMsg, setErrMsg] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const {projectId} = useParams();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "",
    project_id:projectId ,
    assign:""
  });

  const onChangeInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (!Object.values(formData).every((val) => val.trim() !== "")) {
      setSuccessMsg(false);
      setErrMsg("Please fill in all required fields!");
      return;
    }

    const data = await addCard(formData );
    if (data.success) {
      setFormData({ title: "", description: "", priority: "",project_id:"",assign:""});
      setSuccessMsg("You have successfully added a new card.");
      window.location.reload();
      setErrMsg(false);
      setShowForm(false);
    } else if (!data.success && data.message) {
        window.location.reload();
      setSuccessMsg(false);
      setErrMsg(data.message);
    }
  };
console.log(users)
  return (
    <form className="addcardform" onSubmit={submitForm}>
      <div className="formdiv">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={onChangeInput}
        />
        <input
          type="text"
          id="title"
          name="project_id"
          value={formData.project_id}
          onChange={onChangeInput}
          hidden
        />
      </div>
      <div className="formdiv">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={onChangeInput}
        />
      </div>
      <div className="formdiv">
        <label htmlFor="priority">Priority:</label>
        <select id="priority" name="priority" value={formData.priority} onChange={onChangeInput}>
          <option value="">Select Priority</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
      <div className="formdiv">
        <label htmlFor="assign">Assign:</label>
        <select id="assign" name="assign" value={formData.assign} onChange={onChangeInput}>
          <option value="">Select User</option>
          {users.map((user) => (
             <option key={user.id} value={user.email}>{user.email}</option>
             ))}

        </select>
      </div>
      <button className="submitbtn" type="submit">Submit</button>
      {errMsg && <p>{errMsg}</p>}
      {successMsg && <p>{successMsg}</p>}
    </form>
  );
}

export default CardForm;



