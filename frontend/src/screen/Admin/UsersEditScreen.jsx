import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import Error from '../../components/Error'
import Loader from '../../components/Loader'
import { toast } from 'react-toastify'
import { useGetUserDetailsQuery, useUpdateUserMutation } from "../../slices/usersApiSlice"
import FormConatiner from '../../components/FormConatiner'

const UsersEditScreen = () => {
    const { id: userId } = useParams()

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const { data: user, isLoading, refetch, error } = useGetUserDetailsQuery(userId)

    const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation()

    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
        }
    }, [user])

    const submitteHandler = async (e) => {
        e.preventDefault()
        try {
            await updateUser({ userId, name, email, isAdmin })
            toast.success("User updated succefully")
            refetch()
            navigate('/admin/userlist')
        } catch (error) {
            toast.error(error?.data?.message || error.error)
        }
    }

    return (
        <>
            <Link to='/admin/userlist' className="btn btn-light my-3">
                Go back
            </Link>
            <FormConatiner>
                <h3>Edit User</h3>
                {loadingUpdate && <Loader />}
                {
                    isLoading ? <Loader /> :
                        error ? <Error variant='danger'>{error}</Error> :
                            (
                                <Form onSubmit={submitteHandler}>
                                    <Form.Group controlId="name" className="my-2">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group controlId="email" className="my-2">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group controlId="isAdmin" className="my-2">
                                        <Form.Check
                                            type="checkbox"
                                            label='Is Admin'
                                            checked={isAdmin}
                                            onChange={(e) => setIsAdmin(e.target.checked)} />
                                    </Form.Group>

                                    <Button type="submit" style={{ background: "black", border: "none" }} className="mt-2" disabled={isLoading}>
                                        Update
                                    </Button>
                                </Form>
                            )
                }
            </FormConatiner>
        </>
    )
}

export default UsersEditScreen

