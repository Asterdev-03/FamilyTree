import React, { useState } from "react";
import FamilyMember from "./FamilyMember";
import Modal from "react-modal";

const initialData = {
  members: {
    "member-1": {
      id: "member-1",
      name: "New Member",
      children: [],
      parents: [],
      siblings: [],
    },
  },
  rootId: "member-1", // The root of the tree
};

Modal.setAppElement("#root");

const FamilyTree = () => {
  const [data, setData] = useState(initialData);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentMemberId, setCurrentMemberId] = useState(null);
  const [relationType, setRelationType] = useState("");
  const [newMemberName, setNewMemberName] = useState("");

  const openModal = (memberId) => {
    setCurrentMemberId(memberId);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setRelationType("");
    setNewMemberName("");
  };

  const handleAddMember = () => {
    if (!relationType || !newMemberName) return;

    const newId = `member-${Object.keys(data.members).length + 1}`;
    const newMember = {
      id: newId,
      name: newMemberName,
      children: [],
      parents: [],
      siblings: [],
    };

    let updatedMembers = {
      ...data.members,
      [newId]: newMember,
    };

    if (relationType === "children") {
      updatedMembers = {
        ...updatedMembers,
        [currentMemberId]: {
          ...data.members[currentMemberId],
          children: [...data.members[currentMemberId].children, newId],
        },
        [newId]: {
          ...newMember,
          parents: [currentMemberId],
        },
      };
    } else if (relationType === "parents") {
      updatedMembers = {
        ...updatedMembers,
        [currentMemberId]: {
          ...data.members[currentMemberId],
          parents: [...data.members[currentMemberId].parents, newId],
        },
        [newId]: {
          ...newMember,
          children: [currentMemberId],
        },
      };
    } else if (relationType === "siblings") {
      const parentIds = data.members[currentMemberId].parents;
      updatedMembers = {
        ...updatedMembers,
        [currentMemberId]: {
          ...data.members[currentMemberId],
          siblings: [...data.members[currentMemberId].siblings, newId],
        },
        [newId]: {
          ...newMember,
          siblings: [currentMemberId],
          parents: parentIds,
        },
      };

      parentIds.forEach((parentId) => {
        updatedMembers[parentId] = {
          ...data.members[parentId],
          children: [...data.members[parentId].children, newId],
        };
      });
    }

    setData({
      ...data,
      members: updatedMembers,
    });

    closeModal();
  };

  const handleDeleteMember = (memberId) => {
    const updatedMembers = { ...data.members };
    delete updatedMembers[memberId];

    const updatedMemberOrder = Object.keys(updatedMembers);

    setData({
      members: updatedMembers,
      memberOrder: updatedMemberOrder,
    });
  };

  const handleEditMember = (memberId, newName) => {
    const updatedMembers = {
      ...data.members,
      [memberId]: {
        ...data.members[memberId],
        name: newName,
      },
    };

    setData({
      ...data,
      members: updatedMembers,
    });
  };

  const renderTree = (memberId) => {
    const member = data.members[memberId];
    return (
      <div className="tree-node" key={member.id}>
        <FamilyMember
          member={member}
          onAdd={() => openModal(member.id)}
          onDelete={() => handleDeleteMember(member.id)}
          onEdit={(newName) => handleEditMember(member.id, newName)}
        />
        {member.children.length > 0 && (
          <div className="tree-children">
            {member.children.map((childId) => renderTree(childId))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="family-tree">
      {renderTree(data.rootId)}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Add Member"
      >
        <h2>Select Relation Type</h2>
        <button onClick={() => setRelationType("children")}>Child</button>
        <button onClick={() => setRelationType("parents")}>Parent</button>
        <button onClick={() => setRelationType("siblings")}>Sibling</button>
        <input
          type="text"
          placeholder="Enter member name"
          value={newMemberName}
          onChange={(e) => setNewMemberName(e.target.value)}
        />
        <button onClick={handleAddMember}>Confirm</button>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default FamilyTree;
