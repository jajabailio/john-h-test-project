'use client';
import React, { useState, useEffect } from 'react';
import { ListUser } from './list';
import { AddUser } from './add';
import { EditUser } from './edit';
import { getUsers, deleteUser } from 'apps/web/app/api/userRoute';

//ToDo move to shared library
export interface UserType {
  _id: string;
  userId: string;
  email: string;
  fullName: string;
}

export const initialUser: UserType = {
  _id: '',
  userId: '',
  email: '',
  fullName: '',
};

export const UserForm = () => {
  const [items, setItems] = useState<UserType[]>([]);
  const [selectedItem, setSelectedItem] = useState<UserType>(initialUser);

  const fetchUsers = async () => {
    const { data } = await getUsers();
    setItems(data);
  };

  const deleteItem = async (id: string) => {
    setItems(items.filter((item) => item._id !== id));
    await deleteUser(id);
  };

  const editItem = (item: UserType) => {
    setSelectedItem(item);
  };

  const handleReturn = (items: UserType[]) => {
    setItems(items);
    setSelectedItem(initialUser);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="ItemWrapper">
      <h1>Users List</h1>
      {selectedItem.userId === '' ? (
        <AddUser handleReturn={handleReturn} />
      ) : (
        <EditUser handleReturn={handleReturn} selectedItem={selectedItem} />
      )}

      {items.map((item: UserType) => (
        <ListUser
          key={item._id}
          item={item}
          deleteItem={deleteItem}
          editItem={editItem}
        />
      ))}
    </div>
  );
};
