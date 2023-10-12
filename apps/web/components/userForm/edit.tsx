import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { UserType } from '.';
import { postUser } from 'apps/web/app/api/userRoute';
import { initialUser } from '.'; //ToDo move to shared library

interface ParentComponentProps {
  handleReturn: (items: UserType[]) => void;
  selectedItem: UserType;
}

export const EditUser: React.FC<ParentComponentProps> = ({
  selectedItem,
  handleReturn,
}) => {
  const [formData, setFormData] = useState<UserType>(selectedItem);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formData) {
      const { data } = await postUser(formData.fullName, formData.email);
      handleReturn(data);
      setFormData(initialUser);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="ItemForm">
      <input
        type="text"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        onBlur={handleInputChange}
        className="item-input"
        placeholder="Email"
      />
      <input
        type="text"
        name="fullName"
        value={formData.fullName}
        onChange={handleInputChange}
        onBlur={handleInputChange}
        className="item-input"
        placeholder="First Name"
      />
      <button type="submit" className="item-btn">
        Update User
      </button>
    </form>
  );
};
