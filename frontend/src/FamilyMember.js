import React from "react";

const FamilyMember = ({ member, onAdd, onDelete }) => {
  return (
    <div className="family-member">
      <div className="family-member__info">
        <div className="family-member__name">{member.name}</div>
        <button onClick={onAdd}>Add</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};

export default FamilyMember;
