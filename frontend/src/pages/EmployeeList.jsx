import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { StoreContext } from '../storeContext';
import { useNavigate } from 'react-router-dom';
import img from '../assets/profileIcon.webp';

const EmployeeList = () => {
  const { url } = useContext(StoreContext);
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [newImage, setNewImage] = useState(null); // For storing selected new image
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    // Filter employees based on the search query
    if (searchQuery) {
        setFilteredEmployees(
            employees.filter((employee) => {
              const lowerCaseQuery = searchQuery.toLowerCase();
              return (
                employee.name.toLowerCase().includes(lowerCaseQuery) ||
                employee.email.toLowerCase().includes(lowerCaseQuery) ||
                (employee.mobile && employee.mobile.toString().includes(lowerCaseQuery)) || // Ensure mobile is treated as a string
                employee.designation.toLowerCase().includes(lowerCaseQuery)
              );
            })
          );
          
    } else {
      setFilteredEmployees(employees);
    }
  }, [searchQuery, employees]);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${url}/employees/getEmployees`);
      setEmployees(response.data.employees);
      setFilteredEmployees(response.data.employees); // Initialize filtered employees
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
    setNewImage(null); // Reset new image when opening modal
  };

  const handleSave = async () => {
    try {
      let updatedEmployee = selectedEmployee;

      // Create FormData to append all employee details, including the image
      const formData = new FormData();

      // If there is a new image, append it to the FormData
      if (newImage) {
        formData.append('image', newImage);
      }

      // Append other employee details
      formData.append('name', updatedEmployee.name);
      formData.append('email', updatedEmployee.email);
      formData.append('mobile', updatedEmployee.mobile);

      // Send the PUT request to update the employee along with the new image if provided
      const updateResponse = await axios.put(
        `${url}/employees/update/${updatedEmployee._id}`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      // After successful update, navigate and update the employee list
      setEmployees(
        employees.map(emp => (emp._id === updatedEmployee._id ? updateResponse.data : emp))
      );
      navigate('/employeelist');
      fetchEmployees();
      // Close the modal and reset states
      setIsModalOpen(false);
      setSelectedEmployee(null);
      setNewImage(null);
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${url}/employees/${id}`);
      setEmployees(employees.filter(employee => employee._id !== id));
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
    setNewImage(null);
  };

  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]); // Save the selected file
  };

  return (
    <div className="container mx-auto mt-8  flex-col items-center">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Employee List</h1>

      {/* Search Bar */}
      <div className="mb-4 w-5/6  ">
        <input
          type="text"
          placeholder="Search by name, email, mobile, or designation..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border-emerald-700  px-3 py-2 border rounded mb-4"
        />
      </div>

      <div className="overflow-x-auto w-5/6">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left text-lg font-semibold">Image</th>
              <th className="py-3 px-4 text-left text-lg font-semibold">Name</th>
              <th className="py-3 px-4 text-left text-lg font-semibold">Email</th>
              <th className="py-3 px-4 text-left text-lg font-semibold">Mobile</th>
              <th className="py-3 px-4 text-left text-lg font-semibold">Designation</th>
              <th className="py-3 px-4 text-left text-lg font-semibold">Gender</th>
              <th className="py-3 px-4 text-left text-lg font-semibold">Course</th>
              <th className="py-3 px-4 text-center text-lg font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map(employee => (
                <tr key={employee._id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-2 px-4 text-center">
                    {employee.profileimage ? (
                      <img
                        src={`${url}/images/${employee.profileimage}`}
                        alt="Employee"
                        className="w-12 h-12 object-cover rounded-full"
                      />
                    ) : (
                      <img
                        src={img}
                        alt="Employee"
                        className="w-12 h-12 object-cover rounded-full"
                      />
                    )}
                  </td>
                  <td className="py-2 px-4 text-gray-700 text-base font-medium">{employee.name}</td>
                  <td className="py-2 px-4 text-gray-700 text-base font-medium">{employee.email}</td>
                  <td className="py-2 px-4 text-gray-700 text-base font-medium">{employee.mobile}</td>
                  <td className="py-2 px-4 text-gray-700 text-base font-medium">{employee.designation}</td>
                  <td className="py-2 px-4 text-gray-700 text-base font-medium">{employee.gender}</td>
                  <td className="py-2 px-4 text-gray-700 text-base font-medium">
                    {Array.isArray(employee.course) ? employee.course.join(', ') : 'No courses'}
                  </td>
                  <td className="py-2 px-4 text-center">
                    <button
                      onClick={() => handleEdit(employee)}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-4 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(employee._id)}
                      className="bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-4 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">No employees found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-2xl font-bold mb-4">Edit Employee</h2>
            <label className="block mb-2 font-medium">Name</label>
            <input
              type="text"
              value={selectedEmployee.name}
              onChange={(e) => setSelectedEmployee({ ...selectedEmployee, name: e.target.value })}
              className="w-full px-3 py-2 border rounded mb-4"
            />
            <label className="block mb-2 font-medium">Email</label>
            <input
              type="email"
              value={selectedEmployee.email}
              onChange={(e) => setSelectedEmployee({ ...selectedEmployee, email: e.target.value })}
              className="w-full px-3 py-2 border rounded mb-4"
            />
            <label className="block mb-2 font-medium">Mobile</label>
            <input
              type="text"
              value={selectedEmployee.mobile}
              onChange={(e) => setSelectedEmployee({ ...selectedEmployee, mobile: e.target.value })}
              className="w-full px-3 py-2 border rounded mb-4"
            />
            <label className="block mb-2 font-medium">New Image</label>
            <input
              type="file"
              onChange={handleImageChange}
              className="w-full px-3 py-2 border rounded mb-4"
            />
            <div className="flex justify-between">
              <button
                onClick={closeModal}
                className="bg-gray-400 text-white font-semibold py-1 px-4 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-1 px-4 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
