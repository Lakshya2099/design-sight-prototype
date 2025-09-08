import React from 'react';

const ROLES = ['Developer', 'Designer', 'Product Manager', 'Reviewer'];

const RoleSwitcher = ({ currentRole, onRoleChange }) => {
  return (
    <div>
      <label htmlFor="role-select">Viewing as: </label>
      <select 
        id="role-select" 
        value={currentRole} 
        onChange={(e) => onRoleChange(e.target.value)}
        style={{ padding: '8px', background: '#333', color: 'white', border: '1px solid #555' }}
      >
        {ROLES.map(role => (
          <option key={role} value={role}>{role}</option>
        ))}
      </select>
    </div>
  );
};

export default RoleSwitcher;