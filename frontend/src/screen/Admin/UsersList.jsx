import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { FaTrash, FaTimes, FaEdit, FaCheck } from 'react-icons/fa'
import Error from '../../components/Error'
import Loader from '../../components/Loader'
import { useDeleteUserMutation, useGetUsersQuery } from '../../slices/usersApiSlice'
import { toast } from 'react-toastify'

const UsersList = () => {

    const { data: users, refetch, isLoading, error } = useGetUsersQuery()
    const [deleteUser, { isLoading: deleteLoading }] = useDeleteUserMutation()

    const deleteHandler = async (id) => {
        if (window.confirm("Are you sure to delete the user?")) {
            try {
                await deleteUser(id)
                toast.success("User Deleted")
                refetch()
            } catch (error) {
                toast.error(error?.data?.message || error.error)
            }
        }
    }

    return (
        <>
            <h1>Users</h1>
            {
                isLoading ? <Loader /> : error ? <Error variant='danger'>
                    {error}
                </Error> : (
                    <Table striped bordered hover responsive className='table-sm' variant="dark">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>ADMIN</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user) => (
                                    <tr key={user._id}>
                                        <td>
                                            {user._id}
                                        </td>
                                        <td>
                                            {user.name}
                                        </td>
                                        <td>
                                            <a href={`mailto:${user.email}`}>{user.email}</a>
                                        </td>
                                        <td>
                                            {
                                                user.isAdmin ? (
                                                    <FaCheck style={{ color: "green" }} />
                                                ) : (
                                                    <FaTimes style={{ color: "red" }} />
                                                )
                                            }
                                        </td>
                                        <td>
                                            <LinkContainer to={`/admin/user/${user._id}/edit`} variant="dark" className='m-1'>
                                                <Button className='btn-sm' variant='dark'>
                                                    <FaEdit />
                                                </Button>
                                            </LinkContainer>
                                            <Button className='btn-sm ' variant='dark' onClick={() => deleteHandler(user._id)} disabled={user.isAdmin}>
                                                <FaTrash />
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>

                )
            }
            {deleteLoading && <Loader />}
        </>
    )
}

export default UsersList
