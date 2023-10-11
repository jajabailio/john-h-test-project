import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { UserType } from '.'; //ToDo move to shared library

interface ParentComponentProps {
  item: UserType;
  deleteItem: (id: string) => void;
  editItem: (item: UserType) => void;
  toggleComplete: (id: string) => void;
}

export const ListUser: React.FC<ParentComponentProps> = ({
  item,
  deleteItem,
  editItem,
  toggleComplete,
}) => {
  const handleEditItem = (item: UserType) => {
    editItem(item);
  };

  return (
    <div className="List">
      <p
        className={`${item.completed ? 'completed' : 'incompleted'}`}
        onClick={() => toggleComplete(item.id)}
      >
        {item.fullName}
      </p>
      <div>
        <FontAwesomeIcon
          className="edit-icon"
          icon={faPenToSquare}
          onClick={() => handleEditItem(item)}
        />
        <FontAwesomeIcon
          className="delete-icon"
          icon={faTrash}
          onClick={() => deleteItem(item.id)}
        />
      </div>
    </div>
  );
};
