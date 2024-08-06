import React, { useState } from "react";

const FamilyMember = ({ member, onAdd, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(member.name);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEdit(newName);
    setIsEditing(false);
  };

  return (
    <div className="family-member">
      <div className="family-member__info">
        {isEditing ? (
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        ) : (
          <div className="family-member__name">{member.name}</div>
        )}
        {isEditing ? (
          <button onClick={handleSave}>Save</button>
        ) : (
          <>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={onAdd}>Add</button>
            <button onClick={onDelete}>Delete</button>
          </>
        )}
      </div>
    </div>
  );
};

export default FamilyMember;
