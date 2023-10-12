import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { CompanyType } from '.'; //ToDo move to shared library

interface ParentComponentProps {
  item: CompanyType;
  deleteItem: (id: string) => void;
  editItem: (item: CompanyType) => void;
}

export const ListCompany: React.FC<ParentComponentProps> = ({
  item,
  deleteItem,
  editItem,
}) => {
  const handleEditItem = (item: CompanyType) => {
    editItem(item);
  };

  const handleViewItem = (item: CompanyType) => {
    editItem(item);
  };

  return (
    <div className="List">
      <p onClick={() => handleViewItem(item)}>{item.name}</p>
      <div>
        <FontAwesomeIcon
          className="edit-icon"
          icon={faPenToSquare}
          onClick={() => handleEditItem(item)}
        />
        <FontAwesomeIcon
          className="delete-icon"
          icon={faTrash}
          onClick={() => deleteItem(item._id)}
        />
      </div>
    </div>
  );
};
