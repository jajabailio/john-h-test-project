'use client';
import React, { useState, useEffect } from 'react';
import { ListCompany } from './list';
import { AddCompany } from './add';
import { EditCompany } from './edit';
import { getCompanies, deleteCompany } from 'apps/web/app/api/companyRoute';
import { UserType, initialUser } from '../userForm';

//ToDo move to shared library
export interface CompanyType {
  _id: string;
  id: string;
  name: string;
  address: string;
  userId: string[];
  users: UserType[];
}

export const initialCompany: CompanyType = {
  _id: '',
  id: '',
  name: '',
  address: '',
  userId: [''],
  users: [initialUser],
};

export const CompanyForm = () => {
  const [items, setItems] = useState<CompanyType[]>([]);
  const [selectedItem, setSelectedItem] = useState<CompanyType>(initialCompany);

  const fetchUsers = async () => {
    const { data } = await getCompanies();
    setItems(data);
  };

  const deleteItem = async (id: string) => {
    setItems(items.filter((item) => item._id !== id));
    await deleteCompany(id);
  };

  const editItem = (item: CompanyType) => {
    setSelectedItem(item);
  };

  const handleReturn = (items: CompanyType[]) => {
    setItems(items);
    setSelectedItem(initialCompany);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="ItemWrapper">
      <h1>Company List</h1>
      {selectedItem.id === '' ? (
        <AddCompany handleReturn={handleReturn} />
      ) : (
        <EditCompany handleReturn={handleReturn} selectedItem={selectedItem} />
      )}

      {selectedItem.id === '' &&
        items.map((item: CompanyType) => (
          <ListCompany
            key={item.id}
            item={item}
            deleteItem={deleteItem}
            editItem={editItem}
          />
        ))}
    </div>
  );
};
