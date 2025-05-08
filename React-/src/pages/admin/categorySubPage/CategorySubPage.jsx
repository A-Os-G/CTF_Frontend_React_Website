import React, { useEffect, useState } from 'react';
import '../../../components/AdminSubPageLayout/adminSubPageLayout.css';
import axios from 'axios';

function CategorySubPage() {

    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [searchMessage, setSearchMessage] = useState('');
    const [isSearching, setIsSearching] = useState(false);



    const [editError, setEditError] = useState(null);
    const [showEditForm, setShowEditForm] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [editUserData, setEditUserData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'USER',
    });


    const [showAddForm, setShowAddForm] = useState(false);
    const [newUser, setNewUser] = useState({
        username: '',
        email: '',
        password: '',
        role: 'USER'

    });
    const [addError, setAddError] = useState(null);

    const [data, setData] = useState([]);
    const [searchEmail,setSearchEmail] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Search Users By Email
    const handleSearch = (e) => {

        e.preventDefault(); // prevent form reload
        setIsSearching(true);

        const trimmedEmail = searchEmail.trim();
    
        // If input is empty or only spaces, reset to full list
        if (!trimmedEmail) {
            setIsSearching(false); // ← turn off search mode
            handleUsersAll();
            return;
        }
        
    
        setLoading(true);
        setError(null);

        setLoading(true);
        axios.get(`/api/user/get/email/${trimmedEmail}`)
        .then((res) => {
            const user = res.data.response;
            setData(user ? [user] : []);
            setSearchMessage(user ? '' : "No user found with that email.");
            setLoading(false);
        })
        .catch((error) => {
            if (error.response?.status === 404) {
                setData([]); // clear table
                setSearchMessage("No user found with that email.");
            } else {
                setError("Something went wrong. Please try again.");
            }
            setLoading(false);
        });

    }

    // Get ALL Users Api
    const handleUsersAll = (pageNum = 0) => {
            setIsSearching(false);

        axios.get(`/api/user/get/all?page=${pageNum}&size=5`)
        .then((userResponse) => {
            setData(userResponse.data.response);
            setTotalPages(userResponse.data.totalPages);
            setPage(pageNum)
            setLoading(false);
        })
        .catch((err) => {
            setError(err);
            setLoading(false);
        });
    }

    // Add New User
    const handleAddUser = () => {

        setAddError(null);

        axios.post(`/api/user/post`, newUser)
        .then((res) => {
            if (res.data && res.data.status == "SUCCESS"){
                alert(res.data.response);
                handleUsersAll();
                setShowAddForm(false);
                setNewUser({username: '', email: '', password: '', role: 'USER'});
            }else {
                setAddError(res.data.response || "failed to add user.");
            }
        }).catch((err) => {
            const message = err.response?.data?.response || "faild to add user"
            setAddError(message);
        })
    }

    // Edit user's data
    const handleEditUser = (id) => {
        setEditError(null); // clear any previous error
      
        const payload = {
          username: editUserData.username,
          email: editUserData.email,
          role: editUserData.role,
        };
      
        if (editUserData.password) {
          payload.password = editUserData.password;
        }
      
        axios.patch(`/api/user/edit/${id}`, payload)
          .then((res) => {
            if (res.data.status === "SUCCESS") {
              alert("User updated successfully!");
              handleUsersAll();
              setShowEditForm(false);
              setSelectedUser(null);
            } else {
              setEditError(res.data.response || "Failed to update user.");
            }
          })
          .catch((err) => {
            const message = err.response?.data?.response || "Error updating user.";
            setEditError(message);
          });
      };
      
    // Delete User Api
    const deleteUser = (id) => {

        const confirmDelete = window.confirm("are you sure you want to delete the user?")
        if (!confirmDelete) return;

        axios.delete(`/api/user/delete/${id}`)
        .then((userResponse) => {
            setData(prevData => prevData.filter(user => user.id !== id))

            if (userResponse.data && userResponse.data.status == "SUCCESS"){
                
                alert(userResponse.data.response);
                handleUsersAll();

            }else{
                alert("Unexpected response from server.")
            }
        })
        .catch((err) => {
            setError(err);
        })};


    useEffect(() => {
        handleUsersAll();
    },[]);

    if (loading) return <div>Loading ...</div>;
    if (error) return <div>Error: {error?.message || "Something went wrong"}</div>;

    return ( 
        <div className="admin-layout">

            <div className="upper-part">

                <form typeof='submit' method='GET' className="search" onSubmit={handleSearch}>
                    <input type="text" placeholder='Search by EMAIL'
                        value={searchEmail}
                        onChange={(e) => {
                            setSearchEmail(e.target.value);
                
                            // Optional: Reset results when user clears input
                            if (e.target.value.trim() === '') {
                                handleUsersAll();
                            }
                        }}
                    />
                    <img src="/images/search_icon.png" alt="Search" onClick={handleSearch}/>
                </form>

                <p> Welcome to the Admin's Controller</p>
                
                <div className="AddNew">
                    <button className='green' onClick={() => setShowAddForm(true)} >Add New</button>
                </div>

            </div>

            <div className="data-table">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Time</th>
                            <th>Actions</th>
                        </tr>
                   </thead>

                    <tbody>
                    {data.length > 0 ? (
                        data.map((user) => (
                            <tr key={user.id}>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>{new Date(user.regDateAndTime).toLocaleString()}</td>
                                <td> <button className='green' onClick={() => { setSelectedUser(user); setEditUserData({ username: user.username, email: user.email,password: '', role: user.role}); setShowEditForm(true);}}>Edit</button>
                                    <button className='red' onClick={() => deleteUser(user.id)}>Delete</button></td></tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" style={{ textAlign: "center", padding: "1rem" }}>
                                {searchMessage || "No users available."}
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            {!isSearching && <div className="pagination">
                <button className="green" disabled={page === 0} onClick={() => handleUsersAll(page - 1)}>{`<`}</button>
                <span>Page {page + 1} of {totalPages}</span>
                <button className="green" disabled={page + 1 >= totalPages} onClick={() => handleUsersAll(page + 1)}>{`>`}</button>
            </div>}


{/* Add modal */}
            {showAddForm && (
                <div className="modal-backdrop">
                    <div className="modal">
                        <h2>Add New User</h2>

                        {addError && <p>{addError}</p>}
                        <input
                            type="text"
                            placeholder="Username"
                            value={newUser.username}
                            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={newUser.email}
                            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={newUser.password}
                            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                        />
                        <select
                            value={newUser.role}
                            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                        >
                            <option value="USER">USER</option>
                            <option value="ADMIN">ADMIN</option>
                            <option value="LECTURER">LECTURER</option>
                        </select>
                        <div className="modal-actions">
                            <button onClick={handleAddUser} className="green">Submit</button>
                            <button onClick={() => {setShowAddForm(false); setAddError(null)}} className="red">Cancel</button>
                        </div>
                    </div>
                </div>
                )}

{/* Edit Modal */}
            {showEditForm && selectedUser && (
                <div className="modal-backdrop">
                    <div className="modal">
                        <h2>Edit User</h2>

                        {editError && <p>{editError}</p>}


                        <input
                            type="text"
                            placeholder="Username"
                            value={editUserData.username}
                            onChange={(e) => setEditUserData({ ...editUserData, username: e.target.value })}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={editUserData.email}
                            onChange={(e) => setEditUserData({ ...editUserData, email: e.target.value })}
                        />
                        <input
                            type="password"
                            placeholder="New Password (leave blank to keep current)"
                            value={editUserData.password}
                            onChange={(e) => setEditUserData({ ...editUserData, password: e.target.value })}
                        />
                        <select
                            value={editUserData.role}
                            onChange={(e) => setEditUserData({ ...editUserData, role: e.target.value })}
                        >
                            <option value="USER">USER</option>
                            <option value="ADMIN">ADMIN</option>
                            <option value="LECTURER">LECTURER</option>
                        </select>

                        <div className="modal-actions">
                            <button onClick={() => handleEditUser(selectedUser.id)} className="green">Submit</button>
                            <button onClick={() => {setShowEditForm(false); setSelectedUser(null); setEditError(null)}} className="red">Cancel</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
     );
}

export default CategorySubPage;