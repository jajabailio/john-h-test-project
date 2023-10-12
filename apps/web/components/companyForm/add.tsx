import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { postCompany } from 'apps/web/app/api/companyRoute';
import { CompanyType, initialCompany } from '.'; //ToDo move to shared library
import { getUsers } from 'apps/web/app/api/userRoute';
import { UserType } from '../userForm';

interface ParentComponentProps {
  handleReturn: (items: CompanyType[]) => void;
}

export const AddCompany: React.FC<ParentComponentProps> = ({
  handleReturn,
}) => {
  const [formData, setFormData] = useState<CompanyType>(initialCompany);
  const [users, setUsers] = useState<UserType[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const fetchUsers = async () => {
    const { data } = await getUsers();
    setUsers(data);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formData) {
      const { data } = await postCompany(
        formData.name,
        formData.address,
        formData.userId
      );
      handleReturn(data);
      setFormData(initialCompany);
    }
  };

  const handleOptionChange = (value: string) => {
    if (selectedOptions.includes(value)) {
      setSelectedOptions(selectedOptions.filter((option) => option !== value));
    } else {
      setSelectedOptions([...selectedOptions, value]);
    }

    setFormData({ ...formData, userId: selectedOptions });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <form onSubmit={handleSubmit} className="ItemForm">
      <div>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          onBlur={handleInputChange}
          className="item-input"
          placeholder="Company Name"
        />
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          onBlur={handleInputChange}
          className="item-input"
          placeholder="Address"
        />
      </div>
      <div className="item-input-button">
        <select
          multiple
          onChange={(e) => handleOptionChange(e.target.value)}
          className="item-input"
          value={selectedOptions}
        >
          {users.map((option) => (
            <option key={option.userId} value={option.userId}>
              {option.fullName}
            </option>
          ))}
        </select>

        <button type="submit" className="item-btn">
          Add Company
        </button>
      </div>
    </form>
  );
};
