'use client';
import React, { useState, useEffect } from 'react';
import { ListUser } from './list';
import { AddUser } from './add';
import { EditUser } from './edit';
import { getUsers, deleteUser } from 'apps/web/app/api/route';

//ToDo move to shared library
export interface UserType {
  id: string;
  email: string;
  fullName: string;
  completed: boolean;
  isEditing: boolean;
}

export const initialItem: UserType = {
  id: '',
  email: '',
  fullName: '',
  completed: false,
  isEditing: false,
};

export const UserForm = () => {
  const [items, setItems] = useState<UserType[]>([]);
  const [selectedItem, setSelectedItem] = useState<UserType>(initialItem);

  const fetchUsers = async () => {
    const { data } = await getUsers();
    setItems(data);
  };

  const deleteItem = async (id: string) => {
    setItems(items.filter((item) => item.id !== id));
    await deleteUser(id);
  };

  const toggleComplete = (id: string) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const editItem = (item: UserType) => {
    setSelectedItem(item);
  };

  const handleReturn = (items: UserType[]) => {
    setItems(items);
    setSelectedItem(initialItem);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="ItemWrapper">
      <h1>Users List</h1>
      {selectedItem.id === '' ? (
        <AddUser handleReturn={handleReturn} />
      ) : (
        <EditUser handleReturn={handleReturn} selectedItem={selectedItem} />
      )}

      {items.map((item: UserType) => (
        <ListUser
          key={item.id}
          item={item}
          deleteItem={deleteItem}
          editItem={editItem}
          toggleComplete={toggleComplete}
        />
      ))}
    </div>
  );
};
